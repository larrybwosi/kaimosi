import { Button } from '@kaimosi/ui';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-6xl font-bold text-balance">
          Welcome to Kaimosi
        </h1>
        <p className="text-xl text-muted-foreground text-pretty">
          Discover the beauty, culture, and opportunities of Western Kenya
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/attractions">Explore Attractions</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
