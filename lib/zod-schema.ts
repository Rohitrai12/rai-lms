import { z } from "zod";

export const CourseCategories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Cloud Computing",
    "UI/UX Design",
    "Cybersecurity",
    "Finance",
    "Marketing",
    "Healthcare",
    "Business",
    "Music",
    "Programming",
    "Database",
    "Statistics",
    "Mathematics",
    "Computer Networking",
    "Artificial Intelligence",
    "Software Engineering",
    "Computer Vision",
    "Natural Language Processing",
    "Robotics",
    "Internet of Things",
    "Big Data",
    "DevOps",
    "Game Development",
    "Computer Graphics",
    "Algorithm",
]

export const CourseLevel = ["Beginner", "Intermediate", "Advanced"]
export const CourseStatus = ["Draft", "Published", "Archived"]

export const CourseSchema = z.object({
  title: z.string().min(3).max(100),
  smallDescription: z.string().min(3).max(200),
  description: z.string().min(3).max(1000),
  fileKey: z.string().min(3).max(100),
  price: z.coerce.number().min(1),
  duration: z.coerce.number().min(1).max(500),
  level: z.enum(CourseLevel, { required_error: "Level is required" }),
  category: z.enum(CourseCategories, { required_error: "Category is required" }),
  slug: z.string().min(3).max(100),
  status: z.enum(CourseStatus, { required_error: "Status is required" }),
});


export type CourseSchemaType = z.infer<typeof CourseSchema>