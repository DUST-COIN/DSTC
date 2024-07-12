import { appLinks } from "../constants";
import Button from "./Button";
import AppLogo from "./sub-components/AppLogo";
import ThemeControl from "./sub-components/ThemeControl";

const links = ["Read", "Write"];

const routes = {
  home: "dusts",
  about: "share",
  contribute: "",
  collection: "",
  faq: "faq",
  popular: "popular",
  features: "features",
  promo: "promotion",
  footer: "footer",
};

const Links = Object.values(routes).map((r) => r);
export default function Header({ handleConnectWallet }: any) {
  return (
    <header className="sticky w-full mt-2 py-4 px-1 min-h-16 row items-center justify-between gap-2">
      <div className="row items-center gap-2">
        <h1>$Dust</h1>
        <div className="ml-24 hidden lg:flex flex-row flex-wrap gap-8">
          {links.map((li, i) => (
            <a
              key={i}
              href={`${Links[i]}`}
              className={`uppercase font-redzone`}
            >
              {li}
            </a>
          ))}
        </div>
      </div>
      <div className="row items-center gap-12">
        <ThemeControl />
        <div className="hidden sm:block">
          <Button onClick={handleConnectWallet}>Connect Wallet</Button>
        </div>
      </div>
    </header>
  );
}
