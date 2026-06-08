import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/team", label: "Our Team" },
  {to: "/mission-vision", label: "Mission Vision"},
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "UpComming Events" },
  { to: "/Sponsor", label: "Sponsor" },
  { to: "/contact", label: "Contact" },
];

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
             Shri Shri Khatushyam 
            </span>

            <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Sewa Samiti
            </span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-foreground/70 transition hover:text-maroon"
            >
              {item.label}
            </Link>
          ))}
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
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/40 py-3 text-sm last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export default SiteHeader;