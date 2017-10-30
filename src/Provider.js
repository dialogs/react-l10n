/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type {
  TextFormatter,
  ProviderProps,
  ProviderContext,
  FormatValues
} from './types';
import React, { Component, Children } from 'react';
import {
  ProviderPropType,
  ProviderContextType,
  LocalizationContextType
} from './types';
import { escapeValues, formatMessage } from './utils';

class Provider extends Component {
  props: ProviderProps;
  context: ProviderContext;
  formatText: TextFormatter;
  globalValues: FormatValues;

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
    this.globalValues = context.l10n
      ? Object.assign({}, context.l10n.globalValues, props.globalValues)
      : props.globalValues;
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
        messages: this.props.messages,
        globalValues: this.globalValues,
        defaultLocale: this.props.defaultLocale
      }
    };
  }

  getTranslation(id: string): string {
    const messages = this.props.messages[this.props.locale];
    const fallbackMessages = this.props.messages[this.props.defaultLocale];

    if (messages) {
      const translation = messages[id];
      if (translation) {
        return translation;
      }
    }

    if (this.context.l10n) {
      const contextMessages = this.context.l10n.messages[this.props.locale];

      if (contextMessages) {
        const contextTranslation = contextMessages[id];

        if (contextTranslation) {
          return contextTranslation;
        }
      }

      const contextFallbackMessages = this.context.l10n.messages[
        this.props.defaultLocale
      ];

      return fallbackMessages[id] || contextFallbackMessages[id] || id;
    }

    return fallbackMessages[id] || id;
  }

  getFormattedMessage(id: string, values: { [key: string]: string } = {}, html: boolean = false): string {
    const translation = this.getTranslation(id);
    const _values = Object.assign({}, this.globalValues, values);

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
