import styled from 'styled-components'

import {
  BLACK,
  DARK_GRAY,
  DARK_TURQUOISE,
  TURQUOISE,
  WHITE_SMOKE,
} from 'src/styles/colors.js'

export const A = styled.a`
  color: ${TURQUOISE};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const H2 = styled.h2`
  margin: 0 0 8px;
  color: ${BLACK};
  font-size: 20px;
  line-height: 24px;
`

export const H3 = styled.h3`
  margin: 24px 0 8px;
  color: ${DARK_TURQUOISE};
  font-size: 16px;
  line-height: 24px;
`

export const Label = styled.label`
  display: inline-block;
  margin: 8px 16px 8px 0;
  color: ${DARK_GRAY};
  font-size: 14px;
`

export const ModuleBox = styled.div`
  padding: 16px 24px 24px;
  background: ${WHITE_SMOKE};
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`

export const P = styled.p`
  font-size: 16px;
  color: ${BLACK};
`
