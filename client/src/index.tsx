import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { setupStore } from './store/store'
import App from './App'

const store = setupStore()

const queryClient = new QueryClient()

const script = document.createElement('script')
script.src = 'https://kit.fontawesome.com/41f14c9e5f.js'
script.crossOrigin = 'anonymous'
document.head.appendChild(script)

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
