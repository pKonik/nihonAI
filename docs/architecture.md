# Arquitectura de NihonAI

Consulta este documento cuando una tarea modifique la arquitectura del proyecto, la organización de módulos, la autenticación, la estructura técnica o la relación entre las distintas partes de la aplicación.

La instalación, configuración del entorno y ejecución local se documentan en el
[`README.md`](../README.md).

---

## Objetivo

Este documento define la arquitectura permanente de NihonAI.

Su propósito es servir como la fuente de verdad sobre cómo está organizado el proyecto y qué principios deben respetarse al realizar cambios estructurales.

---

## Estado actual

La aplicación dispone de:

- registro e inicio de sesión mediante Supabase Auth;
- confirmación de correo electrónico;
- renovación automática de sesión mediante cookies SSR;
- protección de rutas autenticadas;
- integración verificada con el proyecto remoto de Supabase;
- modelo persistente de vocabulario versionado mediante migraciones;
- aislamiento de las entradas por usuario mediante RLS;
- lectura del vocabulario desde un Server Component;
- creación, actualización y eliminación mediante Server Actions;
- acceso a Supabase centralizado en módulos exclusivos del servidor;
- layout autenticado compartido para las áreas principales;
- navegación entre Inicio, Leer manga, Añadir, Mazos y Repasar;
- interfaz persistente de vocabulario ubicada en la ruta `/anadir`;
- interfaz bilingüe español–inglés con preferencia persistente;
- landing pública en `/` e Inicio autenticado en `/inicio`.
- perfil privado con nombre visible, avatar y configuración de cuenta;
- estadísticas de cuenta calculadas desde la actividad persistida.
- bienvenida opcional y bilingüe para cuentas nuevas, reabrible desde Ayuda;
- estado de finalización de la bienvenida persistido en el perfil privado.
- módulo privado de hiragana y katakana con ejemplos, combinaciones y progreso
  persistente por carácter;
- quiz privado de kana con corrección en servidor, repetición de errores y
  estadísticas calculadas desde intentos persistidos;
- lector local de manga con importación de carpetas de imágenes o archivos ZIP,
  orden natural, navegación página a página, zoom, desplazamiento y procesamiento
  exclusivo en el navegador;
- selección rectangular de una región de la página mediante coordenadas
  porcentuales y generación local de un recorte temporal para OCR, sin
  persistencia de imágenes;

La interfaz conserva únicamente estado interactivo confirmado por Supabase. La
capa de acceso a datos traduce entre el dominio TypeScript y las columnas de
PostgreSQL, y cada mutación vuelve a verificar la identidad del usuario.

---

## Principios arquitectónicos

Toda modificación de la arquitectura debe respetar los siguientes principios:

- mantener una estructura sencilla y fácil de comprender;
- minimizar el acoplamiento entre módulos;
- favorecer componentes y lógica reutilizables;
- separar claramente la infraestructura del dominio de negocio;
- centralizar la comunicación con Supabase;
- mantener un tipado consistente mediante TypeScript;
- evitar abstracciones innecesarias hasta que exista una necesidad real.

La simplicidad tiene prioridad sobre una arquitectura excesivamente compleja.

---

## Internacionalización

La interfaz utiliza diccionarios TypeScript centralizados para español e inglés.
El idioma seleccionado se conserva en una cookie `httpOnly` con alcance global y
se resuelve en Server Components y Server Actions. La aplicación mantiene sus
rutas actuales sin prefijos de idioma; el elemento `<html>` refleja el idioma
activo mediante su atributo `lang`.

Los componentes cliente reciben únicamente la sección del diccionario que
necesitan. Los valores persistidos del dominio, como los tipos de palabra, no se
traducen en la base de datos: solo se traduce su etiqueta de presentación.

---

## Tecnologías

Actualmente el proyecto utiliza:

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint
- Supabase Auth
- Cliente SSR de Supabase
- PostgreSQL de Supabase
- Supabase CLI
- Node.js
- npm
- Git

---

## Estructura del proyecto

```text
nihonai/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── types/
│   └── ...
├── docs/
├── supabase/
│   ├── migrations/
│   └── tests/
├── AGENTS.md
├── README.md
└── ...
```

Cada módulo debe mantener una responsabilidad claramente definida.

---

## Roadmap oficial

El proyecto avanza mediante las siguientes fases numeradas. Una fase no comienza
hasta que la anterior esté verificada y el usuario apruebe continuar.

1. **Fundación del proyecto — completada.** Crear la aplicación con Next.js,
   React, TypeScript, Tailwind CSS y las comprobaciones básicas.
2. **Interfaz local de vocabulario — completada.** Implementar el formulario,
   la colección en memoria y la eliminación básica.
3. **Autenticación con Supabase — completada.** Incorporar registro, inicio de
   sesión, confirmación de correo, cookies SSR y protección de rutas.
4. **Persistencia segura de vocabulario — completada.** Crear la tabla,
   migración, relación con el usuario y políticas RLS.
5. **CRUD persistente de vocabulario — completada.** Conectar lectura,
   creación, edición y eliminación de la interfaz con Supabase.
6. **Navegación principal — completada.** Crear la estructura de aplicación con
   Inicio, Leer manga, Añadir, Mazos y Repasar, conservando la interfaz actual
   dentro de Añadir.
6.5. **Identidad visual y diseño — completada.** Crear el logo y la identidad
   propia de NihonAI, aplicar un estilo japonés contemporáneo y consolidar la
   presentación responsive de la navegación sin copiar otras plataformas.
6.6. **Internacionalización español–inglés — completada.** Centralizar los
   textos de la aplicación, incorporar un selector de idioma y asegurar que
   navegación, formularios, validaciones, errores, ayudas, metadatos y
   accesibilidad estén disponibles en español e inglés.
6.7. **Landing pública — completada.** Convertir `/` en una presentación pública
   y bilingüe de NihonAI antes del inicio de sesión, trasladar el Inicio privado
   a `/inicio` y explicar de forma visual y original el recorrido
   `leer → seleccionar → reconocer → minar → repasar`.
7. **Perfil y configuración de cuenta — completada.** Incorporar foto de perfil,
   nombre visible, configuración de la cuenta, acceso desde el avatar y
   estadísticas basadas únicamente en actividad real. No incluir niveles, XP,
   rankings ni perfiles públicos.
8. **Bienvenida y mascota — completada.** Mostrar a los usuarios nuevos una guía
   opcional de los módulos de NihonAI acompañada por una mascota propia, y
   permitir abrirla nuevamente desde Ayuda.
9. **Aprendizaje de hiragana y katakana — completada.** Crear un módulo para
   estudiar kana, combinaciones, lecturas y ejemplos, con progreso por carácter.
10. **Quiz y progreso de kana — completada.** Practicar la lectura escrita con
    teclado, corregir respuestas, repetir errores y registrar precisión,
    actividad y rachas de estudio.
11. **Importación y lector local de manga — completada.** Importar una carpeta de
   imágenes o un ZIP y mostrar sus páginas en orden.
12. **Navegación del lector y zoom — completada.** Cambiar de página, ampliar o
   reducir las páginas cargadas mediante controles de zoom y gestionar su
   desplazamiento.
13. **Selección de regiones — completada.** Permitir marcar con el ratón una
   región concreta de una página.
14. **Recorte temporal de imágenes — completada.** Generar localmente el recorte
    que consumirá el OCR y descartarlo después del procesamiento, sin almacenar
    imágenes en Supabase.
15. **OCR japonés — pendiente.** Reconocer texto japonés únicamente dentro del
    recorte seleccionado.
16. **Corrección del OCR — pendiente.** Mostrar el texto detectado y permitir
    corregirlo antes de continuar.
17. **Minería de vocabulario — pendiente.** Analizar la oración, seleccionar
    una palabra y consultar JMdict en español e inglés para obtener forma de
    diccionario, lectura, significado y tipo.
18. **Integración del lector con vocabulario — pendiente.** Reutilizar el
    formulario de Añadir y guardar la palabra, la oración reconocida y los datos
    lingüísticos confirmados sin persistir el recorte, conservando el significado
    elegido y su idioma.
19. **Biblioteca de vocabulario — pendiente.** Incorporar búsqueda, filtros y
    presentación del contexto minado.
20. **Mazos — pendiente.** Crear y administrar mazos, y permitir añadirles
    vocabulario manual o minado.
21. **Repetición espaciada con FSRS — pendiente.** Implementar sesiones de
    repaso, calificaciones e intervalos programados.
22. **Funciones de IA — pendiente.** Añadir asistencia inteligente únicamente
    sobre los flujos ya estabilizados.
23. **Integraciones externas — pendiente.** Incorporar fuentes lingüísticas,
    servicios o APIs adicionales que hayan sido aprobados, incluida una
    traducción automática opcional claramente identificada cuando JMdict no
    disponga de una definición en el idioma seleccionado.
24. **Despliegue — pendiente.** Preparar producción, variables de entorno,
    observabilidad, rendimiento y verificaciones finales.

La siguiente fase oficial es la **fase 15: OCR japonés**.
Desde la fase 6.6,
toda funcionalidad nueva que muestre texto deberá entregar sus versiones en
español e inglés dentro de la misma fase. Cada fase debe mantener un alcance
pequeño y no adelantar funcionalidades pertenecientes a las fases posteriores.

---

## Cuándo modificar este documento

Actualiza este documento únicamente cuando exista un cambio permanente en la arquitectura del proyecto, la organización de módulos o las decisiones técnicas principales.

No utilices este documento para registrar tareas temporales, decisiones experimentales o procedimientos específicos de implementación.
