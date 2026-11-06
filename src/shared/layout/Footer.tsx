const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          &copy; {new Date().getFullYear()} ProductHub. Todos los derechos
          reservados.
        </p>
        <p>Tu catálogo, en un solo lugar.</p>
      </div>
    </footer>
  );
};

export default Footer;
