import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Item, ItemProps } from './Item';
import { BaseComponentDriver } from 'testing-base';

export class ItemDriver extends BaseComponentDriver {
    private props: Partial<ItemProps> = {
    };

    constructor() {
        super('Item');
    }

    when: any = {
        rendered: () => {
            render(<Item {...(this.props as ItemProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.container);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<Item {...(this.props as ItemProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<ItemProps>) => {
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
