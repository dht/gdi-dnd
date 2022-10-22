import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TrelloList, TrelloListProps } from './TrelloList';
import { BaseComponentDriver } from 'testing-base';

export class TrelloListDriver extends BaseComponentDriver {
    private props: Partial<TrelloListProps> = {
    };

    constructor() {
        super('TrelloList');
    }

    when: any = {
        rendered: () => {
            render(<TrelloList {...(this.props as TrelloListProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.container);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<TrelloList {...(this.props as TrelloListProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<TrelloListProps>) => {
            this.props = props;
            return this;
        },
    };

    get = {
        containerClassName: () => {
            return this.container.className;
        },
        label: () => {
            return this.container.innerHTML;
        },
    };
}
