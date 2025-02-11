import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React from "react";

function SelectionDetail({ record }: any) {
  return (
    record && (
      <div className="p-5 bg-slate-100 h-[80vh] rounded-lg">
        <h2 className="font-bold my-2">WireFrame</h2>
        <Image
          src={record?.imageUrl}
          alt="wireframe"
          height={400}
          width={300}
          className="rounded-lg object-contain h-[200px] w-full border-dashed p-2 bg-white"
        />
        <h2 className="mt-4 font-bold my-2">AI Model</h2>
        <Input
          defaultValue={record?.model}
          className="bg-white"
          disabled={true}
        />

        <h2 className="mt-4 font-bold my-2">Description</h2>
        <Textarea
          defaultValue={record?.description}
          className="bg-white h-[180px]"
          disabled={true}
        />
      </div>
    )
  );
}

export default SelectionDetail;
