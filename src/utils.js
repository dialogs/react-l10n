/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import escape from 'lodash/escape';
import mapValues from 'lodash/mapValues';

export type StringToString = { [key: string]: string };

export function escapeValues(values: StringToString): StringToString {
  return mapValues(values, escape);
}

export function formatMessage(message: string, values: { [key: string]: string }): string {
  return message.replace(/{([a-zA-Z0-9_]+)}/, (match, key) => values[key]);
}
