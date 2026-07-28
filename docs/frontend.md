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
- Utilizar elementos decorativos con intención: deben reforzar el recorrido,
  la identidad o la jerarquía del contenido.
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

La identidad de NihonAI utiliza fondos neutros claros, navegación verde tinta y
un acento coral. La presentación debe sentirse como un producto digital moderno
y minimalista: tipografía sans-serif, títulos de peso alto, bordes discretos y
espaciado generoso, sin recurrir a una estética tradicional o editorial.

La identidad también incluye un lenguaje gráfico relacionado con el aprendizaje:
el recorrido `leer → recopilar → recordar`, caracteres japoneses como marcas de
sección y gradientes o volúmenes suaves. Estos recursos deben aportar
personalidad sin competir con el contenido ni reducir la legibilidad.

El fondo global puede combinar gradientes tenues, patrones de puntos, recorridos
discontinuos y formas circulares. Deben permanecer detrás de la interfaz, usar
bajo contraste y adaptarse a pantallas pequeñas para evitar ruido visual.
Los motivos japoneses, como el monte Fuji o las flores de sakura, se representan
mediante siluetas y trazos simples del mismo sistema visual, no como fotografías
ni ilustraciones detalladas.

`Inter` se utiliza para la interfaz y `Noto Sans JP` como soporte tipográfico
japonés. Ambas fuentes se integran mediante `next/font` para servirlas desde la
propia aplicación. El símbolo principal adapta la forma de `日` a un isotipo
geométrico y debe reutilizarse mediante el componente `BrandLogo` y el icono SVG
de la aplicación.

Los rojos semánticos de errores o acciones destructivas deben mantenerse
separados del color `shu` de marca.

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

## Idiomas

NihonAI debe ofrecer toda su interfaz en español e inglés.

- Los textos visibles deben centralizarse cuando la fase de
  internacionalización esté implementada.
- Cada funcionalidad nueva debe incluir simultáneamente sus textos en español e
  inglés.
- La traducción abarca navegación, formularios, validaciones, errores,
  confirmaciones, estados vacíos, ayudas, onboarding, estadísticas, metadatos y
  textos de accesibilidad.
- El contenido escrito por el usuario se conserva en el idioma en que fue
  introducido y no se traduce automáticamente.
- El texto japonés obtenido mediante OCR se conserva sin alteraciones; las
  explicaciones y significados deberán respetar el idioma seleccionado cuando
  la fuente utilizada lo permita.

Los textos se centralizan en `src/lib/i18n/dictionaries.ts`. El selector utiliza
los códigos `ES` y `EN`, muestra el idioma activo y conserva la preferencia entre
sesiones. Los componentes interactivos reciben textos traducidos mediante
props, evitando incluir ambos diccionarios completos en el JavaScript del
navegador.

## Landing pública

La ruta `/` es la presentación pública de NihonAI. El Inicio de la aplicación
autenticada se encuentra en `/inicio`; `/login` conserva el acceso y registro,
y las demás rutas de la aplicación siguen siendo privadas.

La landing:

- utilizar la identidad visual propia de NihonAI y evitar copiar la composición
  o los recursos gráficos de otras plataformas;
- explicar primero la propuesta principal: aprender japonés desde manga y
  convertir contexto real en vocabulario que pueda repasarse;
- mostrar el recorrido `importar → leer → seleccionar → OCR → minar → repasar`;
- presentar de forma breve el lector, el vocabulario, kana, mazos y FSRS;
- ofrecer navegación por anclas, selector español–inglés, acceso y registro;
- repetir llamadas a la acción únicamente en puntos naturales del recorrido;
- diferenciar claramente las funciones disponibles de las que estén marcadas
  como próximas;
- incluir una sección de privacidad, preguntas frecuentes, llamada final y
  footer;
- reservar un espacio compatible con la futura mascota sin adelantar la fase
  de onboarding.

El ejemplo de lectura del hero utiliza una estructura de diapositivas. Cada
panel puede definir su propia imagen, frase japonesa, lectura, significado y
etiqueta de página. La rotación automática solo se activa cuando existe más de
un panel, incluye controles manuales y se detiene cuando el usuario prefiere
movimiento reducido.

No muestra testimonios, métricas, precios, capturas o afirmaciones que no
correspondan a información real. Funciona principalmente como contenido
renderizado en servidor, evita vídeos y JavaScript innecesarios, respeta
`prefers-reduced-motion` y mantiene buen rendimiento en móvil.

## Perfil y cuenta

La ruta privada `/cuenta` reúne el nombre visible, la foto de perfil y un resumen
de cuenta. El avatar de la navegación abre esta pantalla tanto en escritorio
como en móvil.

Las fotos se almacenan en un bucket privado y se sirven mediante una ruta que
vuelve a verificar la sesión. La interfaz solo acepta JPG, PNG o WebP de hasta
2 MB. Las estadísticas muestran únicamente información persistida: fecha real
de creación de la cuenta y cantidad actual de palabras guardadas.

No se muestran niveles, XP, rankings, perfiles públicos ni métricas derivadas de
funciones que todavía no existen.

## Evolución

Si este documento crece significativamente, podrá dividirse en:

- `react.md`
- `nextjs.md`
- `design-system.md`
- `accessibility.md`

Hasta entonces, toda la información del frontend debe permanecer centralizada aquí.
