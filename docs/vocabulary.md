# Dominio de Vocabulario

Consulta este documento cuando una tarea modifique el modelo de vocabulario, la persistencia, las validaciones, el formulario, las consultas o cualquier funcionalidad relacionada con las palabras.

Este documento define las reglas permanentes del dominio de vocabulario de NihonAI.

---

## Objetivo

El sistema de vocabulario constituye el núcleo de NihonAI.

Toda funcionalidad relacionada con palabras debe respetar las reglas definidas en este documento.

---

## Modelo del dominio

Cada entrada representa una palabra o expresión japonesa. Cuando exista
persistencia, cada entrada almacenada pertenecerá a un único usuario.

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

Actualmente el vocabulario existe únicamente en memoria mediante el estado de React.

La aplicación dispone de:

- formulario de creación;
- validación básica;
- listado reactivo;
- eliminación de entradas;
- estado vacío cuando no existen palabras.

La persistencia todavía no forma parte del sistema.

---

## Persistencia

La siguiente fase incorporará PostgreSQL mediante Supabase.

Cada entrada almacenará un propietario.

El acceso deberá protegerse mediante Row Level Security (RLS), garantizando que cada usuario únicamente pueda acceder a su propio vocabulario.

`localStorage` no forma parte de la arquitectura de persistencia del proyecto.

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
