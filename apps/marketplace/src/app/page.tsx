import { Button } from '@kaimosi/ui';
import Link from 'next/link';

export default function MarketplacePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-6xl font-bold text-balance">
          Kaimosi Marketplace
        </h1>
        <p className="text-xl text-muted-foreground text-pretty">
          Discover and purchase authentic local products from Western Kenya
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/products">Browse Products</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/vendors">Become a Vendor</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
