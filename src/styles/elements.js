import styled from 'styled-components'

import { BLACK, DARK_TURQUOISE, TURQUOISE } from 'src/styles/colors.js'

export const A = styled.a`
  color: ${TURQUOISE};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const H2 = styled.h2`
  margin: 0 0 16px;
  color: ${BLACK};
  font-size: 20px;
  line-height: 24px;
`

export const H3 = styled.h3`
  margin: 32px 0 8px;
  color: ${DARK_TURQUOISE};
  font-size: 16px;
  line-height: 24px;
`

export const Label = styled.label`
  display: inline-block;
  margin: 8px 16px 8px 0;
  font-size: 14px;
`

export const P = styled.p`
  font-size: 16px;
  color: ${BLACK};
`
