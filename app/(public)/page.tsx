"use client";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface featureProps {
    title: string;
    description: string;
    icon: string;
}

const features: featureProps[] = [
    {
        title: "Comprehensive courses",
        description:
            "Accesss a wide range of carefully curated courses designed by industry standards.",
        icon: "📚",
    },
    {
        title: "Interactive learning",
        description:
            "Engage with interactive content, quizzes, and assignments to enhance your learning experience.",
        icon: "🎮",
    },
    {
        title: "Progess tracking",
        description:
            "Monitor your progress and achievemenets with detailed analytics and personalised dashboards.",
        icon: "📊",
    },
    {
        title: "Community Support",
        description:
            "Join a vibrant community of learners and instructors to colloborate and share knowledge.",
        icon: "👥",
    },
];

export default function Home() {
    const { data: session } = authClient.useSession();

    const router = useRouter();

    async function signOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login"); // redirect to login page
                    toast.success("Signed out Successfully!");
                },
            },
        });
    }

    return (
        <>
            <section className="relative py-20">
                <div className="flex flex-col items-center text-center space-y-8">
                    <Badge variant="outline">
                        The Future of Learning Online Education
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                        Elevate your Learning Experience
                    </h1>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        Discover a new way to learn with our modern, interactive
                        learning management system. Access high-quality courses
                        anytime, anywhere.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Link
                            href="/courses"
                            className={buttonVariants({
                                size: "lg",
                            })}
                        >
                            Explore Courses
                        </Link>
                        <>
                            {session ? (
                                <></>
                            ) : (
                                <Link
                                    href="/login"
                                    className={buttonVariants({
                                        size: "lg",
                                        variant: "outline",
                                    })}
                                >
                                    Sign in
                                </Link>
                            )}
                        </>
                    </div>
                </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                {features.map((feature, index) => (
                    <Card
                        key={index}
                        className="hover:shadow-lg transition-shadow"
                    >
                        <CardHeader>
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                {feature.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </>
    );
}