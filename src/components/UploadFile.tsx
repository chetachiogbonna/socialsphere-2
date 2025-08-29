"use client";

import useImageStore from '@/stores/useImageStore';
import Image from 'next/image';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function UploadFile() {
  const { imageUrl, setImageUrl, setImageFile } = useImageStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImageUrl(URL.createObjectURL(acceptedFiles[0]));
    setImageFile(acceptedFiles[0]);
  }, [setImageFile, setImageUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      {imageUrl
        ? isDragActive
          ? (
            <div className="w-full bg-[#1A1A1A] h-[500px] flex items-center justify-center rounded-xl">
              <p className="text-gray-500">Drop the files here...</p>
            </div>
          ) : (
            <div className="w-full bg-[#1A1A1A] h-[500px] flex items-center justify-center rounded-xl p-2">
              <Image
                src={imageUrl}
                alt="Uploaded"
                width={500}
                height={500}
                className="w-full h-[480] rounded-xl"
              />
            </div>
          )
        : (
          <div className="w-full bg-[#1A1A1A] h-[500px] flex items-center justify-center rounded-xl">
            <p>Drag and drop some files here, or click to select files</p>
          </div>
        )
      }
    </div>
  )
}

export default UploadFile