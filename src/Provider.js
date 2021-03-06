/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow strict
 */

import type {
  TextFormatter,
  ProviderProps,
  ProviderContext,
  FormatValues,
} from './types';
import { Component, Children } from 'react';
import {
  ProviderPropType,
  ProviderContextType,
  LocalizationContextType,
} from './types';
import { escapeValues, formatMessage, getGlobalValues } from './utils';

class Provider extends Component<ProviderProps> {
  context: $Shape<ProviderContext>;
  formatText: TextFormatter;
  globalValues: FormatValues;

  static childContextTypes = ProviderContextType;

  static propTypes = ProviderPropType;

  static defaultProps = {
    messages: {},
    defaultLocale: 'en',
    globalValues: {},
  };

  static contextTypes = {
    l10n: LocalizationContextType,
  };

  constructor(props: ProviderProps, context: $Shape<ProviderContext> = {}) {
    super(props, context);

    this.globalValues = getGlobalValues(props, context);
    this.formatText = this.getFormattedMessage.bind(this);
  }

  shouldComponentUpdate(
    nextProps: ProviderProps,
    nextState: void,
    nextContext: $Shape<ProviderContext> = {},
  ) {
    return (
      nextProps.children !== this.props.children ||
      nextProps.locale !== this.props.locale ||
      nextProps.messages !== this.props.messages ||
      nextProps.defaultLocale !== this.props.defaultLocale ||
      nextContext.l10n !== this.context.l10n
    );
  }

  componentWillUpdate(
    nextProps: ProviderProps,
    nextState: void,
    nextContext?: ?$Shape<ProviderContext>,
  ) {
    this.globalValues = getGlobalValues(nextProps, nextContext);
  }

  getDefaultLocale(): string {
    return (
      this.props.defaultLocale ||
      (this.context.l10n && this.context.l10n.defaultLocale) ||
      'en'
    );
  }

  getChildContext(): ProviderContext {
    return {
      l10n: {
        formatText: this.formatText,
        locale: this.props.locale,
        messages: this.props.messages,
        globalValues: this.globalValues,
        defaultLocale: this.getDefaultLocale(),
      },
    };
  }

  getTranslation(id: string): string {
    // trying messages with correct locale
    const messages = this.props.messages[this.props.locale];
    if (messages) {
      const translation = messages[id];
      if (translation) {
        return translation;
      }
    }

    // trying parent messages with correct locale
    if (this.context.l10n) {
      const contextMessages = this.context.l10n.messages[this.props.locale];
      if (contextMessages) {
        const contextTranslation = contextMessages[id];
        if (contextTranslation) {
          return contextTranslation;
        }
      }
    }

    const defaultLocale = this.getDefaultLocale();

    // trying fallback messages with default locale
    const fallbackMessages = this.props.messages[defaultLocale];
    if (fallbackMessages) {
      const fallbackTranslation = fallbackMessages[id];
      if (fallbackTranslation) {
        return fallbackTranslation;
      }
    }

    // trying parent fallback messages with default locale
    if (this.context.l10n) {
      const contextFallbackMessages = this.context.l10n.messages[defaultLocale];
      if (contextFallbackMessages) {
        const contextFallbackTranslation = contextFallbackMessages[id];
        if (contextFallbackTranslation) {
          return contextFallbackTranslation;
        }
      }
    }

    // fallback to id
    return id;
  }

  getFormattedMessage(
    id: string,
    values: FormatValues = {},
    html: boolean = false,
  ): string {
    const translation = this.getTranslation(id);

    const mergedValues = Object.assign({}, this.globalValues, values);

    if (html) {
      return formatMessage(translation, escapeValues(mergedValues));
    }

    return formatMessage(translation, mergedValues);
  }

  render() {
    return Children.only(this.props.children);
  }
}

export default Provider;
