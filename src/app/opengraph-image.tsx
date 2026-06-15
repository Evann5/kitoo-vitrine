import { ImageResponse } from "next/og";
import { siteMetadata } from "@/lib/metadata";

/**
 * Image Open Graph générée (1200×630), brandée Kitoo (pervenche).
 * Sert aussi de Twitter card (réutilisée par `twitter.images` via la convention
 * de fichier Next). Police système par défaut de `next/og` (suffisant ici).
 */
export const alt = siteMetadata.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "linear-gradient(135deg, #F3F3FE 0%, #E9EAFA 100%)",
        color: "#16161D",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 40,
          fontWeight: 700,
          color: "#7E80E6",
          letterSpacing: "0.04em",
        }}
      >
        KITOO
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 76,
          fontWeight: 800,
          lineHeight: 1.05,
          maxWidth: 900,
        }}
      >
        Prends soin de toi, un jour à la fois.
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 34,
          color: "#5C5D70",
          maxWidth: 880,
        }}
      >
        Prévention en santé mentale pour les 18–24 ans.
      </div>
    </div>,
    { ...size },
  );
}
