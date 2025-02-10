"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload, Loader2Icon, WandSparkles, X } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/configs/firebaseConfig";
import uuid4 from "uuid4";
import axios from "axios";
import { useAuthContext } from "@/app/provider";
import { useRouter } from "next/navigation";
import Constants from "@/data/Constants";

function ImageUpload() {
  const route = useRouter();
  const AiModelList = [
    {
      name: "Gemini Google",
      icon: "/gemini.png",
      modelName: "google/gemini-2.0-pro-exp-02-05:free",
    },
    {
      name: "LLama by Meta",
      icon: "/meta.png",
      modelName: "meta-llama/llama-3.3-70b-instruct:free",
    },
    {
      name: "Deepseek",
      icon: "/deepseek.png",
      modelName: "deepseek/deepseek-r1-distill-llama-70b:free",
    },
  ];

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<any>();
  const [model, setModel] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuthContext();

  const OnChangeSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log(files[0]);
      const imageUrl = URL.createObjectURL(files[0]);
      setFile(files[0]);
      setPreviewUrl(imageUrl);
    }
  };

  const OnConvertToCodeButtonClick = async () => {
    if (!file || !model || !description) {
      if (!file) {
        console.error("Ingen fil vald!");
      }
      if (!model) {
        console.error("Ingen modell vald!");
      }
      if (!description) {
        console.error("Ingen beskrivning angiven!");
      }
      return;
    }
    setLoading(true);

    const fileName = `${Date.now()}.png`;
    const imageRef = ref(storage, `ai-wireframe/${fileName}`);

    try {
      const uploadResponse = await uploadBytes(imageRef, file);
      console.log("Uppladdning lyckades:", uploadResponse);

      const imageUrl = await getDownloadURL(imageRef);
      console.log("Bildens URL:", imageUrl);

      const uid = uuid4();

      const result = await axios.post("/api/wireframe", {
        uid: uid,
        description: description,
        imageUrl: imageUrl,
        model: model,
        email: user?.email,
      });

      setLoading(false);

      route.push(`/view-code/${uid}`);
    } catch (err) {
      console.error("Fel vid uppladdning:", err);
    }
  };
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {!previewUrl ? (
          <div className="p-7 border border-dashed rounded-md shadow-sm flex flex-col items-center justify-center">
            <CloudUpload className="h-10 w-10 text-primary" />
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
              onChange={OnChangeSelect}
              multiple={false}
            />
          </div>
        ) : (
          <div className="p-5 border border-dashed">
            <Image
              src={previewUrl}
              alt="preiw"
              height={500}
              width={500}
              className="w-full h-[300px] object-contain"
            />
            <X
              className="  flex  justify-end w-full cursor-pointer"
              onClick={() => setPreviewUrl(null)}
            />
          </div>
        )}

        <div className="p-7 border shadow-md rounded-md">
          <h2 className="font-bold text-lg ">Select Ai model</h2>
          <Select onValueChange={(value) => setModel(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ai model" />
            </SelectTrigger>
            <SelectContent>
              {Constants?.AiModelList.map((model, index) => (
                <SelectItem value={model.name} key={index}>
                  <div className="flex items-center gap-2">
                    <Image src={model.icon} alt="icon" width={20} height={30} />
                    <h2>{model.name}</h2>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <h2 className="font-bold text-lg mt-7">
            Enter Description about your webpage
          </h2>
          <Textarea
            onChange={(event) => setDescription(event.target.value)}
            className="mt-3 h-[200px]"
            placeholder="Write about your webpage"
          />
        </div>
      </div>
      <div className="mt-10 flex justify-center items-center">
        <Button onClick={OnConvertToCodeButtonClick} disabled={loading}>
          {loading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <WandSparkles className="" />
          )}
          Convert to Code
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
