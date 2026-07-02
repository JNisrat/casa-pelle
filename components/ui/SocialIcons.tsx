import Image from "next/image";

type SocialIconsProps = {
  className?: string;
  size?: number;
};

const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://instagram.com", icon: "/images/instagram.png" },
  { name: "Facebook", href: "https://facebook.com", icon: "/images/facebook.png" },
  { name: "Twitter", href: "https://twitter.com", icon: "/images/twitter.png" },
];

export function SocialIcons({ className = "", size = 54 }: SocialIconsProps) {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className="relative block"
          style={{ width: size, height: size }}
        >
          <Image
            src={social.icon}
            alt=""
            width={size}
            height={size}
            className="object-contain"
          />
        </a>
      ))}
    </div>
  );
}
