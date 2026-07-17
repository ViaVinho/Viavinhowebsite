// ===== Roteiro by Via Vinho — curated region + winery data =====
// Editorial dataset, hand-curated Jul 2026. Prices and opening details are
// indicative; the app tells users to confirm when booking.
window.ROTEIRO = {

  regions: [
    {
      id: "setubal",
      name: "Setúbal & Arrábida",
      base: "Azeitão / Setúbal",
      tagline: "Moscatel cellars, limestone hills and the Sado estuary, 40 minutes from Lisbon.",
      transport: "Around 40 min by car from Lisbon. The Azeitão cellars cluster close together, but you will want a driver or a guided day if everyone is tasting. Ride-hailing back to Lisbon is patchy after 6pm.",
      lunch: ["Casa Mateus, Azeitão (tostas and local wines)", "O Farol, Setúbal docks (choco frito)", "Taberna Lefevre, Setúbal market area"],
      eveningTip: "Drive the N379-1 over the Arrábida ridge before sunset. The Portinho da Arrábida viewpoint is the postcard.",
      viaVinho: true
    },
    {
      id: "lisboa",
      name: "Lisboa, Sintra & Colares",
      base: "Sintra / Colares",
      tagline: "Atlantic vineyards in sand, phylloxera-survivor vines and cellars minutes from the palaces.",
      transport: "Colares is 45 min from Lisbon by car; the 1930s tram from Sintra to Praia das Maçãs is the scenic route. Wineries are spread out, so plan two visits per day, not four.",
      lunch: ["Azenhas do Mar restaurant (cliffside)", "Adraga beach restaurant", "Tascantiga, Sintra (petiscos)"],
      eveningTip: "Finish in Lisbon with a wine bar crawl through Graça and Anjos, the neighbourhoods most visitors miss.",
      viaVinho: false
    },
    {
      id: "douro",
      name: "Douro Valley",
      base: "Pinhão / Peso da Régua",
      tagline: "The oldest demarcated wine region on earth. Terraced quintas, port lodges and river light.",
      transport: "No reliable ride-hailing in the valley. Base yourself in Pinhão, use the scenic Linha do Douro train from Porto (change or direct to Pinhão), and book a driver between quintas or pick estates walkable from Pinhão.",
      lunch: ["Cozinha da Clara, Quinta de la Rosa (Pinhão)", "Quinta Nova's Conceitus (book ahead)", "DOC by Rui Paula, Folgosa (splurge)"],
      eveningTip: "A one-hour rabelo boat run from Pinhão at golden hour beats any extra tasting.",
      viaVinho: false
    },
    {
      id: "alentejo",
      name: "Alentejo",
      base: "Évora / Reguengos de Monsaraz",
      tagline: "Big skies, clay-amphora wines made the Roman way, and estates that feed you properly.",
      transport: "You need a car; distances are real (30 to 50 min between estates). Évora works as base. Assign a designated driver or book estate lunches so tastings sit alongside food.",
      lunch: ["Esporão's restaurant, Reguengos (book well ahead)", "Taberna Típica Quarta-Feira, Évora", "Herdade dos Grous restaurant, Albernoa"],
      eveningTip: "Monsaraz village at dusk, walls above the Alqueva lake, is worth planning the whole day around.",
      viaVinho: false
    },
    {
      id: "verde",
      name: "Vinho Verde & Minho",
      base: "Ponte de Lima / Melgaço",
      tagline: "Green river valleys, granite manor houses and the home of serious Alvarinho.",
      transport: "Rent a car from Porto (90 min to Ponte de Lima). Estates are far apart; pick one sub-valley per day. Monção and Melgaço, the Alvarinho heartland, deserve their own day.",
      lunch: ["Solar do Bacalhau, Ponte de Lima", "Adega do Sossego, Melgaço", "O Forno, Ponte da Barca"],
      eveningTip: "The Roman bridge at Ponte de Lima with a glass of chilled Loureiro is the region in one image.",
      viaVinho: false
    }
  ],

  // fit: which group sizes a visit genuinely works for
  // book: "required" | "recommended" | "walk-in"
  // slot: "morning" | "afternoon" | "any"
  wineries: [
    // Setúbal & Arrábida
    {region:"setubal", name:"José Maria da Fonseca", area:"Vila Nogueira de Azeitão", fit:["2","3-5","6-9","10+"], book:"recommended", en:true, price:"from ~€10", slot:"any",
     why:"The 1834 manor house museum and old Moscatel cellars. The classic first stop, and one of few that absorbs bigger groups.", site:"https://www.jmf.pt"},
    {region:"setubal", name:"Bacalhôa Vinhos", area:"Azeitão", fit:["2","3-5","6-9","10+"], book:"required", en:true, price:"from ~€12", slot:"any",
     why:"Winery plus a serious art collection, azulejos to contemporary sculpture. Book the combined tour.", site:"https://www.bacalhoa.pt"},
    {region:"setubal", name:"Venâncio da Costa Lima", area:"Quinta do Anjo", fit:["2","3-5","6-9"], book:"recommended", en:true, price:"from ~€8", slot:"any",
     why:"Fourth-generation family cellar pouring Moscatel among working concrete vats. The unpolished, real thing.", site:"https://www.venanciocostalima.pt"},
    {region:"setubal", name:"Quinta de Alcube", area:"Azeitão hills", fit:["2","3-5","6-9"], book:"required", en:true, price:"from ~€15", slot:"afternoon",
     why:"Estate tucked into the Arrábida foothills, tastings among old vines and cork oaks.", site:"https://quintadealcube.pt"},
    {region:"setubal", name:"Casa Horácio Simões", area:"Palmela", fit:["2","3-5"], book:"required", en:true, price:"from ~€10", slot:"morning",
     why:"Small Palmela grower known for Castelão and fortified Moscatel Roxo. Couples and small groups only.", site:"https://vinhoshoraciosimoes.pt"},

    // Lisboa, Sintra & Colares
    {region:"lisboa", name:"Adega Regional de Colares", area:"Colares", fit:["2","3-5","6-9","10+"], book:"recommended", en:true, price:"from ~€12", slot:"any",
     why:"The 1931 cooperative cathedral of Ramisco, ungrafted vines in sand that phylloxera never killed.", site:"https://www.arcolares.com"},
    {region:"lisboa", name:"Adega Viúva Gomes", area:"Almoçageme, Colares", fit:["2","3-5"], book:"required", en:true, price:"from ~€20", slot:"morning",
     why:"1808 cellar, family-run, pouring old Colares vintages you cannot taste anywhere else. Tiny, book well ahead.", site:"https://www.adegaviuvagomes.com"},
    {region:"lisboa", name:"Casal Sta. Maria", area:"Colares", fit:["2","3-5","6-9"], book:"required", en:true, price:"from ~€15", slot:"afternoon",
     why:"Vineyards almost touching Cabo da Roca, Europe's westernmost point. Crisp Atlantic whites.", site:"https://www.casalstamaria.pt"},
    {region:"lisboa", name:"Quinta de Sant'Ana", area:"Gradil, Mafra", fit:["2","3-5","6-9"], book:"required", en:true, price:"from ~€25", slot:"any",
     why:"Family wine estate with a baroque chapel under the Mafra hills. Tastings feel like visiting friends.", site:"https://www.quintadesantana.com"},
    {region:"lisboa", name:"AdegaMãe", area:"Torres Vedras", fit:["2","3-5","6-9","10+"], book:"recommended", en:true, price:"from ~€12", slot:"any",
     why:"Modern Atlantic winery from the Riberalves family, an easy add on the way north. Takes groups well.", site:"https://www.adegamae.pt"},

    // Douro
    {region:"douro", name:"Quinta do Bomfim", area:"Pinhão", fit:["2","3-5","6-9","10+"], book:"recommended", en:true, price:"from ~€20", slot:"any",
     why:"Symington family flagship, walkable from Pinhão station. The museum-quality intro to port.", site:"https://www.symington.com/visit"},
    {region:"douro", name:"Quinta de la Rosa", area:"Pinhão", fit:["2","3-5","6-9"], book:"recommended", en:true, price:"from ~€17", slot:"any",
     why:"Family estate on the riverbank with its own restaurant, so tasting rolls into lunch without a drive.", site:"https://www.quintadelarosa.com"},
    {region:"douro", name:"Quinta do Seixo (Sandeman)", area:"Valença do Douro", fit:["2","3-5","6-9","10+"], book:"recommended", en:true, price:"from ~€18", slot:"afternoon",
     why:"Amphitheatre views over the river bend and a polished visitor centre. Good for larger parties.", site:"https://www.sandeman.com"},
    {region:"douro", name:"Quinta do Tedo", area:"Folgosa", fit:["2","3-5"], book:"recommended", en:true, price:"from ~€15", slot:"morning",
     why:"Small organic estate at the Tedo river mouth. Intimate tastings, lovely picnic spots.", site:"https://www.quintadotedo.com"},
    {region:"douro", name:"Quinta Nova", area:"Covas do Douro", fit:["2","3-5","6-9"], book:"required", en:true, price:"from ~€20", slot:"any",
     why:"1764 estate with terraced walking trails and one of the valley's best winery restaurants.", site:"https://www.quintanova.com"},

    // Alentejo
    {region:"alentejo", name:"Herdade do Esporão", area:"Reguengos de Monsaraz", fit:["2","3-5","6-9","10+"], book:"required", en:true, price:"from ~€20", slot:"any",
     why:"The estate that put modern Alentejo on the map. Tower, olive groves, and a destination restaurant.", site:"https://www.esporao.com"},
    {region:"alentejo", name:"Adega Cartuxa", area:"Évora", fit:["2","3-5","6-9","10+"], book:"required", en:true, price:"from ~€16", slot:"any",
     why:"Historic Jesuit press house minutes from Évora's centre, home of Pêra-Manca.", site:"https://www.cartuxa.pt"},
    {region:"alentejo", name:"Fitapreta", area:"Évora", fit:["2","3-5","6-9"], book:"required", en:true, price:"from ~€18", slot:"afternoon",
     why:"António Maçanita's winery at a 14th-century palace. The modern-radical side of Alentejo.", site:"https://www.fitapreta.com"},
    {region:"alentejo", name:"Adega José de Sousa", area:"Reguengos de Monsaraz", fit:["2","3-5","6-9"], book:"required", en:true, price:"from ~€15", slot:"morning",
     why:"114 clay talhas fermenting wine the Roman way. Unlike anywhere else in Europe.", site:"https://www.jmf.pt"},
    {region:"alentejo", name:"Herdade dos Grous", area:"Albernoa, Beja", fit:["2","3-5","6-9","10+"], book:"required", en:true, price:"from ~€18", slot:"any",
     why:"Lake, horses, hotel and a farm-to-table restaurant. The full slow-Alentejo day.", site:"https://www.herdade-dos-grous.com"},

    // Vinho Verde & Minho
    {region:"verde", name:"Quinta da Aveleda", area:"Penafiel", fit:["2","3-5","6-9","10+"], book:"recommended", en:true, price:"from ~€15", slot:"any",
     why:"Romantic 19th-century gardens around the country's best-known Vinho Verde house.", site:"https://www.aveleda.com"},
    {region:"verde", name:"Soalheiro", area:"Melgaço", fit:["2","3-5","6-9"], book:"required", en:true, price:"from ~€15", slot:"any",
     why:"The Alvarinho benchmark, mountain vineyards on the Spanish border. Worth the drive alone.", site:"https://www.soalheiro.com"},
    {region:"verde", name:"Palácio da Brejoeira", area:"Monção", fit:["2","3-5","6-9","10+"], book:"required", en:true, price:"from ~€12", slot:"morning",
     why:"Neoclassical palace and the historic cradle of estate Alvarinho. Tour the palace, then taste.", site:"https://www.palaciodabrejoeira.pt"},
    {region:"verde", name:"Quinta de Santa Cristina", area:"Celorico de Basto", fit:["2","3-5","6-9"], book:"recommended", en:true, price:"from ~€10", slot:"afternoon",
     why:"Vinho Verde's quieter eastern hills, vineyard walks and single-varietal tastings.", site:"https://www.quintasantacristina.pt"}
  ],

  // Via Vinho live experiences used as anchor days
  viaVinhoTours: [
    {region:"setubal", name:"Savour the Setúbal Story", price:"€350", url:"https://viavinho.net/classic/savour-the-setubal-story/",
     blurb:"Via Vinho's flagship full day: wineries, Arrábida and the estuary, hosted end to end. Transport, tastings and lunch handled."},
    {region:"setubal", name:"Setúbal Indulgence", price:"private", url:"https://viavinho.net/classic/setubal-indulgence/",
     blurb:"The private full-day version, built around your group."},
    {region:"lisboa", name:"Graça & Anjos After Dark", price:"evening", url:"https://viavinho.net/classic/graca-anjos-after-dark/",
     blurb:"An evening wine walk through Lisbon's Graça and Anjos, the neighbourhood bars tourists never find."}
  ],

  config: {
    SUPABASE_URL: "https://vqzhcyyimdryslsxhiya.supabase.co",
    SUPABASE_ANON_KEY: "sb_publishable_n42lmhlLENv3XdERySEw1g_uNlfa9TG",
    CONTACT: "hello@viavinho.net"
  }
};
