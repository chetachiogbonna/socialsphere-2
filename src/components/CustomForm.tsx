"use client";

import React, { useState } from 'react'
import { Form } from './ui/form'
import CustomFormField from './CustomFormField'
import { Button } from './ui/button'
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema } from '@/lib/formSchemas';
import z from 'zod';
import { useForm } from 'react-hook-form';
import useImageStore from '@/stores/useImageStore';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { uploadImage } from '@/lib/utils';
import { Id } from '../../convex/_generated/dataModel';

function CustomForm({ post }: { post?: Post }) {
  const { imageUrl, imageFile } = useImageStore();
  const [showImageError, setShowImageError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      location: post?.location || "",
      tags: post?.tags.join("") || "",
    },
  });

  const generateUploadUrl = useMutation(api.storage.generateUploadUrl)
  const getImageUrl = useMutation(api.storage.getImageUrl)
  const createPost = useMutation(api.post.createPost)

  const onSubmit = async (values: z.infer<typeof postSchema>) => {
    setShowImageError(false);
    if (!post && !imageUrl) {
      setShowImageError(true);
      return;
    }

    setIsSubmitting(true)

    try {
      const url = await generateUploadUrl();
      const imageId = await uploadImage(url, imageFile!);
      const realImageUrl = await getImageUrl({ storageId: imageId as Id<"_storage"> }) as string;
      await createPost({
        ownerId: "j570cw4t4w57r520gjndnpe1757nrxjk" as Id<"users">,
        imageUrl: realImageUrl,
        ...values,
        tags: values.tags.split(",").map(tag => tag.trim()),
        imageId,
      });
      // Handle form submission logic here
      console.log("Form submitted with values:", values);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <CustomFormField control={form.control} label="Title" />
        <div>
          <CustomFormField control={form.control} label="Image" />
          {showImageError && (
            <p className="text-red-500 text-sm">
              Please upload an image before submitting.
            </p>
          )}
        </div>
        <CustomFormField control={form.control} label="Location" />
        <CustomFormField control={form.control} label="Tags" />

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default CustomForm