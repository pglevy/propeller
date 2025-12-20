import { Route, Switch } from "wouter"
import Home from "./Home"
import ChatDemo from "./ChatDemo"
import CoreComponents from "./CoreComponents"
import { Toaster } from "sonner"
import { ThemeProvider } from "./components/shared/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/chat" component={ChatDemo} />
        <Route path="/core" component={CoreComponents} />
        <Route>404: Not Found</Route>
      </Switch>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
