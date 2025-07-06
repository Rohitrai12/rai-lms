"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tryCatch } from "@/hooks/try-catch";
import Link from "next/link";
import { startTransition, useTransition } from "react";
import { toast } from "sonner";
import { deleteCourse } from "./actions";
import { useParams, useRouter } from "next/navigation";
import { Loader, Trash2 } from "lucide-react";

export default function DeleteCourseRoute() {
  const [pending, startTransition] = useTransition();
  const { courseId } = useParams<{ courseId: string }>();

  const router = useRouter();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(deleteCourse(courseId));

      if (error) {
        toast.error("An unexpected error occurred please try again later");
      }

      if (result?.status === "success") {
        toast.success(result.message);
        router.push("/admin/courses");
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  }
  return (
    <div className="max-w-xl mx-auto w-full">
      <Card className="mt-32">
        <CardHeader>
          <CardTitle>Are you sure you want to delete course</CardTitle>
          <CardDescription>This action cannot be undone. </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={`/admin/courses`}
          >
            Cancel
          </Link>

          <Button className="cursor-pointer" variant="destructive" onClick={onSubmit} disabled={pending}>
            {pending ? (
              <>
                <Loader className=" size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="size-4" />
                Delete
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}