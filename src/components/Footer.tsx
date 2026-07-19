function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8 lg:px-8">
      <p className="text-center text-sm text-[#8B8886]">
        <span className="font-[family-name:var(--font-display)] italic text-[#F5F1E8]">
          Occasion
        </span>{" "}
        — Event Planner · © {new Date().getFullYear()}
      </p>
    </footer>
  );
}


export default Footer;