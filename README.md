# NihonAI

NihonAI es una plataforma personal para aprender japonés. Su objetivo principal
es integrar un lector de manga con minería de vocabulario y repetición
espaciada, manteniendo también la incorporación manual de palabras.

El proyecto también funciona como un recorrido práctico para aprender
desarrollo web moderno paso a paso. La primera versión guardará las palabras
únicamente en el estado de React; la persistencia y los servicios externos se
incorporarán en fases posteriores.

## Estado actual

Fase 2 completada: la aplicación permite añadir vocabulario, mostrarlo en una
lista y eliminarlo. Los datos viven únicamente en el estado de React y
desaparecen al recargar la página.

## Tecnologías

- Next.js 16 con App Router
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint
- Node.js y npm
- Git

La interfaz utiliza las fuentes del sistema para que la compilación no dependa
de descargar archivos tipográficos externos.

Supabase, PostgreSQL y Vercel están previstos para fases posteriores, pero
todavía no forman parte de la aplicación. `localStorage` no se utilizará como
persistencia principal.

## Requisitos

- Node.js 20.9 o superior; se recomienda una versión LTS
- npm
- Git

Versiones utilizadas al crear el proyecto:

- Node.js 24.18.0
- npm 11.16.0
- Git 2.51.0

## Instalación

Después de clonar el repositorio, instala las dependencias declaradas en
`package.json`:

```bash
npm install
```

`node_modules` contiene las dependencias instaladas localmente y está excluido
del repositorio mediante `.gitignore`.

## Ejecución local

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador. Next.js
actualizará la página al guardar cambios en el código.

Para detener el servidor, vuelve a la terminal y pulsa `Ctrl + C`.

## Comprobaciones

```bash
npm run lint
npm run typecheck
npm run build
```

- `lint` revisa problemas de calidad y convenciones.
- `typecheck` comprueba los tipos de TypeScript sin generar archivos.
- `build` crea y valida la versión optimizada para producción.

## Variables de entorno

La fase actual no necesita variables de entorno ni secretos. Cuando se
incorpore Supabase se documentarán las variables requeridas en un archivo de
ejemplo sin valores sensibles.

Los archivos `.env*` están excluidos por `.gitignore`.

## Estructura general

```text
nihonai/
├── public/                 # Archivos estáticos
├── src/
│   ├── app/
│   │   ├── favicon.ico     # Icono del sitio
│   │   ├── globals.css     # Estilos globales y Tailwind CSS
│   │   ├── layout.tsx      # Estructura y metadatos compartidos
│   │   └── page.tsx        # Página principal
│   ├── components/
│   │   └── vocabulary/
│   │       ├── VocabularyApp.tsx
│   │       ├── VocabularyForm.tsx
│   │       └── VocabularyList.tsx
│   └── types/
│       └── vocabulary.ts   # Modelo de una entrada de vocabulario
├── AGENTS.md               # Instrucciones permanentes para agentes
├── CLAUDE.md               # Referencia a AGENTS.md creada por Next.js
├── next.config.ts          # Configuración de Next.js
├── package.json            # Dependencias y comandos npm
├── tsconfig.json           # Configuración de TypeScript
└── README.md               # Documentación del proyecto
```

## Funcionalidades actuales

- formulario para palabra, lectura, significado, tipo, JLPT, ejemplo y fuente;
- validación de palabra, lectura y significado;
- lista reactiva de vocabulario;
- eliminación de entradas;
- estado vacío cuando todavía no hay vocabulario.

## Próxima fase

La fase 3 configurará Supabase, autenticación y las políticas de seguridad que
servirán como base para la persistencia. Después se conectará el modelo de
vocabulario y, en fases separadas, se construirá el lector de manga.
