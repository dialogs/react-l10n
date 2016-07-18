/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import { Component, Children, PropTypes } from 'react';
import { isEmpty, mapValues, escape } from 'lodash';

class Provider extends Component {
  static childContextTypes = {
    l10n: PropTypes.shape({
      formatText: PropTypes.func.isRequired
    })
  };

  static propTypes = {
    locale: PropTypes.string.isRequired,
    messages: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
    defaultLocale: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
  };

  static defaultProps = {
    messages: {},
    defaultLocale: 'en'
  };

  constructor(props, context) {
    super(props, context);

    this.getFormattedMessage = this.getFormattedMessage.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
           nextProps.locale !== this.props.locale ||
           nextProps.messages !== this.props.messages ||
           nextProps.defaultLocale !== this.props.defaultLocale;
  }

  getChildContext() {
    return {
      l10n: {
        formatText: this.getFormattedMessage
      }
    };
  }

  getTranslation(id) {
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

  getFormattedMessage(id, values, html) {
    const translation = this.getTranslation(id);
    if (isEmpty(values)) {
      return translation;
    }

    let escapedValues = values;
    if (html) {
      escapedValues = mapValues(values, escape);
    }

    return translation.replace(/{([a-zA-Z0-9_]+)}/, (match, key) => escapedValues[key]);
  }

  render() {
    return Children.only(this.props.children);
  }
}

export default Provider;
