"use client";

import React from 'react'
import { Form } from './ui/form'
import CustomFormField from './CustomFormField'
import { Button } from './ui/button'
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema } from '@/lib/formSchemas';
import z from 'zod';
import { useForm } from 'react-hook-form';

function CustomForm({ post }: { post?: Post }) {
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      location: post?.location || "",
      tags: post?.tags || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof postSchema>) => {
    // Handle form submission logic here
    console.log("Form submitted with values:", values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <CustomFormField control={form.control} label="Title" />
        <CustomFormField control={form.control} label="Image" />
        <CustomFormField control={form.control} label="Location" />
        <CustomFormField control={form.control} label="Tags" />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default CustomForm