import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

// Expose localized Link/router wrappers
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
