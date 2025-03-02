import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Activity,
  Shield,
  Clock,
  Users,
  Heart,
  AlertTriangle,
  Wifi,
  CheckCircle,
  BarChart3,
  BellRing,
} from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-background ">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3">
        <div className="container flex h-16 items-center justify-between">
          <span className="text-xl font-bold">Silver Watch</span>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="p-3">
        {/* Hero Section */}
        <section className="container py-24 space-y-8 text-center m-auto">
          <div className="space-y-4 max-w-[800px] mx-auto">
            <h1 className="text-4xl font-bold lg:text-6xl">Advanced Healthcare Monitoring for Peace of Mind</h1>
            <p className="mx-auto text-gray-500 md:text-xl dark:text-gray-400">
              Real-time health monitoring system designed for vulnerable individuals and their caregivers.
              Professional-grade technology meets intuitive design for comprehensive healthcare management.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/register">Start Monitoring</Link>
            </Button>
            <Button variant="outline" size="lg">
              Book a Demo
            </Button>
          </div>
          <div className="pt-8 flex justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              HIPAA Compliant
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              24/7 Support
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Real-time Alerts
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-24 space-y-16 m-auto">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Comprehensive Monitoring Solutions</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Our platform provides end-to-end health monitoring capabilities with advanced features for all users
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-background">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>{feature.description}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y bg-muted/50">
          <div className="container py-24 space-y-8 m-auto">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Trusted by Healthcare Providers</h2>
              <p className="text-muted-foreground">Making a difference in healthcare monitoring</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center space-y-2">
                    <div className="text-4xl font-bold">{stat.value}</div>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container py-24 space-y-16 m-auto">
          <div className="text-center space-y-4 ">
            <h2 className="text-3xl font-bold">Why Choose Silver Watch?</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Our platform offers unique advantages for healthcare monitoring
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <div className="p-2 h-fit rounded-lg bg-primary/10">{benefit.icon}</div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="border-t bg-muted/50 ">
          <div className="container py-24 space-y-8 m-auto">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
              <p className="text-muted-foreground">Choose the plan that fits your needs</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={plan.featured ? "border-primary" : ""}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">Ksh {plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.featured ? "default" : "outline"}>
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container py-24 space-y-8 m-auto">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Trusted by Healthcare Professionals</h2>
            <p className="text-muted-foreground">See what our users have to say</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6 space-y-4">
                  <p className="italic text-muted-foreground">{testimonial.content}</p>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t ">
        <div className="container py-16 px-4 m-auto">
          <div className="grid gap-4  md:grid-cols-4 lg:grid-cols-4 grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Company</h3>
              <nav className="grid gap-2">
                <Link href="#" className="hover:text-primary">
                  About Us
                </Link>
                <Link href="#" className="hover:text-primary">
                  Our Team
                </Link>
                <Link href="#" className="hover:text-primary">
                  Careers
                </Link>
                <Link href="#" className="hover:text-primary">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Product</h3>
              <nav className="grid gap-2">
                <Link href="#" className="hover:text-primary">
                  Features
                </Link>
                <Link href="#" className="hover:text-primary">
                  Security
                </Link>
                <Link href="#" className="hover:text-primary">
                  Technology
                </Link>
                <Link href="#" className="hover:text-primary">
                  Compliance
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Resources</h3>
              <nav className="grid gap-2">
                <Link href="#" className="hover:text-primary">
                  Blog
                </Link>
                <Link href="#" className="hover:text-primary">
                  Case Studies
                </Link>
                <Link href="#" className="hover:text-primary">
                  Documentation
                </Link>
                <Link href="#" className="hover:text-primary">
                  Help Center
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Legal</h3>
              <nav className="grid gap-2">
                <Link href="#" className="hover:text-primary">
                  Privacy
                </Link>
                <Link href="#" className="hover:text-primary">
                  Terms
                </Link>
                <Link href="#" className="hover:text-primary">
                  Security
                </Link>
                <Link href="#" className="hover:text-primary">
                  HIPAA
                </Link>
              </nav>
            </div>
          </div>
          <div className="border-t mt-16 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Silver Watch. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Real-time Monitoring",
    description: "Track vital signs and health metrics in real-time with instant notifications for any anomalies.",
    icon: <Activity className="h-5 w-5 text-primary" />,
  },
  {
    title: "Smart Alerts",
    description: "AI-powered alert system detects and notifies caregivers of potential health risks immediately.",
    icon: <AlertTriangle className="h-5 w-5 text-primary" />,
  },
  {
    title: "Patient Management",
    description: "Comprehensive patient profiles with medical history, medications, and care plans.",
    icon: <Users className="h-5 w-5 text-primary" />,
  },
  {
    title: "Secure Platform",
    description: "HIPAA-compliant security measures protect sensitive health data and communications.",
    icon: <Shield className="h-5 w-5 text-primary" />,
  },
  {
    title: "Device Integration",
    description: "Seamless integration with various medical devices and wearable technology.",
    icon: <Wifi className="h-5 w-5 text-primary" />,
  },
  {
    title: "Analytics Dashboard",
    description: "Detailed insights and trends analysis for better healthcare decision making.",
    icon: <BarChart3 className="h-5 w-5 text-primary" />,
  },
]

const stats = [
  {
    value: "50K+",
    label: "Active Users",
  },
  {
    value: "100+",
    label: "Healthcare Providers",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "24/7",
    label: "Support",
  },
]

const benefits = [
  {
    title: "Early Detection",
    description:
      "Our AI-powered system helps identify potential health issues before they become critical, enabling proactive care.",
    icon: <Heart className="h-5 w-5 text-primary" />,
  },
  {
    title: "Time Efficiency",
    description:
      "Automate routine monitoring tasks and streamline communication between caregivers and healthcare providers.",
    icon: <Clock className="h-5 w-5 text-primary" />,
  },
  {
    title: "Enhanced Care Quality",
    description: "Provide better care with comprehensive health data and real-time monitoring capabilities.",
    icon: <Shield className="h-5 w-5 text-primary" />,
  },
  {
    title: "Instant Notifications",
    description: "Receive immediate alerts for critical events and important updates about patient health status.",
    icon: <BellRing className="h-5 w-5 text-primary" />,
  },
]

const pricingPlans = [
  {
    name: "Basic",
    description: "For individual caregivers",
    price: 2900,
    features: ["Up to 5 patients", "Real-time monitoring", "Basic alerts", "Mobile app access", "Email support"],
    featured: false,
  },
  {
    name: "Professional",
    description: "For healthcare facilities",
    price: 9900,
    features: ["Up to 50 patients", "Advanced analytics", "Custom alerts", "API access", "24/7 priority support"],
    featured: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: 29900,
    features: [
      "Unlimited patients",
      "Custom integration",
      "Advanced security",
      "Dedicated support",
      "Training included",
    ],
    featured: false,
  },
]

const testimonials = [
  {
    content:
      "This platform has revolutionized how we monitor our patients. The real-time alerts have helped us prevent several critical situations.",
    name: "Dr. Sarah Johnson",
    role: "Chief of Nursing, City Hospital",
  },
  {
    content:
      "The ease of use and comprehensive monitoring capabilities have made our caregivers more efficient and our patients safer.",
    name: "Michael Chen",
    role: "Healthcare Administrator",
  },
  {
    content:
      "As a family caregiver, this system gives me peace of mind knowing I'll be alerted immediately if something needs attention.",
    name: "Emily Rodriguez",
    role: "Family Caregiver",
  },
]

