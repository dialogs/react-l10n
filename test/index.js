/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect } from 'chai';
import { Provider, Text } from '../src/index';

describe('@dlghq/react-l10n', () => {
  const messages = {
    en: { test: 'Test', hello: 'Hello, {name}', send: 'Send' },
    ru: { test: 'Тест', hello: '<b>Привет</b>, {name}' }
  };
  const childMessages = {
    en: { child: 'Nice to meet you' },
    ru: { child: 'Приятно познакомиться' }
  };

  it('should translate text', () => {
    const html = renderToStaticMarkup(
      <Provider messages={messages} locale="en">
        <Text id="test" />
      </Provider>
    );

    expect(html).equal('<span>Test</span>');
  });

  it('should translate text', () => {
    const html = renderToStaticMarkup(
      <Provider messages={messages} locale="en">
        <Text id="test" />
      </Provider>
    );

    expect(html).equal('<span>Test</span>');
  });

  it('should translate text with values', () => {
    const html = renderToStaticMarkup(
      <Provider messages={messages} locale="en">
        <Text id="hello" values={{ name: 'nkt' }} />
      </Provider>
    );

    expect(html).equal('<span>Hello, nkt</span>');
  });

  it('should change HTML tag & className & for', () => {
    const html = renderToStaticMarkup(
      <Provider messages={messages} locale="en">
        <Text id="test" className="label" tagName="label" htmlFor="input" />
      </Provider>
    );

    expect(html).equal('<label class="label" for="input">Test</label>');
  });

  it('should translate to Russian', () => {
    const html = renderToStaticMarkup(
      <Provider messages={messages} locale="ru">
        <Text id="test" />
      </Provider>
    );

    expect(html).equal('<span>Тест</span>');
  });

  it('should fallback to defaultLocale', () => {
    const html = renderToStaticMarkup(
      <Provider messages={messages} locale="ru">
        <Text id="send" />
      </Provider>
    );

    expect(html).equal('<span>Send</span>');
  });

  it('should fallback to passed id', () => {
    const html = renderToStaticMarkup(
      <Provider messages={messages} locale="en">
        <Text id="unexpected_id" />
      </Provider>
    );

    expect(html).equal('<span>unexpected_id</span>');
  });

  it('should escape html', () => {
    const html = renderToStaticMarkup(
      <Provider messages={messages} locale="ru">
        <Text id="hello" values={{ name: 'nkt' }} />
      </Provider>
    );

    expect(html).equal('<span>&lt;b&gt;Привет&lt;/b&gt;, nkt</span>');
  });

  it('should not escape html if flag provided', () => {
    const html = renderToStaticMarkup(
      <Provider messages={messages} locale="ru">
        <Text id="hello" values={{ name: 'nkt' }} html />
      </Provider>
    );

    expect(html).equal('<span><b>Привет</b>, nkt</span>');
  });

  it('should not escape values', () => {
    const html = renderToStaticMarkup(
      <Provider messages={messages} locale="ru">
        <Text id="hello" values={{ name: '<b>nkt</b>' }} html />
      </Provider>
    );

    expect(html).equal('<span><b>Привет</b>, &lt;b&gt;nkt&lt;/b&gt;</span>');
  });

  it('should use global values', () => {
    const html = renderToStaticMarkup(
      <Provider locale="en" messages={messages} globalValues={{ name: 'dialog' }}>
        <Text id="hello" />
      </Provider>
    );

    expect(html).equal('<span>Hello, dialog</span>');
  });

  it('should use local value instead of global', () => {
    const html = renderToStaticMarkup(
      <Provider locale="en" messages={messages} globalValues={{ name: 'dialog' }}>
        <Text id="hello" values={{ name: 'world' }} />
      </Provider>
    );

    expect(html).equal('<span>Hello, world</span>');
  });

  it('should render messages from child provider', () => {
    const html = renderToStaticMarkup(
      <Provider locale="en" messages={messages}>
        <Provider locale="en" messages={childMessages}>
          <Text id="child" />
        </Provider>
      </Provider>
    );

    expect(html).equal('<span>Nice to meet you</span>');
  });

  it('should render messages from parent provider inside child provider', () => {
    const html = renderToStaticMarkup(
      <Provider locale="ru" messages={messages}>
        <Provider locale="ru" messages={childMessages}>
          <Text id="hello" values={{ name: 'мир' }} />
        </Provider>
      </Provider>
    );

    expect(html).equal('<span>&lt;b&gt;Привет&lt;/b&gt;, мир</span>');
  });

  it('should use global value inside child provider', () => {
    const html = renderToStaticMarkup(
      <Provider locale="ru" messages={messages} globalValues={{ name: 'dialog' }}>
        <Provider locale="ru" messages={childMessages}>
          <Text id="hello" />
        </Provider>
      </Provider>
    );

    expect(html).equal('<span>&lt;b&gt;Привет&lt;/b&gt;, dialog</span>');
  });
});
