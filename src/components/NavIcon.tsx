export default function NavIcon({ name }: { name: "home" | "about" | "projects" | "experience" | "contact" | "download" }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></>,
    about: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" /></>,
    projects: <><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /></>,
    experience: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12h18" /></>,
    contact: <><path d="M21 3 11 14" /><path d="M21 3l-6.5 18-3.5-7.5L3.5 10z" /></>,
    download: <><path d="M12 3v12m-5-4 5 5 5-5M5 21h14" /></>,
  };
  return <span className="nav-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg></span>;
}
