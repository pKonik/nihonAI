# Frontend

Consulta este documento cuando una tarea modifique la interfaz de usuario, componentes React, estilos, experiencia de usuario o accesibilidad.

Este documento define los principios permanentes del frontend de NihonAI.

## Objetivo

El frontend debe ofrecer una experiencia rápida, consistente y sencilla, priorizando el aprendizaje del usuario por encima de efectos visuales innecesarios.

Toda decisión de diseño debe favorecer la claridad y la mantenibilidad del proyecto.

## Principios de diseño

- Priorizar la simplicidad y la claridad.
- Reducir la carga cognitiva del usuario.
- Evitar interfaces genéricas asociadas a productos de IA.
- Diseñar para el aprendizaje antes que para el impacto visual.
- Favorecer la consistencia visual entre pantallas.
- Evitar elementos decorativos que no aporten funcionalidad.
- Diseñar primero para la tarea principal del usuario.
- Utilizar una tipografía deliberada y legible.
- Mantener los textos de interfaz claros, concretos y útiles.
- Construir layouts que expresen la importancia y relación entre los contenidos.

## Componentes

Siempre que sea posible:

- reutilizar componentes existentes;
- evitar duplicación de lógica;
- favorecer la composición frente a componentes monolíticos;
- mantener responsabilidades claras.

## Estilos

- Utilizar Tailwind CSS.
- Evitar estilos inline salvo casos excepcionales.
- Mantener una jerarquía visual consistente.
- No introducir nuevas librerías de UI sin aprobación.

## Responsive

Toda interfaz nueva debe funcionar correctamente en escritorio y dispositivos móviles.

El comportamiento responsive debe considerarse desde el inicio.

La aplicación autenticada utiliza una navegación lateral en escritorio y una
navegación horizontal en la cabecera móvil. Sus cinco destinos principales son
Inicio, Leer manga, Añadir, Mazos y Repasar. El destino activo debe estar
identificado visualmente y mediante `aria-current`.

## Accesibilidad

La accesibilidad debe considerarse desde el inicio:

- utilizar HTML semántico;
- asociar correctamente etiquetas y controles;
- mantener navegación mediante teclado;
- proporcionar texto alternativo cuando corresponda.

## Evolución

Si este documento crece significativamente, podrá dividirse en:

- `react.md`
- `nextjs.md`
- `design-system.md`
- `accessibility.md`

Hasta entonces, toda la información del frontend debe permanecer centralizada aquí.
