import React from 'react';
import InnerHTMLbutton from './button/InnerHTMLbutton';
import InnerHTMLdiv from './div/InnerHTMLdiv';
import InnerHTMLp from './p/InnerHTMLp';
import InnerHTMLspan from './span/InnerHTMLspan';
import InnerHTMLlabel from './label/InnerHTMLlabel';

function InnerHTML(props) {
  const content = props.html || props.children

  if (props.button) {
    return <InnerHTMLbutton {...props} html={content} className={props.className} />
  } else if (props.div) {
    return <InnerHTMLdiv html={content} className={props.className} />
  } else if (props.p) {
    return <InnerHTMLp html={content} className={props.className} style={props.style} />
  } else if (props.span) {
    return <InnerHTMLspan html={content} className={props.className} />
  } else {
    return null
  }
}

InnerHTML.button = InnerHTMLbutton
InnerHTML.div = InnerHTMLdiv
InnerHTML.label = InnerHTMLlabel
InnerHTML.p = InnerHTMLp
InnerHTML.span = InnerHTMLspan

export default InnerHTML;