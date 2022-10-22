import React, { useContext } from 'react';
import { DndContext } from '../../context/Dnd.context';
import { Container, Pre } from './Dev.style';

export type DevProps = {};

export function Dev(_props: DevProps) {
    const context = useContext(DndContext);

    return (
        <Container className='Dev-container' data-testid='Dev-container'>
            <Pre>{JSON.stringify(context.state, null, 4)}</Pre>
        </Container>
    );
}

export default Dev;
