/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { TextFormatter, ProviderProps, ProviderContext } from './types';
import React, { Component, Children } from 'react';
import isEmpty from 'lodash/isEmpty';
import { ProviderPropType, ProviderContextType } from './types';
import { escapeValues } from './utils';

class Provider extends Component {
  props: ProviderProps;
  formatText: TextFormatter;

  static childContextTypes = ProviderContextType;
  static propTypes = ProviderPropType;

  static defaultProps = {
    messages: {},
    defaultLocale: 'en'
  };

  constructor(props: ProviderProps, context: any) {
    super(props, context);

    this.formatText = this.getFormattedMessage.bind(this);
  }

  shouldComponentUpdate(nextProps: ProviderProps) {
    return nextProps.children !== this.props.children ||
           nextProps.locale !== this.props.locale ||
           nextProps.messages !== this.props.messages ||
           nextProps.defaultLocale !== this.props.defaultLocale;
  }

  getChildContext(): ProviderContext {
    return {
      l10n: {
        formatText: this.formatText
      }
    };
  }

  getTranslation(id: string): string {
    const messages = this.props.messages[this.props.locale];
    if (messages) {
      const translation = messages[id];
      if (translation) {
        return translation;
      }
    }

    const fallbackMessages = this.props.messages[this.props.defaultLocale];

    return fallbackMessages[id] || id;
  }

  getFormattedMessage(id: string, values: { [key: string]: string }, html?: boolean): string {
    const translation = this.getTranslation(id);
    if (isEmpty(values)) {
      return translation;
    }

    const escapedValues = html ? escapeValues(values) : values;

    return translation.replace(/{([a-zA-Z0-9_]+)}/, (match, key) => escapedValues[key]);
  }

  render(): React.Element<any> {
    return Children.only(this.props.children);
  }
}

export default Provider;
