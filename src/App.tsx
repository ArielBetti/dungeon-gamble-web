import { Card } from './components/ui/card'
import { Button } from './components/ui/button'
import { ThemeProvider } from './components/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <Card>
          teste
        </Card>
        <Button>teste</Button>
      </div>
    </ThemeProvider>
  )
}

export default App
