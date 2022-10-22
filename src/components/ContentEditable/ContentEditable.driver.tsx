import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ContentEditable, ContentEditableProps } from './ContentEditable';
import { BaseComponentDriver } from 'testing-base';

export class ContentEditableDriver extends BaseComponentDriver {
    private props: Partial<ContentEditableProps> = {
    };

    constructor() {
        super('ContentEditable');
    }

    when: any = {
        rendered: () => {
            render(<ContentEditable {...(this.props as ContentEditableProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.container);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<ContentEditable {...(this.props as ContentEditableProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<ContentEditableProps>) => {
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
