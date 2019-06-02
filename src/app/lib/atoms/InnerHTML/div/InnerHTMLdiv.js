import * as R from 'ramda'
import React from 'react';

function InnerHTMLdiv(props) {
  const render = props.render || R.identity
  const content = props.html || props.children.join

  return (
    <div
      className={props.className}
      dangerouslySetInnerHTML={{ __html: render(content) }}
      style={props.style}
    />
  )
}

export default InnerHTMLdiv;