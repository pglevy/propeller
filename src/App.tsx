import { Route, Switch, Router } from "wouter"
import Home from "./Home"
import ChatDemo from "./ChatDemo"
import CoreComponents from "./CoreComponents"
import { Toaster } from "sonner"
import { ThemeProvider } from "./components/shared/theme-provider"

function App() {
  // Get base path from Vite's import.meta.env.BASE_URL
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router base={base}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/chat" component={ChatDemo} />
          <Route path="/core" component={CoreComponents} />
          <Route>404: Not Found</Route>
        </Switch>
      </Router>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
