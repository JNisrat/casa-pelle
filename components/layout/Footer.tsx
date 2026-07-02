import Image from "next/image";
import Link from "next/link";
import { CONTACT, FOOTER_MENU_LINKS, SITE_NAME } from "@/lib/constants";
import { SocialIcons } from "@/components/ui/SocialIcons";

const MENU_COLUMNS = [
  FOOTER_MENU_LINKS.slice(0, 2),
  FOOTER_MENU_LINKS.slice(2, 4),
];

export function Footer() {
  return (
    <footer id="footer" className="relative mt-0 min-h-[280px]">
      <div className="absolute inset-0">
        <Image
          src="/images/footer-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-[var(--color-footer-overlay)]" />
      </div>

      <div className="relative mx-auto grid max-w-[var(--max-width)] gap-12 px-6 py-14 md:grid-cols-3 md:gap-16 md:px-16 md:py-16 lg:gap-24 lg:px-28">
        <div>
          <p className="font-serif text-[18px] text-black">{SITE_NAME}</p>
          <SocialIcons className="mt-10" size={45} />
        </div>

        <div>
          <h2 className="font-serif text-[18px] text-black">Menu</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-12 gap-y-4">
            {MENU_COLUMNS.map((column, columnIndex) => (
              <ul key={columnIndex} className="space-y-4">
                {column.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="font-body text-[16px] text-black">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-[18px] text-black">Contacts</h2>
          <ul className="mt-8 space-y-4">
            <li>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="font-body text-[16px] text-black">
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="font-body text-[16px] text-black">
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
