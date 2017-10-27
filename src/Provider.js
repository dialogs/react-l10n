/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { TextFormatter, ProviderProps, ProviderContext } from './types';
import React, { Component, Children } from 'react';
import { ProviderPropType, ProviderContextType, LocalizationContextType } from './types';
import { escapeValues, formatMessage } from './utils';
import defaultsDeep from 'lodash/defaultsDeep';

class Provider extends Component {
  props: ProviderProps;
  context: ProviderContext;
  formatText: TextFormatter;

  static childContextTypes = ProviderContextType;

  static propTypes = ProviderPropType;

  static defaultProps = {
    messages: {},
    defaultLocale: 'en',
    globalValues: {}
  };

  static contextTypes = {
    l10n: LocalizationContextType
  };

  constructor(props: ProviderProps, context: ProviderContext) {
    super(props, context);

    this.formatText = this.getFormattedMessage.bind(this);
  }

  shouldComponentUpdate(nextProps: ProviderProps) {
    return (
      nextProps.children !== this.props.children ||
      nextProps.locale !== this.props.locale ||
      nextProps.messages !== this.props.messages ||
      nextProps.defaultLocale !== this.props.defaultLocale
    );
  }

  getChildContext(): ProviderContext {
    return {
      l10n: {
        formatText: this.formatText,
        locale: this.props.locale,
        messages: this.getMessages(),
        globalValues: this.getGlobalValues()
      }
    };
  }

  getMessages() {
    if (this.context.l10n) {
      return defaultsDeep({}, this.context.l10n.messages, this.props.messages);
    }

    return this.props.messages;
  }

  getGlobalValues() {
    if (this.context.l10n) {
      return Object.assign({}, this.context.l10n.globalValues, this.props.globalValues);
    }

    return this.props.globalValues;
  }

  getTranslation(id: string): string {
    const messages = this.getMessages();
    const localeMessages = messages[this.props.locale];

    if (localeMessages) {
      const translation = localeMessages[id];
      if (translation) {
        return translation;
      }
    }

    const fallbackMessages = messages[this.props.defaultLocale];

    return fallbackMessages[id] || id;
  }

  getFormattedMessage(id: string, values: { [key: string]: string } = {}, html: boolean = false): string {
    const translation = this.getTranslation(id);
    const globalValues = this.getGlobalValues();
    const _values = Object.assign({}, globalValues, values);

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
