import Container from "@/components/Container";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-zinc-200 bg-white/80 py-6 dark:border-zinc-800 dark:bg-zinc-900/80">
      <Container className="flex justify-center">
        <p className="w-full text-center text-sm text-zinc-600 dark:text-zinc-400">© 2026 Christian Faith Mestola Portfolio.</p>
      </Container>
    </footer>
  );
}
