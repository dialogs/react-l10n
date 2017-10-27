/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Element } from 'react';
import PropTypes from 'prop-types';

export type FormatValues = { [key: string]: string };
export type TextFormatter = (id: string, values?: FormatValues, html?: boolean) => string;
export type ProviderMessages = {
  [locale: string]: FormatValues
};

export type LocalizationContext = {
  formatText: TextFormatter,
  locale: string,
  messages: ProviderMessages,
  globalValues: FormatValues,
  defaultLocale: string
};

export const LocalizationContextType = PropTypes.shape({
  formatText: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  messages: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.string)
  ).isRequired,
  globalValues: PropTypes.objectOf(PropTypes.string),
  defaultLocale: PropTypes.string.isRequired
});

export type ProviderProps = {
  locale: string,
  defaultLocale: string,
  messages: ProviderMessages,
  globalValues: FormatValues,
  children?: Element<any>
};

export const ProviderPropType = {
  locale: PropTypes.string.isRequired,
  defaultLocale: PropTypes.string.isRequired,
  messages: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.string)
  ).isRequired,
  globalValues: PropTypes.objectOf(PropTypes.string),
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
  ),
  html: PropTypes.bool,
  tagName: PropTypes.string
};
