import { NextResponse } from "next/server";

type HistoryRole = "user" | "bot";

interface HistoryItem {
  role: HistoryRole;
  content: string;
}

interface GeminiResponse {
  error?: {
    message?: string;
  };
}

const GEMINI_MODEL = process.env.GEMINI_MODEL?.trim() || "gemini-3.6-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent`;

const SYSTEM_PROMPT = `You are a friendly, helpful AI assistant representing Christian Faith Mestola's portfolio website. Answer questions about Christian based on the following information. Keep responses concise, warm, and conversational. If you don't know something specific, say so honestly rather than making things up.

**About Christian:**
- Name: Christian Faith Mestola
- Roles: Web Developer, Frontend Developer, UI/UX Designer
- Location: Tagum, Davao Del Norte, Philippines
- Education: Bachelor of Science in Information Technology at Davao Del Norte State College (2022 – present)
- Summary: Designs and builds fast, accessible interfaces for product teams that care about clarity and craft.

**Tech Stack:**
- Frontend: Next.js, Vue, Tailwind CSS, Quasar, Bootstrap
- Backend: Python, Django, PostgreSQL, REST APIs, Laravel, PHP
- Tools: GitHub Actions, Vercel, Docker, Figma, Azure

**Projects:**
1. Shepherd – A Bible companion app for personal Scripture study (React Native, Expo, Bible API, SQLite)
2. Dentatrack – Smart dental post-operative recovery system (Bootstrap, Django, PostgreSQL)
3. LMS-Leave Monitoring – Leave request system for Tagum City Hall (Quasar, Vue, Laravel, MSSQL)
4. Tagum Youth Information System – Youth management platform (Vue.js, Quasar, Laravel, MSSQL)
5. ZapChat – Instant messaging platform (Vue, Quasar, Laravel, PostgreSQL)

**Experience:**
- Web Developer Intern at City Government of Tagum (Present, Onsite)

**Currently Learning:**
- Django REST Framework, Next.js Performance Optimization, TypeScript Best Practices, UI Motion and Micro-interactions

**Socials:**
- GitHub: https://github.com/channy051022
- LinkedIn: https://www.linkedin.com/in/christian-faith-mestola
- Instagram: https://www.instagram.com/christianfaithmestola
- Facebook: https://www.facebook.com/christianfaithmestola

Respond as if you are an AI assistant for Christian's portfolio. Be helpful, positive, and professional.`;

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

    const response = await fetch(`${GEMINI_URL}?alt=sse&key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);

      let providerMessage = "Gemini request failed.";
      try {
        const parsed = JSON.parse(errorText) as GeminiResponse;
        const parsedMessage = parsed.error?.message?.trim();
        if (parsedMessage) {
          providerMessage = parsedMessage;
        }
      } catch {
        // Keep fallback message when provider response is not JSON.
      }

      return NextResponse.json({ error: providerMessage }, { status: 502 });
    }

    // Stream the response back to the client
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const jsonStr = line.slice(6).trim();
              if (!jsonStr) continue;

              try {
                const chunk = JSON.parse(jsonStr);
                const text = chunk?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                  controller.enqueue(new TextEncoder().encode(text));
                }
              } catch {
                // Skip malformed JSON chunks
              }
            }
          }
        } catch (error) {
          console.error("Stream reading error:", error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("/api/chat error:", error);
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
