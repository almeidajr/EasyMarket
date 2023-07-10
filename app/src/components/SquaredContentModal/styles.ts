import styled from '@emotion/styled'
import { Modal } from 'antd'

export const SquaredContentModal = styled(Modal)`
  @media (orientation: landscape) {
    height: 100vh;
    width: 100vw;
    max-width: calc(100vh - 110px);
    margin: 0 auto;
    top: 0;
    border-radius: 0;

    .ant-modal-body {
      height: calc(100vh - 110px);
      max-height: 100vw;
    }
    .ant-modal-header {
      border-radius: 0;
    }
    .ant-modal-footer {
      border-radius: 0;
    }
    .ant-modal-content {
      border-radius: 0;
    }
  }
`
