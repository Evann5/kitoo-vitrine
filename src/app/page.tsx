import { Container } from "@/components/ui";

/**
 * Page d'accueil (one-page). Pour l'instant un placeholder ; les sections
 * (hero, fonctionnalités, etc.) arrivent aux étapes suivantes. La section porte
 * l'ancre `#hero` ciblée par le lien « Accueil » de la navigation.
 */
export default function Home() {
  return (
    <section id="hero" className="scroll-mt-24 py-24">
      <Container>
        <h1 className="font-display text-display text-ink-900">
          Kitoo — site en construction
        </h1>
        <p className="text-body text-ink-600 mt-4 max-w-prose">
          La charpente est posée (header, navigation, footer). Les sections
          arrivent bientôt. Prends soin de toi en attendant.
        </p>
      </Container>
    </section>
  );
}
