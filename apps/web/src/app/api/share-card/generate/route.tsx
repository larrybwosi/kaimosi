import { type NextRequest, NextResponse } from "next/server"
import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get("title") || "Maplewood"
    const description = searchParams.get("description") || "Discover our town"
    const backgroundColor = searchParams.get("bg") || "#2d5f3f"
    const textColor = searchParams.get("text") || "#ffffff"
    const accentColor = searchParams.get("accent") || "#f9f6f1"

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px",
            backgroundColor,
            color: textColor,
          }}
        >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              marginBottom: "30px",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "36px",
              opacity: 0.9,
              marginBottom: "50px",
            }}
          >
            {description}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "20px 40px",
              backgroundColor: accentColor,
              color: backgroundColor,
              borderRadius: "50px",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            <span>Tap to explore</span>
            <span>→</span>
          </div>
        </div>
      </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
