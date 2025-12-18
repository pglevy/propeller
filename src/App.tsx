import ChatDemo from "./ChatDemo"
import { Toaster } from "sonner"
import { ThemeProvider } from "./components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ChatDemo />
      <Toaster />
    </ThemeProvider>
  )
}

export default App
