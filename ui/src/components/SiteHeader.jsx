import  { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  {
    label: "About Us",
    dropdown: [
      { to: "/about", label: "Founder Message" },
      { to: "/team", label: "Our Team" },
      { to: "/mission-vision", label: "Mission & Vision" },
    ],
  },
  {
    label: "Gallery",
    dropdown: [
      { to: "/gallery/videos", label: "Videos" },
      { to: "/gallery/Photos", label: "Photos" },
    ],
  },
  
  { to: "/events", label: "UpComming Events" },
  { to: "/members", label: "Members" },
  { to: "/Sponsor", label: "Sponsor" },
  { to: "/contact", label: "Contact Us" },
];

function DesktopDropdown({ item }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const show = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const hide = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button className="flex items-center gap-1 text-sm font-medium text-foreground/70 transition hover:text-maroon">
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-48 rounded-xl border border-border/60 bg-background shadow-lg">
          {item.dropdown.map((sub) => (
            <Link
              key={sub.to}
              to={sub.to}
              onMouseEnter={show}
              onMouseLeave={hide}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-foreground/70 transition first:rounded-t-xl last:rounded-b-xl hover:bg-yellow-50 hover:text-maroon"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileDropdown({ item, closeMenu }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/40 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 text-sm"
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mb-2 ml-3 flex flex-col gap-1 border-l-2 border-yellow-400 pl-3">
          {item.dropdown.map((sub) => (
            <Link
              key={sub.to}
              to={sub.to}
              onClick={() => {
                setOpen(false);
                closeMenu();
              }}
              className="py-1.5 text-sm text-foreground/70 hover:text-maroon"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-yellow-500 text-black text-xl font-bold shadow-lg">
            ॐ
          </span>

          <span className="flex flex-col leading-tight">
            <span className="text-lg font-semibold text-maroon">
             Shri Shri Khatu Shyam
            </span>

            <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Sewa Samiti (Reg.)
            </span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) =>
            item.dropdown ? (
              <DesktopDropdown key={item.label} item={item} />
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-foreground/70 transition hover:text-maroon"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <Link
          to="/become-member"
          className="hidden rounded-full bg-yellow-500 px-5 py-2 text-sm font-medium text-black shadow-lg transition hover:scale-105 lg:inline-flex"
        >
          Join Samiti
        </Link>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="border-t border-border/60 bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-3">
            {nav.map((item) =>
              item.dropdown ? (
                <MobileDropdown
                  key={item.label}
                  item={item}
                  closeMenu={() => setOpen(false)}
                />
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/40 py-3 text-sm last:border-0"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

export default SiteHeader;
