import { Button } from '@kaimosi/ui';
import Link from 'next/link';

export default function PrintOnDemandPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-6xl font-bold text-balance">
          Kaimosi Print Studio
        </h1>
        <p className="text-xl text-muted-foreground text-pretty">
          Design custom t-shirts, mugs, posters, and more with local themes
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/design">Start Designing</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/gallery">View Gallery</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
