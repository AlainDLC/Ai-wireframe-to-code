"use client";
import { CloudUpload } from "lucide-react";
import React, { ChangeEvent } from "react";

function ImageUpload() {
  const onChangeSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log(files[0]);
    }
  };
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-7 border border-dashed rounded-md shadow-sm flex flex-col items-center justify-center">
          <CloudUpload className="h-10 w-10" />
          <h2 className="font-bold text-lg">Upload Image</h2>
          <p className="text-slate-500">Click button to select Wireframe</p>
          <div className="p-5 flex justify-center">
            <label htmlFor="imageSelect">
              <h2 className="p-2 bg-primary text-white rounded-md px-5">
                Select Image
              </h2>
            </label>
          </div>
          <input
            type="file"
            id="imageSelect"
            className="hidden"
            onChange={onChangeSelect}
            multiple={false}
          />
        </div>
        <div>User Input</div>
      </div>
    </div>
  );
}

export default ImageUpload;
