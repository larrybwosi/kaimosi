import type { Metadata } from "next"
import Link from "next/link"
import { SignupForm } from "@/components/auth/signup-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MapPin, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a Maplewood account to submit listings and help grow our community directory.",
}

const benefits = [
  "Submit new restaurants, shops, and attractions",
  "Help visitors discover hidden gems",
  "Contribute to your community",
  "Track your submissions and approvals",
]

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="grid w-full max-w-4xl gap-8 lg:grid-cols-2">
          {/* Benefits Section */}
          <div className="hidden lg:flex lg:flex-col lg:justify-center">
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">Join Our Community</h2>
                <p className="mt-2 text-muted-foreground">
                  Help make Maplewood even better by sharing your favorite local spots.
                </p>
              </div>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm italic text-muted-foreground">
                  &ldquo;Thanks to community submissions, we&apos;ve added over 50 new listings this year!&rdquo;
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">— Maplewood Tourism Board</p>
              </div>
            </div>
          </div>

          {/* Signup Form */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary lg:mx-0">
                <MapPin className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="mt-6 font-serif text-3xl font-bold text-foreground">Create Account</h1>
              <p className="mt-2 text-muted-foreground">Start contributing to Maplewood&apos;s community directory</p>
            </div>

            <SignupForm />

            <div className="text-center text-sm text-muted-foreground lg:text-left">
              <p>
                Already have an account?{" "}
                <Link href="/auth/login" className="font-medium text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
