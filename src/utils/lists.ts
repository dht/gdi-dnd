import { IDndList, IDndLists } from '../types';
import { uniq, isEqual } from 'lodash';

export const getListByDataTags = (
    scopedPermutationId: string,
    dataTags: string[] = [],
    lists: IDndLists
): IDndList | undefined => {
    return Object.values(lists).find((list) => {
        const { dataTags: listDataTags = [] } = list;
        const listDataTagsWithPrefix = listDataTags.map((tag) => {
            return `${scopedPermutationId}-${tag}`;
        });

        const listDataTagsSorted = listDataTagsWithPrefix.sort();
        const itemDataTagsSorted = dataTags.sort();

        return isEqual(listDataTagsSorted, itemDataTagsSorted);
    });
};

type DataTagCommand = {
    type: 'add' | 'remove';
    tag: string;
};

export const getNewDataTagsByList = (
    scopedPermutationId: string,
    currentDataTags: string,
    lists: IDndList[],
    listId: string
) => {
    let output: string[] = [...currentDataTags];
    const commands: DataTagCommand[] = [];
    const list = lists.find((list) => list.id === listId);
    const otherLists = lists.filter((list) => list.id !== listId);

    if (!list) {
        return output;
    }

    (list.dataTags ?? []).forEach((tag) => {
        commands.push({ type: 'add', tag });
    });

    otherLists.forEach((list) => {
        (list.dataTags ?? []).forEach((tag) => {
            commands.push({ type: 'remove', tag });
        });
    });

    commands
        .map((c) => parseCommand(c, scopedPermutationId))
        .forEach((c) => {
            const { type, tag } = c;

            switch (type) {
                case 'add':
                    output.push(tag);
                    break;
                case 'remove':
                    output = output.filter((t) => t !== tag);
                    break;
            }
        });

    return uniq(output.sort());
};

export const parseCommand = (
    command: DataTagCommand,
    scopedPermutationId: string
) => {
    const { tag } = command;

    return {
        ...command,
        tag: `${scopedPermutationId}-${tag}`,
    };
};
