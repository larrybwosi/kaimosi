import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { PodOrderService } from '@/shared/db/services/pod-order.service'
import { PodCartService } from '@/shared/db/services/pod-cart.service'

/**
 * GET /api/print-on-demand/orders?userId=...&status=...&limit=...&offset=...
 * POST /api/print-on-demand/orders (create order from cart)
 */

const createOrderSchema = z.object({
  userId: z.string().cuid(),
  shippingMethod: z.enum(['standard', 'express', 'overnight']),
  shippingAddress: z.string().min(10, 'Shipping address is too short'),
})

const getOrdersSchema = z.object({
  userId: z.string().cuid(),
  status: z.enum(['PENDING', 'PAID', 'PROCESSING', 'PRODUCTION', 'QUALITY_CHECK', 'SHIPPING', 'DELIVERED', 'CANCELLED', 'REFUNDED']).optional(),
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')

    const params = getOrdersSchema.parse({
      userId,
      status,
      limit,
      offset,
    })

    const { orders, total } = await PodOrderService.getOrdersByUserId(
      params.userId,
      params.status as any,
      params.limit,
      params.offset
    )

    return NextResponse.json(
      {
        orders,
        pagination: {
          total,
          limit: params.limit,
          offset: params.offset,
          hasMore: params.offset + params.limit < total,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Get Orders] Error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request parameters', details: error },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, shippingMethod, shippingAddress } = createOrderSchema.parse(body)

    // Get user's cart
    const cart = await PodCartService.getOrCreateCart(userId)

    if (!cart.items || cart.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Calculate shipping cost based on method
    const shippingCosts: Record<string, number> = {
      standard: 500,
      express: 1000,
      overnight: 2000,
    }

    const shippingCost = shippingCosts[shippingMethod] || 500

    // Create order
    const order = await PodOrderService.createOrder({
      userId,
      cartItems: cart.items.map((item) => ({
        podProductId: item.podProductId,
        podDesignId: item.podDesignId,
        quantity: item.quantity,
        size: item.size || undefined,
        color: item.color || undefined,
        customOptions: item.customOptions,
        price: Number(item.price),
      })),
      shippingMethod,
      shippingAddress,
      shippingCost,
      taxRate: 0.16, // 16% VAT
    })

    // Clear cart after order creation
    await PodCartService.clearCart(userId)

    return NextResponse.json(
      {
        order,
        message: 'Order created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[Create Order] Error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
