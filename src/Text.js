/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';

class Text extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    html: PropTypes.bool.isRequired,
    values: PropTypes.objectOf(PropTypes.string).isRequired,
    tagName: PropTypes.string.isRequired
  };

  static defaultProps = {
    html: false,
    values: {},
    tagName: 'span'
  };

  static contextTypes = {
    l10n: PropTypes.shape({
      formatText: PropTypes.func.isRequired
    }).isRequired
  };

  render() {
    const { id, html, values, tagName: Tag, ...props } = this.props;

    const text = this.context.l10n.formatText(id, values, html);

    if (html) {
      return <Tag {...props} dangerouslySetInnerHTML={{ __html: text }} />;
    }

    return (
      <Tag {...props}>{text}</Tag>
    );
  }
}

export default Text;
