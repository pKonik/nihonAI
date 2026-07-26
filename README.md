# NihonAI

NihonAI es una plataforma personal para aprender japonés. Su objetivo principal
es integrar un lector de manga con minería de vocabulario y repetición
espaciada, manteniendo también la incorporación manual de palabras.

El proyecto también funciona como un recorrido práctico para aprender
desarrollo web moderno paso a paso.

## Documentación

- [Arquitectura y estado técnico](docs/architecture.md)
- [Frontend actual](docs/frontend.md)
- [Modelo y flujo de vocabulario](docs/vocabulary.md)

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

## Migraciones de Supabase

El esquema remoto se versiona en `supabase/migrations/` y se administra con la
Supabase CLI instalada como dependencia de desarrollo.

Después de autenticar y vincular el proyecto:

```bash
npx supabase migration list
npx supabase db push --dry-run
npx supabase db push
npx supabase db lint --linked --level warning
```

`db push --dry-run` permite revisar las migraciones pendientes antes de
aplicarlas. No introduzcas contraseñas ni tokens como comandos de PowerShell;
cuando una herramienta solicite una contraseña, escríbela únicamente en su
prompt seguro.
