import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./components/ui/alert-dialog"
import { AspectRatio } from "./components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Badge } from "./components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./components/ui/breadcrumb"
import { Button } from "./components/ui/button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./components/ui/button-group"
import { Calendar } from "./components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./components/ui/carousel"
import { Checkbox } from "./components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./components/ui/collapsible"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./components/ui/command"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./components/ui/context-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./components/ui/drawer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./components/ui/empty"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "./components/ui/field"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./components/ui/hover-card"
import { Input } from "./components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./components/ui/input-otp"
import { Kbd, KbdGroup } from "./components/ui/kbd"
import { Label } from "./components/ui/label"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./components/ui/menubar"
import { NativeSelect, NativeSelectOption } from "./components/ui/native-select"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./components/ui/navigation-menu"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover"
import { Progress } from "./components/ui/progress"
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"
// import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable"
import { ScrollArea } from "./components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Separator } from "./components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./components/ui/sheet"
import { Skeleton } from "./components/ui/skeleton"
import { Slider } from "./components/ui/slider"
import { Spinner } from "./components/ui/spinner"
import { Switch } from "./components/ui/switch"
import { Item, ItemContent, ItemMedia, ItemTitle } from "./components/ui/item"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Textarea } from "./components/ui/textarea"
import { Toggle } from "./components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip"
import { Link } from "wouter"
import { toast } from "sonner"
import { Terminal, ChevronRight, Check, ChevronsUpDown, Search, FileQuestion } from "lucide-react"
import { ModeToggle } from "./components/shared/mode-toggle"

export default function CoreComponents() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [progress, setProgress] = useState(60)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)

  const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ]

  return (
    <div className="container mx-auto p-8 space-y-12">
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back to Home
      </Link>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Core Components</h1>
          <p className="text-muted-foreground">A comprehensive showcase of all shadcn/ui components</p>
        </div>
        <ModeToggle />
      </div>

      <Separator />

      {/* Accordion */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Accordion</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other components aesthetic.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Alert & Alert Dialog */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Alert & Alert Dialog</h2>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Open Alert Dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      {/* Aspect Ratio */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Aspect Ratio</h2>
        <div className="w-112.5">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <img
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="Photo"
              className="rounded-md object-cover w-full h-full"
            />
          </AspectRatio>
        </div>
      </section>

      {/* Avatar */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Avatar</h2>
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </section>

      {/* Badge */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Badge</h2>
        <div className="flex gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Breadcrumb</h2>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Button */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Button</h2>
        <div className="flex gap-2 flex-wrap">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Button Group */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Button Group</h2>
        <ButtonGroup aria-label="Button group">
          <Button variant="outline">Button 1</Button>
          <Button variant="outline">Button 2</Button>
          <Button variant="outline">Button 3</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Navigation button group">
          <Button size="sm" variant="outline">
            <ChevronRight className="h-4 w-4 rotate-180" />
          </Button>
          <Button size="sm" variant="outline">1</Button>
          <Button size="sm" variant="outline">2</Button>
          <Button size="sm" variant="outline">3</Button>
          <Button size="sm" variant="outline">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Button group with separator">
          <Button variant="outline">Button 1</Button>
          <ButtonGroupSeparator />
          <Button variant="outline">Button 2</Button>
          <ButtonGroupSeparator />
          <Button variant="outline">Button 3</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Button group with text">
          <Button variant="outline">Action</Button>
          <ButtonGroupText>Status: Active</ButtonGroupText>
        </ButtonGroup>
      </section>

      {/* Calendar */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Calendar</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </section>

      {/* Card */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Card</h2>
        <Card className="w-87.5">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name of your project" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </section>

      {/* Carousel */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Carousel</h2>
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Checkbox */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Checkbox</h2>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
      </section>

      {/* Collapsible */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Collapsible</h2>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="outline">Toggle Collapsible</Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              @radix-ui/colors
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              @radix-ui/primitives
            </div>
          </CollapsibleContent>
        </Collapsible>
      </section>

      {/* Combobox */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Combobox</h2>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-50 justify-between"
            >
              {value
                ? frameworks.find((framework) => framework.value === value)?.label
                : "Select framework..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-50 p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          value === framework.value ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </section>

      {/* Command */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Command</h2>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </section>

      {/* Context Menu */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Context Menu</h2>
        <ContextMenu>
          <ContextMenuTrigger className="flex h-37.5 w-75 items-center justify-center rounded-md border border-dashed text-sm">
            Right click here
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Profile</ContextMenuItem>
            <ContextMenuItem>Billing</ContextMenuItem>
            <ContextMenuItem>Settings</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </section>

      {/* Dialog */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Dialog</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </section>

      {/* Drawer */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Drawer</h2>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </section>

      {/* Dropdown Menu */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Dropdown Menu</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* Empty State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Empty State</h2>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileQuestion />
            </EmptyMedia>
            <EmptyTitle>No results found</EmptyTitle>
            <EmptyDescription>
              We couldn't find any items matching your search criteria.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
          <Button variant="outline">Clear filters</Button>
          </EmptyContent>
        </Empty>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="default">
              <Search className="h-12 w-12 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle>Start searching</EmptyTitle>
            <EmptyDescription>
              Enter a search term to find what you're looking for.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </section>

      {/* Field */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Field</h2>
        <FieldSet>
          <FieldLegend>Profile</FieldLegend>
          <FieldDescription>Update your profile information.</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
              <FieldDescription>This appears on invoices and emails.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" autoComplete="off" aria-invalid />
              <FieldError>Choose another username.</FieldError>
            </Field>
            <Field orientation="horizontal">
              <Switch id="newsletter" />
              <FieldLabel htmlFor="newsletter">Subscribe to the newsletter</FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </section>

      {/* Hover Card */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Hover Card</h2>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@shadcn</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@shadcn</h4>
                <p className="text-sm">
                  The React framework created and maintained by @vercel.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </section>

      {/* Input & Input OTP */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Input & Input OTP</h2>
        <Input type="email" placeholder="Email" className="max-w-sm" />
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </section>

      {/* Input Group */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Input Group</h2>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="email" placeholder="Email" />
          <Button type="submit">Subscribe</Button>
        </div>
        <div className="flex w-full max-w-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm text-muted-foreground">
            https://
          </span>
          <Input type="text" placeholder="example.com" className="rounded-l-none" />
        </div>
        <div className="flex w-full max-w-sm">
          <Input type="text" placeholder="Search" className="rounded-r-none" />
          <Button variant="secondary" className="rounded-l-none border-l-0">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Kbd */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Kbd (Keyboard Shortcuts)</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Press</span>
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
            <span className="text-sm">to open the command palette</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Press</span>
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <span>+</span>
              <Kbd>C</Kbd>
            </KbdGroup>
            <span className="text-sm">to copy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Modifier keys:</span>
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>⇧</Kbd>
              <Kbd>⌥</Kbd>
              <Kbd>⌃</Kbd>
            </KbdGroup>
          </div>
        </div>
      </section>

      {/* Label */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Label</h2>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Email" />
        </div>
      </section>

      {/* Menubar */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Menubar</h2>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Tab</MenubarItem>
              <MenubarItem>New Window</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Undo</MenubarItem>
              <MenubarItem>Redo</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </section>

      {/* Native Select */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Native Select</h2>
        <div className="space-y-2 max-w-sm">
          <Label htmlFor="native-select">Choose an option</Label>
          <NativeSelect id="native-select">
            <NativeSelectOption value="">Select status</NativeSelectOption>
            <NativeSelectOption value="todo">Todo</NativeSelectOption>
            <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
            <NativeSelectOption value="done">Done</NativeSelectOption>
            <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
          </NativeSelect>
        </div>
        <div className="space-y-2 max-w-sm">
          <Label htmlFor="native-select-sm">Small size</Label>
          <NativeSelect id="native-select-sm" size="sm">
            <NativeSelectOption value="">Select fruit</NativeSelectOption>
            <NativeSelectOption value="apple">Apple</NativeSelectOption>
            <NativeSelectOption value="banana">Banana</NativeSelectOption>
            <NativeSelectOption value="orange">Orange</NativeSelectOption>
          </NativeSelect>
        </div>
      </section>

      {/* Navigation Menu */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Navigation Menu</h2>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink className="block p-4">Introduction</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>

      {/* Pagination */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Pagination</h2>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>

      {/* Popover */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Popover</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </section>

      {/* Progress */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Progress</h2>
        <Progress value={progress} className="w-[60%]" />
        <div className="flex gap-2">
          <Button onClick={() => setProgress(Math.max(0, progress - 10))}>Decrease</Button>
          <Button onClick={() => setProgress(Math.min(100, progress + 10))}>Increase</Button>
        </div>
      </section>

      {/* Radio Group */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Radio Group</h2>
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Option Two</Label>
          </div>
        </RadioGroup>
      </section>

      {/* Resizable - Temporarily commented out due to import issue */}
      {/* <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Resizable</h2>
        <ResizablePanelGroup direction="horizontal" className="max-w-md rounded-lg border">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-[200px] items-center justify-center p-6">
              <span className="font-semibold">One</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-[200px] items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </section> */}

      {/* Scroll Area */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Scroll Area</h2>
        <ScrollArea className="h-50 w-87.5 rounded-md border p-4">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="text-sm">
              Item {i + 1}
            </div>
          ))}
        </ScrollArea>
      </section>

      {/* Select */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Select</h2>
        <Select>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      </section>

      {/* Separator */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Separator</h2>
        <div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
            <p className="text-sm text-muted-foreground">
              An open-source UI component library.
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Blog</div>
            <Separator orientation="vertical" />
            <div>Docs</div>
            <Separator orientation="vertical" />
            <div>Source</div>
          </div>
        </div>
      </section>

      {/* Sheet */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sheet</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </section>

      {/* Skeleton */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Skeleton</h2>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-62.5" />
            <Skeleton className="h-4 w-62.5" />
          </div>
        </div>
      </section>

      {/* Slider */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Slider</h2>
        <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />
      </section>

      {/* Sonner (Toast) */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sonner (Toast)</h2>
        <Button onClick={() => toast("Event has been created")}>Show Toast</Button>
      </section>

      {/* Spinner */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Spinner (Loading States)</h2>
        <div className="flex gap-4 items-center flex-wrap">
          <Spinner />
          <Spinner className="size-6" />
          <Spinner className="size-8" />
          <Button disabled>
            <Spinner className="mr-2" />
            Please wait
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 2000)
            }}
          >
            {loading ? (
              <>
                <Spinner className="mr-2" />
                Loading...
              </>
            ) : (
              "Click to load"
            )}
          </Button>
        </div>
        <div className="flex w-full max-w-xs flex-col gap-4">
          <Item variant="muted">
            <ItemMedia>
              <Spinner />
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="line-clamp-1">Processing payment...</ItemTitle>
            </ItemContent>
            <ItemContent className="flex-none justify-end">
              <span className="text-sm tabular-nums">$100.00</span>
            </ItemContent>
          </Item>
        </div>
      </section>

      {/* Switch */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Switch</h2>
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
      </section>

      {/* Table */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Table</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV002</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>PayPal</TableCell>
              <TableCell className="text-right">$150.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* Tabs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tabs</h2>
        <Tabs defaultValue="account" className="w-100">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here.
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here.
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Textarea */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Textarea</h2>
        <Textarea placeholder="Type your message here." className="max-w-sm" />
      </section>

      {/* Toggle & Toggle Group */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Toggle & Toggle Group</h2>
        <Toggle>Toggle</Toggle>
        <ToggleGroup type="single">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </section>

      {/* Tooltip */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tooltip</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Typography</h2>
        <div className="space-y-4">
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Heading 1
            </h1>
          </div>
          <div>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Heading 2
            </h2>
          </div>
          <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Heading 3
            </h3>
          </div>
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Heading 4
            </h4>
          </div>
          <div>
            <p className="leading-7 not-first:mt-6">
              This is a paragraph with leading text. The king, seeing how much happier his subjects were,
              realized the error of his ways and repealed the joke tax.
            </p>
          </div>
          <div>
            <blockquote className="mt-6 border-l-2 pl-6 italic">
              "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."
            </blockquote>
          </div>
          <div>
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              @radix-ui/react-label
            </code>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Small muted text for captions and descriptions
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold">
              Large semibold text
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
