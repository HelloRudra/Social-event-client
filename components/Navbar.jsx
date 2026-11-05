"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaHandsHelping } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;

  const closeMenu = () => document.activeElement?.blur();

  async function handleLogout() {
    closeMenu();
    await authClient.signOut();
    toast.success("You have been logged out.");
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4">
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-primary">
            <FaHandsHelping />
            SebaHub
          </Link>
        </div>

        <div className="navbar-center">
          <Link href="/events" className="btn btn-ghost">
            Upcoming Events
          </Link>
        </div>

        <div className="navbar-end gap-1">
          <ThemeToggle />

          {isPending ? (
            <div className="skeleton h-10 w-10 shrink-0 rounded-full" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="tooltip tooltip-bottom before:z-50"
                data-tip={user.name}
              >
                <div className="avatar">
                  <div className="h-10 w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                    {user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={user.image} alt={user.name} referrerPolicy="no-referrer" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary font-bold text-primary-content">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 mt-3 w-56 rounded-box bg-base-100 p-2 shadow-lg border border-base-300"
              >
                <li className="menu-title truncate">{user.email}</li>
                <li><Link href="/create-event" onClick={closeMenu}>Create Event</Link></li>
                <li><Link href="/manage-events" onClick={closeMenu}>Manage Events</Link></li>
                <li><Link href="/joined-events" onClick={closeMenu}>Joined Events</Link></li>
                <li>
                  <button onClick={handleLogout} className="text-error">Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}