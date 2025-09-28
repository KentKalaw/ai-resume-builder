import { NextResponse } from "next/server";
import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY as string,
});

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    const response = await cohere.chat({
      model: "command-r-plus",
      message: `You are a professional resume writer. Rewrite and polish this work experience:\n\n${input}`,
    });


    const text = response.text;

    return NextResponse.json({ result: text });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}