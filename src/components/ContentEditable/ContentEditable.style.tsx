import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    display: flex;
    outline: 1px solid #112;

    &[contenteditable='true']:empty:not(:focus):before {
        content: attr(data-ph);
        color: grey;
        font-style: italic;
    }
`;
