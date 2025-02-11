"use client";

import Constants from "@/data/Constants";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface RECORD {
  id: number;
  description: string;
  code: any;
  imageUrl: string;
  model: string;
}

function ViewCode() {
  const { uid } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [codeResp, setCodeResp] = useState<string>("");
  useEffect(() => {
    if (uid) {
      GetRecordInfo();
    }
  }, [uid]);

  const GetRecordInfo = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`/api/wireframe?uid=${uid}`);
      const resp = result?.data;

      if (resp?.code == null) {
        GenerateCode(resp);
      }

      if (resp?.err) {
        console.error("Fel vid hämtning av data:");
      }

      setLoading(false);
    } catch (err) {
      console.error("Fel vid hämtning av data:", err);
      setLoading(false);
    }
  };

  const GenerateCode = async (record: RECORD) => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai-model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: record?.description + ":" + Constants.PROMT,
          model: record?.model,
          imageUrl: record?.imageUrl,
        }),
      });

      if (!res.ok) {
        throw new Error("API-svaret var inte OK");
      }

      if (!res.body) {
        console.error("API resp");
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder
          .decode(value)
          .replace("```typescript", "")
          .replace("```", "");
        setCodeResp((prev) => prev + text);
        console.log(text);
      }
      setLoading(false);
    } catch (err) {
      console.error("Fel vid generering av kod:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <LoaderCircle className="animate-spin" />}Viewcode
      <p>{codeResp}</p>
    </div>
  );
}

export default ViewCode;
