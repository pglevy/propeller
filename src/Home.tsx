import { Link } from "wouter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { ModeToggle } from "./components/shared/mode-toggle"

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Propeller Component Library</h1>
            <p className="text-muted-foreground">
              A collection of React components for building modern applications
            </p>
          </div>
          <ModeToggle />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/chat">
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader>
                <CardTitle>Chat Components</CardTitle>
                <CardDescription>
                  Interactive components for AI chat interfaces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Includes feedback, messages, task progress, agent steps, and confirmation components
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/core">
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader>
                <CardTitle>Core Components</CardTitle>
                <CardDescription>
                  Complete shadcn/ui component showcase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A comprehensive demonstration of all installed shadcn/ui components
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
