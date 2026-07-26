# NihonAI

NihonAI es una plataforma personal para aprender japonés. Su objetivo principal
es integrar un lector de manga con minería de vocabulario y repetición
espaciada, manteniendo también la incorporación manual de palabras.

El proyecto también funciona como un recorrido práctico para aprender
desarrollo web moderno paso a paso. El vocabulario todavía vive únicamente en
el estado de React; Supabase Auth ya está preparado y la persistencia se
incorporará en la siguiente fase.

## Estado actual

Fase 3 completada: la aplicación dispone de registro, inicio y cierre de sesión
con Supabase Auth, confirmación de correo, renovación de sesión mediante cookies
SSR y protección de la página principal. El flujo se verificó contra el proyecto
remoto de Supabase.

## Tecnologías

- Next.js 16 con App Router
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint
- Supabase Auth y cliente SSR
- Node.js y npm
- Git

La interfaz utiliza las fuentes del sistema para que la compilación no dependa
de descargar archivos tipográficos externos.

Supabase Auth forma parte de la aplicación. PostgreSQL se conectará al
vocabulario durante la siguiente fase y Vercel llegará en una fase posterior.
`localStorage` no se utilizará como persistencia principal.

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

Duplica `.env.example` con el nombre `.env.local` y sustituye los valores de
ejemplo:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key
```

Los dos valores están disponibles en el diálogo **Connect** del proyecto de
Supabase. La clave publicable está diseñada para llegar al navegador; la
seguridad de los datos dependerá de las políticas RLS de cada tabla.

No añadas una clave `service_role` a variables `NEXT_PUBLIC_*`. Esa clave es
secreta y omite RLS.

Los archivos `.env*` permanecen excluidos de Git, excepto `.env.example`, que
solo contiene nombres y valores ficticios.

### Configuración de Supabase Auth

En el panel de Supabase:

1. crea o abre el proyecto;
2. mantén habilitado el proveedor **Email**;
3. configura `http://localhost:3000` como Site URL durante el desarrollo;
4. añade `http://localhost:3000/auth/confirm` a las Redirect URLs;
5. reinicia `npm run dev` después de crear o modificar `.env.local`.

Los proyectos alojados suelen requerir confirmar el correo antes del primer
inicio de sesión.

## Estructura general

```text
nihonai/
├── public/                 # Archivos estáticos
├── src/
│   ├── app/
│   │   ├── auth/confirm/route.ts # Confirmación de correo
│   │   ├── favicon.ico     # Icono del sitio
│   │   ├── globals.css     # Estilos globales y Tailwind CSS
│   │   ├── layout.tsx      # Estructura y metadatos compartidos
│   │   ├── login/          # Pantalla y acciones de autenticación
│   │   └── page.tsx        # Página principal
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthCallbackError.tsx
│   │   └── vocabulary/
│   │       ├── VocabularyApp.tsx
│   │       ├── VocabularyForm.tsx
│   │       └── VocabularyList.tsx
│   ├── lib/supabase/
│   │   ├── client.ts       # Cliente para componentes del navegador
│   │   ├── env.ts          # Lectura y validación de configuración
│   │   ├── proxy.ts        # Renovación y protección de sesión
│   │   └── server.ts       # Cliente para código del servidor
│   ├── proxy.ts            # Punto de entrada Proxy de Next.js 16
│   └── types/
│       └── vocabulary.ts   # Modelo de una entrada de vocabulario
├── .env.example            # Plantilla de variables sin secretos
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
- registro e inicio de sesión con correo y contraseña;
- confirmación de correo;
- reenvío de correos de confirmación vencidos;
- mensajes comprensibles para errores devueltos por Supabase;
- cierre y renovación de sesión;
- protección de la página principal.

Las entradas de vocabulario aún desaparecen al recargar.

## Próxima fase

La siguiente fase creará el modelo mínimo de vocabulario en PostgreSQL. La
tabla incluirá un propietario y Row Level Security desde su primera migración,
para que cada cuenta solo pueda operar sobre sus propios datos.
