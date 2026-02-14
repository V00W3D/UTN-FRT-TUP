import { CssBaseline, createTheme, ThemeProvider } from '@mui/material'
import Home from './pages/Home'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' }
  },
  typography: {
    fontFamily: 'Inter, system-ui, Arial, sans-serif'
  }
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  )
}
