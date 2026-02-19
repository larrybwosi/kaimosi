'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react'
import Link from 'next/link'

function PaymentStatusContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('orderId')
  const [status, setStatus] = useState<'pending' | 'success' | 'failed'>('pending')
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    if (!orderId) {
      router.push('/print-on-demand/orders')
      return
    }

    // Poll for payment status
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/print-on-demand/payments/mpesa/status?orderId=${orderId}`)
        const data = await response.json()

        if (data.paymentStatus === 'COMPLETED') {
          setStatus('success')
          setOrderDetails(data.order)
          clearInterval(pollInterval)
        } else if (data.paymentStatus === 'FAILED') {
          setStatus('failed')
          clearInterval(pollInterval)
        }
      } catch (error) {
        console.error('Failed to check payment status:', error)
      }
    }, 3000)

    // Stop polling after 5 minutes
    const timeout = setTimeout(() => {
      clearInterval(pollInterval)
      if (status === 'pending') {
        setStatus('failed')
      }
    }, 300000)

    return () => {
      clearInterval(pollInterval)
      clearTimeout(timeout)
    }
  }, [orderId, router, status])

  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2">Processing Payment</h1>
          <p className="text-muted-foreground mb-6">
            Please check your phone and enter your M-Pesa PIN to complete the payment
          </p>

          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Waiting for payment confirmation...</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            This page will automatically update once payment is confirmed
          </p>
        </Card>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground mb-6">
            Your order has been confirmed and is being processed
          </p>

          {orderDetails && (
            <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Number</span>
                  <span className="font-medium">{orderDetails.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Paid</span>
                  <span className="font-medium">KES {orderDetails.totalAmount?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Button className="w-full" asChild>
              <Link href={`/print-on-demand/orders/${orderId}`}>View Order Details</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/print-on-demand/products">Continue Shopping</Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
        <p className="text-muted-foreground mb-6">
          Your payment could not be processed. Please try again or contact support if the problem persists.
        </p>

        <div className="space-y-2">
          <Button className="w-full" onClick={() => router.push('/print-on-demand/checkout')}>
            Try Again
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/print-on-demand/orders">View My Orders</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <PaymentStatusContent />
    </Suspense>
  )
}
