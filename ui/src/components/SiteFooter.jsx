
import { Link } from "react-router-dom";

function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-[oklch(0.22_0.04_40)] text-white">
      <div className="mx-auto grid max-w-8xl gap-8 px-5 py-10 sm:grid-cols-2 sm:gap-10 sm:px-10 sm:py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-16">

        {/* Logo & About */}
        <div className="sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-yellow-500 text-black text-xl font-bold">
              ॐ
            </span>

            <span className="text-lg font-semibold">
             Shri Shri Khatu Shyam
Sewa Samiti (Reg.)
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/70">
            A devotional community dedicated to the sewa of
            Khatu Shyam Ji — uniting devotees through bhajan,
            bhandara and sewa since 1995.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="mb-3 text-base font-semibold text-yellow-500">
            Navigate
          </h4>

          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link to="/about">About Us</Link>
            </li>

            <li>
              <Link to="/team">Our Team</Link>
            </li>

            <li>
              <Link to="/gallery">Gallery</Link>
            </li>

            <li>
              <Link to="/events">Upcoming Events</Link>
            </li>
          </ul>
        </div>

        {/* Get Involved */}
        <div>
          <h4 className="mb-3 text-base font-semibold text-yellow-500">
            Get Involved
          </h4>

          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link to="/become-member">
                Become a Member
              </Link>
            </li>

            <li>
              <Link to="/contact">
                Event Registration
              </Link>
            </li>

            <li>
              <Link to="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-3 text-base font-semibold text-yellow-500">
            Sampark
          </h4>

          <p className="text-sm leading-relaxed text-white/80">
            Shyam Bhawan, Sector 21
            <br />
            Jaipur, Rajasthan 302021
            <br />
            <br />
            +91 98290 00000
            <br />
            seva@shyamsabhasamiti.org
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/50">
        जय श्री श्याम · © {new Date().getFullYear()} Shri Shri
        Khatu Shyam Sewa Sumiti
      </div>
    </footer>
  );
}

export default SiteFooter;