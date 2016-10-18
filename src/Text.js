/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { TextProps as Props, ProviderContext as Context } from './types';
import React from 'react';
import { TextPropType, LocalizationContextType } from './types';

function Text(props: Props, context: Context): React.Element<any> {
  const {
    id,
    html,
    values,
    tagName: Tag = 'span',
    ...optional
  } = props;
  const text = context.l10n.formatText(id, values, html);

  if (html) {
    return <Tag {...optional} dangerouslySetInnerHTML={{ __html: text }} />;
  }

  return (
    <Tag {...optional}>{text}</Tag>
  );
}

Text.propTypes = TextPropType;
Text.contextTypes = {
  l10n: LocalizationContextType
};

export default Text;
