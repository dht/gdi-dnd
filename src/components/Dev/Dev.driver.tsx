import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Dev, DevProps } from './Dev';
import { BaseComponentDriver } from 'testing-base';

export class DevDriver extends BaseComponentDriver {
    private props: Partial<DevProps> = {
    };

    constructor() {
        super('Dev');
    }

    when: any = {
        rendered: () => {
            render(<Dev {...(this.props as DevProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.container);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<Dev {...(this.props as DevProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<DevProps>) => {
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
