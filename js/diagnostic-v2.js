/* ============================================================
   STEPH'EDUC — Mini-diagnostic comportemental
   ------------------------------------------------------------
   Ce questionnaire croise huit familles d'informations : âge,
   ancienneté de la relation, origine, difficultés, apparition,
   apprentissages, réponse aux demandes et contextes déclencheurs.

   Il formule 2 ou 3 hypothèses de travail et des premières pistes.
   Il ne produit jamais de diagnostic médical ou comportemental
   définitif.
   ============================================================ */
(function (window, document) {
  'use strict';

  function option(value, label, exclusive) {
    return { v: value, label: label, exclusive: !!exclusive };
  }

  var QUESTIONS = [
    {
      id: 'age',
      type: 'single',
      text: "Quel âge a votre chien ?",
      options: [
        option('moins_6', "Moins de 6 mois"),
        option('6_12', "6 à 12 mois"),
        option('1_3', "1 à 3 ans"),
        option('plus_3', "Plus de 3 ans")
      ]
    },
    {
      id: 'anciennete',
      type: 'single',
      text: "Depuis combien de temps vit-il avec vous ?",
      options: [
        option('moins_3', "Moins de 3 mois"),
        option('3_12', "3 à 12 mois"),
        option('plus_1', "Plus d’un an")
      ]
    },
    {
      id: 'adoption',
      type: 'single',
      text: "Où l’avez-vous adopté ?",
      options: [
        option('elevage', "Dans un élevage"),
        option('refuge', "Dans un refuge ou une association"),
        option('particulier', "Auprès d’un particulier"),
        option('autre', "Autre")
      ]
    },
    {
      id: 'problematiques',
      type: 'multi',
      text: "Quelles sont vos principales problématiques ou attentes ?",
      hint: "Plusieurs réponses sont possibles.",
      options: [
        option('education', "Je souhaite simplement être accompagné dans son éducation (propreté, socialisation, commandes de base…)"),
        option('laisse', "Il tire en laisse ou a du mal à marcher calmement"),
        option('reactions', "Il aboie beaucoup ou réagit aux personnes, aux chiens ou à son environnement"),
        option('peur', "Il est peureux, anxieux ou facilement stressé"),
        option('maison', "Il a des comportements difficiles à gérer à la maison (sauts, excitation, aboiements, vols de nourriture…)"),
        option('solitude', "Il a du mal à rester seul (aboiements, hurlements, couinements, destructions, malpropreté…)"),
        option('chiens', "Il a des difficultés avec les autres chiens"),
        option('humains', "Il a des difficultés avec les humains ou les visiteurs"),
        option('autre', "Autre")
      ]
    },
    {
      id: 'apparition',
      type: 'single',
      text: "Depuis quand ces problématiques existent-elles ?",
      options: [
        option('adoption', "Depuis que je l’ai adopté"),
        option('progressif', "Elles sont apparues progressivement"),
        option('evenement', "Elles sont apparues à la suite d’un événement particulier (arrivée d’un bébé, déménagement, séparation, cohabitation avec un autre animal, attaque par un chien…)"),
        option('recent', "Elles sont apparues récemment sans raison évidente"),
        option('inconnu', "Je ne saurais pas dire")
      ]
    },
    {
      id: 'bases',
      type: 'multi',
      text: "Quelles bases votre chien maîtrise-t-il aujourd’hui ?",
      hint: "Sélectionnez toutes les réponses qui correspondent à votre chien.",
      options: [
        option('positions', "Il connaît les commandes « assis » et « couché »"),
        option('reste', "Il sait rester en place lorsque je le lui demande"),
        option('rappel', "Il revient correctement lorsque je le rappelle"),
        option('marche', "Il sait marcher calmement en laisse"),
        option('chiens', "Il est à l’aise avec les autres chiens"),
        option('humains', "Il est à l’aise avec les humains"),
        option('difficultes', "Il a encore des difficultés avec plusieurs de ces apprentissages", true)
      ]
    },
    {
      id: 'ecoute',
      type: 'single',
      text: "Lorsque vous lui demandez quelque chose, comment réagit-il ?",
      options: [
        option('facile', "Il m’écoute facilement, même lorsqu’il y a des distractions"),
        option('maison', "Il m’écoute bien à la maison, mais beaucoup moins à l’extérieur"),
        option('calme', "Il m’écoute lorsque l’environnement est calme, mais difficilement lorsqu’il y a des distractions"),
        option('emotion', "Il semble parfois ne plus m’entendre lorsqu’il est excité, stressé ou concentré sur quelque chose"),
        option('choisit', "Il comprend ce que je lui demande mais choisit souvent de ne pas le faire"),
        option('comprend_pas', "J’ai souvent l’impression qu’il ne comprend pas ce que j’attends de lui")
      ]
    },
    {
      id: 'situations',
      type: 'multi',
      text: "Dans quelles situations votre chien semble-t-il le plus en difficulté ?",
      hint: "Plusieurs réponses sont possibles.",
      options: [
        option('agitation', "Lorsqu’il y a beaucoup de monde, de bruit ou d’agitation"),
        option('rencontres', "Lorsqu’il rencontre des personnes ou des chiens"),
        option('separation', "Lorsqu’il est séparé de moi ou doit rester seul"),
        option('nouveau', "Lorsqu’il doit gérer une situation nouvelle ou inhabituelle"),
        option('frustration', "Lorsqu’il est très excité ou frustré"),
        option('calme_maison', "À la maison, lorsqu’il doit se calmer ou rester tranquille"),
        option('education', "Je ne remarque pas de situation particulière : c’est surtout son éducation qui me pose question", true)
      ]
    }
  ];

  var LABELS = {};
  QUESTIONS.forEach(function (question) {
    LABELS[question.id] = {};
    question.options.forEach(function (item) {
      LABELS[question.id][item.v] = item.label;
    });
  });

  var HYPOTHESES = {
    adaptation: {
      title: "Une phase d’adaptation encore en cours",
      text: "L’ancienneté de votre relation et le moment d’apparition des difficultés peuvent évoquer un chien qui n’a pas encore stabilisé tous ses repères. Cette piste doit être vérifiée en observant son évolution dans un quotidien prévisible.",
      tips: [
        "Installer des horaires et des règles simples, stables et prévisibles pendant plusieurs semaines.",
        "Préserver de vrais temps de repos et limiter l’accumulation de nouveautés les jours difficiles."
      ]
    },
    apprentissages: {
      title: "Des apprentissages encore fragiles ou incomplets",
      text: "L’âge, les bases déclarées et la compréhension des demandes suggèrent que certains comportements doivent probablement être reconstruits par petites étapes, avant d’être attendus dans des situations plus complexes.",
      tips: [
        "Travailler une seule compétence à la fois lors de séquences très courtes, puis récompenser immédiatement la réussite.",
        "Commencer dans un lieu facile avant d’ajouter progressivement distance, durée et distractions."
      ]
    },
    generalisation: {
      title: "Une difficulté à généraliser les acquis",
      text: "Le décalage entre ce que votre chien réussit au calme et ce qu’il peut faire dehors indique que l’apprentissage n’est peut-être pas encore disponible dans tous les contextes. Ce n’est pas nécessairement un refus d’obéir.",
      tips: [
        "Reprendre les exercices dans un environnement extérieur très calme, avec davantage de distance face aux distractions.",
        "Augmenter la difficulté un seul critère à la fois et revenir à une étape plus simple dès que le chien décroche."
      ]
    },
    regulation: {
      title: "Une surcharge émotionnelle ou un manque de régulation",
      text: "Les difficultés décrites dans l’excitation, la frustration, le bruit ou l’agitation peuvent correspondre à un niveau émotionnel trop élevé pour apprendre ou répondre correctement sur le moment.",
      tips: [
        "Repérer les premiers signes de montée en tension et proposer une pause avant que le chien ne dépasse son seuil.",
        "Favoriser les activités de flair, les promenades calmes et les retours au calme plutôt que de multiplier les sollicitations."
      ]
    },
    peur: {
      title: "Un besoin de sécurité face à la peur ou à la nouveauté",
      text: "La peur signalée, rapprochée des situations nouvelles ou très stimulantes, peut indiquer un besoin de reprendre confiance à distance et sans contrainte. Une exposition trop rapide risquerait d’intensifier les réactions.",
      tips: [
        "Laisser au chien une distance suffisante pour observer sans se figer, fuir, aboyer ou grogner.",
        "Associer les situations faciles à quelque chose d’agréable, sans le forcer à s’approcher ni à interagir."
      ]
    },
    solitude: {
      title: "Une difficulté liée à la séparation",
      text: "Les manifestations pendant les absences et le contexte de séparation peuvent évoquer une difficulté à rester seul. Il faudra distinguer ennui, manque d’habituation et véritable détresse liée à la séparation.",
      tips: [
        "Observer ou filmer quelques absences afin d’identifier le délai d’apparition et l’intensité des signes.",
        "Reprendre avec des absences très courtes, sous le seuil de détresse, puis augmenter progressivement."
      ]
    },
    chiens: {
      title: "Un inconfort dans les rencontres avec les chiens",
      text: "Les difficultés envers les congénères, surtout lorsqu’elles apparaissent dans les rencontres ou sous forte stimulation, peuvent relever de peur, de frustration ou d’une communication devenue difficile. La fonction exacte reste à observer.",
      tips: [
        "Éviter les rencontres frontales et conserver une distance où votre chien peut encore vous entendre et renifler.",
        "Privilégier des marches parallèles avec un chien calme plutôt que des contacts imposés."
      ]
    },
    humains: {
      title: "Un inconfort avec les humains ou les visiteurs",
      text: "Les réponses concernant les personnes et les rencontres peuvent évoquer un manque de sécurité, une anticipation négative ou une excitation difficile à réguler. Le langage corporel permettra de départager ces pistes.",
      tips: [
        "Demander aux visiteurs d’ignorer le chien au début et de le laisser choisir s’il souhaite s’approcher.",
        "Prévoir une zone refuge calme et renforcer les comportements d’observation ou de retour au calme."
      ]
    },
    maison: {
      title: "Des besoins ou des règles à rééquilibrer à la maison",
      text: "Les comportements domestiques, croisés avec la difficulté à se calmer, peuvent être entretenus par l’excitation, des besoins insuffisamment satisfaits ou des réponses humaines variables selon les moments.",
      tips: [
        "Vérifier l’équilibre entre sorties, flair, mastication, interactions et sommeil avant de demander davantage de calme.",
        "Définir en famille deux ou trois règles simples et renforcer systématiquement le comportement attendu."
      ]
    },
    laisse: {
      title: "Une marche en laisse à reconstruire dans le bon contexte",
      text: "La traction et la qualité d’écoute selon l’environnement suggèrent qu’il faut travailler à la fois la compétence de marche, la motivation à rester proche et la gestion des distractions.",
      tips: [
        "Commencer dans un lieu peu stimulant avec un équipement confortable et récompenser fréquemment la laisse détendue.",
        "Prévoir aussi des moments où le chien peut renifler librement afin que la promenade ne soit pas une contrainte permanente."
      ]
    },
    motivation: {
      title: "Une motivation à mieux identifier",
      text: "Lorsque le chien semble comprendre mais ne répond pas régulièrement, la valeur de la récompense, le contexte et le bénéfice de ce qu’il est déjà en train de faire doivent être comparés avant de conclure à un refus.",
      tips: [
        "Tester plusieurs récompenses : nourriture, jeu, interaction, autorisation d’aller renifler ou reprise de la promenade.",
        "Récompenser plus vite et plus généreusement dans les situations difficiles, puis espacer progressivement."
      ]
    },
    communication: {
      title: "Des consignes à rendre plus lisibles",
      text: "Le sentiment que le chien ne comprend pas ce qui est attendu peut venir de signaux variables, d’étapes trop rapides ou d’un environnement trop difficile au moment de la demande.",
      tips: [
        "Employer le même mot et le même geste pour une consigne, puis laisser au chien le temps de répondre sans répéter en boucle.",
        "Récompenser les petites approximations qui vont dans le bon sens avant d’exiger le comportement complet."
      ]
    }
  };

  function asArray(value) {
    if (Array.isArray(value)) return value;
    if (value === undefined || value === null) return [];
    return [value];
  }

  function includes(list, value) {
    return asArray(list).indexOf(value) !== -1;
  }

  function labelFor(questionId, value) {
    return (LABELS[questionId] && LABELS[questionId][value]) || value || "non précisé";
  }

  function joinFrench(items) {
    if (!items.length) return "aucun élément particulier";
    if (items.length === 1) return items[0];
    if (items.length === 2) return items[0] + " et " + items[1];
    return items.slice(0, -1).join(", ") + " et " + items[items.length - 1];
  }

  function calculate(answers) {
    var scores = {};
    var evidence = {};
    Object.keys(HYPOTHESES).forEach(function (key) {
      scores[key] = 0;
      evidence[key] = [];
    });

    function add(key, points, reason) {
      scores[key] += points;
      if (reason && evidence[key].indexOf(reason) === -1) evidence[key].push(reason);
    }

    var issues = asArray(answers.problematiques);
    var bases = asArray(answers.bases);
    var situations = asArray(answers.situations);
    var young = answers.age === 'moins_6' || answers.age === '6_12';
    var recentHome = answers.anciennete === 'moins_3';

    /* Les attentes déclarées donnent un premier axe, jamais une conclusion. */
    if (includes(issues, 'education')) add('apprentissages', 4, "vous recherchez d’abord un accompagnement éducatif");
    if (includes(issues, 'laisse')) add('laisse', 5, "la marche en laisse fait partie des difficultés principales");
    if (includes(issues, 'reactions')) add('regulation', 4, "les aboiements ou réactions apparaissent dans plusieurs contextes");
    if (includes(issues, 'peur')) add('peur', 6, "vous décrivez de la peur, de l’anxiété ou du stress");
    if (includes(issues, 'maison')) add('maison', 5, "les comportements à la maison sont difficiles à gérer");
    if (includes(issues, 'solitude')) add('solitude', 7, "les absences déclenchent des manifestations gênantes");
    if (includes(issues, 'chiens')) add('chiens', 7, "les relations avec les autres chiens sont difficiles");
    if (includes(issues, 'humains')) add('humains', 7, "les humains ou les visiteurs sont une source de difficulté");
    if (includes(issues, 'autre')) add('communication', 2, "votre situation demande encore à être précisée");

    /* Âge et ancienneté : ils modulent les difficultés sans les expliquer seuls. */
    if (answers.age === 'moins_6') add('apprentissages', 5, "votre chien est encore dans ses premiers mois d’apprentissage");
    if (answers.age === '6_12') {
      add('apprentissages', 3, "votre chien traverse encore une période de maturation");
      add('regulation', 1.5, "son jeune âge peut amplifier excitation et frustration");
    }
    if (answers.age === '1_3') add('generalisation', 1, "les acquis peuvent encore manquer de stabilité selon les contextes");
    if (recentHome) add('adaptation', 6, "votre chien vit avec vous depuis moins de trois mois");
    if (answers.anciennete === '3_12') add('adaptation', 2.5, "votre relation et ses repères sont encore relativement récents");
    if (answers.adoption === 'refuge' && answers.anciennete !== 'plus_1') {
      add('adaptation', 2, "son arrivée récente après un refuge ou une association invite à laisser du temps aux repères");
    }

    /* Temporalité : une apparition progressive ou liée à un événement change la lecture. */
    if (answers.apparition === 'adoption') {
      add('adaptation', recentHome ? 4 : 2, "les difficultés sont présentes depuis son adoption");
      add('apprentissages', 1, "les comportements n’ont peut-être pas encore été reconstruits dans votre quotidien");
    }
    if (answers.apparition === 'progressif') {
      add('regulation', 2.5, "les difficultés se sont installées progressivement");
      add('generalisation', 1.5, "les comportements ont pu se renforcer au fil des contextes");
    }
    if (answers.apparition === 'evenement') {
      add('regulation', 4, "un événement particulier précède l’apparition des difficultés");
      add('peur', 3, "le changement observé après un événement mérite d’explorer l’hypothèse émotionnelle");
    }
    if (answers.apparition === 'recent') add('regulation', 2.5, "le changement récent mérite d’en rechercher le contexte précis");
    if (answers.apparition === 'inconnu') add('communication', 1.5, "la chronologie reste à préciser par l’observation");

    /* Apprentissages déjà disponibles ou encore fragiles. */
    if (includes(bases, 'difficultes')) {
      add('apprentissages', 6, "plusieurs apprentissages de base restent difficiles");
      add('generalisation', 2, "les acquis ne semblent pas encore solides dans toutes les situations");
    } else {
      var educationalSkills = ['positions', 'reste', 'rappel', 'marche'];
      var mastered = educationalSkills.filter(function (key) { return includes(bases, key); }).length;
      if (mastered <= 1) add('apprentissages', 3, "peu de bases éducatives sont pour l’instant disponibles");
      if (mastered >= 3) add('generalisation', 1, "plusieurs bases sont connues mais leur disponibilité dépend peut-être du contexte");
    }
    if (!includes(bases, 'chiens') && includes(issues, 'chiens')) add('chiens', 2, "l’aisance avec les chiens n’est pas encore acquise");
    if (!includes(bases, 'humains') && includes(issues, 'humains')) add('humains', 2, "l’aisance avec les humains n’est pas encore acquise");

    /* Réponse aux demandes : compréhension, motivation et état émotionnel. */
    if (answers.ecoute === 'maison') add('generalisation', 7, "l’écoute est nettement meilleure à la maison qu’à l’extérieur");
    if (answers.ecoute === 'calme') {
      add('generalisation', 5, "les réponses diminuent dès que les distractions augmentent");
      add('regulation', 2, "le niveau de stimulation semble réduire sa disponibilité");
    }
    if (answers.ecoute === 'emotion') {
      add('regulation', 7, "l’excitation ou le stress semblent couper momentanément l’écoute");
      add('generalisation', 2, "les acquis deviennent indisponibles lorsque l’émotion monte");
    }
    if (answers.ecoute === 'choisit') add('motivation', 7, "il semble comprendre mais la motivation ne suffit pas toujours dans le contexte");
    if (answers.ecoute === 'comprend_pas') {
      add('communication', 7, "vous avez souvent l’impression que la demande n’est pas comprise");
      add('apprentissages', 3, "les étapes d’apprentissage méritent probablement d’être simplifiées");
    }

    /* Contextes déclencheurs. */
    if (includes(situations, 'agitation')) {
      add('regulation', 5, "le bruit, le monde ou l’agitation augmentent les difficultés");
      add('peur', 2, "les environnements chargés peuvent aussi réduire son sentiment de sécurité");
    }
    if (includes(situations, 'rencontres')) {
      add('chiens', includes(issues, 'chiens') ? 4 : 2, "les rencontres avec les chiens ou les personnes sont difficiles");
      add('humains', includes(issues, 'humains') ? 4 : 2, "les rencontres avec les chiens ou les personnes sont difficiles");
      add('regulation', 2, "les rencontres semblent augmenter rapidement son niveau émotionnel");
    }
    if (includes(situations, 'separation')) add('solitude', 7, "la séparation ou le fait de rester seul est un déclencheur identifié");
    if (includes(situations, 'nouveau')) {
      add('peur', 5, "les situations nouvelles ou inhabituelles le mettent en difficulté");
      add('adaptation', 1.5, "les nouveautés demandent peut-être davantage de temps d’adaptation");
    }
    if (includes(situations, 'frustration')) add('regulation', 6, "l’excitation ou la frustration sont des déclencheurs importants");
    if (includes(situations, 'calme_maison')) {
      add('maison', 6, "le retour au calme à la maison est particulièrement difficile");
      add('regulation', 3, "la régulation émotionnelle semble aussi en jeu au domicile");
    }
    if (includes(situations, 'education')) {
      add('apprentissages', 5, "aucun déclencheur précis ne ressort, mais l’éducation générale pose question");
      add('motivation', 1, "la façon de renforcer les bons comportements peut être explorée");
    }

    /* Croisements forts : une même information confirmée par plusieurs réponses. */
    if (young && (includes(issues, 'education') || includes(bases, 'difficultes'))) {
      add('apprentissages', 4, "le jeune âge et les bases encore fragiles se renforcent mutuellement");
    }
    if (recentHome && answers.apparition === 'adoption') {
      add('adaptation', 4, "l’arrivée récente et le début immédiat des difficultés orientent vers l’adaptation au nouveau cadre");
    }
    if (includes(issues, 'peur') && (includes(situations, 'nouveau') || includes(situations, 'agitation'))) {
      add('peur', 4, "la peur déclarée se retrouve dans des contextes nouveaux ou très stimulants");
    }
    if (includes(issues, 'solitude') && includes(situations, 'separation')) {
      add('solitude', 4, "la difficulté déclarée est confirmée spécifiquement par les situations de séparation");
    }
    if (includes(issues, 'chiens') && includes(situations, 'rencontres')) {
      add('chiens', 4, "les difficultés avec les chiens sont confirmées dans les situations de rencontre");
    }
    if (includes(issues, 'humains') && includes(situations, 'rencontres')) {
      add('humains', 4, "les difficultés avec les humains sont confirmées dans les situations de rencontre");
    }
    if (includes(issues, 'maison') && includes(situations, 'calme_maison')) {
      add('maison', 4, "les comportements domestiques sont associés à une difficulté précise de retour au calme");
    }
    if (includes(issues, 'laisse') && (answers.ecoute === 'maison' || answers.ecoute === 'calme' || answers.ecoute === 'emotion')) {
      add('laisse', 3, "la marche en laisse se combine à une disponibilité réduite lorsque l’environnement se complique");
      add('generalisation', 2, "la compétence de marche dépend fortement du contexte");
    }

    var ranked = Object.keys(scores).map(function (key) {
      return { key: key, score: scores[key], evidence: evidence[key] };
    }).sort(function (a, b) { return b.score - a.score; });

    var selected = ranked.filter(function (item) { return item.score >= 3; });
    if (selected.length < 2) {
      selected = ranked.slice(0, 2);
    } else {
      var useThree = selected.length >= 3 && selected[2].score >= 5 && selected[2].score >= selected[0].score * 0.48;
      selected = selected.slice(0, useThree ? 3 : 2);
    }

    return { scores: scores, evidence: evidence, ranked: ranked, selected: selected };
  }

  function buildSummary(answers, analysis) {
    var age = labelFor('age', answers.age).toLowerCase();
    var anciennete = labelFor('anciennete', answers.anciennete).toLowerCase();
    var apparition = labelFor('apparition', answers.apparition).toLowerCase();
    var contexts = asArray(answers.situations).map(function (value) { return labelFor('situations', value).toLowerCase(); });
    var count = analysis.selected.length;

    return "Le croisement de son âge (" + age + "), du temps qu’il vit avec vous (" + anciennete + "), de l’apparition des difficultés (" + apparition + ") et des contextes où elles se manifestent fait ressortir " + count + " hypothèses de travail. Elles sont classées selon le nombre d’indices concordants, et non à partir d’une seule réponse. Les situations les plus révélatrices sont : " + joinFrench(contexts) + ".";
  }

  function uniqueTips(selected) {
    var tips = [];
    selected.forEach(function (item) {
      HYPOTHESES[item.key].tips.forEach(function (tip) {
        if (tips.indexOf(tip) === -1 && tips.length < 5) tips.push(tip);
      });
    });
    return tips;
  }

  function buildNextStep(analysis) {
    var primary = HYPOTHESES[analysis.selected[0].key].title.toLowerCase();
    return "Pendant quelques jours, notez le contexte, la distance, l’intensité et le temps nécessaire pour retrouver le calme. Un bilan permettra ensuite de vérifier l’hypothèse principale — " + primary + " — et d’ajuster les exercices à votre chien.";
  }

  function runDiagnostic(answers) {
    answers = answers || {};
    var analysis = calculate(answers);
    var hypotheses = analysis.selected.map(function (item) {
      return {
        title: HYPOTHESES[item.key].title,
        text: HYPOTHESES[item.key].text,
        score: item.score,
        evidence: item.evidence
      };
    });
    var evidence = [];
    analysis.selected.forEach(function (item) {
      item.evidence.slice(0, 2).forEach(function (reason) {
        if (evidence.indexOf(reason) === -1 && evidence.length < 5) evidence.push(reason);
      });
    });

    return {
      title: hypotheses.length === 3 ? "Trois hypothèses principales à explorer" : "Deux hypothèses principales à explorer",
      summary: buildSummary(answers, analysis),
      points: hypotheses.map(function (item) { return item.title; }),
      axes: hypotheses.map(function (item) { return { title: item.title, text: item.text }; }),
      level: {
        name: "Commencer par observer, simplifier et sécuriser",
        text: "Les premières pistes ci-dessous ciblent les mécanismes qui reviennent dans plusieurs de vos réponses. Testez-les dans des situations faciles, une étape à la fois.",
        suite: "Si les réactions sont soudaines, très intenses, associées à une douleur possible, à une panique ou à un risque de morsure, demandez également l’avis de votre vétérinaire."
      },
      why: uniqueTips(analysis.selected),
      evidence: evidence,
      nextStep: buildNextStep(analysis),
      debug: {
        scores: analysis.scores,
        selected: analysis.selected.map(function (item) { return item.key; }),
        evidence: analysis.evidence
      }
    };
  }

  function init() {
    var quiz = document.getElementById('diag-quiz');
    var result = document.getElementById('diag-result');
    if (!quiz || !result) return;

    var bar = document.getElementById('diag-bar');
    var stepEl = document.getElementById('diag-step');
    var questionEl = document.getElementById('diag-question');
    var hintEl = document.getElementById('diag-hint');
    var answersEl = document.getElementById('diag-answers');
    var backBtn = document.getElementById('diag-back');
    var nextBtn = document.getElementById('diag-next');
    var restartBtn = document.getElementById('diag-restart');
    var editBtn = document.getElementById('diag-edit');

    var answers = {};
    var current = 0;
    var total = QUESTIONS.length;

    function currentQuestion() {
      return QUESTIONS[current];
    }

    function isAnswered(question) {
      var value = answers[question.id];
      return question.type === 'multi' ? Array.isArray(value) && value.length > 0 : value !== undefined && value !== null;
    }

    function renderSelection(question, values) {
      Array.prototype.forEach.call(answersEl.children, function (element) {
        var selected = values.indexOf(element.dataset.value) !== -1;
        element.classList.toggle('is-selected', selected);
        element.setAttribute('aria-pressed', selected ? 'true' : 'false');
      });
    }

    function renderQuestion(direction) {
      var question = currentQuestion();
      var selected = asArray(answers[question.id]).map(String);

      stepEl.textContent = 'Question ' + (current + 1) + ' sur ' + total;
      questionEl.textContent = question.text;
      hintEl.textContent = question.hint || '';
      hintEl.hidden = !question.hint;
      answersEl.innerHTML = '';

      question.options.forEach(function (item) {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'diag-answer';
        button.textContent = item.label;
        button.dataset.value = String(item.v);

        if (question.type === 'multi') {
          button.setAttribute('aria-pressed', selected.indexOf(String(item.v)) !== -1 ? 'true' : 'false');
        }
        if (selected.indexOf(String(item.v)) !== -1) button.classList.add('is-selected');

        button.addEventListener('click', function () {
          if (question.type === 'multi') {
            var values = asArray(answers[question.id]).map(String);
            var value = String(item.v);
            var alreadySelected = values.indexOf(value) !== -1;

            if (alreadySelected) {
              values = values.filter(function (entry) { return entry !== value; });
            } else if (item.exclusive) {
              values = [value];
            } else {
              values = values.filter(function (entry) {
                var existing = question.options.filter(function (candidate) { return String(candidate.v) === entry; })[0];
                return !(existing && existing.exclusive);
              });
              values.push(value);
            }

            answers[question.id] = values;
            renderSelection(question, values);
            nextBtn.disabled = values.length === 0;
            return;
          }

          answers[question.id] = item.v;
          Array.prototype.forEach.call(answersEl.children, function (element) { element.classList.remove('is-selected'); });
          button.classList.add('is-selected');
          window.setTimeout(function () {
            if (current < total - 1) {
              current += 1;
              renderQuestion('next');
            } else {
              renderResult();
            }
          }, 160);
        });

        answersEl.appendChild(button);
      });

      backBtn.hidden = current === 0;
      nextBtn.hidden = question.type !== 'multi';
      if (question.type === 'multi') {
        nextBtn.disabled = !isAnswered(question);
        nextBtn.textContent = current === total - 1 ? 'Voir mon résultat' : 'Continuer';
      }

      bar.style.width = Math.max(4, current / total * 100) + '%';
      quiz.classList.remove('is-changing', 'is-changing-back');
      void quiz.offsetWidth;
      quiz.classList.add(direction === 'back' ? 'is-changing-back' : 'is-changing');
    }

    function fillList(element, items, builder) {
      element.innerHTML = '';
      items.forEach(function (item) {
        var li = document.createElement('li');
        builder(li, item);
        element.appendChild(li);
      });
    }

    function renderResult() {
      var output = runDiagnostic(answers);
      bar.style.width = '100%';

      document.getElementById('diag-result-title').textContent = output.title;
      document.getElementById('diag-result-text').textContent = output.summary;

      fillList(document.getElementById('diag-points'), output.points, function (li, text) {
        li.textContent = text;
      });

      fillList(document.getElementById('diag-axes'), output.axes, function (li, hypothesis) {
        var strong = document.createElement('strong');
        strong.textContent = hypothesis.title;
        var paragraph = document.createElement('span');
        paragraph.textContent = hypothesis.text;
        li.appendChild(strong);
        li.appendChild(paragraph);
      });

      document.getElementById('diag-reco-name').textContent = output.level.name;
      document.getElementById('diag-reco-text').textContent = output.level.text;
      fillList(document.getElementById('diag-why'), output.why, function (li, text) { li.textContent = text; });
      document.getElementById('diag-why-intro').hidden = output.why.length === 0;
      document.getElementById('diag-reco-suite').textContent = output.level.suite;
      document.getElementById('diag-next-text').textContent = output.nextStep;

      quiz.hidden = true;
      result.hidden = false;
      result.classList.remove('is-changing');
      void result.offsetWidth;
      result.classList.add('is-changing');
    }

    function backToQuiz(index) {
      current = index;
      result.hidden = true;
      quiz.hidden = false;
      renderQuestion('back');
    }

    backBtn.addEventListener('click', function () {
      if (current > 0) {
        current -= 1;
        renderQuestion('back');
      }
    });

    nextBtn.addEventListener('click', function () {
      if (!isAnswered(currentQuestion())) return;
      if (current < total - 1) {
        current += 1;
        renderQuestion('next');
      } else {
        renderResult();
      }
    });

    restartBtn.addEventListener('click', function () {
      answers = {};
      backToQuiz(0);
    });

    if (editBtn) {
      editBtn.addEventListener('click', function () { backToQuiz(total - 1); });
    }

    renderQuestion('next');
  }

  window.StephDiag = {
    QUESTIONS: QUESTIONS,
    calculate: calculate,
    runDiagnostic: runDiagnostic,
    init: init
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(window, document);
