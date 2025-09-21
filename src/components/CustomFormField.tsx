"use client";

import { Control, UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import UploadFile from './UploadFile';
import CustomTagInput from './CustomTagInput';
import { Post } from '@/types';

type CustomFormFieldProps = {
  form: UseFormReturn<{
    title: string;
    location: string;
    tags: string[];
  }, any, {
    title: string;
    location: string;
    tags: string[];
  }>,
  label: "Title" | "Image" | "Location" | "Tags",
  post?: Post
}

function CustomFormField({ form, label, post }: CustomFormFieldProps) {
  switch (label) {
    case "Title":
      return (
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Textarea
                  className="flex items-center gap-2 bg-[#1A1A1A] border-light focus-visible:ring-0 focus-visible:outline-none text-white rounded-md h-24"
                  placeholder="Write your content here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "Location":
      return (
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  className="bg-[#1A1A1A] border-light focus-visible:ring-0 focus-visible:outline-none text-white"
                  placeholder="Location"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "Tags":
      return (
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <CustomTagInput
                  field={field}
                  value={form.getValues("tags")}
                  fieldChange={(tags) => form.setValue("tags", tags, { shouldValidate: true })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "Image":
      return <UploadFile post={post} />
  }
}

export default CustomFormField