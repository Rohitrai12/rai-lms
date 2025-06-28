'use client';

import { ThemeToggle } from '@/components/theme-toggle';
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
    <div
      className="
        grid 
        grid-rows-[20px_1fr_20px] 
        items-center 
        justify-items-center 
        min-h-screen 
        p-8 
        pb-20 
        gap-16 
        sm:p-20 
        font-geist-sans
      "
    >
      <h1>Hello World</h1>
      <ThemeToggle />

      {session ? (
        <div className="space-y-2 text-center">
          <h2>Welcome, {session.user.name}</h2>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <Link href="/sign-in" passHref>
          <Button as="a">Login</Button>
        </Link>
      )}
    </div>
  );
}
