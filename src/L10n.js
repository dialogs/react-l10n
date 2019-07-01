/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow strict
 */

import { type Node } from 'react';

import { LocalizationContextType } from './types';
import { type ProviderContext as Context } from './types';

type L10nProps = {
  children: (Context) => Node,
};

export function L10n({ children }: L10nProps, context: Context) {
  return children(context);
}

L10n.contextTypes = {
  l10n: LocalizationContextType,
};

export default L10n;
