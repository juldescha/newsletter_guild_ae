/* ============================================================================
   NEWSLETTER — CONTENU DE L'ÉDITION
   ----------------------------------------------------------------------------
   C'est le SEUL fichier à modifier pour produire une nouvelle édition.
   Collez / générez ce contenu depuis Coda, Slack ou n'importe quelle source.
   Le design se régénère automatiquement.

   • Pour MASQUER une section sans la supprimer : "enabled": false
   • Pour RÉORDONNER : changez l'ordre des objets dans le tableau "sections"
   • Chaque "type" correspond à une mise en page (voir le guide en bas de page)
   ========================================================================== */

window.NEWSLETTER = {
  meta: {
    kicker: "Newsletter",
    title: "Analytics Engineer",
    org: "Converteo · Hub Tech",
    edition: "Juin 2026",
    issue: "Édition #01",
    footer: {
      links: [
        { label: "#hub-tech", href: "https://converteo.slack.com/archives/C0AQV8TV1PS" },
        { label: "#guild_analytics_engineering", href: "https://converteo.slack.com/archives/C0645TMCFMZ" },
      ],
      coda: { label: "Guild Analytics Engineer", note: "L'espace de la guild sur Coda", href: "https://coda.io/d/Hub-Tech_dSPqU1ephYq/Analytics-Engineer_suEUFiES#_luRqXHil" },
    },
  },

  sections: [
    /* ---------- ÉDITO ----------------------------------------------------- */
    {
      id: "edito",
      type: "edito",
      enabled: true,
      eyebrow: "Édito & Highlights",
      title: "Le mois où la guild AE a basculé dans l'Agentic BI.",
      body: [
        "Ces dernières semaines ont été rythmées par les ponts de mai mais surtout par l'implication de tous dans les projets internes ! Un grand merci pour votre dynamisme.",
        "Ce mois-ci, focus sur la montée en compétence sur les sujets de BI Next Gen, nos projets clients, et les premiers pas très prometteurs de la guild AE vers les sujets d'Agentic BI — parfaitement illustrés par la récente démo sur la BI Next Gen !",
      ],
      signature: "La guild Analytics Engineering",
    },

    /* ---------- HIGHLIGHT CHIFFRÉ : CERTIFS ------------------------------- */
    {
      id: "certifs",
      type: "stats",
      enabled: true,
      eyebrow: "Highlight du mois",
      title: "25 nouveaux certifiés BI Next Gen",
      intro: "Bravo à tous ! Retour en chiffres sur la promo qui vient de boucler le track.",

      imageId: "certifs-img",
      src: "images/062026-Remise diplome.jpg",
      imageCaption: "Cérémonie de remise BING — 27/05/2026",
      stats: [
        { value: "45", label: "inscrits" },
        { value: "25", label: "certifiés" },
        { value: "9", label: "certifiés avec spécialisation (Agentic & RLS)" },
        { value: "17", label: "dashboards finaux réalisés" },
        { value: "468", label: "commits au total" },
      ],
      notes: [
        "2 outils communs : dbt & Git",
        "2 outils au choix : Looker & Power BI",
      ],
      cta: { label: "Plus de détails", channel: "#c_track_binextgen", href: "https://converteo.slack.com/archives/C0972BMU76J" },
      byline: "Contact : Gaylor Brunner"

    },

    /* ---------- CERTIFICATIONS / FORMATIONS (tableau) -------------------- */
    {
      id: "certif-formation",
      type: "training",
      enabled: true,
      eyebrow: "Certifications & formations",
      title: "Les parcours en cours & validés",
      intro: "Le suivi des certifications et formations de la guild ce mois-ci.",
      rows: [
        { first: "Chaima", last: "Abidi", kind: "Formation", topic: "Vertex IA for Commerce", status: "Validée" },
        { first: "Sabrina", last: "Hassaim", kind: "Certification", topic: "dbt Fundamentals", status: "En cours" },
        { first: "Léa", last: "Sivakuru", kind: "Certification", topic: "GCP Data Engineering", status: "En cours" },
        { first: "Adlane", last: "Ouerk", kind: "Certification", topic: "GCP Data Engineering", status: "En cours" },
        { first: "Lucie", last: "Martin", kind: "Certification", topic: "GCP Data Engineering", status: "En cours" },
        { first: "Luc", last: "Lagrange", kind: "Certification", topic: "GCP Data Engineering", status: "En cours" },
      ],
    },

    /* ---------- DIVISEUR : GUILD SPOTLIGHTS ------------------------------- */
    {
      id: "div-spotlights",
      type: "divider",
      enabled: true,
      label: "Guild spotlights",
      sub: "Les réalisations qui ont marqué la guild ce mois-ci.",
    },

    /* ---------- SPOTLIGHT : TALK MY DATA ---------------------------------- */
    {
      id: "talk-my-data",
      type: "spotlight",
      enabled: true,
      eyebrow: "Réalisation interne",
      title: "Focus sur le Talk My Data",
      body: [
        "Focus sur le groupe de Théau, Fodié et Meirkhan pour leur réalisation d'un agent branché sur la couche sémantique de Looker, permettant de communiquer en langage naturel avec la donnée.",
      ],
      imageId: "talk-my-data-img",
      src: "images/062026-theau.jpg",
      cta: [
        { label: "Voir le replay", href: "https://drive.google.com/open?id=1yh1vu2TN-fFK921a55zdP1DWisOZMUK7" },
        { label: "Repo GitHub", href: "https://github.com/Converteo/bing-batch-2-all-repos/tree/main/bing-batch2-group10" },
      ],

    },

    /* ---------- SPOTLIGHT : SPECIAL GUEST NAO ---------------------------- */
    {
      id: "nao-agent",
      type: "spotlight",
      enabled: true,
      eyebrow: "Special Guest",
      byline: "Guild AE",
      title: "Nao Agent — par Claire Gouze",
      body: [
        "Nous avons eu le plaisir d'accueillir Claire Gouze, fondatrice de Nao Labs, qui nous a partagé sa vision et son produit autour du « Talk to my data ».",
        "Le pitch : un agent analytics pluggé sur des contextes définis, qui se déploie directement sur vos infrastructures.",
      ],
      imageId: "nao-agent-img",
      src: "images/062026-Nao.jpg",
      imageCaption: "Special Guest — Claire Gouze (Nao Agent)",
      badge: "100% Open Source",
      cta: { label: "Soutenir le projet sur GitHub", href: "https://docs.google.com/presentation/u/0/d/1aTXGjSBYWPx0KaSxJ5CpBsFhtBLkiPnaSCW8ildEQK8/edit" },
      ctaNote: "Pour les soutenir : une petite étoile ⭐ sur le projet.",
    },

    /* ---------- DIVISEUR : RESSOURCES & VEILLE ---------------------------- */
    {
      id: "div-ressources",
      type: "divider",
      enabled: true,
      label: "Ressources & veille",
      sub: "Ce qu'il ne fallait pas manquer côté outils et montée en compétence.",
    },

    /* ---------- CARTES : VEILLE / BILAN / BIBLIO -------------------------- */
    {
      id: "ressources-cards",
      type: "cards",
      enabled: true,
      items: [
        {
          title: "Veille bi-mensuelle",
          body: "Retrouvez 6 actualités du moment autour de l'Analytics Engineering.",
          meta: ["⏰ Toutes les 2 semaines", "📍 #guild_analytics_engineering"],
          cta: { label: "Voir les dernières veilles", href: "https://coda.io/d/_dSPqU1ephYq/Vitrine_su_Q5Xzx?highlightBlockId=cl-z5KIB2aj5s#_luB2aj5s" },
        },
        {
          title: "Bilan de compétence AE",
          body: "Sur inspiration de l'équipe Product, nous avons dupliqué le bilan de compétence avec les skills AE : positionnez votre expertise sur un radar (transformation, ingénierie, agentique, gouvernance…) et suivez les recommandations de formation.",
          meta: [],
          cta: { label: "Lancer mon bilan", href: "#" },
        },
        {
          title: "Bibliothèque de CV",
          body: "La bibliothèque de CV AE est désormais 100% disponible. Inspirez-vous des formats et mettez le vôtre à jour.",
          meta: ["✅ Disponible maintenant"],
          cta: { label: "Accéder à la bibliothèque", href: "https://drive.google.com/drive/folders/1RaX6sRXszXWframO3-SwUZ1Rr3UtMi2W" },
        },
      ],
    },

    /* ---------- ACTUALITÉ DATA ------------------------------------------- */
    {
      id: "actu-data",
      type: "news",
      enabled: true,
      eyebrow: "Actualité Data",
      title: "Trois signaux à avoir en tête",
      items: [
        {
          lead: "GPT-5.5 entre dans Snowflake Cortex",
          body: "L'intégration permet désormais de planifier, valider et exécuter des pipelines de données complexes de manière autonome, grâce à ses capacités agentiques.",
        },
        {
          lead: "Git & Python natifs dans BigQuery Studio",
          body: "L'arrivée native de Git et de Python standardise les pratiques de CI/CD et simplifie l'analyse de données non structurées directement au sein de l'entrepôt.",
        },
        {
          lead: "L'AE, nouvel « Architecte de Contexte »",
          body: "Le benchmark dbt 2026 démontre qu'associer une couche sémantique robuste à l'IA permet d'atteindre 100% de précision dans la génération de requêtes SQL.",
        },
      ],
    },

    /* ---------- ASSETS TECHNIQUES --------------------------------------- */
    {
      id: "assets",
      type: "assets",
      enabled: true,
      eyebrow: "Assets techniques",
      title: "À récupérer cette semaine",
      items: [
        {
          icon: "🧪",
          body: "Vibecoding chez Samsung — Benoît a conçu, seul et sans bagage de dév, une interface d'analyse des avis et commentaires clients à la sortie du Samsung S26. Son analyse de sentiments a livré au client des insights clairs et actionnables : la preuve qu'un vrai projet de dev se mène désormais de bout en bout, côté AE.",
          cta: { label: "Voir le projet", href: "#" },
        },
      ],
    },

    /* ---------- BIENVENUE ----------------------------------------------- */
    {
      id: "welcome",
      type: "people",
      enabled: true,
      eyebrow: "Bienvenue !",
      title: "Ils rejoignent la Guild",
      items: [
        { name: "Alexis OUARAB", role: "CS Analytics Engineer", imageId: "welcome-1", src: "images/062026-alexis.png" },
        { name: "Sabrina HASSAIM", role: "C Analytics Engineer", imageId: "welcome-2", src: "images/062026-sabrina.png" },
        { name: "Aymeric BESCOS", role: "C Analytics Engineer", imageId: "welcome-3", src: "images/062026-aymeric.png" },
      ],
    },

    /* ---------- AGENDA --------------------------------------------------- */
    {
      id: "agenda",
      type: "agenda",
      enabled: true,
      eyebrow: "Mark your calendar",
      title: "Les prochains rendez-vous",
      intro: "Événements, ateliers et sessions de formation à venir. Pingez les contacts pour participer.",
      rows: [
        { event: "Communauté Analytics", how: "Communauté AE", contact: "Emilie He · Kevin Boure" },
        { event: "Kickoff Track 3", how: "Inscription Slack", contact: "Gaylor Brunner" },
      ],
    },

    /* ---------- FEEDBACK ------------------------------------------------- */
    {
      id: "feedback",
      type: "feedback",
      enabled: true,
      eyebrow: "Feedback & suggestions",
      title: "Un projet, une actu, un feedback ?",
      body: "N'hésitez pas à nous pinger sur Slack pour la prochaine édition, ou directement sur Coda.",
    },
  ],
};
