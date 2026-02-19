import { Button } from '@kaimosi/ui';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-6xl font-bold text-balance">
          Kaimosi Admin
        </h1>
        <p className="text-xl text-muted-foreground text-pretty">
          Unified management dashboard for all Kaimosi applications
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard">Open Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/settings">Settings</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
