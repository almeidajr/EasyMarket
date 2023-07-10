import styled from '@emotion/styled'
import { Typography } from 'antd'

const { Text } = Typography

export const Container = styled.div`
  height: 100vh;
`
export const Version = styled(Text)`
  display: block;
  width: 100%;
  color: #fff;
  margin: 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;

  code {
    display: block;
    width: 100%;
    border-radius: 0;
    margin: 0;
    padding: 0.5rem 0;
    text-align: center;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
  }
`
