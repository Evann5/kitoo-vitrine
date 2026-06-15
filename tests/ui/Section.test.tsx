import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Section } from "@/components/ui/Section";

describe("Section", () => {
  test("rend un <section> avec l'ancre id", () => {
    const { container } = render(<Section id="faq">contenu</Section>);
    const section = container.querySelector("section#faq");
    expect(section).not.toBeNull();
    // décalage d'ancre pour le header sticky
    expect(section).toHaveClass("scroll-mt-24");
  });

  test("transmet className", () => {
    const { container } = render(
      <Section id="x" className="extra">
        y
      </Section>,
    );
    expect(container.querySelector("section")).toHaveClass("extra");
  });
});
