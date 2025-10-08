export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 pt-8 border-t border-slate-700/50 text-center">
      <p className="text-slate-400 text-sm">
        © {currentYear} SPMT Generator — MIT — Créé avec React + TypeScript + Vite
      </p>
      <p className="text-slate-500 text-xs mt-2">
        Par <span className="text-slate-400 font-medium">Axiorix</span> ☕
      </p>
    </footer>
  );
}
