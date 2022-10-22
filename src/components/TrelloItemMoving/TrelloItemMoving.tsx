import React, { useContext, useMemo, useRef } from 'react';
import { Container } from './TrelloItemMoving.style';
import { DndCallbacks } from '../../context/Dnd.context';
import { IDndBox, IDndItem, IDndPoint } from '../../types';
import { useMouseMove, useMouseUp } from '@gdi/hooks';
import Item, { ItemComponent } from '../Item/Item';

export type TrelloItemMovingProps = {
    item: IDndItem;
    callbacks: DndCallbacks;
    box: IDndBox;
    startPoint: IDndPoint;
};

export function TrelloItemMoving(props: TrelloItemMovingProps) {
    const { item, callbacks, box, startPoint } = props;
    const delta = useMouseMove(true, startPoint, () => {});

    const style: React.CSSProperties = useMemo(() => {
        return {
            transform: `translateX(${delta.x}px) translateY(${delta.y}px) scale(1.06)`,
            left: `${box.x}px`,
            top: `${box.y}px`,
            width: box.width + 'px',
            height: box.height + 'px',
        };
    }, [delta]);

    useMouseUp(
        true,
        (ev: React.MouseEvent<HTMLDivElement>) => {
            callbacks.onMoveEnd({
                itemId: item.id,
                ev,
                point: { x: ev.clientX, y: ev.clientY },
            });
        },
        [callbacks]
    );

    return (
        <Container data-testid='TrelloItem-container' style={style}>
            <Item item={item} />
        </Container>
    );
}

export default TrelloItemMoving;
