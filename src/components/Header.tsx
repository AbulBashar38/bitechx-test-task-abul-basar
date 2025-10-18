'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Plus, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container flex h-20 items-center justify-between">
        <Link
          href="/products"
          className="group flex items-center gap-3 transition-all"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-primary shadow-lg transition-all group-hover:shadow-xl group-hover:scale-105">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gradient">ProductHub</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link href="/products">
            <Button
              variant={pathname === '/products' ? 'default' : 'ghost'}
              size="lg"
              className={`font-semibold transition-all ${
                pathname === '/products'
                  ? 'bg-gradient-to-r from-accent to-primary shadow-md'
                  : 'hover:bg-muted'
              }`}
            >
              <Package className="mr-2 h-5 w-5" />
              Products
            </Button>
          </Link>
          <Link href="/products/create">
            <Button
              variant={pathname === '/products/create' ? 'default' : 'ghost'}
              size="lg"
              className={`font-semibold transition-all ${
                pathname === '/products/create'
                  ? 'bg-gradient-to-r from-accent to-primary shadow-md'
                  : 'hover:bg-muted'
              }`}
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Product
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
