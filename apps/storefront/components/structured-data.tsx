export function StructuredData() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LaVic Kombucha",
    url: base,
    logo: `${base}/brand/lavic-logo-color.png`,
    slogan: "Viva com gás."
  };

  const serialized = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json">{serialized}</script>;
}
