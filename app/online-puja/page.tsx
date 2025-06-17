// app/online-pooja/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectToOnlinePuja() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/services/online-puja');
  }, [router]);

  return null;
}
