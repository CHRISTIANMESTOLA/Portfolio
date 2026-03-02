"use client";

import { useMemo, useState } from "react";

import Container from "@/components/Container";
import SectionCard from "@/components/SectionCard";
import SocialIcon from "@/components/SocialIcon";
import { socialLinks } from "@/lib/data";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const initialData: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const validate = (values: ContactFormData): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = "Please use a valid email format.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Please enter a message.";
    } else if (values.message.trim().length < 20) {
      nextErrors.message = "Message should be at least 20 characters.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setIsSubmitted(false);
      return;
    }

    setIsSubmitted(true);
    setFormData(initialData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section className="py-7 sm:py-8">
      <Container>
        <header className="mb-5 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Contact</h1>
          <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            UI-only form with placeholder validation. Hook this up to your preferred backend later.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <SectionCard title="Send a Message" description="No backend connected yet.">
            <form className="space-y-3" onSubmit={handleSubmit} noValidate>
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
                />
                {errors.name ? (
                  <p id="name-error" className="text-xs text-red-600 dark:text-red-400">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
                />
                {errors.email ? (
                  <p id="email-error" className="text-xs text-red-600 dark:text-red-400">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
                />
                {errors.message ? (
                  <p id="message-error" className="text-xs text-red-600 dark:text-red-400">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <div className="flex items-center gap-3">
                <button type="submit" className="btn-primary">
                  Submit
                </button>
                {isSubmitted ? (
                  <p className="text-sm text-emerald-700 dark:text-emerald-400">Form validated. Backend not connected.</p>
                ) : null}
                {!isSubmitted && hasErrors ? (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Please fix the highlighted fields.</p>
                ) : null}
              </div>
            </form>
          </SectionCard>

          <SectionCard title="Social Links" description="Placeholder links only">
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary w-full justify-between gap-3"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <SocialIcon platform={link.platform} />
                      <span className="truncate">{link.label}</span>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </Container>
    </section>
  );
}
