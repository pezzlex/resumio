import { Col, Row, Typography, Image } from 'antd'
import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import LayoutContent from '../components/utility/layoutContent'
import LayoutContentWrapper from '../components/utility/layoutWrapper'
import { Header, Title } from './AppLayout.style'

const { Text } = Typography

export const TemplatesData = [
  {
    value: 'BASIC_TEMPLATE',
    name: "Overleaf: Jake's Resume",
  },
]

const Templates = () => {
  const { path } = useRouteMatch()
  console.log('path', path)
  return (
    <LayoutContentWrapper style={{ height: '100vh' }}>
      <LayoutContent>
        <Header>
          <Title>Templates</Title>
        </Header>
        <Row gutter={12}>
          <Col xl={3} lg={3} md={3} span={24}>
            <Image
              width={300}
              src="https://writelatex.s3.amazonaws.com/published_ver/16158.jpeg?X-Amz-Expires=14400&X-Amz-Date=20210123T202753Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWJBOALPNITA4UZ5V/20210123/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=0be41392b34a8fcb4a139e5d1dde43636bbbd1f2d9a3c64638003c74060ba437"
            />
            <Text> Overleaf: Jake's Resume</Text>
          </Col>
        </Row>
      </LayoutContent>
    </LayoutContentWrapper>
  )
}

export default Templates
