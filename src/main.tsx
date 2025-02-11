import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { ConfigProvider } from "antd-mobile";
import enUS from 'antd-mobile/es/locales/en-US'

import { Buffer } from 'buffer';

window.Buffer = Buffer;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={enUS}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
