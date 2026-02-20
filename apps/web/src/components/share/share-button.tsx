"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface ShareButtonProps {
  type: "product" | "attraction" | "restaurant" | "event" | "hostel"
  slug?: string
  title: string
  description?: string
  image?: string
  size?: "sm" | "md" | "lg"
}

export function ShareButton({ type, slug, title, description, image, size = "sm" }: ShareButtonProps) {
  const router = useRouter()
  const { toast } = useToast()

  const handleShare = async () => {
    try {
      // Build the share URL with deep link
      const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
      const deepLink = slug ? `${baseUrl}/${type}s/${slug}` : baseUrl
      
      const params = new URLSearchParams({
        type,
        title,
        ...(description && { description }),
        ...(image && { image }),
        deepLink,
      })

      // If Web Share API is available, use it
      if (navigator.share) {
        await navigator.share({
          title,
          text: description || title,
          url: deepLink,
        })
        toast({
          title: "Shared successfully",
          description: "Content shared!",
        })
      } else {
        // Fallback to our share card builder
        router.push(`/share?${params.toString()}`)
        toast({
          title: "Opening share builder",
          description: "Customize and share your card",
        })
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Share error:", error)
        toast({
          title: "Failed to share",
          description: "Please try again",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <Button 
      variant="outline" 
      size="default" 
      onClick={handleShare} 
      className="gap-2 bg-transparent hover:bg-secondary"
    >
      <Share2 className="h-4 w-4" />
      Share
    </Button>
  )
}
