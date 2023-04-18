import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CyclexContextProvider } from './contexts/CyclesContext'
import { Router } from './Router'
import { GlobalStyles } from './styles/global'
import { defaultTheme } from './styles/themes/default'

function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <CyclexContextProvider>
            <Router />
          </CyclexContextProvider>
        </BrowserRouter>

        <GlobalStyles />
      </ThemeProvider>
    </>
  )
}

export default App
