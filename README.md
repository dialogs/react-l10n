# React localization

Localization for React components

## Installation

```
npm install --save react
npm install --save @dlghq/react-l10n
```

## Usage

```js
import React from 'react';
import { render } from 'react-dom';
import { Provider, Text } from '@dlghq/react-l10n';

const messages = {
  'en-US': { hello: 'Hello' },
  'ru-RU': { hello: 'Привет' },
};

function Application() {
  return (
    <Provider messages={messages} locale={navigator.language}>
      <Text id="hello" className="text" tagName="p" />
    </Provider>
  );
}

const container = document.getElementById('container');

render(<Application />, container);
```

[More examples in tests](test/index.js)

## License

[Apache-2.0](LICENSE)
