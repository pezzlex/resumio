import React from "react"
import { ConfigProvider } from "antd"
import { IntlProvider } from "react-intl"
import { ThemeProvider } from "styled-components"
import themes from "@iso/config/theme/theme.config"

export default function AppProvider({ children }) {
  return (
    <ConfigProvider>
      <IntlProvider locale="en-US">
        <ThemeProvider theme={themes.defaultTheme}>{children}</ThemeProvider>
      </IntlProvider>
    </ConfigProvider>
  )
}
