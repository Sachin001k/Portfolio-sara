
export function Footer({ name }: { name: string }) {
  return (
    <footer className="bg-ink py-6 text-center text-xs text-cream/50">
      <p>
        © {new Date().getFullYear()} {name}. All rights reserved.
      </p>
    </footer>
  );
}
