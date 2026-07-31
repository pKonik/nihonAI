import "server-only";

import type { Locale } from "@/lib/i18n/config";

const spanishDictionary = {
  meta: {
    description:
      "Aplicación personal para organizar el aprendizaje de japonés.",
    landingTitle: "Aprende japonés desde manga | NihonAI",
    landingDescription:
      "Convierte el japonés que encuentras en manga en vocabulario con contexto y prepáralo para repasarlo.",
    landingImageAlt:
      "NihonAI conecta una escena de lectura japonesa con una tarjeta de vocabulario.",
    homeTitle: "Inicio | NihonAI",
    loginTitle: "Acceso | NihonAI",
    addTitle: "Añadir vocabulario | NihonAI",
    readTitle: "Leer manga | NihonAI",
    decksTitle: "Mazos | NihonAI",
    reviewTitle: "Repasar | NihonAI",
    accountTitle: "Cuenta | NihonAI",
    kanaTitle: "Hiragana y katakana | NihonAI",
  },
  language: {
    label: "Seleccionar idioma",
    spanish: "Español",
    english: "Inglés",
  },
  authNotice: {
    expiredTitle: "El enlace ya no está disponible",
    expiredDescription:
      "El enlace venció o ya fue utilizado. Solicita un correo nuevo desde la pantalla de acceso.",
    invalidTitle: "No se pudo completar la confirmación",
    invalidDescription:
      "El enlace no es válido. Puedes solicitar uno nuevo desde la pantalla de acceso.",
    closeLabel: "Cerrar aviso",
    close: "Cerrar",
  },
  shell: {
    skipToContent: "Saltar al contenido",
    homeLabel: "Ir al inicio de NihonAI",
    signOut: "Cerrar sesión",
    signOutShort: "Salir",
    signOutAccount: "Cerrar sesión de {email}",
    accountLabel: "Abrir cuenta de {name}",
    userFallback: "usuario",
  },
  navigation: {
    label: "Navegación principal",
    home: "Inicio",
    kana: "Kana",
    read: "Manga",
    add: "Añadir",
    decks: "Mazos",
    review: "Repasar",
  },
  onboarding: {
    openGuide: "Ayuda",
    closeLabel: "Cerrar bienvenida",
    mascotAlt: "Kitsu, la mascota guía de NihonAI",
    stepLabel: "Paso {current} de {total}",
    progressLabel: "Progreso de la bienvenida",
    skip: "Omitir guía",
    back: "Anterior",
    next: "Siguiente",
    finish: "Empezar",
    saving: "Guardando...",
    authExpired:
      "Tu sesión ya no es válida. Inicia sesión de nuevo para guardar este cambio.",
    saveFailed:
      "No se pudo guardar tu preferencia. Inténtalo de nuevo.",
    welcome: {
      eyebrow: "Kitsu te da la bienvenida",
      title: "Un recorrido corto para empezar.",
      description:
        "NihonAI conecta lo que lees con el vocabulario que recopilas y lo que quieres recordar. Esta guía es opcional y siempre podrás abrirla de nuevo desde Ayuda.",
    },
    read: {
      eyebrow: "Leer · Próximamente",
      title: "Aprende desde el contexto.",
      description:
        "El futuro lector reunirá tus páginas de manga y conservará el lugar donde encontraste cada palabra. La importación llegará en una fase posterior.",
    },
    collect: {
      eyebrow: "Recopilar · Disponible",
      title: "Guarda vocabulario útil.",
      description:
        "En Añadir puedes registrar palabras, lecturas, significados y ejemplos en una colección privada asociada con tu cuenta.",
    },
    remember: {
      eyebrow: "Recordar · Planificado",
      title: "Prepara tu siguiente paso.",
      description:
        "Mazos y Repasar organizarán el estudio cuando lleguen sus fases. Por ahora, construye una colección pequeña desde palabras que realmente encuentres.",
    },
  },
  login: {
    heroTitle: "Aprende desde lo que lees, escuchas y descubres.",
    heroDescription:
      "Una colección personal para convertir cada palabra nueva en una oportunidad de aprendizaje.",
    eyebrow: "Bienvenido",
    title: "Accede a tu espacio",
    description:
      "Tu cuenta separa y protege el vocabulario que guardas en NihonAI.",
    setupTitle: "Supabase todavía no está configurado.",
    setupBefore: "Copia",
    setupMiddle: "como",
    setupAfter:
      "y reemplaza los valores de ejemplo con la URL y la clave publicable de tu proyecto.",
    email: "Correo electrónico",
    password: "Contraseña",
    signIn: "Iniciar sesión",
    signUp: "Crear cuenta",
    noConfirmation: "¿No recibiste la confirmación?",
    pendingEmail: "Correo de la cuenta pendiente",
    resend: "Reenviar confirmación",
    feedback: {
      invalidCredentials:
        "Escribe un correo válido y una contraseña de al menos 6 caracteres.",
      invalidEmail: "Escribe un correo válido.",
      signInFailed: "No se pudo iniciar sesión. Revisa tus datos.",
      signUpFailed: "No se pudo crear la cuenta.",
      checkEmail:
        "Revisa tu correo para confirmar la cuenta antes de iniciar sesión.",
      resendFailed:
        "No se pudo reenviar la confirmación. Espera un momento e inténtalo de nuevo.",
      resendSuccess:
        "Si existe una cuenta pendiente para ese correo, recibirás un enlace de confirmación nuevo.",
      invalidConfirmation: "El enlace de confirmación no es válido.",
      confirmationFailed:
        "No se pudo confirmar la cuenta. Solicita un enlace nuevo.",
    },
  },
  landing: {
    skipToContent: "Saltar al contenido",
    navigationLabel: "Navegación de la presentación",
    navigation: {
      journey: "Cómo funciona",
      features: "Herramientas",
      privacy: "Privacidad",
      faq: "Preguntas",
    },
    signIn: "Iniciar sesión",
    createAccount: "Crear cuenta",
    hero: {
      eyebrow: "Japonés desde contexto real",
      title: "Convierte cada viñeta en algo que puedas recordar.",
      description:
        "NihonAI conecta lectura de manga, reconocimiento de texto y vocabulario personal para que una palabra nueva no pierda la historia donde la encontraste.",
      primaryAction: "Empezar con NihonAI",
      secondaryAction: "Ver cómo funciona",
      availability:
        "Disponible ahora: vocabulario personal y aprendizaje de kana. El lector, OCR y repaso se incorporarán por fases.",
      previewLabel: "Ejemplo de lectura y minado de vocabulario",
      selectionLabel: "Texto seleccionado",
      example: {
        alt: "Dos jóvenes observan la primera estrella sobre un río al anochecer.",
        japaneseSentence: "星を見に行こう",
        reading: "ほし",
        word: "星",
        meaning: "estrella",
      },
      saveStatus: "Listo para guardar",
    },
    journey: {
      eyebrow: "Un recorrido conectado",
      title: "Del manga a la memoria, sin perder el contexto.",
      description:
        "Cada etapa está pensada para alimentar la siguiente. La colección de vocabulario ya es la base; el resto se añadirá de manera progresiva.",
      roadmapLabel: "Recorrido previsto de NihonAI",
      upcoming: "Próximo",
      planned: "Planificado",
      available: "Colección disponible",
      importTitle: "Importar",
      importDescription:
        "Añade imágenes o un archivo ZIP y conserva el orden de lectura.",
      readTitle: "Leer",
      readDescription:
        "Recorre las páginas con controles diseñados para una lectura cómoda.",
      selectTitle: "Seleccionar",
      selectDescription:
        "Marca únicamente la región que contiene el texto que quieres estudiar.",
      recognizeTitle: "Reconocer",
      recognizeDescription:
        "Extrae el japonés mediante OCR y corrígelo antes de continuar.",
      mineTitle: "Minar",
      mineDescription:
        "Convierte una palabra en una entrada con lectura, significado y contexto.",
      reviewTitle: "Repasar",
      reviewDescription:
        "Recupera lo aprendido mediante sesiones breves de repetición espaciada.",
    },
    features: {
      eyebrow: "Herramientas con un propósito",
      title: "Todo gira alrededor de lo que estás aprendiendo.",
      description:
        "NihonAI no pretende juntar funciones aisladas. Cada módulo conservará el vínculo entre lectura, palabra y memoria.",
      available: "Disponible",
      upcoming: "Próximamente",
      readerTitle: "Lector de manga",
      readerDescription:
        "Importación local, navegación, zoom y selección precisa de regiones.",
      vocabularyTitle: "Vocabulario personal",
      vocabularyDescription:
        "Guarda palabras, lecturas, significados, ejemplos y su fuente en una colección privada.",
      kanaTitle: "Hiragana y katakana",
      kanaDescription:
        "Aprende caracteres, combinaciones y lecturas antes de depender del contexto.",
      decksTitle: "Mazos con propósito",
      decksDescription:
        "Organiza lo guardado por obra, tema u objetivo de estudio.",
      reviewTitle: "Repaso con FSRS",
      reviewDescription:
        "Programa cada palabra según tu memoria para evitar repasos innecesarios.",
    },
    companion: {
      eyebrow: "Conoce a Kitsu",
      title: "Una guía cercana para orientarte sin interrumpir.",
      description:
        "Kitsu acompaña la bienvenida opcional de NihonAI, explica qué puedes usar ahora y diferencia las herramientas que llegarán más adelante.",
      label: "Kitsu, la mascota guía de NihonAI",
    },
    privacy: {
      eyebrow: "Privado por diseño",
      title: "Tu colección es una herramienta personal, no un escaparate.",
      description:
        "La base actual protege cada entrada de vocabulario con autenticación y reglas de acceso por usuario.",
      accountTitle: "Separado por cuenta",
      accountDescription:
        "Cada persona accede únicamente al vocabulario asociado con su sesión.",
      controlTitle: "Tú eliges qué guardar",
      controlDescription:
        "El contenido escrito por el usuario y el japonés reconocido conservan su forma original.",
      honestTitle: "Sin progreso inventado",
      honestDescription:
        "No mostramos rankings, testimonios ni métricas que todavía no existan.",
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Antes de comenzar",
      availableQuestion: "¿Qué puedo utilizar ahora?",
      availableAnswer:
        "Puedes administrar una colección privada de vocabulario y estudiar hiragana y katakana con ejemplos y progreso personal.",
      readerQuestion: "¿El lector y el OCR ya están disponibles?",
      readerAnswer:
        "Todavía no. La landing muestra el recorrido previsto y diferencia claramente las herramientas actuales de las próximas fases.",
      mangaQuestion: "¿Necesito manga para utilizar NihonAI?",
      mangaAnswer:
        "No. Puedes añadir vocabulario encontrado en libros, clases, anime u otras fuentes mientras construimos el lector.",
      languageQuestion: "¿Qué ocurre al cambiar el idioma?",
      languageAnswer:
        "La interfaz y sus explicaciones cambian entre español e inglés. El texto japonés y el contenido que escribes se conservan sin alteraciones.",
    },
    closing: {
      eyebrow: "Empieza por una palabra",
      title: "Construye hoy la colección que mañana acompañará tus lecturas.",
      description:
        "Crea tu espacio personal y guarda el japonés que ya estás encontrando.",
      primaryAction: "Crear mi cuenta",
      secondaryAction: "Ya tengo una cuenta",
    },
    footer: {
      tagline: "Aprende japonés desde lo que lees.",
      journey: "Cómo funciona",
      privacy: "Privacidad",
      faq: "Preguntas",
      access: "Acceso",
      rights: "NihonAI. Proyecto personal de aprendizaje.",
    },
  },
  home: {
    eyebrow: "Tu espacio de estudio",
    title: "Tu estudio de japonés, en un solo lugar.",
    description:
      "Construye una colección útil desde las palabras que encuentras y prepárala para conectarla con lectura de manga y repasos.",
    addWord: "Añadir una palabra",
    readSpace: "Ver el espacio de lectura",
    journey: "Recorrido",
    areasTitle: "Áreas de aprendizaje",
    steps: {
      read: "Leer",
      collect: "Recopilar",
      remember: "Recordar",
    },
    status: {
      available: "Disponible",
      next: "Próxima fase",
      planned: "Planificado",
    },
    areas: {
      addTitle: "Añadir vocabulario",
      addDescription:
        "Guarda palabras, lecturas y ejemplos en tu colección personal.",
      kanaTitle: "Aprender kana",
      kanaDescription:
        "Estudia hiragana y katakana con lecturas, ejemplos y progreso personal.",
      readTitle: "Leer manga",
      readDescription:
        "Importa y recorre páginas de manga para aprender desde su contexto.",
      decksTitle: "Organizar mazos",
      decksDescription:
        "Agrupa el vocabulario según tus objetivos y materiales de estudio.",
      reviewTitle: "Repasar",
      reviewDescription:
        "Practica tus palabras en sesiones de repetición espaciada.",
    },
  },
  kana: {
    eyebrow: "Fundamentos · かな",
    title: "Aprende hiragana y katakana a tu ritmo.",
    description:
      "Explora los sonidos básicos, reconoce cada forma y apóyate en ejemplos reales. Marca un carácter cuando ya puedas identificarlo.",
    loadError:
      "No se pudo cargar tu progreso. Puedes consultar el contenido, pero recarga la página antes de marcar cambios.",
    progress: {
      eyebrow: "Tu progreso",
      title: "{learned} de {total} caracteres aprendidos",
      label: "{learned} de {total} caracteres aprendidos en este silabario",
    },
    quiz: {
      eyebrow: "Práctica · 読む",
      title: "Escribe la lectura",
      description:
        "Elige qué necesitas reforzar y responde en rōmaji. La práctica prioriza caracteres nuevos o con menor precisión.",
      mixed: "Mixto",
      scopeLabel: "Contenido de la sesión",
      scopes: {
        learned: "Aprendidos",
        category: "Categoría",
        row: "Fila",
        all: "Todo",
        mistakes: "Errores",
      },
      scopeDescriptions: {
        learned:
          "Repasa únicamente los caracteres que ya marcaste como aprendidos.",
        category:
          "Avanza por etapas: sonidos básicos, dakuten o handakuten.",
        row: "Concentra la sesión en una sola fila de sonidos.",
        all: "Combina todo el silabario y da prioridad a lo que más necesitas reforzar.",
        mistakes:
          "Trabaja con caracteres cuya precisión todavía está por debajo del 80 %.",
      },
      categoryLabel: "Categoría",
      categories: {
        basic: "Básicos",
        dakuten: "Dakuten",
        handakuten: "Handakuten",
      },
      rowLabel: "Fila de sonidos",
      vowels: "Vocales",
      available: "{count} caracteres disponibles",
      emptyScope:
        "Todavía no hay caracteres disponibles en este alcance.",
      retryHint:
        "Las respuestas se corrigen una por una. Los errores regresan al final de la sesión hasta que los resuelvas.",
      start: "Empezar quiz",
      remaining: "{completed} de {total} resueltos",
      answerLabel: "Lectura en rōmaji",
      answerPlaceholder: "Ejemplo: ka",
      check: "Comprobar",
      continue: "Continuar",
      correctTitle: "Respuesta correcta",
      correctDescription: "La lectura es {answer}.",
      incorrectTitle: "Respuesta incorrecta",
      incorrectDescription:
        "La lectura correcta es {answer}. Este carácter volverá a aparecer.",
      invalidAnswer: "Escribe una lectura válida usando letras.",
      saveFailed:
        "No se pudo guardar la respuesta. Inténtalo de nuevo.",
      sessionCompleteTitle: "Sesión completada",
      sessionCompleteDescription:
        "Has resuelto {count} caracteres con {mistakes} errores durante la sesión.",
      restart: "Nueva sesión",
      statsTitle: "Actividad de kana",
      totalAnswers: "Respuestas",
      accuracy: "Precisión",
      activeDays: "Días de estudio",
      currentStreak: "Racha actual",
    },
    chart: {
      eyebrow: "Ruta de aprendizaje",
      title: "Sonidos y ejemplos",
      scriptLabel: "Seleccionar silabario",
      hiragana: "Hiragana",
      katakana: "Katakana",
      filterLabel: "Filtrar caracteres",
      filters: {
        all: "Todos",
        pending: "Por aprender",
        learned: "Aprendidos",
      },
      markLearned: "Marcar aprendido",
      learned: "Aprendido",
      markRowLearned: "Aprender todo",
      unmarkRow: "Desmarcar toda la fila",
      empty: "No hay caracteres que coincidan con este filtro.",
      characterCount: "{count} caracteres",
      categories: {
        basic: {
          title: "1. Sonidos básicos",
          description:
            "Empieza por estas 46 formas. Son la base para leer todas las demás categorías.",
        },
        dakuten: {
          title: "2. Sonidos con dakuten",
          description:
            "Las dos marcas ゛ transforman las filas K, S, T y H en sonidos sonoros.",
        },
        handakuten: {
          title: "3. Sonidos con handakuten",
          description:
            "El pequeño círculo ゜ transforma la fila H en los cinco sonidos de la fila P.",
        },
      },
    },
    combinations: {
      eyebrow: "Sonidos combinados",
      title: "Yōon: dos formas, un solo sonido",
      description:
        "Una kana terminada en i se une a ゃ, ゅ o ょ pequeños. La combinación se pronuncia como una sola unidad.",
    },
    specialRules: {
      eyebrow: "Reglas esenciales",
      title: "Formas que cambian la lectura",
      sokuonTitle: "Consonante doble",
      sokuonDescription:
        "La っ o ッ pequeña crea una pausa breve y duplica la consonante siguiente.",
      longVowelTitle: "Vocal larga en katakana",
      longVowelDescription:
        "La marca ー prolonga la vocal anterior y se utiliza principalmente en katakana.",
      particlesTitle: "Lecturas como partículas",
      particlesDescription:
        "Cuando funcionan como partículas, は, へ y を se pronuncian wa, e y o.",
    },
    feedback: {
      invalidCharacter: "El carácter seleccionado no es válido.",
      authExpired:
        "Tu sesión ya no es válida. Inicia sesión de nuevo para guardar el progreso.",
      saveFailed:
        "No se pudo guardar el progreso. Inténtalo de nuevo.",
    },
  },
  feature: {
    prepared: "Espacio preparado para una próxima fase",
    next: "Qué viene después",
    addNow: "Añadir vocabulario ahora",
  },
  read: {
    eyebrow: "Lectura local · 読む",
    title: "Leer manga",
    description:
      "Importa un capítulo desde tu dispositivo, recorre sus páginas y marca las regiones que llamen tu atención.",
    importTitle: "Importa tus páginas",
    importHelp:
      "Arrastra aquí una carpeta de imágenes o un archivo ZIP. También puedes elegirlos desde tu dispositivo.",
    chooseFolder: "Elegir carpeta",
    chooseZip: "Abrir ZIP",
    privacyNote:
      "JPG, PNG, WebP, GIF o AVIF. Las páginas y los recortes permanecen en tu dispositivo durante esta sesión.",
    importing: "Preparando las páginas…",
    pageCount: "{count} páginas listas",
    readerEyebrow: "Lectura página a página",
    readerTitle: "Lector de manga",
    readerLabel: "Lector de páginas de manga",
    pageLabel: "Página",
    pages: "páginas",
    bookMode: "Modo libro",
    scrollMode: "Modo scroll",
    switchToBook: "Cambiar a modo libro",
    switchToScroll: "Cambiar a modo scroll",
    previous: "Anterior",
    next: "Siguiente",
    previousPage: "Ir a la página anterior",
    nextPage: "Ir a la página siguiente",
    pagePosition: "{current} / {total}",
    selectionControls: "Controles de selección",
    zoomControls: "Controles de zoom",
    zoomOut: "Reducir zoom",
    zoomIn: "Ampliar zoom",
    resetZoom: "Restablecer zoom al 75 %",
    viewportLabel: "Página ampliable y desplazable",
    selectRegion: "Seleccionar región",
    selectingRegion: "Seleccionando",
    clearSelection: "Borrar selección",
    selectionIdleHelp:
      "Activa la selección para marcar una región concreta de cualquier página.",
    selectionHelp:
      "Arrastra con el botón principal del ratón sobre una página. Pulsa Esc para cancelar.",
    selectionReady: "Región seleccionada",
    crop: {
      title: "Recorte preparado",
      description:
        "El OCR leerá únicamente el contenido de esta región seleccionada.",
      previewEyebrow: "Vista previa del recorte",
      previewAlt: "Vista previa de la región seleccionada",
      preparing: "Preparando el recorte…",
      temporary:
        "El recorte solo existe temporalmente en la memoria de este dispositivo. Se eliminará al terminar el reconocimiento y nunca se guardará ni se enviará.",
      errors: {
        prepareFailed:
          "No se pudo generar el recorte. Intenta seleccionar la región de nuevo.",
      },
    },
    ocr: {
      action: "Reconocer texto japonés",
      fastAction: "OCR alternativo",
      preciseAction: "OCR preciso",
      preciseNote:
        "El OCR preciso es la opción principal. La primera vez descarga unos 65 MB desde NihonAI y los guarda en la caché del navegador; el OCR alternativo queda disponible como respaldo.",
      preciseConfirm:
        "El OCR preciso necesita descargar unos 65 MB desde NihonAI. Se guardarán en la caché de este navegador y la imagen no se enviará. ¿Deseas continuar?",
      working: "Procesando…",
      loading: "Preparando el OCR japonés local…",
      preciseLoading: "Preparando Manga OCR en este dispositivo…",
      connecting: "Conectando con el repositorio del modelo…",
      downloading: "Cargando el modelo local… {progress} %",
      downloadProgressLabel: "Progreso de carga del modelo de OCR preciso",
      recognizing: "Reconociendo texto… {progress} %",
      progressLabel: "Progreso del reconocimiento de texto",
      floatingPanelLabel: "Panel flotante de OCR",
      closeFloatingPanel: "Cerrar panel de OCR",
      successTitle: "Texto japonés reconocido",
      successDescription:
        "El recorte ya fue eliminado de la memoria. Revisa el resultado antes de continuar.",
      correctionLabel: "Texto japonés detectado",
      correctionHelp:
        "Corrige cualquier carácter, espacio o salto de línea que el OCR no haya reconocido bien. El texto permanece únicamente en esta sesión.",
      emptyTitle: "No se detectó texto",
      emptyDescription:
        "El recorte fue eliminado. Selecciona otra región con texto japonés más nítido e inténtalo de nuevo.",
      errors: {
        recognitionFailed:
          "No se pudo reconocer el texto y el recorte fue eliminado. Selecciona la región de nuevo e inténtalo otra vez.",
        preciseFailed:
          "El OCR preciso no pudo completar el reconocimiento y el recorte fue eliminado. Comprueba la conexión o el espacio disponible y vuelve a intentarlo.",
        preciseUnavailable:
          "El OCR preciso no está disponible en este navegador. Puedes continuar con el OCR rápido.",
      },
    },
    mining: {
      title: "Minería de vocabulario",
      description:
        "Analiza el texto corregido, confirma una acepción y guárdala con su contexto.",
      analyzeAction: "Analizar vocabulario",
      analyzing: "Preparando análisis…",
      analyzeHelp:
        "La primera vez se carga bajo demanda el analizador japonés (unos 18 MB). Después permanece en la caché del navegador.",
      tokenHelp:
        "Pasa el cursor, enfoca o toca una palabra para consultar su ficha. Haz clic para mantenerla abierta.",
      tokensLabel: "Palabras detectadas en la oración",
      cardLabel: "Texto seleccionado",
      closeCard: "Cerrar ficha de vocabulario",
      loadingEntry: "Consultando JMdict…",
      noEntry: "JMdict no contiene una entrada para esta selección.",
      meanings: "Significados",
      meaningLanguage: "Idioma del significado",
      prepareToSave: "Preparar para guardar",
      saved: "Palabra guardada en tu vocabulario.",
      englishFallback:
        "JMdict no ofrece significado en español para esta entrada; se muestra la definición inglesa.",
      hoverHelp: "Retira el cursor para cerrar la ficha.",
      pinnedHelp: "La ficha está fijada. Pulsa de nuevo la palabra para cerrarla.",
      attribution: "Datos de JMdict · CC BY-SA 4.0",
      parts: {
        noun: "sustantivo",
        verb: "verbo",
        adjective: "adjetivo",
        adverb: "adverbio",
        particle: "partícula",
        expression: "expresión",
        auxiliary: "auxiliar",
        conjunction: "conjunción",
        interjection: "interjección",
        pronoun: "pronombre",
        prefix: "prefijo",
        suffix: "sufijo",
        counter: "contador",
        other: "otro",
      },
      errors: {
        analysisFailed:
          "No se pudo analizar el texto. Comprueba la conexión y vuelve a intentarlo.",
        dictionaryFailed:
          "No se pudo consultar JMdict. Vuelve a intentarlo.",
      },
    },
    bookKeyboardHelp:
      "Atajos: ←/→ cambia de página, +/− ajusta el zoom y 0 vuelve al 75 %.",
    scrollKeyboardHelp:
      "Desplázate para leer todas las páginas. +/− ajusta el zoom y 0 vuelve al 75 %.",
    errors: {
      noImages: "No se encontraron imágenes compatibles.",
      oneZip: "Importa un único archivo ZIP cada vez.",
      archiveTooLarge: "El ZIP supera el límite de 200 MB.",
      imageTooLarge: "Una imagen supera el límite de 20 MB.",
      importTooLarge: "La importación descomprimida es demasiado grande.",
      tooManyPages: "Puedes importar hasta {count} páginas cada vez.",
      readFailed:
        "No se pudieron leer esos archivos. Comprueba el formato e inténtalo de nuevo.",
    },
  },
  decks: {
    title: "Mazos",
    description:
      "Este espacio reunirá los mazos que uses para organizar palabras por tema, obra u objetivo.",
    nextStep:
      "La administración de mazos está planificada para la fase 20.",
  },
  review: {
    title: "Repasar",
    description:
      "Aquí practicarás el vocabulario guardado mediante sesiones breves y enfocadas.",
    nextStep:
      "La repetición espaciada con FSRS está planificada para la fase 21.",
  },
  account: {
    eyebrow: "Perfil ・ 設定",
    title: "Tu cuenta",
    description:
      "Personaliza cómo apareces en NihonAI y consulta únicamente la actividad que ya existe.",
    summaryTitle: "Resumen de la cuenta",
    email: "Correo electrónico",
    memberSince: "Miembro desde",
    savedWords: "Palabras guardadas",
    realActivityNote: "Calculado desde tu colección real.",
    profileEyebrow: "Identidad",
    nameTitle: "Nombre visible",
    nameDescription:
      "Este nombre se muestra solo dentro de tu espacio personal.",
    displayName: "Nombre visible",
    nameHelp: "Máximo 50 caracteres.",
    saveName: "Guardar nombre",
    saving: "Guardando...",
    photoEyebrow: "Avatar",
    photoTitle: "Foto de perfil",
    photoDescription:
      "Tu foto se guarda de forma privada y solo se entrega durante tu sesión.",
    choosePhoto: "Seleccionar imagen",
    photoHelp: "JPG, PNG o WebP. Tamaño máximo: 2 MB.",
    uploadPhoto: "Actualizar foto",
    uploading: "Subiendo...",
    removePhoto: "Eliminar foto",
    removing: "Eliminando...",
    avatarAlt: "Foto de perfil de {name}",
    userFallback: "Usuario",
    feedback: {
      nameRequired: "Escribe un nombre visible.",
      nameTooLong: "El nombre no puede superar los 50 caracteres.",
      nameSaved: "Nombre actualizado.",
      saveFailed: "No se pudo guardar el perfil. Inténtalo de nuevo.",
      avatarRequired: "Selecciona una imagen.",
      avatarTooLarge: "La imagen no puede superar los 2 MB.",
      avatarInvalidType: "Selecciona una imagen JPG, PNG o WebP.",
      avatarSaved: "Foto de perfil actualizada.",
      avatarRemoved: "Foto de perfil eliminada.",
      avatarFailed: "No se pudo actualizar la foto. Inténtalo de nuevo.",
      authExpired:
        "Tu sesión ya no es válida. Vuelve a iniciar sesión.",
    },
  },
  vocabulary: {
    eyebrow: "Colección ・ 単語",
    title: "Añadir vocabulario",
    description:
      "Guarda las palabras que encuentras durante tu estudio y administra tu colección personal.",
    loadError:
      "No se pudo cargar tu vocabulario. Recarga la página para intentarlo de nuevo.",
    errors: {
      reloadBeforeModify:
        "Recarga la página antes de modificar tu vocabulario.",
      waitForDelete: "Espera a que termine la eliminación en curso.",
      saveInProgress: "Ya hay una operación de guardado en curso.",
      operationFailed:
        "No se pudo completar la operación. Inténtalo de nuevo.",
      disabled:
        "Recarga la página para recuperar tu colección antes de guardar cambios.",
      invalidData: "No se recibieron datos de vocabulario válidos.",
      requiredFields:
        "Completa la palabra, la lectura y el significado.",
      invalidEnums:
        "Selecciona un idioma, tipo de palabra y nivel JLPT válidos.",
      fieldTooLong: "Uno o más campos superan la longitud permitida.",
      invalidEntry: "La entrada seleccionada no es válida.",
      authExpired:
        "Tu sesión ya no es válida. Vuelve a iniciar sesión.",
      notFound: "La entrada ya no existe o no tienes acceso a ella.",
    },
    form: {
      editEyebrow: "Editar entrada",
      newEyebrow: "Nueva entrada",
      editTitle: "Editar vocabulario",
      addTitle: "Añadir vocabulario",
      requiredHelp: "Los campos marcados con * son obligatorios.",
      word: "Palabra en japonés *",
      reading: "Lectura *",
      meaning: "Significado *",
      meaningLanguage: "Idioma del significado",
      meaningLanguages: {
        es: "Español",
        en: "Inglés",
      },
      wordType: "Tipo de palabra",
      jlpt: "Nivel JLPT",
      example: "Frase de ejemplo",
      source: "Fuente o etiqueta de origen",
      meaningPlaceholder: "estudio",
      sourcePlaceholder: "Anime, libro, clase...",
      savingChanges: "Guardando cambios...",
      saving: "Guardando...",
      saveChanges: "Guardar cambios",
      saveWord: "Guardar palabra",
      cancel: "Cancelar",
      wordTypes: {
        Sustantivo: "Sustantivo",
        Verbo: "Verbo",
        Adjetivo: "Adjetivo",
        Adverbio: "Adverbio",
        Expresión: "Expresión",
        Otro: "Otro",
      },
      unclassified: "Sin clasificar",
    },
    list: {
      eyebrow: "Colección",
      title: "Mi vocabulario",
      emptyTitle: "Todavía no hay palabras guardadas.",
      emptyDescription:
        "Completa el formulario para crear tu primera entrada.",
      edit: "Editar",
      delete: "Eliminar",
      editLabel: "Editar {word}",
      deleteLabel: "Eliminar {word}",
      confirmLabel: "Confirmar eliminación de {word}",
      confirmQuestion: "¿Eliminar esta entrada?",
      deleting: "Eliminando...",
      cancel: "Cancelar",
      source: "Fuente: {source}",
    },
  },
} as const;

type DeepString<T> = T extends string
  ? string
  : { [Key in keyof T]: DeepString<T[Key]> };

export type Dictionary = DeepString<typeof spanishDictionary>;

const englishDictionary: Dictionary = {
  meta: {
    description:
      "A personal app for organizing your Japanese learning.",
    landingTitle: "Learn Japanese from manga | NihonAI",
    landingDescription:
      "Turn the Japanese you find in manga into vocabulary with context and prepare it for review.",
    landingImageAlt:
      "NihonAI connects a Japanese reading scene with a vocabulary card.",
    homeTitle: "Home | NihonAI",
    loginTitle: "Sign in | NihonAI",
    addTitle: "Add vocabulary | NihonAI",
    readTitle: "Read manga | NihonAI",
    decksTitle: "Decks | NihonAI",
    reviewTitle: "Review | NihonAI",
    accountTitle: "Account | NihonAI",
    kanaTitle: "Hiragana and katakana | NihonAI",
  },
  language: {
    label: "Select language",
    spanish: "Spanish",
    english: "English",
  },
  authNotice: {
    expiredTitle: "This link is no longer available",
    expiredDescription:
      "The link has expired or was already used. Request a new email from the sign-in screen.",
    invalidTitle: "Confirmation could not be completed",
    invalidDescription:
      "The link is not valid. You can request a new one from the sign-in screen.",
    closeLabel: "Close notice",
    close: "Close",
  },
  shell: {
    skipToContent: "Skip to content",
    homeLabel: "Go to the NihonAI home page",
    signOut: "Sign out",
    signOutShort: "Exit",
    signOutAccount: "Sign out of {email}",
    accountLabel: "Open {name}'s account",
    userFallback: "user",
  },
  navigation: {
    label: "Main navigation",
    home: "Home",
    kana: "Kana",
    read: "Manga",
    add: "Add",
    decks: "Decks",
    review: "Review",
  },
  onboarding: {
    openGuide: "Help",
    closeLabel: "Close welcome guide",
    mascotAlt: "Kitsu, NihonAI's guide mascot",
    stepLabel: "Step {current} of {total}",
    progressLabel: "Welcome guide progress",
    skip: "Skip guide",
    back: "Back",
    next: "Next",
    finish: "Get started",
    saving: "Saving...",
    authExpired:
      "Your session is no longer valid. Sign in again to save this change.",
    saveFailed:
      "Your preference could not be saved. Try again.",
    welcome: {
      eyebrow: "Kitsu welcomes you",
      title: "A short tour to get started.",
      description:
        "NihonAI connects what you read with the vocabulary you collect and what you want to remember. This guide is optional, and you can always open it again from Help.",
    },
    read: {
      eyebrow: "Read · Coming later",
      title: "Learn from context.",
      description:
        "The future reader will bring your manga pages together and preserve where you found each word. Importing will arrive in a later phase.",
    },
    collect: {
      eyebrow: "Collect · Available",
      title: "Save useful vocabulary.",
      description:
        "In Add, you can record words, readings, meanings, and examples in a private collection associated with your account.",
    },
    remember: {
      eyebrow: "Remember · Planned",
      title: "Prepare your next step.",
      description:
        "Decks and Review will organize your study when their phases arrive. For now, build a small collection from words you genuinely encounter.",
    },
  },
  login: {
    heroTitle: "Learn from what you read, hear, and discover.",
    heroDescription:
      "A personal collection that turns every new word into a learning opportunity.",
    eyebrow: "Welcome",
    title: "Enter your learning space",
    description:
      "Your account keeps the vocabulary you save in NihonAI private and protected.",
    setupTitle: "Supabase has not been configured yet.",
    setupBefore: "Copy",
    setupMiddle: "as",
    setupAfter:
      "and replace the example values with your project URL and publishable key.",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    signUp: "Create account",
    noConfirmation: "Didn’t receive the confirmation email?",
    pendingEmail: "Pending account email",
    resend: "Resend confirmation",
    feedback: {
      invalidCredentials:
        "Enter a valid email and a password of at least 6 characters.",
      invalidEmail: "Enter a valid email.",
      signInFailed: "Sign in failed. Check your details.",
      signUpFailed: "The account could not be created.",
      checkEmail:
        "Check your email to confirm the account before signing in.",
      resendFailed:
        "The confirmation could not be resent. Wait a moment and try again.",
      resendSuccess:
        "If a pending account exists for that email, you will receive a new confirmation link.",
      invalidConfirmation: "The confirmation link is not valid.",
      confirmationFailed:
        "The account could not be confirmed. Request a new link.",
    },
  },
  landing: {
    skipToContent: "Skip to content",
    navigationLabel: "Presentation navigation",
    navigation: {
      journey: "How it works",
      features: "Tools",
      privacy: "Privacy",
      faq: "Questions",
    },
    signIn: "Sign in",
    createAccount: "Create account",
    hero: {
      eyebrow: "Japanese from real context",
      title: "Turn every panel into something you can remember.",
      description:
        "NihonAI connects manga reading, text recognition, and personal vocabulary so a new word never loses the story where you found it.",
      primaryAction: "Start with NihonAI",
      secondaryAction: "See how it works",
      availability:
        "Available now: personal vocabulary and kana learning. The reader, OCR, and review will arrive in phases.",
      previewLabel: "Reading and vocabulary mining example",
      selectionLabel: "Selected text",
      example: {
        alt: "Two young adults watch the first star above a river at dusk.",
        japaneseSentence: "星を見に行こう",
        reading: "ほし",
        word: "星",
        meaning: "star",
      },
      saveStatus: "Ready to save",
    },
    journey: {
      eyebrow: "One connected journey",
      title: "From manga to memory, without losing context.",
      description:
        "Each stage is designed to feed the next. The vocabulary collection is already the foundation; everything else will be added progressively.",
      roadmapLabel: "Planned NihonAI journey",
      upcoming: "Next",
      planned: "Planned",
      available: "Collection available",
      importTitle: "Import",
      importDescription:
        "Add images or a ZIP file while preserving their reading order.",
      readTitle: "Read",
      readDescription:
        "Move through pages with controls designed for comfortable reading.",
      selectTitle: "Select",
      selectDescription:
        "Mark only the region containing the text you want to study.",
      recognizeTitle: "Recognize",
      recognizeDescription:
        "Extract Japanese through OCR and correct it before continuing.",
      mineTitle: "Mine",
      mineDescription:
        "Turn a word into an entry with its reading, meaning, and context.",
      reviewTitle: "Review",
      reviewDescription:
        "Recall what you learned through short spaced-repetition sessions.",
    },
    features: {
      eyebrow: "Tools with a purpose",
      title: "Everything revolves around what you are learning.",
      description:
        "NihonAI is not meant to collect isolated features. Every module will preserve the connection between reading, words, and memory.",
      available: "Available",
      upcoming: "Coming later",
      readerTitle: "Manga reader",
      readerDescription:
        "Local imports, navigation, zoom, and precise region selection.",
      vocabularyTitle: "Personal vocabulary",
      vocabularyDescription:
        "Save words, readings, meanings, examples, and sources in a private collection.",
      kanaTitle: "Hiragana and katakana",
      kanaDescription:
        "Learn characters, combinations, and readings before relying on context.",
      decksTitle: "Purposeful decks",
      decksDescription:
        "Organize saved vocabulary by work, topic, or study goal.",
      reviewTitle: "FSRS review",
      reviewDescription:
        "Schedule each word around your memory and avoid unnecessary reviews.",
    },
    companion: {
      eyebrow: "Meet Kitsu",
      title: "A friendly guide that helps without getting in the way.",
      description:
        "Kitsu accompanies NihonAI's optional welcome tour, explains what you can use now, and distinguishes the tools that will arrive later.",
      label: "Kitsu, NihonAI's guide mascot",
    },
    privacy: {
      eyebrow: "Private by design",
      title: "Your collection is a personal tool, not a showcase.",
      description:
        "The current foundation protects every vocabulary entry with authentication and per-user access rules.",
      accountTitle: "Separated by account",
      accountDescription:
        "Each person can access only the vocabulary associated with their session.",
      controlTitle: "You choose what to save",
      controlDescription:
        "User-written content and recognized Japanese keep their original form.",
      honestTitle: "No invented progress",
      honestDescription:
        "We do not show rankings, testimonials, or metrics that do not exist yet.",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Before you begin",
      availableQuestion: "What can I use today?",
      availableAnswer:
        "You can manage a private vocabulary collection and study hiragana and katakana with examples and personal progress.",
      readerQuestion: "Are the reader and OCR available already?",
      readerAnswer:
        "Not yet. The landing page shows the planned journey and clearly separates current tools from upcoming phases.",
      mangaQuestion: "Do I need manga to use NihonAI?",
      mangaAnswer:
        "No. You can add vocabulary found in books, classes, anime, or other sources while we build the reader.",
      languageQuestion: "What happens when I change the language?",
      languageAnswer:
        "The interface and its explanations switch between Spanish and English. Japanese text and the content you write remain unchanged.",
    },
    closing: {
      eyebrow: "Start with one word",
      title: "Build today the collection that will accompany tomorrow’s reading.",
      description:
        "Create your personal space and save the Japanese you are already finding.",
      primaryAction: "Create my account",
      secondaryAction: "I already have an account",
    },
    footer: {
      tagline: "Learn Japanese from what you read.",
      journey: "How it works",
      privacy: "Privacy",
      faq: "Questions",
      access: "Sign in",
      rights: "NihonAI. A personal learning project.",
    },
  },
  home: {
    eyebrow: "Your study space",
    title: "Your Japanese study, all in one place.",
    description:
      "Build a useful collection from the words you discover and prepare it for manga reading and review sessions.",
    addWord: "Add a word",
    readSpace: "View the reading space",
    journey: "Journey",
    areasTitle: "Learning areas",
    steps: {
      read: "Read",
      collect: "Collect",
      remember: "Remember",
    },
    status: {
      available: "Available",
      next: "Next phase",
      planned: "Planned",
    },
    areas: {
      addTitle: "Add vocabulary",
      addDescription:
        "Save words, readings, and examples in your personal collection.",
      kanaTitle: "Learn kana",
      kanaDescription:
        "Study hiragana and katakana with readings, examples, and personal progress.",
      readTitle: "Read manga",
      readDescription:
        "Import and explore manga pages to learn from their context.",
      decksTitle: "Organize decks",
      decksDescription:
        "Group vocabulary according to your goals and study materials.",
      reviewTitle: "Review",
      reviewDescription:
        "Practice your words through spaced-repetition sessions.",
    },
  },
  kana: {
    eyebrow: "Foundations · かな",
    title: "Learn hiragana and katakana at your own pace.",
    description:
      "Explore the basic sounds, recognize each shape, and learn from real examples. Mark a character once you can identify it.",
    loadError:
      "Your progress could not be loaded. You can browse the content, but reload the page before marking changes.",
    progress: {
      eyebrow: "Your progress",
      title: "{learned} of {total} characters learned",
      label: "{learned} of {total} characters learned in this script",
    },
    quiz: {
      eyebrow: "Practice · 読む",
      title: "Type the reading",
      description:
        "Choose what you need to reinforce and answer in rōmaji. Practice prioritizes new characters and those with lower accuracy.",
      mixed: "Mixed",
      scopeLabel: "Session content",
      scopes: {
        learned: "Learned",
        category: "Category",
        row: "Row",
        all: "All",
        mistakes: "Errors",
      },
      scopeDescriptions: {
        learned:
          "Review only the characters you have already marked as learned.",
        category:
          "Progress in stages: basic sounds, dakuten, or handakuten.",
        row: "Focus the session on a single sound row.",
        all: "Mix the full script and prioritize what you most need to reinforce.",
        mistakes:
          "Work with characters whose accuracy is still below 80%.",
      },
      categoryLabel: "Category",
      categories: {
        basic: "Basics",
        dakuten: "Dakuten",
        handakuten: "Handakuten",
      },
      rowLabel: "Sound row",
      vowels: "Vowels",
      available: "{count} characters available",
      emptyScope:
        "There are no characters available in this scope yet.",
      retryHint:
        "Answers are checked one at a time. Mistakes return at the end of the session until you solve them.",
      start: "Start quiz",
      remaining: "{completed} of {total} solved",
      answerLabel: "Reading in rōmaji",
      answerPlaceholder: "Example: ka",
      check: "Check",
      continue: "Continue",
      correctTitle: "Correct answer",
      correctDescription: "The reading is {answer}.",
      incorrectTitle: "Incorrect answer",
      incorrectDescription:
        "The correct reading is {answer}. This character will appear again.",
      invalidAnswer: "Enter a valid reading using letters.",
      saveFailed: "Your answer could not be saved. Try again.",
      sessionCompleteTitle: "Session complete",
      sessionCompleteDescription:
        "You solved {count} characters with {mistakes} mistakes during the session.",
      restart: "New session",
      statsTitle: "Kana activity",
      totalAnswers: "Answers",
      accuracy: "Accuracy",
      activeDays: "Study days",
      currentStreak: "Current streak",
    },
    chart: {
      eyebrow: "Learning path",
      title: "Sounds and examples",
      scriptLabel: "Select script",
      hiragana: "Hiragana",
      katakana: "Katakana",
      filterLabel: "Filter characters",
      filters: {
        all: "All",
        pending: "To learn",
        learned: "Learned",
      },
      markLearned: "Mark learned",
      learned: "Learned",
      markRowLearned: "Learn all",
      unmarkRow: "Unmark the whole row",
      empty: "No characters match this filter.",
      characterCount: "{count} characters",
      categories: {
        basic: {
          title: "1. Basic sounds",
          description:
            "Start with these 46 forms. They are the foundation for reading every later category.",
        },
        dakuten: {
          title: "2. Sounds with dakuten",
          description:
            "The two ゛ marks turn the K, S, T, and H rows into voiced sounds.",
        },
        handakuten: {
          title: "3. Sounds with handakuten",
          description:
            "The small ゜ circle turns the H row into the five P-row sounds.",
        },
      },
    },
    combinations: {
      eyebrow: "Combined sounds",
      title: "Yōon: two shapes, one sound",
      description:
        "An i-column kana joins a small ゃ, ゅ, or ょ. The combination is pronounced as a single unit.",
    },
    specialRules: {
      eyebrow: "Essential rules",
      title: "Forms that change the reading",
      sokuonTitle: "Double consonant",
      sokuonDescription:
        "A small っ or ッ creates a brief pause and doubles the following consonant.",
      longVowelTitle: "Long vowel in katakana",
      longVowelDescription:
        "The ー mark extends the previous vowel and is used mainly in katakana.",
      particlesTitle: "Particle readings",
      particlesDescription:
        "When used as particles, は, へ, and を are pronounced wa, e, and o.",
    },
    feedback: {
      invalidCharacter: "The selected character is not valid.",
      authExpired:
        "Your session is no longer valid. Sign in again to save progress.",
      saveFailed: "Your progress could not be saved. Try again.",
    },
  },
  feature: {
    prepared: "Space prepared for a future phase",
    next: "What comes next",
    addNow: "Add vocabulary now",
  },
  read: {
    eyebrow: "Local reading · 読む",
    title: "Read manga",
    description:
      "Import a chapter from your device, browse its pages, and mark the regions that catch your attention.",
    importTitle: "Import your pages",
    importHelp:
      "Drop an image folder or ZIP file here. You can also choose them from your device.",
    chooseFolder: "Choose folder",
    chooseZip: "Open ZIP",
    privacyNote:
      "JPG, PNG, WebP, GIF, or AVIF. Pages and crops stay on your device during this session.",
    importing: "Preparing pages…",
    pageCount: "{count} pages ready",
    readerEyebrow: "Page-by-page reading",
    readerTitle: "Manga reader",
    readerLabel: "Manga page reader",
    pageLabel: "Page",
    pages: "pages",
    bookMode: "Book mode",
    scrollMode: "Scroll mode",
    switchToBook: "Switch to book mode",
    switchToScroll: "Switch to scroll mode",
    previous: "Previous",
    next: "Next",
    previousPage: "Go to the previous page",
    nextPage: "Go to the next page",
    pagePosition: "{current} / {total}",
    selectionControls: "Selection controls",
    zoomControls: "Zoom controls",
    zoomOut: "Zoom out",
    zoomIn: "Zoom in",
    resetZoom: "Reset zoom to 75%",
    viewportLabel: "Zoomable and scrollable page",
    selectRegion: "Select region",
    selectingRegion: "Selecting",
    clearSelection: "Clear selection",
    selectionIdleHelp:
      "Enable selection to mark a specific region of any page.",
    selectionHelp:
      "Drag with the primary mouse button over a page. Press Esc to cancel.",
    selectionReady: "Region selected",
    crop: {
      title: "Crop prepared",
      description:
        "OCR will read only the content inside this selected region.",
      previewEyebrow: "Crop preview",
      previewAlt: "Preview of the selected region",
      preparing: "Preparing crop…",
      temporary:
        "The crop exists only temporarily in this device's memory. It will be deleted after recognition and will never be saved or sent.",
      errors: {
        prepareFailed:
          "The crop could not be generated. Try selecting the region again.",
      },
    },
    ocr: {
      action: "Recognize Japanese text",
      fastAction: "Alternative OCR",
      preciseAction: "Precise OCR",
      preciseNote:
        "Precise OCR is the primary option. Its first use downloads about 65 MB from NihonAI and stores it in the browser cache; alternative OCR remains available as a fallback.",
      preciseConfirm:
        "Precise OCR needs to download about 65 MB from NihonAI. It will be stored in this browser's cache and the image will not be sent. Continue?",
      working: "Processing…",
      loading: "Preparing local Japanese OCR…",
      preciseLoading: "Preparing Manga OCR on this device…",
      connecting: "Connecting to the model repository…",
      downloading: "Loading the local model… {progress}%",
      downloadProgressLabel: "Precise OCR model loading progress",
      recognizing: "Recognizing text… {progress}%",
      progressLabel: "Text recognition progress",
      floatingPanelLabel: "Floating OCR panel",
      closeFloatingPanel: "Close OCR panel",
      successTitle: "Japanese text recognized",
      successDescription:
        "The crop has been removed from memory. Review the result before continuing.",
      correctionLabel: "Detected Japanese text",
      correctionHelp:
        "Correct any character, space, or line break that OCR did not recognize properly. The text remains only in this session.",
      emptyTitle: "No text was detected",
      emptyDescription:
        "The crop was removed. Select another region with clearer Japanese text and try again.",
      errors: {
        recognitionFailed:
          "The text could not be recognized and the crop was removed. Select the region again and retry.",
        preciseFailed:
          "Precise OCR could not complete recognition and the crop was removed. Check the connection or available storage and try again.",
        preciseUnavailable:
          "Precise OCR is not available in this browser. You can continue with fast OCR.",
      },
    },
    mining: {
      title: "Vocabulary mining",
      description:
        "Analyze the corrected text, confirm a meaning, and save it with its context.",
      analyzeAction: "Analyze vocabulary",
      analyzing: "Preparing analysis…",
      analyzeHelp:
        "On first use, the Japanese analyzer loads on demand (about 18 MB). It then remains in the browser cache.",
      tokenHelp:
        "Hover, focus, or tap a word to inspect its card. Click it to keep the card open.",
      tokensLabel: "Words detected in the sentence",
      cardLabel: "Selected text",
      closeCard: "Close vocabulary card",
      loadingEntry: "Looking up JMdict…",
      noEntry: "JMdict does not contain an entry for this selection.",
      meanings: "Meanings",
      meaningLanguage: "Meaning language",
      prepareToSave: "Prepare to save",
      saved: "Word saved to your vocabulary.",
      englishFallback:
        "JMdict has no Spanish meaning for this entry, so the English definition is shown.",
      hoverHelp: "Move the pointer away to close the card.",
      pinnedHelp: "The card is pinned. Press the word again to close it.",
      attribution: "JMdict data · CC BY-SA 4.0",
      parts: {
        noun: "noun",
        verb: "verb",
        adjective: "adjective",
        adverb: "adverb",
        particle: "particle",
        expression: "expression",
        auxiliary: "auxiliary",
        conjunction: "conjunction",
        interjection: "interjection",
        pronoun: "pronoun",
        prefix: "prefix",
        suffix: "suffix",
        counter: "counter",
        other: "other",
      },
      errors: {
        analysisFailed:
          "The text could not be analyzed. Check your connection and try again.",
        dictionaryFailed:
          "JMdict could not be queried. Try again.",
      },
    },
    bookKeyboardHelp:
      "Shortcuts: ←/→ changes page, +/− adjusts zoom, and 0 returns to 75%.",
    scrollKeyboardHelp:
      "Scroll to read every page. +/− adjusts zoom, and 0 returns to 75%.",
    errors: {
      noImages: "No supported images were found.",
      oneZip: "Import one ZIP file at a time.",
      archiveTooLarge: "The ZIP exceeds the 200 MB limit.",
      imageTooLarge: "An image exceeds the 20 MB limit.",
      importTooLarge: "The uncompressed import is too large.",
      tooManyPages: "You can import up to {count} pages at a time.",
      readFailed:
        "Those files could not be read. Check the format and try again.",
    },
  },
  decks: {
    title: "Decks",
    description:
      "This space will bring together the decks you use to organize words by topic, work, or goal.",
    nextStep: "Deck management is planned for phase 20.",
  },
  review: {
    title: "Review",
    description:
      "Here you will practice saved vocabulary through short, focused sessions.",
    nextStep:
      "FSRS spaced repetition is planned for phase 21.",
  },
  account: {
    eyebrow: "Profile ・ 設定",
    title: "Your account",
    description:
      "Personalize how you appear in NihonAI and view only activity that actually exists.",
    summaryTitle: "Account summary",
    email: "Email",
    memberSince: "Member since",
    savedWords: "Saved words",
    realActivityNote: "Calculated from your actual collection.",
    profileEyebrow: "Identity",
    nameTitle: "Display name",
    nameDescription:
      "This name is shown only inside your personal space.",
    displayName: "Display name",
    nameHelp: "Up to 50 characters.",
    saveName: "Save name",
    saving: "Saving...",
    photoEyebrow: "Avatar",
    photoTitle: "Profile photo",
    photoDescription:
      "Your photo is stored privately and is only served during your session.",
    choosePhoto: "Choose image",
    photoHelp: "JPG, PNG, or WebP. Maximum size: 2 MB.",
    uploadPhoto: "Update photo",
    uploading: "Uploading...",
    removePhoto: "Remove photo",
    removing: "Removing...",
    avatarAlt: "{name}'s profile photo",
    userFallback: "User",
    feedback: {
      nameRequired: "Enter a display name.",
      nameTooLong: "The name cannot exceed 50 characters.",
      nameSaved: "Name updated.",
      saveFailed: "The profile could not be saved. Try again.",
      avatarRequired: "Choose an image.",
      avatarTooLarge: "The image cannot exceed 2 MB.",
      avatarInvalidType: "Choose a JPG, PNG, or WebP image.",
      avatarSaved: "Profile photo updated.",
      avatarRemoved: "Profile photo removed.",
      avatarFailed: "The photo could not be updated. Try again.",
      authExpired: "Your session is no longer valid. Sign in again.",
    },
  },
  vocabulary: {
    eyebrow: "Collection ・ 単語",
    title: "Add vocabulary",
    description:
      "Save the words you encounter while studying and manage your personal collection.",
    loadError:
      "Your vocabulary could not be loaded. Reload the page to try again.",
    errors: {
      reloadBeforeModify:
        "Reload the page before changing your vocabulary.",
      waitForDelete: "Wait for the current deletion to finish.",
      saveInProgress: "A save operation is already in progress.",
      operationFailed: "The operation could not be completed. Try again.",
      disabled:
        "Reload the page to recover your collection before saving changes.",
      invalidData: "No valid vocabulary data was received.",
      requiredFields: "Complete the word, reading, and meaning.",
      invalidEnums:
        "Select a valid language, word type, and JLPT level.",
      fieldTooLong: "One or more fields exceed the allowed length.",
      invalidEntry: "The selected entry is not valid.",
      authExpired: "Your session is no longer valid. Sign in again.",
      notFound: "The entry no longer exists or you cannot access it.",
    },
    form: {
      editEyebrow: "Edit entry",
      newEyebrow: "New entry",
      editTitle: "Edit vocabulary",
      addTitle: "Add vocabulary",
      requiredHelp: "Fields marked with * are required.",
      word: "Japanese word *",
      reading: "Reading *",
      meaning: "Meaning *",
      meaningLanguage: "Meaning language",
      meaningLanguages: {
        es: "Spanish",
        en: "English",
      },
      wordType: "Word type",
      jlpt: "JLPT level",
      example: "Example sentence",
      source: "Source or origin label",
      meaningPlaceholder: "study",
      sourcePlaceholder: "Anime, book, class...",
      savingChanges: "Saving changes...",
      saving: "Saving...",
      saveChanges: "Save changes",
      saveWord: "Save word",
      cancel: "Cancel",
      wordTypes: {
        Sustantivo: "Noun",
        Verbo: "Verb",
        Adjetivo: "Adjective",
        Adverbio: "Adverb",
        Expresión: "Expression",
        Otro: "Other",
      },
      unclassified: "Unclassified",
    },
    list: {
      eyebrow: "Collection",
      title: "My vocabulary",
      emptyTitle: "No words have been saved yet.",
      emptyDescription:
        "Complete the form to create your first entry.",
      edit: "Edit",
      delete: "Delete",
      editLabel: "Edit {word}",
      deleteLabel: "Delete {word}",
      confirmLabel: "Confirm deletion of {word}",
      confirmQuestion: "Delete this entry?",
      deleting: "Deleting...",
      cancel: "Cancel",
      source: "Source: {source}",
    },
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = {
  es: spanishDictionary,
  en: englishDictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
