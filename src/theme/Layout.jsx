import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const Layout = ({ children }) => {
  return (
      <div className={`flex flex-col min-h-screen ${inter.variable}`}>
        <header className="flex items-center justify-between bg-gray-900 px-4 py-3 text-white shadow-md dark:bg-gray-800">
          <Link className="flex items-center gap-2" href="#">
            <MountainIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">eKYC App</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">Jared Palmer</p>
                <p className="text-gray-400">jared@example.com</p>
              </div>
            </div>
            <Button size="icon" variant="outline">
              <LogOutIcon className="h-5 w-5" />
              <span className="sr-only">Sign out</span>
            </Button>
            {/* <Button onClick={signOut} variation="warning">
            Sign Out
          </Button> */}
          </div>
        </header>
        <main className="flex-1 py-8">
          <div className="container mx-auto max-w-4xl px-4">{children}</div>
        </main>
      </div>
  );
};

export default Layout;

function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
