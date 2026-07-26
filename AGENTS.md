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

## Desarrollo

- Prioriza la simplicidad, claridad y desarrollo incremental.
- Implementa únicamente el alcance aprobado.
- Mantén los planes breves y orientados a arquitectura.
- No generes documentación extensa ni planes ejecutables salvo que lo solicite el usuario.
- No copies grandes bloques de código en archivos Markdown.
- No invoques Skills adicionales automáticamente si no aportan un beneficio claro.
- Ejecuta pruebas, lint, typecheck y build cuando sean necesarios para validar la fase, evitando repeticiones innecesarias.
- Aplica TDD únicamente cuando la lógica lo justifique.
- Usa `systematic-debugging` solo cuando exista un problema real.
- Mantén los cambios pequeños, autocontenidos y fáciles de revisar.

El flujo predeterminado consiste en inspeccionar el estado, consultar solo la
documentación relevante, explicar brevemente la arquitectura cuando sea
necesario, implementar el cambio mínimo y ejecutar una única verificación final
proporcional al alcance.

No uses por defecto brainstorming formal, planes ejecutables, subagentes,
worktrees, revisiones externas ni flujos de cierre de rama. Resérvalos para
cambios de alto riesgo, varios subsistemas independientes, un problema real
que los justifique o una solicitud expresa del usuario.

No repitas suites completas si no hubo cambios posteriores que puedan afectar
sus resultados. Antes de un commit autorizado, revisa el estado, el diff y la
presencia de secretos.

## Routing de documentación

- Para módulos, límites, estructura técnica o autenticación, consulta [`docs/architecture.md`](docs/architecture.md).
- Para interfaces, estilos, responsive, accesibilidad o componentes React, consulta [`docs/frontend.md`](docs/frontend.md).
- Para el modelo, formulario, colección o futura persistencia de vocabulario, consulta [`docs/vocabulary.md`](docs/vocabulary.md).
- No cargues todos los documentos por defecto; usa solo los relacionados con la tarea actual.

## Skills

- Usa únicamente una Skill cuando coincida claramente con la tarea y aporte un beneficio directo.
- Las Skills, incluidas las de Superpowers, son una guía y no un protocolo obligatorio; adáptalas al contexto del proyecto.
- La existencia de una Skill no obliga a utilizarla ni a encadenar otras Skills.
- Las Skills deben consumir la documentación relevante de `docs/` como fuente de verdad y no duplicar sus reglas.
- Mantén las decisiones permanentes del proyecto en `docs/` y reserva las Skills para procedimientos estables.
- No crees archivos en `docs/superpowers/` salvo solicitud explícita.
- No crees nuevas Skills sin aprobación explícita.

## Revisión de seguridad

Antes de finalizar una implementación, realiza una revisión básica de seguridad
y buenas prácticas. Verifica únicamente que no existan vulnerabilidades
evidentes, exposición de información sensible, errores de autorización o
validaciones faltantes relacionadas con los cambios realizados.

Si detectas un problema, corrígelo cuando sea posible y menciónalo brevemente.
Si no detectas riesgos relevantes, indícalo en una línea.

La revisión debe ser proporcional al alcance de la fase y no convertirse en una
auditoría completa de seguridad.
