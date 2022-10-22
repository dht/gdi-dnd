import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TrelloItemNew, TrelloItemNewProps } from './TrelloItemNew';
import { BaseComponentDriver } from 'testing-base';

export class TrelloItemNewDriver extends BaseComponentDriver {
    private props: Partial<TrelloItemNewProps> = {
    };

    constructor() {
        super('TrelloItemNew');
    }

    when: any = {
        rendered: () => {
            render(<TrelloItemNew {...(this.props as TrelloItemNewProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.container);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<TrelloItemNew {...(this.props as TrelloItemNewProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<TrelloItemNewProps>) => {
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
