import React from 'react'
import { ConfigProvider } from 'antd'
import { ThemeProvider } from 'styled-components'
import themes from './config/theme/theme.config'

export default function AppProvider({ children }) {
  return (
    <ConfigProvider>
      <ThemeProvider theme={themes.defaultTheme}>{children}</ThemeProvider>
    </ConfigProvider>
  )
}
