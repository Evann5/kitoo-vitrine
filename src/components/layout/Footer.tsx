/**
 * Footer global du site vitrine Kitoo.
 *
 * - Disclaimer médical obligatoire, mis en valeur de façon douce (non alarmant) :
 *   « Kitoo ne remplace pas un suivi médical professionnel. »
 * - Colonnes : navigation (ancres), liens légaux RGPD (placeholders), réseaux
 *   (placeholders).
 * - Copyright avec année dynamique. Logo koala (jamais recoloré).
 *
 * Server Component : l'année est calculée au rendu, aucun JS client nécessaire.
 */
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const legalLinks = [
  { label: "Confidentialité", href: "#" },
  { label: "Mentions légales", href: "#" },
  { label: "CGU", href: "#" },
] as const;

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "LinkedIn", href: "#" },
] as const;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-eyebrow text-ink-500 font-bold tracking-[0.04em] uppercase">
        {title}
      </h2>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="rounded-control text-body text-ink-600 duration-kitoo ease-kitoo hover:text-brand-700 transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-ink-200 mt-auto border-t bg-white">
      <div className="max-w-content mx-auto w-full px-4 py-12 sm:px-6">
        {/* Disclaimer médical — doux, mis en évidence */}
        <p className="rounded-card bg-brand-100 text-body text-brand-800 px-5 py-4">
          Kitoo ne remplace pas un suivi médical professionnel. Si tu traverses
          un moment difficile, parles-en à un pro — on est là pour t&apos;y
          aider.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marque */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="font-display text-title text-ink-900 flex items-center gap-2">
              <Image
                src="/kitoo-logo.jpg"
                alt=""
                width={36}
                height={36}
                className="rounded-control"
              />
              <span>Kitoo</span>
            </div>
            <p className="text-body text-ink-600 mt-3 max-w-prose">
              {siteConfig.baseline}
            </p>
          </div>

          <FooterColumn title="Navigation" links={siteConfig.nav} />
          <FooterColumn title="Légal" links={legalLinks} />
          <FooterColumn title="Réseaux" links={socialLinks} />
        </div>

        <div className="border-ink-200 text-small text-ink-500 mt-10 border-t pt-6">
          © {year} Kitoo. Prends soin de toi. 💜
        </div>
      </div>
    </footer>
  );
}

export default Footer;
