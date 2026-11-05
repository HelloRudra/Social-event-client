import Link from "next/link";
import { FaHandsHelping } from "react-icons/fa";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const socials = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaXTwitter, href: "https://x.com", label: "X" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-neutral text-neutral-content">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-primary">
            <FaHandsHelping />
            SebaHub
          </Link>
          <p className="mt-4 text-sm leading-relaxed opacity-80">
            A community platform where neighbours organise and join social
            service events, from winter clothes drives to tree plantations.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/events" className="hover:text-primary">Upcoming Events</Link></li>
            <li><Link href="/create-event" className="hover:text-primary">Create Event</Link></li>
            <li><Link href="/joined-events" className="hover:text-primary">Joined Events</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Contact</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li>Mirpur 10, Dhaka 1216, Bangladesh</li>
            <li>hello@sebahub.org</li>
            <li>+880 1700-000000</li>
            <li>Open daily, 9:00 AM to 8:00 PM</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
          <div className="flex flex-wrap gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="btn btn-circle btn-outline border-neutral-content/30 text-neutral-content hover:border-primary hover:bg-primary hover:text-primary-content"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-content/15 py-5 text-center text-sm opacity-70">
        © {new Date().getFullYear()} SebaHub. Built to serve the community.
      </div>
    </footer>
  );
}