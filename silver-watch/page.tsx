import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, CheckCircle, Menu, Star } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold">Brand</span>
            <nav className="hidden md:flex gap-6">
              <a href="#" className="text-sm font-medium hover:text-primary">
                Features
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary">
                Pricing
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary">
                About
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="md:hidden" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container py-24 space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold lg:text-6xl">Build something amazing</h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Create stunning websites and applications with our modern UI components and intuitive design system.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container py-24">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>{feature.description}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="container py-24">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.title}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-1 mb-2">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                  </div>
                  {testimonial.content}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container py-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Company</h3>
            <nav className="grid gap-2">
              <a href="#" className="hover:text-primary">
                About
              </a>
              <a href="#" className="hover:text-primary">
                Careers
              </a>
              <a href="#" className="hover:text-primary">
                Contact
              </a>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Product</h3>
            <nav className="grid gap-2">
              <a href="#" className="hover:text-primary">
                Features
              </a>
              <a href="#" className="hover:text-primary">
                Pricing
              </a>
              <a href="#" className="hover:text-primary">
                Documentation
              </a>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Resources</h3>
            <nav className="grid gap-2">
              <a href="#" className="hover:text-primary">
                Blog
              </a>
              <a href="#" className="hover:text-primary">
                Support
              </a>
              <a href="#" className="hover:text-primary">
                Terms
              </a>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Connect</h3>
            <nav className="grid gap-2">
              <a href="#" className="hover:text-primary">
                Twitter
              </a>
              <a href="#" className="hover:text-primary">
                GitHub
              </a>
              <a href="#" className="hover:text-primary">
                Discord
              </a>
            </nav>
          </div>
        </div>
        <div className="border-t">
          <div className="container py-6 text-center text-sm">© 2024 Your Company. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Modern Design",
    description: "Clean and modern interface built with the latest web technologies.",
  },
  {
    title: "Responsive",
    description: "Fully responsive design that works seamlessly across all devices.",
  },
  {
    title: "Customizable",
    description: "Easily customize components to match your brand and requirements.",
  },
  {
    title: "Accessible",
    description: "Built with accessibility in mind, following WCAG guidelines.",
  },
  {
    title: "Fast Performance",
    description: "Optimized for speed and performance across all modern browsers.",
  },
  {
    title: "Great Support",
    description: "Comprehensive documentation and dedicated support team.",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Product Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SJ",
    content:
      "This UI kit has transformed how we build our products. The components are incredibly well-designed and easy to use.",
  },
  {
    name: "Michael Chen",
    title: "Frontend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MC",
    content:
      "The attention to detail and code quality is impressive. It's saved us countless hours of development time.",
  },
  {
    name: "Emily Brown",
    title: "UX Researcher",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EB",
    content:
      "The accessibility features are top-notch. It's rare to find a UI kit that prioritizes inclusivity so well.",
  },
]

