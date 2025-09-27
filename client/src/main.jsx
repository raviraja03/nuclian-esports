import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import store from './globalState/store.js'
import {Toaster} from "react-hot-toast"
import { TOAST_DESIGN_SUCCESS,TOAST_DESIGN_ERROR } from './constant.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="top-right" toastOptions={{ duration: 3000, success: { style: TOAST_DESIGN_SUCCESS.style, iconTheme: TOAST_DESIGN_SUCCESS.iconTheme }, error: { style: TOAST_DESIGN_ERROR.style, iconTheme: TOAST_DESIGN_ERROR.iconTheme } }} />
    <App />
    </Provider>
  </StrictMode>,
)