import * as R from 'ramda'
import React from 'react';

function InnerHTMLbutton(props, ref) {
  let { children, html, render } = props
  render = render ? render : R.identity
  html = html ? html : children

  return (
    <button
      ref={ref}
      className={props.className}
      dangerouslySetInnerHTML={{ __html: render(html) }}
      data-toggle={props["data-toggle"]}
      disabled={props.disabled}
      onClick={props.onClick}
      style={props.style}
    />
  )
}

// eslint-disable-next-line no-func-assign
InnerHTMLbutton = React.forwardRef(InnerHTMLbutton)

export default InnerHTMLbutton;