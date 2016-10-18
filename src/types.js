/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Element } from 'react';
import { PropTypes } from 'react';

export type FormatValues = { [key: string]: string };
export type TextFormatter = (id: string, values?: FormatValues, html?: boolean) => string;

export type LocalizationContext = {
  formatText: TextFormatter
};

export const LocalizationContextType = PropTypes.shape({
  formatText: PropTypes.func.isRequired
});

export type ProviderProps = {
  locale: string,
  defaultLocale: string,
  messages: {
    [locale: string]: FormatValues
  },
  children?: Element<any>
};

export const ProviderPropType = {
  locale: PropTypes.string.isRequired,
  defaultLocale: PropTypes.string.isRequired,
  messages: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.string)
  ).isRequired,
  children: PropTypes.element.isRequired
};

export type ProviderContext = {
  l10n: LocalizationContext
};

export const ProviderContextType = {
  l10n: LocalizationContextType
};

export type TextProps = {
  id: string,
  values?: FormatValues,
  html?: boolean,
  tagName?: string
};

export const TextPropType = {
  id: PropTypes.string.isRequired,
  values: PropTypes.objectOf(
    PropTypes.string.isRequired
  ).isRequired,
  html: PropTypes.bool.isRequired,
  tagName: PropTypes.string.isRequired
};
