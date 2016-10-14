/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { TextProps as Props, ProviderContext as Context } from './types';
import React, { Component } from 'react';
import { TextPropType, LocalizationContextType } from './types';

class Text extends Component {
  props: Props;
  context: Context;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  static propTypes = TextPropType;

  static defaultProps = {
    html: false,
    values: {},
    tagName: 'span'
  };

  shouldComponentUpdate(nextProps: Props, nextState: any, nextContext: Context): boolean {
    return nextProps.values !== this.props.values ||
           nextProps.id !== this.props.id ||
           nextContext !== this.context ||
           nextProps.tagName !== this.props.tagName ||
           nextProps.html !== this.props.html;
  }

  render(): React.Element<any> {
    const { id, html, values, tagName: Tag, ...props } = this.props;

    const text = this.context.l10n.formatText(id, values, html);

    if (html) {
      return <Tag {...props} dangerouslySetInnerHTML={{ __html: text }} />;
    }

    return (
      <Tag {...props}>{text}</Tag>
    );
  }
}

export default Text;
