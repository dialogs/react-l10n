/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow strict
 */

import type { FormatValues, ProviderProps, ProviderContext } from './types';
import escape from 'lodash/escape';
import mapValues from 'lodash/mapValues';

export type StringToString = { [key: string]: string };

export function escapeValues(values: StringToString): StringToString {
  return mapValues(values, escape);
}

export function formatMessage(
  message: string,
  values: {
    [key: string]: string,
    ...,
  },
): string {
  return message.replace(/{([a-zA-Z0-9_]+)}/g, (match, key) => values[key]);
}

export function getGlobalValues(
  props: ProviderProps,
  context?: ?$Shape<ProviderContext>,
): FormatValues {
  if (context && context.l10n) {
    return Object.assign({}, context.l10n.globalValues, props.globalValues);
  }

  return props.globalValues;
}
