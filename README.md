# NihonAI

NihonAI es una aplicación web personal para guardar y organizar vocabulario
encontrado durante el estudio y la inmersión en japonés.

El proyecto también funciona como un recorrido práctico para aprender
desarrollo web moderno paso a paso. La primera versión guardará las palabras
únicamente en el estado de React; la persistencia y los servicios externos se
incorporarán en fases posteriores.

## Estado actual

Fase 1 completada: proyecto inicial configurado. La aplicación muestra una
pantalla de bienvenida, pero todavía no incluye el formulario de vocabulario.

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
todavía no forman parte de la aplicación.

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
│   └── app/
│       ├── favicon.ico     # Icono del sitio
│       ├── globals.css     # Estilos globales y Tailwind CSS
│       ├── layout.tsx      # Estructura y metadatos compartidos
│       └── page.tsx        # Página principal
├── AGENTS.md               # Instrucciones permanentes para agentes
├── CLAUDE.md               # Referencia a AGENTS.md creada por Next.js
├── next.config.ts          # Configuración de Next.js
├── package.json            # Dependencias y comandos npm
├── tsconfig.json           # Configuración de TypeScript
└── README.md               # Documentación del proyecto
```

## Próxima fase

La fase 2 añadirá, después de su aprobación:

- el tipo TypeScript de una entrada de vocabulario;
- un formulario con validación básica;
- estado local de React;
- una lista de palabras;
- eliminación de registros.

Los datos desaparecerán al recargar la página hasta que se implemente
`localStorage` en una fase posterior.
