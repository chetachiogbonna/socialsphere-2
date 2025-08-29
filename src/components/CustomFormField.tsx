"use client";

import { Control } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import UploadFile from './UploadFile';

type CustomFormFieldProps = {
  control: Control<{ title: string; location: string; tags: string[]; }>,
  label: "Title" | "Image" | "Location" | "Tags"
}

function CustomFormField({ control, label }: CustomFormFieldProps) {
  switch (label) {
    case "Title":
      return (
        <FormField
          control={control}
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
          control={control}
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
          control={control}
          name="tags"
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
    // case "Tags":
    //   return (
    //     <FormField
    //       control={control}
    //       name="tags"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>{label}</FormLabel>
    //           <FormControl>
    //             <CustomTagInput field={field} />
    //           </FormControl>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //   );
    case "Image":
      return <UploadFile />
  }
}

export default CustomFormField