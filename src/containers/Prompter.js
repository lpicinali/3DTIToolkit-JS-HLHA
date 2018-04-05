import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Markdown from 'react-markdown'
import styled from 'styled-components'
import { darken, transparentize } from 'polished'
import { filter, values } from 'lodash'

import { resolvePrompt } from 'src/actions/prompter.actions.js'
import { PromptStatus } from 'src/constants.js'
import Button from 'src/components/Button.js'
import { BLACK, WHITE_SMOKE } from 'src/styles/colors.js'
import { ModuleBox } from 'src/styles/elements.js'

const PromptsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  background: ${transparentize(0.2, '#000')};
`

const PromptBox = styled(ModuleBox)`
  width: 560px;
  padding-top: 12px;
`

const PromptContent = styled.div``

const PromptActionArea = styled.div`
  margin-top: 24px;
`

const RejectButton = styled(Button)`
  margin-left: 16px;
  background: ${darken(0.02, WHITE_SMOKE)};
  color: ${BLACK};
`

/**
 * Prompter
 */
class Prompter extends PureComponent {
  static propTypes = {
    prompt: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      rejectLabel: PropTypes.string.isRequired,
      resolveLabel: PropTypes.string.isRequired,
      status: PropTypes.oneOf(values(PromptStatus)).isRequired,
    }),
    onAction: PropTypes.func.isRequired,
  }

  static defaultProps = {
    prompt: null,
  }

  render() {
    const { prompt, onAction } = this.props

    if (prompt === null) {
      return null
    }

    return (
      <PromptsContainer>
        <PromptBox>
          <PromptContent>
            <Markdown source={prompt.text} />
          </PromptContent>
          <PromptActionArea>
            <Button onClick={() => onAction(prompt.id, PromptStatus.RESOLVED)}>
              {prompt.resolveLabel}
            </Button>
            <RejectButton
              onClick={() => onAction(prompt.id, PromptStatus.REJECTED)}
            >
              {prompt.rejectLabel}
            </RejectButton>
          </PromptActionArea>
        </PromptBox>
      </PromptsContainer>
    )
  }
}

export default connect(
  state => ({
    prompt:
      filter(
        state.prompter.prompts,
        prompt => prompt.status === PromptStatus.UNRESOLVED
      ).pop() || null,
  }),
  dispatch => ({
    onAction: (id, status) => dispatch(resolvePrompt(id, status)),
  })
)(Prompter)
