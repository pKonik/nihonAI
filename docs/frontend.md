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
navegación horizontal en la cabecera móvil. Sus seis destinos principales son
Inicio, Kana, Leer manga, Añadir, Mazos y Repasar. El destino activo debe estar
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

El ejemplo de lectura del hero utiliza una única ilustración original dentro de
un molde 4:3. La frase japonesa y el resaltado de la palabra detectada se
superponen como contenido HTML para conservar su nitidez y accesibilidad. La
tarjeta con la palabra minada, su lectura y significado se muestra debajo de la
imagen sin cubrirla. Este ejemplo no utiliza carrusel ni navegación adicional.

El entorno del hero aporta movimiento sutil mediante halos, destellos y una ruta
punteada animada. El kanji decorativo del fondo responde suavemente al puntero,
mientras el contenido principal y los paneles permanecen estables. Estos efectos
se desactivan cuando el sistema solicita movimiento reducido.

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

## Bienvenida y ayuda

Las cuentas que todavía no han completado la bienvenida reciben una guía
opcional de cuatro pasos acompañada por Kitsu, la mascota de NihonAI. La guía
distingue las funciones disponibles de las planificadas y guarda su finalización
en el perfil privado.

El botón Ayuda permanece separado de los seis destinos principales y permite
abrir nuevamente la guía en cualquier momento. El diálogo conserva navegación
por teclado, cierre explícito, adaptación móvil y textos en español e inglés.

## Aprendizaje de kana

La ruta privada `/kana` presenta los sonidos base y modificados de hiragana y
katakana, con lectura en rōmaji y un ejemplo por carácter. La ruta forma parte
de la navegación principal para que el contenido sea accesible desde cualquier
pantalla privada.

La pantalla permite alternar silabario, filtrar caracteres aprendidos o
pendientes y marcar el progreso personal. Dentro de cada silabario, la enseñanza
avanza en tres bloques: 46 sonidos básicos, 20 sonidos con dakuten y 5 sonidos
con handakuten. Cada bloque separa sus filas vocálicas o consonánticas y permite
marcar o desmarcar el progreso de una fila completa mediante una sola acción.
Desde el layout de dos columnas, cada fila utiliza el espacio libre de la
cuadrícula para mostrar como marca de agua el kana de su columna A; este detalle
es decorativo, mantiene bajo contraste y no se muestra en una sola columna ni
cuando hay filtros activos.
Las 33 combinaciones yōon estándar y las reglas de consonante
doble, vocal larga y lectura de partículas se muestran como referencias
posteriores.

La misma ruta incluye un quiz de lectura en rōmaji con hiragana, katakana o
ambos silabarios en modo mixto. El usuario puede limitar la sesión a caracteres
aprendidos, una categoría, una fila, todo el silabario o errores anteriores. La
sesión utiliza todos los caracteres disponibles dentro del alcance elegido, sin
un límite fijo, y ordena primero los caracteres nuevos o con menor precisión. El
alcance de errores reúne los caracteres que todavía permanecen por debajo del
80 % de precisión. Cada respuesta se corrige localmente de forma inmediata con
las mismas reglas compartidas por el servidor, mientras el intento se valida y
guarda en segundo plano. Tras mostrar el resultado, el foco permanece en el
formulario para que un segundo Enter avance sin utilizar el ratón. Los errores
regresan al final de la sesión hasta resolverse. Los intentos se guardan como
actividad privada e inmutable para calcular respuestas totales, precisión, días
de estudio y racha actual a partir de datos reales.

## Lector local de manga

La ruta privada `/leer` importa carpetas de imágenes o archivos ZIP y procesa
todo el contenido exclusivamente en el navegador. El modo libro, activo de forma
predeterminada con zoom al 75 %, muestra una página cada vez y permite avanzar o
retroceder. Un control permite alternarlo con el modo scroll, que recupera la
lectura vertical continua de todas las páginas. Ambos modos permiten ampliar
entre 50 % y 200 % y desplazarse horizontal o verticalmente cuando sea necesario.

Los controles funcionan con ratón, tacto y teclado. En modo libro, las flechas
izquierda y derecha cambian de página. En ambos modos, `+` y `-` ajustan el zoom
y `0` lo restablece al 75 %. Al cambiar de página, el desplazamiento vuelve al
origen para evitar posiciones confusas.

En ambos modos de lectura, el usuario puede activar la selección de regiones y
arrastrar con el botón principal del ratón sobre una página. La selección
mantiene el identificador de la página y coordenadas porcentuales para conservar
su posición al cambiar el zoom. Solo existe una región a la vez; puede
redibujarse o borrarse. Cambiar de página en modo libro o cambiar de modo cancela
la selección actual.

Al terminar una selección, el navegador genera una vista previa local sin subir
la página original. El recorte permanece temporalmente en memoria y no existe
una acción para guardarlo como imagen independiente. El usuario inicia el OCR
japonés desde esa vista previa; el lector muestra la preparación, el progreso y
el resultado general del intento. Cuando detecta texto, lo muestra en un campo
editable para corregir caracteres, espacios o saltos de línea antes de
continuar.

En modo scroll, todo el flujo posterior a la selección se presenta como una
tarjeta flotante anclada a la ventana: preparación del recorte, vista previa,
elección del motor, progreso y resultado editable. De este modo permanece
accesible junto a la página que se está leyendo sin regresar al inicio del
lector y puede cerrarse explícitamente. En modo libro conserva su posición
dentro del flujo normal de la interfaz.

Los recortes se limitan a 2048 píxeles por lado para mantener un uso predecible
de memoria durante el procesamiento local. El OCR elige automáticamente el
modelo japonés vertical cuando el recorte es claramente más alto que ancho y el
modelo horizontal en los demás casos. Antes del reconocimiento, los recortes
pequeños se amplían localmente hasta un límite de tres veces y se generan una
variante en escala de grises con mayor contraste y otra binarizada. El mismo
trabajador procesa ambas y conserva el resultado no vacío con mayor confianza.

El motor se carga bajo demanda, procesa exclusivamente los `Blob` locales y
termina su trabajador después de cada intento. Entonces el recorte y sus
variantes se eliminan de memoria y su URL local se revoca, incluso si el
reconocimiento no detecta texto o falla. Solo el texto detectado permanece
temporalmente en el estado del lector; las correcciones también son locales y se
descartan al cambiar de página, modo de lectura o selección.

Como experimento de precisión, la vista previa también ofrece **OCR preciso**.
Esta alternativa usa el modelo comunitario
[`ogkalu/manga-ocr-mobile`](https://huggingface.co/ogkalu/manga-ocr-mobile)
con ONNX Runtime Web y constituye la opción principal del lector. Tesseract
permanece temporalmente como alternativa de compatibilidad.

Los cuatro archivos ONNX se distribuyen como recursos estáticos versionados de
NihonAI. No forman parte del JavaScript ni se descargan al visitar la web: la
primera activación solicita confirmación, descarga aproximadamente 65 MB desde
el mismo origen y los conserva en Cache Storage. Los usuarios que ya posean la
versión anterior procedente de Hugging Face pueden reutilizarla y migrarla a la
nueva clave de caché sin repetir la transferencia. La petición contiene
únicamente el modelo; el recorte permanece local y la inferencia se ejecuta
mediante WebAssembly.

Mientras espera la primera respuesta del servidor estático, la interfaz muestra un
estado de conexión indeterminado. Después actualiza el porcentaje con los
bloques de bytes recibidos, en lugar de avanzar solo al terminar cada archivo.
Los cuatro recursos se solicitan concurrentemente y su escritura en Cache
Storage continúa en segundo plano para no bloquear el comienzo de la inferencia.

El modo preciso necesita memoria adicional. El OCR basado en Tesseract continúa
disponible como respaldo durante la evaluación de compatibilidad. El
usuario puede eliminar el modelo descargado borrando los datos del sitio desde
su navegador. El modelo está publicado bajo licencia Apache-2.0.

El control de selección permanece fijo sobre el botón flotante de Ayuda para
estar disponible al recorrer capítulos largos en modo scroll. La selección solo
comienza cuando el puntero se arrastra dentro de los límites de una imagen.

## Evolución

Si este documento crece significativamente, podrá dividirse en:

- `react.md`
- `nextjs.md`
- `design-system.md`
- `accessibility.md`

Hasta entonces, toda la información del frontend debe permanecer centralizada aquí.
