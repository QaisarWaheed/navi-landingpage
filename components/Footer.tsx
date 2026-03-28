import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-navy text-white">
      <Container className="py-12 md:py-14">
        <div className="flex flex-col items-center text-center">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-white transition-colors duration-200 hover:text-accent"
          >
            NAVI
          </Link>
          <p className="mt-2 text-base font-medium text-accent">Your Change Navigator</p>
          <div className="mt-10 w-full max-w-md border-t border-white pt-8">
            <p className="text-sm text-white">
              © {year} NAVI. All Rights Reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
