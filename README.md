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

Abre [http://localhost:3000](http://localhost:3000) en el navegador para ver la
presentación pública. Next.js actualizará la página al guardar cambios en el
código.

El proyecto utiliza el empaquetador Webpack incluido en Next.js porque el OCR
preciso se ejecuta en un Web Worker descartable. En la versión actual,
Turbopack trata ese worker TypeScript como un archivo estático sin transpilar.

Para detener el servidor, vuelve a la terminal y pulsa `Ctrl + C`.

Tras iniciar sesión, `/inicio` abre el espacio privado y su navegación separa
Inicio, Leer manga, Añadir, Mazos y Repasar. El CRUD persistente de vocabulario
está disponible en **Añadir**. El avatar abre `/cuenta`, donde se puede configurar
el nombre visible y una foto privada, además de consultar estadísticas reales.
Las cuentas nuevas reciben una bienvenida opcional con Kitsu, que puede abrirse
de nuevo mediante el botón **Ayuda**.
Desde Inicio también se puede abrir `/kana` para estudiar hiragana y katakana,
consultar ejemplos y conservar el progreso por carácter.
La ruta `/leer` permite importar localmente una carpeta de imágenes o un ZIP,
alternar entre modo libro y lectura continua, controlar el zoom y desplazarse
por las imágenes sin subir las páginas originales. En ambos modos permite
marcar una región, previsualizar temporalmente el recorte y reconocer localmente
texto japonés horizontal o vertical mediante variantes de imagen optimizadas
localmente. El recorte no se sube ni se guarda: se descarta después de cada
intento y solo el texto reconocido, que puede corregirse antes de continuar,
permanece temporalmente en memoria.

El lector incluye además un modo **OCR preciso** experimental basado en Manga
OCR Mobile y ONNX Runtime Web, configurado como motor principal. Sus archivos se
distribuyen de forma estática junto con NihonAI, pero no se cargan al visitar la
web: el primer uso descarga, con confirmación previa, unos 65 MB y los conserva
en la caché del navegador. Las sesiones de inferencia se liberan después de cada
intento para reducir la memoria en reposo; volver a utilizarlo reconstruye el
motor desde esa caché. La descarga no contiene el recorte: tanto la imagen como
la inferencia permanecen en el dispositivo. Tesseract continúa disponible como
respaldo de compatibilidad.

Tras corregir el texto OCR, el lector permite analizar la oración y consultar
cada palabra mediante hover, foco, clic o toque. La ficha muestra la forma de
diccionario, lectura, tipo y significados de JMdict en español o inglés. El
analizador de unos 18 MB se carga únicamente al usar esta función, y JMdict se
sirve bajo demanda en 2048 fragmentos Brotli con caché inmutable, sin ocupar la
base de datos gratuita de Supabase. Esta fase todavía no guarda la palabra; esa
integración corresponde a la fase siguiente.

Los datos léxicos proceden del
[proyecto JMdict/EDICT](https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project)
y se distribuyen bajo
[CC BY-SA 4.0](https://www.edrdg.org/edrdg/licence.html).

Las demás áreas se completarán siguiendo el roadmap de
[`docs/architecture.md`](docs/architecture.md).

## Comprobaciones

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

- `test` ejecuta las pruebas unitarias de cuenta, rutas públicas, idiomas, kana,
  importación, OCR y minería de manga, y vocabulario.
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
