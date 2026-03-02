import { NextResponse } from "next/server";

type HistoryRole = "user" | "bot";

interface HistoryItem {
  role: HistoryRole;
  content: string;
}

interface GeminiPart {
  text?: string;
}

interface GeminiCandidate {
  content?: {
    parts?: GeminiPart[];
  };
}

interface GeminiResponse {
  candidates?: GeminiCandidate[];
}

const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

function normalizeHistory(input: unknown): HistoryItem[] {
  if (!Array.isArray(input)) return [];

  return input
    .filter((item): item is HistoryItem => {
      if (!item || typeof item !== "object") return false;
      const value = item as { role?: unknown; content?: unknown };
      return (
        (value.role === "user" || value.role === "bot") &&
        typeof value.content === "string" &&
        value.content.trim().length > 0
      );
    })
    .slice(-30);
}

function extractReply(data: GeminiResponse): string | null {
  const parts = data.candidates?.[0]?.content?.parts;
  if (!parts || parts.length === 0) return null;

  const text = parts
    .map((part) => part.text)
    .filter((value): value is string => typeof value === "string")
    .join("\n")
    .trim();

  return text.length > 0 ? text : null;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing GEMINI_API_KEY." }, { status: 500 });
    }

    const body = (await request.json()) as { message?: unknown; history?: unknown };
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const history = normalizeHistory(body.history);

    const contents = [
      ...history.map((entry) => ({
        role: entry.role === "bot" ? "model" : "user",
        parts: [{ text: entry.content }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return NextResponse.json({ error: "Gemini request failed." }, { status: 502 });
    }

    const data = (await response.json()) as GeminiResponse;
    const reply = extractReply(data);

    if (!reply) {
      return NextResponse.json({ error: "No reply generated." }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("/api/chat error:", error);
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
