"use client";

import AppHeader from "@/app/_components/AppHeader";
import Constants from "@/data/Constants";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SelectionDetail from "../_components/SelectionDetail";
import CodeEditor from "../_components/CodeEditor";

export interface RECORD {
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
  const [record, setRecord] = useState<RECORD>();
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

      setRecord(result?.data);
      if (resp?.code == null) {
        //      GenerateCode(resp);
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
      <AppHeader hideSidebar={true} />
      <div className="grid grid-cols-1 md:grid-cols-5 p-5 gap-10">
        <div>
          <SelectionDetail record={record} />
        </div>
        <div className="col-span-4">
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}

export default ViewCode;
