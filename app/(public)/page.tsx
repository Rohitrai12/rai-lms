'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Home() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('Logged out successfully');
          router.push('/');
        },
        onError: () => {
          toast.error('Logout failed');
        },
      },
    });
  };

  return (
    <div>
        <section className='relative py-20'>
            <div className='flex flex-col items-center space-y-8'>
            <Badge>The Future OF Online Education</Badge>
            <h1 className='text-4xl md:text-6xl font-bold tracking-tight'>Elevate Your Learning Experience</h1>
            <p className='max-w-[700px] text-muted-foreground md:text-xl text-center'>Discover a new way to learn with our modern, interactive learning management system. Access high-quality courses anytime, anywhere.</p>
            </div>
        </section>
    </div>
  );
}
