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
- aislamiento de las entradas por usuario mediante RLS.

El formulario y la colección todavía funcionan únicamente en memoria. La
integración del CRUD con Supabase pertenece a una fase posterior.

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

## Evolución de la arquitectura

La arquitectura crecerá de forma incremental conforme avance el proyecto.

Las próximas fases incorporarán módulos como:

- integración del CRUD de vocabulario;
- OCR;
- lector de manga;
- sistema de repetición espaciada (FSRS);
- funcionalidades de IA.

Cada nuevo módulo deberá respetar los principios definidos en este documento.

---

## Cuándo modificar este documento

Actualiza este documento únicamente cuando exista un cambio permanente en la arquitectura del proyecto, la organización de módulos o las decisiones técnicas principales.

No utilices este documento para registrar tareas temporales, decisiones experimentales o procedimientos específicos de implementación.
