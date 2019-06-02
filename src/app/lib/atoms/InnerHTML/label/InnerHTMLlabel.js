import * as R from 'ramda'
import React from 'react';

function InnerHTMLlabel(props) {
  let { children, html, render, ...rest } = props
  render = render ? render : R.identity
  html = html ? html : children

  return (
    <label
      { ...rest }
      className={props.className}
      dangerouslySetInnerHTML={{ __html: render(html) }}
    />
  )
}

export default InnerHTMLlabel;