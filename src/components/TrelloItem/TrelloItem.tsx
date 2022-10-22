import React, { useRef } from 'react';
import classnames from 'classnames';
import TrelloItemEdit from '../TrelloItemEdit/TrelloItemEdit';
import { Container } from './TrelloItem.style';
import { DndCallbacks } from '../../context/Dnd.context';
import { IDndBox, IDndItem } from '../../types';
import Item from '../Item/Item';

export type TrelloItemProps = {
    index: number;
    item: IDndItem;
    callbacks: DndCallbacks;
    className?: string;
    isSelected?: boolean;
    isEditable?: boolean;
    children?: JSX.Element | JSX.Element[];
};

export function TrelloItem(props: TrelloItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { index, item, callbacks, isSelected, isEditable } = props;

    function onMouseOver(ev: React.MouseEvent<HTMLDivElement>) {
        callbacks.onMouseOver({
            index,
            ev,
            point: { x: ev.clientX, y: ev.clientY },
        });
    }

    function onMouseDown(ev: React.MouseEvent<HTMLDivElement>) {
        if (!ref.current) {
            return;
        }

        const box = ref.current.getBoundingClientRect();

        const movingBox: IDndBox = {
            x: box.left,
            y: box.top,
            width: box.width,
            height: box.height,
        };

        callbacks.onSelect({
            itemId: item.id,
            ev,
            point: { x: ev.clientX, y: ev.clientY },
            box: movingBox,
        });
    }

    const className = classnames('TrelloItem-container', props.className);

    return (
        <Container
            onMouseOver={onMouseOver}
            onMouseDown={onMouseDown}
            className={className}
            data-testid='TrelloItem-container'
            ref={ref}
        >
            <Item item={item} isSelected={isSelected}>
                {isEditable && <TrelloItemEdit {...props} />}
            </Item>
        </Container>
    );
}

export default TrelloItem;
