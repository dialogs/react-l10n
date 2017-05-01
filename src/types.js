/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Element } from 'react';
import PropTypes from 'prop-types';

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
  globalValues: FormatValues,
  children?: Element<any>
};

export const ProviderPropType = {
  locale: PropTypes.string.isRequired,
  defaultLocale: PropTypes.string.isRequired,
  messages: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.string)
  ).isRequired,
  globalValues: PropTypes.objectOf(PropTypes.string).isRequired,
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
