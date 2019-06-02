import * as R from 'ramda'
import React from 'react';

function InnerHTMLspan(props) {
  const render = props.render || R.identity
  const content = props.html || props.children

  return (
    <span
      className={props.className}
      dangerouslySetInnerHTML={{ __html: render(content) }}
      style={props.style}
    />
  )
}

export default InnerHTMLspan;