/*import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const forceStylesReload = () => {
  const styleSheets = Array.from(document.styleSheets)

  styleSheets.forEach((sheet) => {
    if (sheet.href) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = sheet.href + '?reload=' + Date.now()
      document.head.appendChild(link)

      setTimeout(() => {
        if (document.head.contains(link)) {
          document.head.removeChild(link)
        }
      }, 100)
    }
  })
}

window.addEventListener('popstate', forceStylesReload)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)*/
