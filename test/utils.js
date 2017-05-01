/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import { expect } from 'chai';
import { formatMessage } from '../src/utils';

describe('utils', () => {
  describe('formatMessage', () => {
    it('should format message', () => {
      const cases = [
        {
          message: 'Hello, {name}!',
          values: { name: 'test' },
          result: 'Hello, test!'
        },
        {
          message: 'Hello, {name} and {name}!',
          values: { name: 'test' },
          result: 'Hello, test and test!'
        }
      ];

      cases.forEach(({ message, values, result }) => {
        expect(formatMessage(message, values)).equal(result);
      });
    });
  });
});
