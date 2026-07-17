// ===== Roteiro by Via Vinho: GENERATED FILE, do not edit by hand =====
// Estate facts come from the Atlas dataset (cellar-door-atlas/src/data/estates.json).
// Regenerate with: node scripts/gen-viavinho-data.mjs   (in the cellar-door-atlas repo)
// Data verified: 2026-07-17. Scope: setubal + lisboa only; the full 5-region
// planner lives on the Atlas surface.
window.ROTEIRO = {
  dataVerified: "2026-07-17",
  atlasName: "Cellar Door Atlas",

  regions: [
  {
    "id": "setubal",
    "name": "Setúbal & Arrábida",
    "base": "Azeitão / Setúbal",
    "tagline": "Moscatel cellars, limestone hills and the Sado estuary, 40 minutes from Lisbon.",
    "transport": "Around 40 min by car from Lisbon. The Azeitão cellars cluster close together, but you will want a driver or a guided day if everyone is tasting. Ride-hailing back to Lisbon is patchy after 6pm.",
    "lunch": [
      "Casa Mateus, Azeitão (tostas and local wines)",
      "O Farol, Setúbal docks (choco frito)",
      "Taberna Lefevre, Setúbal market area"
    ],
    "eveningTip": "Drive the N379-1 over the Arrábida ridge before sunset. The Portinho da Arrábida viewpoint is the postcard.",
    "viaVinho": true
  },
  {
    "id": "lisboa",
    "name": "Lisboa, Sintra & Colares",
    "base": "Sintra / Colares",
    "tagline": "Atlantic vineyards in sand, phylloxera-survivor vines and cellars minutes from the palaces.",
    "transport": "Colares is 45 min from Lisbon by car; the 1930s tram from Sintra to Praia das Maçãs is the scenic route. Wineries are spread out, so plan two visits per day, not four.",
    "lunch": [
      "Azenhas do Mar restaurant (cliffside)",
      "Adraga beach restaurant",
      "Tascantiga, Sintra (petiscos)"
    ],
    "eveningTip": "Finish in Lisbon with a wine bar crawl through Graça and Anjos, the neighbourhoods most visitors miss.",
    "viaVinho": false
  }
],

  // book: "required" | "walkin" | "confirm" (verified tri-state, never invented)
  // en: true | false | null  (tag rendered only when true)
  // price: number (EUR, verified) | null (renders "Price on request")
  wineries: [
  {
    "region": "setubal",
    "name": "Bacalhôa Vinhos (Azeitão)",
    "area": "Azeitão",
    "fit": [
      "2",
      "3-5",
      "6-9",
      "10+"
    ],
    "slot": "any",
    "why": "Winery plus a serious art collection, azulejos to contemporary sculpture. Book the combined tour.",
    "book": "walkin",
    "en": null,
    "price": 7,
    "site": "https://www.bacalhoa.pt/pt/adegamuseu-bacalhoa",
    "verified": "2026-07-17"
  },
  {
    "region": "setubal",
    "name": "José Maria da Fonseca (Casa Museu)",
    "area": "Vila Nogueira de Azeitão",
    "fit": [
      "2",
      "3-5",
      "6-9",
      "10+"
    ],
    "slot": "any",
    "why": "The 1834 manor house museum and old Moscatel cellars. The classic first stop, and one of few that absorbs bigger groups.",
    "book": "walkin",
    "en": null,
    "price": null,
    "site": "https://www.jmf.pt/index.php?id=95",
    "verified": "2026-07-17"
  },
  {
    "region": "setubal",
    "name": "Quinta de Alcube",
    "area": "Azeitão hills",
    "fit": [
      "2",
      "3-5",
      "6-9"
    ],
    "slot": "afternoon",
    "why": "Estate tucked into the Arrábida foothills, tastings among old vines and cork oaks.",
    "book": "confirm",
    "en": null,
    "price": null,
    "site": "https://www.quintadealcube.pt/",
    "verified": "2026-07-17"
  },
  {
    "region": "setubal",
    "name": "Venâncio da Costa Lima",
    "area": "Quinta do Anjo",
    "fit": [
      "2",
      "3-5",
      "6-9"
    ],
    "slot": "any",
    "why": "Fourth-generation family cellar pouring Moscatel among working concrete vats. The unpolished, real thing.",
    "book": "required",
    "en": null,
    "price": 16,
    "site": "https://venanciodacostalima.wine/enoturismo/",
    "verified": "2026-07-17"
  },
  {
    "region": "lisboa",
    "name": "Adega Regional de Colares",
    "area": "Colares",
    "fit": [
      "2",
      "3-5",
      "6-9",
      "10+"
    ],
    "slot": "any",
    "why": "The 1931 cooperative cathedral of Ramisco, ungrafted vines in sand that phylloxera never killed.",
    "book": "required",
    "en": null,
    "price": 27,
    "site": "https://arcolares.com/tours-vinicos/",
    "verified": "2026-07-17"
  },
  {
    "region": "lisboa",
    "name": "Adega Viúva Gomes",
    "area": "Almoçageme, Colares",
    "fit": [
      "2",
      "3-5"
    ],
    "slot": "morning",
    "why": "1808 cellar, family-run, pouring old Colares vintages you cannot taste anywhere else. Tiny, book well ahead.",
    "book": "required",
    "en": null,
    "price": 38,
    "site": "https://viuvagomes.com/en/wine-tastings/",
    "verified": "2026-07-17"
  },
  {
    "region": "lisboa",
    "name": "AdegaMãe",
    "area": "Torres Vedras",
    "fit": [
      "2",
      "3-5",
      "6-9",
      "10+"
    ],
    "slot": "any",
    "why": "Modern Atlantic winery from the Riberalves family, an easy add on the way north. Takes groups well.",
    "book": "required",
    "en": null,
    "price": 18,
    "site": "https://adegamae.pt/visitas-e-provas/programa-de-provas/",
    "verified": "2026-07-17"
  },
  {
    "region": "lisboa",
    "name": "Casal Sta. Maria",
    "area": "Colares",
    "fit": [
      "2",
      "3-5",
      "6-9"
    ],
    "slot": "afternoon",
    "why": "Vineyards almost touching Cabo da Roca, Europe's westernmost point. Crisp Atlantic whites.",
    "book": "required",
    "en": null,
    "price": 36.9,
    "site": "https://casalstamaria.pt/enotourism/",
    "verified": "2026-07-17"
  },
  {
    "region": "lisboa",
    "name": "Quinta de Sant'Ana",
    "area": "Gradil, Mafra",
    "fit": [
      "2",
      "3-5",
      "6-9"
    ],
    "slot": "any",
    "why": "Family wine estate with a baroque chapel under the Mafra hills. Tastings feel like visiting friends.",
    "book": "required",
    "en": null,
    "price": 45,
    "site": "https://www.quintadesantana.com/quinta/contact/#book-tasting",
    "verified": "2026-07-17"
  }
],

  viaVinhoTours: [
  {
    "region": "setubal",
    "name": "Savour the Setúbal Story",
    "price": "€350",
    "url": "https://viavinho.net/classic/savour-the-setubal-story/",
    "blurb": "Via Vinho's flagship full day: wineries, Arrábida and the estuary, hosted end to end. Transport, tastings and lunch handled."
  },
  {
    "region": "setubal",
    "name": "Setúbal Indulgence",
    "price": "private",
    "url": "https://viavinho.net/classic/setubal-indulgence/",
    "blurb": "The private full-day version, built around your group."
  },
  {
    "region": "lisboa",
    "name": "Graça & Anjos After Dark",
    "price": "evening",
    "url": "https://viavinho.net/classic/graca-anjos-after-dark/",
    "blurb": "An evening wine walk through Lisbon's Graça and Anjos, the neighbourhood bars tourists never find."
  }
],

  config: {
    SUPABASE_URL: "https://vqzhcyyimdryslsxhiya.supabase.co",
    SUPABASE_ANON_KEY: "sb_publishable_n42lmhlLENv3XdERySEw1g_uNlfa9TG",
    CONTACT: "hello@viavinho.net",
    SOURCE: "viavinho"
  }
};
