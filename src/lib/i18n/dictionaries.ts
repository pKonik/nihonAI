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
    userFallback: "usuario",
  },
  navigation: {
    label: "Navegación principal",
    home: "Inicio",
    read: "Leer manga",
    add: "Añadir",
    decks: "Mazos",
    review: "Repasar",
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
        "Disponible ahora: vocabulario personal. El lector, OCR y repaso se incorporarán por fases.",
      carouselLabel: "Ejemplos de lectura y vocabulario",
      carouselControls: "Controles de las diapositivas",
      previousSlide: "Mostrar el panel anterior",
      nextSlide: "Mostrar el panel siguiente",
      pauseSlides: "Pausar el cambio automático",
      playSlides: "Reanudar el cambio automático",
      goToSlide: "Mostrar el panel {current} de {total}",
      contextLabel: "Contexto de lectura",
      pageLabel: "Página 12",
      nightSceneAlt:
        "Barrio japonés tranquilo bajo la luna durante la noche.",
      selectionLabel: "Texto seleccionado",
      japaneseSentence: "静かな夜だね。",
      reading: "よる",
      word: "夜",
      meaning: "noche",
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
      eyebrow: "Espacio para acompañarte",
      title: "Una guía propia llegará cuando el recorrido la necesite.",
      description:
        "La futura bienvenida tendrá una mascota de NihonAI, pero primero estamos construyendo una experiencia que realmente pueda explicar.",
      label: "Futura guía de NihonAI",
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
        "Puedes crear una cuenta y administrar una colección privada de vocabulario con palabra, lectura, significado, ejemplo, tipo y nivel JLPT.",
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
  feature: {
    prepared: "Espacio preparado para una próxima fase",
    next: "Qué viene después",
    addNow: "Añadir vocabulario ahora",
  },
  read: {
    title: "Leer manga",
    description:
      "Aquí podrás importar páginas de manga y convertir la lectura en vocabulario con contexto.",
    nextStep:
      "La importación de imágenes y archivos ZIP llegará en la fase 11.",
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
        "Selecciona un tipo de palabra y un nivel JLPT válidos.",
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
      meaning: "Significado en español *",
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
    userFallback: "user",
  },
  navigation: {
    label: "Main navigation",
    home: "Home",
    read: "Read manga",
    add: "Add",
    decks: "Decks",
    review: "Review",
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
        "Available now: personal vocabulary. The reader, OCR, and review will arrive in phases.",
      carouselLabel: "Reading and vocabulary examples",
      carouselControls: "Slideshow controls",
      previousSlide: "Show the previous panel",
      nextSlide: "Show the next panel",
      pauseSlides: "Pause automatic slides",
      playSlides: "Resume automatic slides",
      goToSlide: "Show panel {current} of {total}",
      contextLabel: "Reading context",
      pageLabel: "Page 12",
      nightSceneAlt:
        "A quiet Japanese neighborhood beneath the moon at night.",
      selectionLabel: "Selected text",
      japaneseSentence: "静かな夜だね。",
      reading: "よる",
      word: "夜",
      meaning: "night",
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
      eyebrow: "Room for guidance",
      title: "A dedicated guide will arrive when the journey needs one.",
      description:
        "The future welcome experience will have a NihonAI mascot, but first we are building an experience it can genuinely explain.",
      label: "Future NihonAI guide",
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
        "You can create an account and manage a private vocabulary collection with words, readings, meanings, examples, word types, and JLPT levels.",
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
  feature: {
    prepared: "Space prepared for a future phase",
    next: "What comes next",
    addNow: "Add vocabulary now",
  },
  read: {
    title: "Read manga",
    description:
      "Here you will be able to import manga pages and turn reading into vocabulary with context.",
    nextStep:
      "Image and ZIP file imports will arrive in phase 11.",
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
      invalidEnums: "Select a valid word type and JLPT level.",
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
      meaning: "Meaning in English *",
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
