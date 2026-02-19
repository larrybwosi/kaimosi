import { Button } from '@kaimosi/ui';
import Link from 'next/link';

export default function PropertiesPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-6xl font-bold text-balance">
          Kaimosi Properties
        </h1>
        <p className="text-xl text-muted-foreground text-pretty">
          Find apartments, houses, and land for sale or rent in Western Kenya
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/listings">View Listings</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/list-property">List Your Property</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
