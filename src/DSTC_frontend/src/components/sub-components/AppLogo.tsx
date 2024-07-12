import type { DetailedHTMLProps, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export default function AppLogo({ className, ...props }: Props) {
  return (
    <h2 {...props} className={`text-4xl font-redzone app-logo ${className}`}>
      <div className="rounded-full overflow-hidden w-15 h-15 md:w-56 md:h-56">
        <img
          src="https://pbs.twimg.com/profile_images/1792489050097487873/QWiNQKDa_400x400.jpg"
          alt="etherum_logo"
          className="w-full h-full object-contain"
        />
      </div>
    </h2>
  );
  return (
    <h2 className="font-redzone text-4xl bg-gradient-to-br from-app via-fuchsia-300/80 bg-clip-text text-transparent">
      Dust
    </h2>
  );
}
