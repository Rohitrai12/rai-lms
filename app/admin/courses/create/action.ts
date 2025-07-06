// app/admin/courses/action.ts
"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { fixedWindow } from "@/lib/arcject";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zod-schema";
import { request } from "@arcjet/next";
import { CourseLevel, CourseStatus } from "@/lib/generated/prisma";

// Map the human‑readable strings from your form to Prisma’s enums:
const levelMap: Record<string, CourseLevel> = {
  Beginner: CourseLevel.BEGINNER,
  Intermediate: CourseLevel.INTERMEDIATE,
  Advanced: CourseLevel.ADVANCED,
};

const statusMap: Record<string, CourseStatus> = {
  Draft: CourseStatus.DRAFT,
  Published: CourseStatus.PUBLISHED,
  Archived: CourseStatus.ARCHIVED,
};

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5,
  })
);

export async function CreateCourse(
  values: CourseSchemaType
): Promise<ApiResponse> {
  const session = await requireAdmin();

  try {
    // Rate-limit / bot protection
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session.user.id,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "Rate limit exceeded. Please try again later.",
        };
      } else {
        return {
          status: "error",
          message: "Bot detected. Access denied.",
        };
      }
    }

    // Validate input
    const validation = courseSchema.safeParse(values);
    if (!validation.success) {
      console.error("Validation errors:", validation.error.format());
      return {
        status: "error",
        message: "Invalid form data",
      };
    }
    const data = validation.data;

    // Create in DB, mapping enums
    const created = await prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        fileKey: data.fileKey,
        price: data.price,
        duration: data.duration,
        smallDescription: data.smallDescription,
        slug: data.slug,
        userId: session.user.id,
        category: data.category,               // plain string in your Prisma model
        level: levelMap[data.level],           // mapped enum
        status: statusMap[data.status],        // mapped enum
      },
    });

    console.log("Created course with ID:", created.id);
    return {
      status: "success",
      message: "Course created successfully",
    };
  } catch (error: any) {
    console.error("CreateCourse error:", error);
    return {
      status: "error",
      message: `Failed to create course: ${error.message}`,
    };
  }
}
