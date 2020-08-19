import BoxTitleWrapper from './boxTitle'
import React from 'react'

import { BoxWrapper } from './box.style'

export default (props) => (
  <BoxWrapper
    className={`${props.className ? props.className : ''} isoBoxWrapper`}
    style={props.style}
  >
    <BoxTitleWrapper title={props.title} subtitle={props.subtitle} />
    {props.children}
  </BoxWrapper>
)
