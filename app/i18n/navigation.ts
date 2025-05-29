import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const locales = routing.locales;

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
