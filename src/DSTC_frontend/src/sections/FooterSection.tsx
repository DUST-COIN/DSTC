import { AiOutlineTwitter } from "react-icons/ai";
import { RiDiscordFill } from "react-icons/ri";
import { appLinks } from "../constants";
import { ReactElement, JSXElementConstructor, ReactNode, Key } from "react";

const socialIcons = [
  { Icon: AiOutlineTwitter, link: "https://x.com/@Dustdtc" },
  { Icon: RiDiscordFill, link: "#" }, // Placeholder for Discord link
];

const links: any = [];

export default function FooterSection() {
  return (
    <footer className="relative w-full row gap-4 justify-between">
      {/* Left Section */}
      <div className="col gap-4 min-w-[200px] justify-between">
        <div className="space-y-6">
          <h3 className="font-redzone text-4xl">Dust</h3>
          <div className="row gap-4">
            {socialIcons.map(({ Icon, link }, i) => (
              <a key={i} href={link} className="hover:text-white/50 text-white">
                <Icon size={18} color="inherit" />
              </a>
            ))}
          </div>
        </div>

        <span className="text-app_gray text-sm">
          All rights reserved &#169; <b>{new Date().getFullYear()}.</b>
        </span>
      </div>
      {/* Right Section */}
      <div className="row md:gap-24 gap-6"></div>
    </footer>
  );
}
