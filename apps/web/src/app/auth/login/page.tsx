import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Maplewood account to submit listings and manage your contributions.",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <MapPin className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="mt-6 font-serif text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="mt-2 text-muted-foreground">Sign in to contribute to Maplewood&apos;s community directory</p>
          </div>

          <LoginForm />

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="font-medium text-primary hover:underline">
                Create one
              </Link>
            </p>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm">
            <p className="font-medium text-amber-800">Demo Mode</p>
            <p className="mt-1 text-amber-700">
              Try signing in with <strong>admin@maplewood.town</strong> or <strong>user@example.com</strong> (any
              password works)
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
