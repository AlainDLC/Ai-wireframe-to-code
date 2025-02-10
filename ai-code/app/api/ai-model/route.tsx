import Constants from "@/data/Constants";
import { NextRequest } from "next/server";
import OpenAi from "openai";
import { TextEncoder } from "util";

const openAi = new OpenAi({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTE_API_KEY,
});

export async function POST(req: NextRequest) {
  const { model, description, imageUrl } = await req.json();

  const ModelObj = Constants.AiModelList.find((item) => item.name == model);
  const modelName = ModelObj?.modelName;

  console.log("Using model:", modelName);

  try {
    // Gör OpenAI-anropet för att få en streamande svar
    const response = await openAi.chat.completions.create({
      model: modelName ?? "google/gemini-2.0-pro-exp-02-05:free",
      stream: true,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: description,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const text = chunk.choices?.[0]?.delta?.content || "";
          controller.enqueue(new TextEncoder().encode(text));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error in processing the request:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
