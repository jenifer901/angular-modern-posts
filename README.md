# 📦 Proyecto Angular - Gestión de Posts

## 🚀 Descripción

Aplicación desarrollada en Angular utilizando arquitectura moderna basada en:

- Standalone components  
- Signals para gestión de estado  
- Guards para control de acceso  
- Lazy loading de rutas  
- Internacionalización (i18n)  

La aplicación permite autenticación de usuarios y gestión de posts con operaciones CRUD.

---

# 🧱 Arquitectura

- Componentes standalone (sin NgModules)
- Stores con **signals** para estado reactivo
- Servicios HTTP para comunicación con API mock (`json-server`)
- Guards para protección de rutas
- Resolvers para precarga de datos en navegación

---

# 🔐 Autenticación

- Login simulado contra `json-server`
- Persistencia en `localStorage`
- Gestión de sesión mediante:
  - `token`
  - `userId`
  - `userName`

---

# 🛡️ Seguridad y navegación

- `authGuard` → protege rutas privadas  
- `noAuthGuard` → evita acceso al login si ya estás autenticado  
- `ownerGuard` → restringe edición/eliminación al propietario  

✔ Si el usuario intenta acceder manualmente a rutas no autorizadas:
- Se bloquea el acceso  
- Se redirige correctamente  

---

# 🔐 Seguridad en llamadas HTTP

Las peticiones HTTP protegidas utilizan un interceptor que añade automáticamente el token de autenticación en las cabeceras de cada request.

- Centraliza la autenticación  
- Evita duplicación de lógica  
- Garantiza acceso a endpoints protegidos  

El token se envía en la cabecera `Authorization`.

---

# 🌍 Internacionalización

- Uso de `ngx-translate`  
- Cambio dinámico de idioma  
- Persistencia en `localStorage`  
- Integración con signals  

---

# ⚡ Lazy Loading

- Uso de `loadComponent`  
- Separación por features (`auth`, `posts`)  
- Mejora de rendimiento  

---

# 📄 Gestión de Posts

- Listado con paginación (frontend)  
- Carga diferida con `@defer`  
- Detalle de post (con resolver)  
- CRUD completo  
- Control de ownership  

---

# 📌 Decisión técnica: json-server

## Contexto

Las versiones recientes presentan incompatibilidades:

- Problemas con `_expand`  
- Cambios en endpoints  
- Limitaciones en consultas  

---

## Decisión

```bash
json-server@0.17.4


---

## 📌 Bloque 3
```md
## Implicaciones

- ❌ Sin paginación backend  
- ✅ Paginación en frontend  
- ✅ Mayor control  
- ✅ Compatibilidad  

## Impacto técnico

- ❌ No `httpResource` en listado  
- ✅ Sí en detalle y consultas individuales  

# 🧪 Testing

## Unit (Vitest)
- Guards  
- Stores  
- Lógica  

## Component (Testing Library)
- Formularios  
- Login  
- Interacciones  

## E2E (Playwright)
- Login  
- Navegación  
- Flujo completo  

## ✔ Cobertura

- Autenticación  
- Guards  
- Ownership  
- CRUD  
- Flujo completo  

# 🚀 Funcionalidades adicionales

## ✔ Implementadas

- Paginación frontend  
- `@defer`  
- State management con signals  
- Interceptor HTTP  
- Accesibilidad básica (focus, formularios)

# 📦 Instalación

```bash
npm install


---

# ▶️ Ejecución

```bash
ng serve
http://localhost:4200

---

# 🧪 Tests

```bash
npm run test:vitest
npx playwright test


---

# 🧠 Decisiones técnicas

- Signals en lugar de RxJS  
- Arquitectura basada en stores  
- Guards + resolver  
- Interceptor para auth  
- Testing moderno  

# 🎯 Conclusión

Aplicación con Angular moderno, arquitectura clara, seguridad en navegación y testing completo.

# 💥 Frase final

Aplicación Angular con testing moderno (Vitest, Testing Library, Playwright) cubriendo lógica, UI y flujos críticos end-to-end.

# 🤖 Uso de Inteligencia Artificial

Durante el desarrollo del proyecto se ha utilizado apoyo puntual de herramientas de Inteligencia Artificial para:

- Resolución de dudas técnicas concretas  
- Consulta de buenas prácticas  
- Generación de ejemplos de testing (Vitest, Testing Library, Playwright)  
- Revisión y mejora de estructura del código  

## 🎯 Enfoque

El uso de IA ha sido:

- Supervisado en todo momento  
- Adaptado al contexto del proyecto  
- Validado manualmente antes de su integración  

No se ha utilizado para generar soluciones completas sin comprensión, sino como herramienta de apoyo al desarrollo.

---

## ✅ Garantía

Todo el código incluido en el proyecto:

- Ha sido comprendido  
- Ha sido adaptado a los requisitos  
- Ha sido validado y probado manualmente  