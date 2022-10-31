import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    background-color: #112;
    ${(props) => props.theme.borderLeft('7px solid transparent')}
    border-radius: 3px;
    position: relative;
    user-select: none;
    padding: 15px 20px;

    &.hover {
        &::before {
            content: '';
            position: absolute;
            top: 0;
            ${(props) => props.theme.left(0)}
            ${(props) => props.theme.right(0)}
            bottom: 0;
            pointer-events: none;
            background-color: rgba(0, 0, 0, 0.1);
        }
    }

    &.selected {
        &::after {
            content: '';
            position: absolute;
            top: 0;
            ${(props) => props.theme.left('-6px')}
            ${(props) => props.theme.right(0)}            
            bottom: 0;
            pointer-events: none;
            background-color: rgba(0, 0, 0, 0.1);
            border: 2px solid goldenrod;
            pointer-events: none;
        }
    }
`;
