"use client";

/**
 * Section FAQ — accordéon accessible (ancre `#faq`).
 *
 * Comportement : **un seul panneau ouvert à la fois** (clic sur une question
 * ouverte la referme). Chaque question est un vrai `<button>` (donc activable au
 * clavier via Entrée/Espace nativement), avec `aria-expanded` et `aria-controls`
 * pointant vers son panneau (`role="region"` étiqueté par la question). Focus
 * pervenche visible hérité du `:focus-visible` global.
 *
 * Ton : doux, rassurant, non clinique, tutoiement. Source : brief Kitoo.
 */
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { Container } from "@/components/ui";
import { cn } from "@/lib/cn";

type QA = { question: string; answer: string };

const faq: QA[] = [
  {
    question: "Mes données sont-elles confidentielles ?",
    answer:
      "Oui. Tes données t'appartiennent et restent privées. Tout est chiffré, et tu peux à tout moment consulter ou supprimer ce que tu as partagé.",
  },
  {
    question: "Comment accéder à Kitoo ?",
    answer:
      "Tu crées un compte en quelques secondes (connexion Google ou Apple) et tu peux commencer à noter ton humeur tout de suite. Pas de paperasse, pas de pression.",
  },
  {
    question: "Est-ce que Kitoo remplace un suivi psy ?",
    answer:
      "Non, et ce n'est pas son rôle. Kitoo t'accompagne au quotidien et t'oriente vers des ressources, mais ne remplace pas un suivi médical professionnel. Si tu en as besoin, on t'aide à aller vers un pro.",
  },
  {
    question: "Comment se passe l'échange avec un professionnel ?",
    answer:
      "Tu échanges par messagerie sécurisée avec un psychologue partenaire, à ton rythme. Tu écris quand tu veux, tu n'es jamais seul·e face à un écran blanc.",
  },
  {
    question: "Mes échanges sont-ils sécurisés ?",
    answer:
      "Oui. Les connexions passent en HTTPS et les échanges sont chiffrés. Seuls toi et ton interlocuteur avez accès au contenu de vos conversations.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section
      id="faq"
      className="scroll-mt-24 py-16 sm:py-24"
      aria-labelledby="faq-title"
    >
      <Container width="prose">
        <p className="text-eyebrow text-brand-600 font-bold tracking-[0.04em] uppercase">
          Questions fréquentes
        </p>
        <h2
          id="faq-title"
          className="font-display text-title text-ink-900 sm:text-display mt-4"
        >
          On répond à tes doutes.
        </h2>

        <ul className="mt-8 flex flex-col gap-3">
          {faq.map((item, index) => {
            const isOpen = open === index;
            const buttonId = `${baseId}-q-${index}`;
            const panelId = `${baseId}-a-${index}`;
            return (
              <li
                key={item.question}
                className="rounded-card overflow-hidden bg-white shadow-sm"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="text-heading text-ink-900 duration-kitoo ease-kitoo hover:bg-brand-50 flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold transition-colors"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className={cn(
                        "text-brand-600 duration-kitoo ease-kitoo h-5 w-5 shrink-0 transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="text-body text-ink-600 px-5 pb-5"
                >
                  {item.answer}
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export default Faq;
