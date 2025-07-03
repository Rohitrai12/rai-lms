import {
    BookOpen,
    ChevronDownIcon,
    Home,
    LayoutDashboard,
    LogOutIcon,
    UserRound,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IAppProps {
    name: string;
    email: string;
    image?: string;
}

export default function UserDropdown({ name, email, image }: IAppProps) {
    const router = useRouter();

    async function signOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/"); // redirect to login page or stay on the same page
                    toast.success("Signed out Successfully!");
                },
                onError: () => {
                    toast.error("Failed to sign out");
                },
            },
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button
                    variant="ghost"
                    className="h-auto p-0 hover:bg-transparent"
                >
                    {image ? (
                        <Avatar>
                            <AvatarImage src={image} alt="Profile image" />
                            <AvatarFallback>
                                {name[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    ) : (
                        <UserRound />
                    )}
                    <ChevronDownIcon
                        size={16}
                        className="opacity-60"
                        aria-hidden="true"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-w-64">
                <DropdownMenuLabel className="flex min-w-0 flex-col">
                    <span className="text-foreground truncate text-sm font-medium">
                        {name}
                    </span>
                    <span className="text-muted-foreground truncate text-xs font-normal">
                        {email}
                    </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/">
                            <Home
                                size={16}
                                className="opacity-60"
                                aria-hidden="true"
                            />
                            <span>Home</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/courses">
                            <BookOpen
                                size={16}
                                className="opacity-60"
                                aria-hidden="true"
                            />
                            <span>Courses</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/admin">
                            <LayoutDashboard
                                size={16}
                                className="opacity-60"
                                aria-hidden="true"
                            />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                    <LogOutIcon
                        size={16}
                        className="opacity-60"
                        aria-hidden="true"
                    />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}