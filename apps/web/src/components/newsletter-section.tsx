"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="bg-primary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/10">
            <Mail className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">Stay Connected</h2>
          <p className="mt-4 text-primary-foreground/80">
            Subscribe to our newsletter for the latest news, events, and updates from Maplewood.
          </p>

          {submitted ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-primary-foreground">
              <CheckCircle className="h-5 w-5" />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 flex-1 border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground"
              />
              <Button type="submit" size="lg" variant="secondary" className="h-12 px-8">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
