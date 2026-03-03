import type { Level } from '@/types';

/** レベル別色設定 */
export const levelColors: Record<Level, {
  active: string;
  inactive: string;
  badge: string;
}> = {
  N5: {
    active: 'bg-blue-500 text-white',
    inactive: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
    badge: 'bg-blue-50 text-blue-600',
  },
  N4: {
    active: 'bg-green-500 text-white',
    inactive: 'bg-green-50 text-green-700 hover:bg-green-100',
    badge: 'bg-green-50 text-green-600',
  },
  N3: {
    active: 'bg-orange-500 text-white',
    inactive: 'bg-orange-50 text-orange-700 hover:bg-orange-100',
    badge: 'bg-orange-50 text-orange-600',
  },
  N2: {
    active: 'bg-red-500 text-white',
    inactive: 'bg-red-50 text-red-700 hover:bg-red-100',
    badge: 'bg-red-50 text-red-600',
  },
};
