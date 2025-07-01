import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function CoursePage() {
  return (
    <>
    <div className='flex items-center justify-between'>
        <h1 className='text-2lx font-bold'>Courses</h1>
        <Link href="/admin/courses/create" className={buttonVariants()}>Create New Course</Link>
    </div>
    </>
  )
}

export default CoursePage