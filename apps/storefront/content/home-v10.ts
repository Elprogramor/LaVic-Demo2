export const homeV10 = {
  hero: {
    badge: "Descubra nossa seleção",
    title: "Viva Com Gás.",
    description:
      "Fermentada naturalmente, refrescante e feita para acompanhar a rotina com personalidade.",
    ctaLabel: "Veja aqui a loja",
    ctaHref: "/sabores",
    productName: "LaVic Limão",
    productPrice: "R$ 18,90",
  },
  testimonial: {
    label: "O que falam sobre a Kombucha",
    quote:
      "Há muito tempo os probióticos vêm sendo estudados para as mais diversas patologias, e os estudos só aumentam com um foco ainda maior na expressão genética dessas cepas e como elas interagem com nosso organismo e nossos genes trazendo benefícios para a nossa saúde.",
    author: "Francis Moura",
    role: "nutricionista",
  },
  bottled: {
    title: "Sabores Engarrafados",
    subtitle: "Garrafas 1 Litro e 500 ml",
    items: [
      { name: "LaVic Limão", price: "R$ 18,90", image: "/home-v06/flavors/lime.webp", href: "/produto/limao-1l" },
      { name: "LaVic Morango", price: "R$ 19,90", image: "/home-v06/flavors/strawberry.webp", href: "/produto/morango-1l" },
      { name: "LaVic Maracujá", price: "Em breve", image: "/home-v06/flavors/passion-fruit.webp", href: "/sabores" },
      { name: "LaVic Uva Verde", price: "Em breve", image: "/home-v06/flavors/green-grape.webp", href: "/sabores" },
    ],
  },
  rhythm: {
    title: "A kombucha que acompanha o seu ritmo.",
    description:
      "Uma experiência construída a partir de fermentação natural, sabores frescos e uma apresentação feita para transformar o produto em parte do momento.",
    detail:
      "Da primeira garrafa ao kit para compartilhar, a LaVic organiza a experiência em torno do sabor, do frescor e da simplicidade de escolher.",
    ctaLabel: "Conheça a LaVic",
    ctaHref: "/sobre",
  },
  intro: {
    title: "Uma breve introdução a quem somos",
    description:
      "A LaVic apresenta a kombucha de um jeito contemporâneo: produto no centro, comunicação clara e uma identidade pensada para transformar o consumo em experiência.",
    stats: [
      { value: "02", label: "sabores disponíveis na loja atual" },
      { value: "1L", label: "formato principal disponível" },
    ],
  },
  showcase: {
    title: "Você pode ser elegante e ainda ser saudável!",
    description:
      "Uma proposta que une presença, frescor e personalidade para transformar um momento simples em uma experiência marcante.",
    productName: "Espumante LaVic.",
    price: "R$ 49,98",
    ctaLabel: "Comprar agora",
    ctaHref: "/sabores",
  },
  trust: [
    { title: "Produto vivo e refrescante", copy: "Uma bebida feita para acompanhar diferentes momentos da rotina." },
    { title: "Qualidade e sabor", copy: "Ingredientes, cuidado e identidade reunidos em uma experiência simples." },
    { title: "Compromisso com a experiência", copy: "Frescor, apresentação e sabor tratados como parte da mesma entrega LaVic." },
  ],
  b2b: {
    kicker: "Para negócios",
    title: "LaVic no seu negócio.",
    description:
      "Uma jornada comercial própria para cafés, restaurantes, mercados, hotéis, academias, eventos e outros parceiros.",
    ctaLabel: "Saiba mais",
    ctaHref: "/revenda",
  },
  footer: {
    headline: "Subscribe Us",
    helpTitle: "Ajuda & Informações",
    helpLinks: [
      { label: "Pedidos", href: "/conta/pedidos" },
      { label: "Termos & Condições", href: "/sobre" },
      { label: "Entrega", href: "/checkout" },
      { label: "Minha conta", href: "/conta" },
    ],
    aboutTitle: "Sobre nós",
    aboutLinks: [
      { label: "Nossa história", href: "/sobre" },
      { label: "Sabores", href: "/sabores" },
      { label: "Kits", href: "/kits" },
      { label: "Revenda", href: "/revenda" },
    ],
    faqTitle: "Talvez sua dúvida já tenha uma resposta.",
    faq: [
      { label: "O que é a LaVic?", href: "/sobre" },
      { label: "Como comprar LaVic?", href: "/sabores" },
      { label: "Como levar LaVic para o meu negócio?", href: "/revenda" },
    ],
  },
} as const;
