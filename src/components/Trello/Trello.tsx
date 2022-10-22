import React, { useContext, useMemo } from 'react';
import Dev from '../Dev/Dev';
import TrelloList from '../TrelloList/TrelloList';
import { Container } from './Trello.style';
import { IDndItems, IDndList, IDndLists } from '../../types';
import { ItemComponent } from '../Item/Item';
import {
    DndCallbacksOuter,
    DndContext,
    DndContextProvider,
} from '../../context/Dnd.context';

export type TrelloProps = {
    id: string;
    lists: IDndLists;
    items: IDndItems;
    callbacks: DndCallbacksOuter;
    isRtl?: boolean;
    cmp?: ItemComponent;
};

export function TrelloInner(props: TrelloProps) {
    const { lists, items } = props;
    const { state } = useContext(DndContext);
    const { movableItemId } = state;

    const itemMirror = useMemo(() => {
        return Object.values(items).find((i) => i.id === movableItemId);
    }, [movableItemId]);

    function renderList(list: IDndList) {
        const listItems = Object.values(items).filter(
            (item) => item.listId === list.id
        );

        return (
            <TrelloList
                key={list.id}
                list={list}
                items={listItems}
                itemMirror={itemMirror}
            />
        );
    }

    function renderLists() {
        return Object.values(lists).map((list: IDndList) => renderList(list));
    }
    return (
        <Container className='Trello-container' data-testid='Trello-container'>
            {renderLists()}
        </Container>
    );
}

export function Trello(props: TrelloProps) {
    const { id, lists, items, callbacks, isRtl, cmp } = props;

    return (
        <DndContextProvider
            id={id}
            lists={lists}
            items={items}
            options={{}}
            callbacks={callbacks}
            isRtl={isRtl}
            cmp={cmp}
        >
            <TrelloInner {...props} />
            <Dev />
        </DndContextProvider>
    );
}

export default Trello;
