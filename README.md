Angular Posts App
SPA desarrollada con Angular 21 para la gestión de posts y comentarios sobre un backend mock basado en json-server.

El objetivo es aplicar un enfoque moderno de Angular priorizando simplicidad, mantenibilidad y buenas prácticas.

Ejecución
npm install
npm run dev
Frontend: http://localhost:4200

API: http://localhost:3000

Funcionalidades
Autenticación con persistencia de sesión

Protección de rutas mediante guards

CRUD completo de posts

CRUD de comentarios en el detalle de post

Listado de posts con paginación y búsqueda

Detalle de post con autor y comentarios

Control de ownership (solo edición/borrado de contenido propio)

Internacionalización (es / en)

UI responsive con estados: loading, empty, error, forbidden

Stack
Angular 21 (standalone + signals)

httpResource

Zoneless (provideZonelessChangeDetection)

TailwindCSS

@ngx-translate

json-server v1

Testing: Vitest + Testing Library + Playwright

Backend
Se utiliza json-server con db.json como fuente de datos.

Relaciones:

users

posts (userId)

comments (postId, userId)

Login simulado mediante coincidencia de name y password.

Testing
Unit testing con Testing Library

Runner: Vitest

E2E: Playwright

Se mantiene zone.js para compatibilidad con tests.

Tradeoffs
Se ha optado por no implementar un sistema de cache de datos en cliente para mantener la simplicidad de la solución. Esto reduce complejidad y posibles inconsistencias, a costa de realizar más peticiones al backend.

Las operaciones de mutación (POST, PUT, DELETE) se mantienen con subscribe en lugar de integrarlas en un flujo completamente reactivo. Esto simplifica la implementación, aunque introduce cierta inconsistencia respecto al uso de httpResource en las lecturas.

No se ha aplicado normalización avanzada del estado (tipo store centralizado complejo o entidades indexadas). Se prioriza una estructura más simple y directa, aunque menos optimizada para escenarios de gran escala.

Uso de IA
Se han utilizado herramientas de IA para resolver dudas puntuales sobre Angular moderno y validar decisiones de implementación.

Las decisiones finales han sido revisadas manualmente.

Resultado
Aplicación desarrollada con Angular moderno:

enfoque reactivo basado en signals

uso de APIs actuales (httpResource)

detección de cambios sin Zone.js en runtime

Código organizado y preparado para evolución.