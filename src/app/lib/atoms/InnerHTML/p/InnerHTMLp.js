import * as R from 'ramda'
import React from 'react';

function InnerHTMLp(props) {
  const render = props.render || R.identity
  const content = props.html || props.children
  return (
    <p
      className={props.className}
      dangerouslySetInnerHTML={{ __html: render(content) }}
      style={props.style}
    />
  )
}

export default InnerHTMLp;