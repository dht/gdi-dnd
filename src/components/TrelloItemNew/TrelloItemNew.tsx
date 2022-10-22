import React, { useRef } from 'react';
import { DndCallbacks } from '../../context/Dnd.context';
import ContentEditable from '../ContentEditable/ContentEditable';
import { Container } from './TrelloItemNew.style';
import classnames from 'classnames';
import { useEnter } from '@gdi/hooks';
import { IDndItem } from '../../types';
import Item, { ItemComponent } from '../Item/Item';

export type TrelloItemNewProps = {
    listId: string;
    callbacks: DndCallbacks;
    isMoving?: boolean;
    isSelected?: boolean;
    isEditable?: boolean;
};

export function TrelloItemNew(props: TrelloItemNewProps) {
    const { isMoving, isSelected, isEditable, listId } = props;
    const ref = useRef<HTMLDivElement>(null);
    const { callbacks } = props;

    const className = classnames('TrelloItemNew-container', {
        moving: isMoving,
        selected: isSelected,
    });

    function onSave(value: string) {
        callbacks.onNewDone(listId, value);
    }

    function onCancel() {
        callbacks.onNewCancel(listId);
    }

    function renderInner() {
        if (!isEditable) {
            return <div className='title'>Add a new item</div>;
        }

        return (
            <ContentEditable
                placeholder='Add a new item'
                onSave={onSave}
                onCancel={onCancel}
                autoFocus
                clearOnSave
                readOnly={!isSelected}
            />
        );
    }

    useEnter(() => {
        if (isSelected && !isEditable) {
            callbacks.onNewStart(listId);
        }
    }, [isSelected, isEditable]);

    return (
        <Container
            ref={ref}
            className={className}
            data-testid='TrelloItemNew-container'
            onMouseDown={() =>
                callbacks.onSelect({
                    itemId: `NEW_${listId}`,
                    point: { x: 0, y: 0 },
                    ev: {} as any,
                })
            }
        >
            <Item isSelected={isSelected}>{renderInner()}</Item>
        </Container>
    );
}

export default TrelloItemNew;
