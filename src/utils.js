/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import escape from 'lodash/escape';
import mapValues from 'lodash/mapValues';

export type StringToString = { [key: string]: string };

export function escapeValues(values: StringToString): StringToString {
  return mapValues(values, escape);
}
