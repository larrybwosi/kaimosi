"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ShareCardPreview } from "./share-card-preview"
import { ContentSelector } from "./content-selector"
import { TemplateSelector } from "./template-selector"
import { ColorCustomizer } from "./color-customizer"
import { Share2, Download, Copy, Check } from "lucide-react"
import type { ShareCard } from "@/lib/share-card"
import { generateWhatsAppShareUrl, generateDeepLink } from "@/lib/share-card"
import { useToast } from "@/hooks/use-toast"

export function ShareCardBuilder() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  
  // Get initial values from URL parameters if provided
  const initialType = (searchParams.get("type") as any) || "custom"
  const initialTitle = searchParams.get("title") || "Welcome to Maplewood"
  const initialDescription = searchParams.get("description") || "Discover the charm of our beautiful town"
  const initialImage = searchParams.get("image") || ""
  const initialDeepLink = searchParams.get("deepLink") || ""

  const [card, setCard] = useState<ShareCard>({
    id: Math.random().toString(36).substr(2, 9),
    type: initialType,
    title: initialTitle,
    description: initialDescription,
    image: initialImage,
    deepLink: initialDeepLink,
    backgroundColor: "#2d5f3f",
    textColor: "#ffffff",
    accentColor: "#f9f6f1",
  })

  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<"content" | "template" | "customize">("content")

  useEffect(() => {
    // Update deep link when type or title changes
    const slug = card.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    setCard((prev) => ({ ...prev, deepLink: generateDeepLink(prev.type, slug) }))
  }, [card.type, card.title])

  const handleShare = () => {
    const whatsappUrl = generateWhatsAppShareUrl(card)
    window.open(whatsappUrl, "_blank")

    toast({
      title: "Opening WhatsApp",
      description: "Your card is ready to share!",
    })
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(card.deepLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)

      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  const handleDownload = async () => {
    // This would trigger the card image download
    toast({
      title: "Downloading card",
      description: "Your card image is being generated...",
    })
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Editor Section */}
      <div className="space-y-6">
        {/* Tab Navigation */}
        <Card className="p-1">
          <div className="grid grid-cols-3 gap-1">
            <Button
              variant={activeTab === "content" ? "default" : "ghost"}
              onClick={() => setActiveTab("content")}
              className="text-sm"
            >
              Content
            </Button>
            <Button
              variant={activeTab === "template" ? "default" : "ghost"}
              onClick={() => setActiveTab("template")}
              className="text-sm"
            >
              Template
            </Button>
            <Button
              variant={activeTab === "customize" ? "default" : "ghost"}
              onClick={() => setActiveTab("customize")}
              className="text-sm"
            >
              Customize
            </Button>
          </div>
        </Card>

        {/* Content Tab */}
        {activeTab === "content" && (
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Content</h3>
              <ContentSelector
                selectedType={card.type}
                onSelect={(type, item) => {
                  setCard((prev) => ({
                    ...prev,
                    type,
                    title: item.title,
                    description: item.description,
                    image: item.image,
                  }))
                }}
              />
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={card.title}
                  onChange={(e) => setCard((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter card title"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={card.description}
                  onChange={(e) => setCard((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter card description"
                  rows={4}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="image">Image URL (optional)</Label>
                <Input
                  id="image"
                  value={card.image || ""}
                  onChange={(e) => setCard((prev) => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1.5"
                />
              </div>
            </div>
          </Card>
        )}

        {/* Template Tab */}
        {activeTab === "template" && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Choose Template</h3>
            <TemplateSelector
              onSelect={(template) => {
                setCard((prev) => ({
                  ...prev,
                  type: template.type,
                  backgroundColor: template.backgroundColor,
                  textColor: template.textColor,
                  accentColor: template.accentColor,
                }))
              }}
              selectedType={card.type}
            />
          </Card>
        )}

        {/* Customize Tab */}
        {activeTab === "customize" && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Customize Colors</h3>
            <ColorCustomizer
              backgroundColor={card.backgroundColor || "#2d5f3f"}
              textColor={card.textColor || "#ffffff"}
              accentColor={card.accentColor || "#f9f6f1"}
              onChange={(colors) => setCard((prev) => ({ ...prev, ...colors }))}
            />
          </Card>
        )}

        {/* Deep Link Display */}
        <Card className="p-4">
          <Label className="text-sm font-medium mb-2 block">Deep Link</Label>
          <div className="flex gap-2">
            <Input value={card.deepLink} readOnly className="font-mono text-sm" />
            <Button variant="outline" size="icon" onClick={handleCopyLink}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </Card>
      </div>

      {/* Preview Section */}
      <div className="space-y-6">
        <Card className="p-6 sticky top-4">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          <ShareCardPreview card={card} />

          <div className="mt-6 space-y-3">
            <Button onClick={handleShare} className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white" size="lg">
              <Share2 className="h-5 w-5 mr-2" />
              Share on WhatsApp
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={handleCopyLink} className="w-full bg-transparent">
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
              <Button variant="outline" onClick={handleDownload} className="w-full bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
