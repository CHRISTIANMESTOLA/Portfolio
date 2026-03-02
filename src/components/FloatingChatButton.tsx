"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";

import normalImage from "@/images/normal_image.jpg";

type ChatRole = "user" | "bot";

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
}

interface ChatHistoryItem {
  role: ChatRole;
  content: string;
}

const STORAGE_KEY = "portfolio-chat-history-v1";
const WELCOME_MESSAGE =
  "Hi there! 👋🏻 Thanks for visiting my website. Feel free to ask me anything about my Porfolio";
const LEGACY_WELCOME_MESSAGES = [
  "Hi! I am Gemini. Ask me anything about this portfolio.",
  "Hi! Ask me anything about Christian's portfolio.",
];

const defaultMessage: ChatMessage = {
  id: "welcome",
  role: "bot",
  content: WELCOME_MESSAGE,
  createdAt: Date.now(),
};

function createMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    role,
    content,
    createdAt: Date.now(),
  };
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function MessageAvatar({ role }: { role: ChatRole }) {
  const isUser = role === "user";

  if (!isUser) {
    return (
      <span
        aria-hidden="true"
        className="relative inline-flex h-8 w-8 shrink-0 overflow-hidden rounded-full border border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800"
      >
        <Image src={normalImage} alt="Christian profile" fill sizes="32px" className="object-cover" />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 text-[10px] font-semibold tracking-wide text-zinc-700 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
    >
      YOU
    </span>
  );
}

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([defaultMessage]);
  const [isLoaded, setIsLoaded] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setMessages([defaultMessage]);
        setIsLoaded(true);
        return;
      }

      const parsed = JSON.parse(stored) as ChatMessage[];
      if (!Array.isArray(parsed) || parsed.length === 0) {
        setMessages([defaultMessage]);
        setIsLoaded(true);
        return;
      }

      const cleaned = parsed.filter(
        (item) =>
          item &&
          (item.role === "user" || item.role === "bot") &&
          typeof item.content === "string" &&
          typeof item.createdAt === "number",
      );

      const withUpdatedWelcome = cleaned.map((item) => {
        if (item.id === "welcome" && item.role === "bot") {
          return { ...item, content: WELCOME_MESSAGE };
        }

        if (item.role === "bot" && LEGACY_WELCOME_MESSAGES.includes(item.content)) {
          return { ...item, content: WELCOME_MESSAGE };
        }

        return item;
      });

      setMessages(withUpdatedWelcome.length > 0 ? withUpdatedWelcome : [defaultMessage]);
      setIsLoaded(true);
    } catch {
      setMessages([defaultMessage]);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [isLoaded, messages]);

  useEffect(() => {
    if (!isOpen) return;
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [isOpen, messages, isTyping]);

  const requestHistory = useMemo<ChatHistoryItem[]>(
    () => messages.map((msg) => ({ role: msg.role, content: msg.content })),
    [messages],
  );

  const sendMessage = async () => {
    const content = input.trim();
    if (!content || isTyping) return;

    const userMessage = createMessage("user", content);
    const historyBeforeSend = requestHistory;

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          history: historyBeforeSend,
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorData?.error?.trim() || "Failed to get chat response.");
      }

      const data = (await response.json()) as { reply?: string };
      const replyText = data.reply?.trim();

      if (!replyText) {
        throw new Error("Empty chat response.");
      }

      setMessages((prev) => [...prev, createMessage("bot", replyText)]);
    } catch (error) {
      const fallback = "Sorry, something went wrong.";
      const message = error instanceof Error && error.message.trim() ? error.message.trim() : fallback;
      setMessages((prev) => [...prev, createMessage("bot", message)]);
    } finally {
      setIsTyping(false);
    }
  };

  const onInputKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await sendMessage();
    }
  };

  return (
    <>
      {isOpen ? (
        <section className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
          <header className="flex items-center justify-between bg-zinc-900 px-4 py-3 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <span className="relative inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-full border border-zinc-200/70">
                <Image src={normalImage} alt="Christian profile" fill sizes="36px" className="object-cover" />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold tracking-tight">Chat with Christian</h2>
                <p className="inline-flex items-center gap-1.5 text-[11px] text-zinc-200/90">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-400" />
                  Active now
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-lg leading-none transition hover:bg-white/20"
            >
              ×
            </button>
          </header>

          <div className="h-80 space-y-3 overflow-y-auto bg-zinc-50 p-3 dark:bg-zinc-950/70">
            {messages.map((message) => {
              const isUser = message.role === "user";

              return (
                <div key={message.id} className={`flex items-start gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
                  {!isUser ? <MessageAvatar role="bot" /> : null}
                  <div className={`flex max-w-[82%] flex-col space-y-1 ${isUser ? "items-end" : "items-start"}`}>
                    <p
                      className={`rounded-2xl px-3 py-2 text-sm leading-5 ${
                        isUser
                          ? "bg-zinc-900 text-white"
                          : "border border-zinc-200 bg-white text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                      }`}
                    >
                      {message.content}
                    </p>
                    <p className="px-1 text-[11px] text-zinc-500 dark:text-zinc-400">{formatTime(message.createdAt)}</p>
                  </div>
                  {isUser ? <MessageAvatar role="user" /> : null}
                </div>
              );
            })}

            {isTyping ? (
              <div className="flex items-start gap-2 justify-start">
                <MessageAvatar role="bot" />
                <p className="rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                  Christian is typing...
                </p>
              </div>
            ) : null}

            <div ref={endOfMessagesRef} />
          </div>

          <div className="border-t border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Type your message..."
                rows={2}
                className="min-h-[44px] flex-1 resize-none rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={isTyping || !input.trim()}
                className="btn-primary h-[44px] px-4 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Send
              </button>
            </div>
            <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400">Enter to send, Shift+Enter for newline.</p>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className={`fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-black bg-black text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 ${
          isOpen ? "" : "animate-[chatFloat_2.2s_ease-in-out_infinite]"
        }`}
      >
        {!isOpen ? <span aria-hidden="true" className="absolute inset-0 rounded-full bg-black/30 animate-ping" /> : null}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="relative h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 5h16v10H7l-3 3V5Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}
