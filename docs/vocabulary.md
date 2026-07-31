# Dominio de Vocabulario

Consulta este documento cuando una tarea modifique el modelo de vocabulario, la persistencia, las validaciones, el formulario, las consultas o cualquier funcionalidad relacionada con las palabras.

Este documento define las reglas permanentes del dominio de vocabulario de NihonAI.

---

## Objetivo

El sistema de vocabulario constituye el núcleo de NihonAI.

Toda funcionalidad relacionada con palabras debe respetar las reglas definidas en este documento.

---

## Modelo del dominio

Cada entrada representa una palabra o expresión japonesa. Cada entrada
almacenada pertenece a un único usuario.

Actualmente una entrada contiene como mínimo:

- palabra;
- lectura;
- significado;
- tipo de palabra;
- nivel JLPT;
- oración de ejemplo;
- fuente.

Estos campos podrán ampliarse en el futuro, pero los cambios deberán mantener compatibilidad con el dominio existente.

---

## Modelo persistente

La migración
`supabase/migrations/20260726000000_create_vocabulary_entries.sql` define la
tabla `public.vocabulary_entries`.

Cada fila contiene:

- `id`: identificador UUID generado por PostgreSQL;
- `user_id`: propietario relacionado con `auth.users(id)`;
- `word`, `reading` y `meaning`: textos obligatorios y no vacíos;
- `meaning_language`: idioma `es` o `en` de la acepción conservada;
- `part_of_speech`: uno de los tipos de palabra admitidos por el dominio;
- `jlpt_level`: nivel entre `N5` y `N1`, o `Sin clasificar`;
- `example` y `source`: textos opcionales;
- `created_at` y `updated_at`: fechas gestionadas por PostgreSQL.

Los valores permitidos de `part_of_speech` y `jlpt_level` coinciden con los
valores actuales de la aplicación. Un trigger actualiza `updated_at` cuando
cambia una entrada.

---

## Principios del dominio

Toda modificación del sistema de vocabulario debe respetar los siguientes principios:

- cada entrada persistida pertenece exactamente a un usuario;
- una entrada representa un único concepto léxico;
- el modelo debe ser sencillo y fácil de ampliar;
- evitar almacenar información derivable, excepto cuando sea necesaria para
  conservar el contexto de aprendizaje, el resultado de OCR o la fidelidad
  histórica de una entrada;
- mantener nombres y tipos consistentes;
- favorecer un modelo preparado para futuras funciones de aprendizaje.

---

## Estado actual

La aplicación dispone de:

- lectura persistente de la colección del usuario autenticado;
- formulario reutilizado para crear y editar;
- validación equivalente en cliente y servidor;
- listado ordenado por fecha de creación descendente;
- confirmación integrada antes de eliminar;
- estados de carga y errores comprensibles;
- estado vacío cuando no existen palabras.
- creación desde el lector con el formulario compartido, precargado a partir de
  la entrada de JMdict y la oración OCR confirmadas.

El estado local de React se actualiza únicamente con resultados confirmados por
Supabase. Recargar la página conserva las entradas creadas, editadas o
eliminadas.

---

## Persistencia

La persistencia utiliza PostgreSQL mediante Supabase. La migración se despliega
con Supabase CLI para conservar el historial del esquema.

`user_id` utiliza `auth.uid()` como valor predeterminado. Row Level Security
(RLS) restringe las operaciones de lectura, creación, actualización y
eliminación a las filas del usuario autenticado. El rol `anon` no tiene acceso a
la tabla y `authenticated` solo recibe los permisos necesarios para esas cuatro
operaciones.

`localStorage` no forma parte de la arquitectura de persistencia del proyecto.

La página consulta esta tabla en el servidor. Las operaciones de creación,
actualización y eliminación utilizan Server Actions y una capa de acceso a datos
exclusiva del servidor. La interfaz no envía ni recibe `user_id`.

---

## Evolución prevista

El modelo de vocabulario servirá como base para futuras funcionalidades como:

- repetición espaciada (FSRS);
- minería desde manga;
- OCR;
- estadísticas;
- filtros avanzados;
- búsqueda;
- IA.

Las nuevas funcionalidades deberán extender el modelo existente en lugar de reemplazarlo.

La minería desde manga utilizará el recorte únicamente como entrada temporal
para OCR. La tarjeta confirmada conservará la oración japonesa como contexto
textual, pero no almacenará el recorte, manga, capítulo o página. Esto evita
costes de almacenamiento y transferencia de imágenes.

---

## Fuente lingüística prevista

La minería utilizará JMdict como fuente principal compartida para palabras,
lecturas, formas de diccionario, tipos de palabra y significados en español e
inglés. El diccionario completo no se duplicará dentro del vocabulario de cada
usuario.

Al guardar una palabra se conservan el significado elegido por el usuario y el
idioma de ese significado. La consulta sigue esta prioridad:

1. definición de JMdict en el idioma seleccionado;
2. definición inglesa de JMdict cuando no exista una definición española;
3. traducción automática opcional y claramente identificada;
4. corrección manual antes de guardar.

Una traducción automática no debe mostrarse como si fuera una definición
oficial. El proyecto deberá conservar las atribuciones y cumplir la licencia de
JMdict y de cualquier fuente adicional.

JMdict se distribuye como un índice estático versionado y dividido en 2048
fragmentos Brotli calculados mediante un hash estable del término. El navegador
carga únicamente el fragmento necesario, lo descomprime de forma nativa, lo
reutiliza mediante caché HTTP inmutable y no realiza consultas de diccionario a
Supabase. Esta decisión reduce la transferencia de cada consulta nueva, mantiene
el proyecto dentro de los límites gratuitos, evita duplicar el diccionario por
usuario y permite actualizar la fuente sustituyendo una versión completa sin
invalidar archivos anteriores.

La versión incluida se genera desde la distribución multilingüe de
`jmdict-simplified`. Cada resultado conserva la forma principal, lectura,
categorías gramaticales y significados ingleses y españoles disponibles. Cuando
una entrada no posee significado español, la interfaz muestra explícitamente la
definición inglesa como fallback; no genera una traducción automática.

El análisis morfológico usa Kuromoji bajo demanda para separar la oración y
obtener la forma de diccionario. Sus archivos lingüísticos y los fragmentos de
JMdict son recursos públicos versionados con caché inmutable. La atribución a
EDRDG y el enlace a la licencia CC BY-SA 4.0 se muestran en cada ficha.

El analizador preparado se libera después de dos minutos sin actividad. Una
consulta posterior lo reconstruye desde los archivos ya almacenados por el
navegador.

La interfaz agrupa los morfemas de una misma flexión antes de mostrarlos. El
verbo o adjetivo independiente actúa como núcleo y absorbe partículas conectivas,
verbos no independientes y auxiliares consecutivos; la búsqueda conserva como
clave la forma de diccionario del núcleo. Los sustantivos verbales seguidos de
`する` se consultan como una única forma léxica.

El índice se regenera desde un archivo `jmdict-all-*.json` mediante
`npm run build:jmdict -- <ruta-al-json>`. El generador limita el contenido a los
campos utilizados por la aplicación y publica un manifiesto con la fecha,
versión y cantidad de términos.

---

## Relación con otros documentos

- [`docs/architecture.md`](architecture.md) describe la arquitectura general del
  proyecto.
- [`docs/frontend.md`](frontend.md) define las convenciones de interfaz.
- El [`README.md`](../README.md) documenta instalación y ejecución.

Este documento describe únicamente el dominio del vocabulario.

---

## Cuándo modificar este documento

Actualiza este documento únicamente cuando cambien las reglas permanentes del dominio de vocabulario.

No utilices este documento para registrar tareas temporales ni detalles específicos de implementación.
