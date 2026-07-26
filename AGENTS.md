<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Instrucciones permanentes de NihonAI

## Reglas globales

- Trabaja en fases pequeñas, verificables y aprobadas por el usuario.
- No comiences una fase nueva sin aprobación explícita.
- Explica en español los conceptos, comandos y decisiones técnicas importantes.
- No hagas commits ni `push` sin la aprobación correspondiente del usuario.
- Protege secretos con variables de entorno y nunca los incluyas en el repositorio.

## Convenciones generales

- Mantén el código sencillo, legible y adecuado para aprender React y Next.js.
- Usa TypeScript estricto y evita `any` salvo que exista una justificación concreta.
- Evita dependencias, abstracciones y funciones que todavía no sean necesarias.
- Antes de instalar una dependencia, explica su función, necesidad y alternativa.
- Mantén `.env*`, `node_modules` y archivos sensibles fuera de Git.
- Conserva `README.md` como guía de instalación y uso; coloca el conocimiento especializado en `docs/`.

## Workflow de desarrollo

1. Inspecciona el estado actual antes de modificar archivos.
2. Consulta únicamente la documentación relevante para la tarea.
3. Explica el plan antes de implementar cuando la fase lo requiera.
4. Realiza el cambio mínimo necesario sin adelantar funcionalidades.
5. Ejecuta las comprobaciones aplicables y comunica sus resultados con honestidad.
6. Actualiza la documentación responsable cuando cambien el comportamiento, la estructura o el uso.
7. Antes de un commit, revisa el estado, el diff y la presencia de secretos.

## Routing de documentación

- Para módulos, límites, estructura técnica o autenticación, consulta [`docs/architecture.md`](docs/architecture.md).
- Para interfaces, estilos, responsive, accesibilidad o componentes React, consulta [`docs/frontend.md`](docs/frontend.md).
- Para el modelo, formulario, colección o futura persistencia de vocabulario, consulta [`docs/vocabulary.md`](docs/vocabulary.md).
- No cargues todos los documentos por defecto; usa solo los relacionados con la tarea actual.

## Futuras Skills

- Si el repositorio incorpora Skills oficiales de Codex, usa únicamente la que coincida claramente con la tarea.
- La existencia de una Skill no obliga a leer ni utilizar las demás.
- Las Skills deben consumir la documentación relevante de `docs/` como fuente de verdad y no duplicar sus reglas.
- Mantén las decisiones permanentes del proyecto en `docs/` y reserva las Skills para procedimientos estables.
- No crees nuevas Skills sin aprobación explícita.

## Revisión de seguridad

- Antes de finalizar cualquier implementación, actúa como Senior Application Security Engineer.
- Revisa críticamente autenticación, autorización, validación de datos, secretos, dependencias y superficies de ataque relacionadas con el cambio.
- Corrige los riesgos relevantes cuando sea posible sin ampliar innecesariamente el alcance.
- Si no detectas riesgos relevantes, indícalo brevemente.
