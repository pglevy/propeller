import KitchenSink from "./KitchenSink"
import { Toaster } from "sonner"
import { ThemeProvider } from "./components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <KitchenSink />
      <Toaster />
    </ThemeProvider>
  )
}

export default App
