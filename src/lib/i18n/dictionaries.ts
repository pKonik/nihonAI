import "server-only";

import type { Locale } from "@/lib/i18n/config";

const spanishDictionary = {
  meta: {
    description:
      "Aplicación personal para organizar el aprendizaje de japonés.",
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
