/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { TextFormatter, ProviderProps, ProviderContext } from './types';
import React, { Component, Children } from 'react';
import { ProviderPropType, ProviderContextType } from './types';
import { escapeValues, formatMessage } from './utils';

class Provider extends Component {
  props: ProviderProps;
  formatText: TextFormatter;

  static childContextTypes = ProviderContextType;
  static propTypes = ProviderPropType;

  static defaultProps = {
    messages: {},
    defaultLocale: 'en',
    globalValues: {}
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

  getFormattedMessage(
    id: string,
    values: { [key: string]: string } = {},
    html: boolean = false
  ): string {
    const translation = this.getTranslation(id);
    const _values = Object.assign({}, this.props.globalValues, values);

    if (html) {
      return formatMessage(translation, escapeValues(_values));
    }

    return formatMessage(translation, _values);
  }

  render(): React.Element<any> {
    return Children.only(this.props.children);
  }
}

export default Provider;
