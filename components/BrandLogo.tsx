import Image from "next/image";
import Link from "next/link";

type Props = { variant: "header" | "footer"; onClick?: () => void };

/** Wordmark asset: `public/images/navi-logo.png` (from NAVI transparent logo). Header uses a CSS filter tinted to `--accent` (#0073fc). */
export function BrandLogo({ variant, onClick }: Props) {
  const footer = variant === "footer";
  /** Source file is 2000×2000; width/height must match that aspect ratio or the image is stretched. */
  const image = (
    <Image
      src="/images/navi-logo.png"
      alt="NAVI — Your Change Navigator"
      width={2000}
      height={2000}
      className={
        footer
          ? "h-20 w-auto object-contain sm:h-[5.5rem] md:h-24"
          : "h-14 w-auto object-contain sm:h-16 [filter:brightness(0)_saturate(100%)_invert(32%)_sepia(100%)_saturate(7499%)_hue-rotate(204deg)_brightness(101%)_contrast(101%)]"
      }
      priority={!footer}
    />
  );

  return (
    <Link
      href="/"
      onClick={onClick}
      className="inline-flex shrink-0 items-center transition-opacity duration-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {image}
    </Link>
  );
}
