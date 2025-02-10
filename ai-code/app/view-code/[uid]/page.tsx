"use client";

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
  const [loading, setLoading] = useState<boolean>(false); // Rättat stavfel från 'loding' till 'loading'

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
      setLoading(false); // Säkerställ att loading sätts till false även vid fel
    }
  };

  const GenerateCode = async (record: RECORD) => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai-model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: record?.description,
          model: record?.model,
          imageUrl: record?.imageUrl,
        }),
      });

      if (!res.ok) {
        throw new Error("API-svaret var inte OK");
      }

      if (!res.body) {
        console.error("Ingen kropp i svaret från API");
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        console.log(text); // Här kan du också uppdatera UI:t med den inkommande datan om du vill
      }
    } catch (err) {
      console.error("Fel vid generering av kod:", err);
    } finally {
      setLoading(false); // Säkerställ att loading sätts till false när processen är klar
    }
  };

  return (
    <div>{loading && <LoaderCircle className="animate-spin" />}Viwcode</div>
  );
}

export default ViewCode;
