# 🛒 Meli - Aplicación de Verificación de Compra

Una aplicación React moderna para la verificación de datos de usuario en el proceso de compra, desarrollada como prueba técnica para MercadoLibre.

## 🌿 Ramas del Proyecto

Este repositorio contiene múltiples implementaciones de la misma aplicación:

### **🌐 `main` - Rama Principal**
- **Stack**: React + Vite + TypeScript
- **Características**: Aplicación SPA completa con routing
- **Estado**: ✅ Estable y funcional

### **⚡ `react` - React SPA (Actual)**
- **Stack**: React 19 + Vite + TypeScript + Tailwind
- **Características**: 
  - ✅ **No-Script Support** - Fallback elegante sin JavaScript
  - ✅ **Internacionalización** (ES/EN/PT)
  - ✅ **Testing completo** (33 tests, 100% cobertura)
  - ✅ **reCAPTCHA v3** integrado
- **Estado**: ✅ **Rama principal activa**

### **🔄 `react-ssr` - Server-Side Rendering**
- **Stack**: React + SSR + Express
- **Características**: Renderizado del lado del servidor
- **Estado**: 🔄 En desarrollo

### **🚫 `react-no-script` - No-Script Fallback**
- **Stack**: React + HTML estático
- **Características**: Versión sin JavaScript
- **Estado**: ✅ Implementación alternativa

### **⚡ `next-js` - Next.js**
- **Stack**: Next.js 14 + TypeScript
- **Características**: Framework completo con SSR/SSG
- **Estado**: 🔄 En desarrollo

## 🚀 Demo en Vivo

**🌐 [Ver aplicación en GitHub Pages](https://sebas10casti.github.io)**

## 📋 Descripción del Proyecto

Esta aplicación simula el flujo de verificación de datos de usuario durante una compra en MercadoLibre. Permite a los usuarios actualizar su información personal, verificar su identidad mediante reCAPTCHA y confirmar sus datos antes de proceder con la compra.

### **🎯 Objetivo Principal**
Desarrollar una solución robusta que funcione tanto con JavaScript habilitado (experiencia completa) como deshabilitado (fallback elegante), garantizando accesibilidad y compatibilidad en todos los escenarios.

## ✨ Características Principales

### 🌍 **Internacionalización (i18n)**
- Soporte para **3 idiomas**: Español, Inglés y Portugués
- Detección automática del idioma desde la URL
- Cambio dinámico de idioma sin recargar la página

### 🎨 **Interfaz de Usuario**
- Diseño responsive con **Tailwind CSS**
- Componentes reutilizables y modulares
- Experiencia de usuario optimizada para móviles y desktop

### 🔒 **Seguridad**
- Integración con **Google reCAPTCHA v3**
- Validación de tokens de autenticación
- Manejo seguro de datos sensibles

### 🚫 **No-Script Support**
- **Fallback elegante** cuando JavaScript está deshabilitado
- **Componente NoScript** integrado en React
- **Selector de idiomas** funcional sin JS
- **Enlace directo** a MercadoLibre como alternativa
- **Mensaje informativo** para habilitar JavaScript

### 🧪 **Testing**
- **33 tests** con **100% de cobertura**
- Testing con **Vitest** (más rápido que Jest)
- Tests unitarios para componentes, hooks y servicios
- Mocks para APIs externas

### 🚀 **Performance**
- **Vite** como bundler (builds ultra-rápidos)
- **React 19** con las últimas optimizaciones
- **TypeScript** para type safety
- Lazy loading y code splitting

## 🏗️ Arquitectura Técnica

### **Stack Tecnológico**
```
Frontend: React 19 + TypeScript + Vite
Styling: Tailwind CSS
Testing: Vitest + Testing Library
i18n: react-i18next
Routing: React Router v7
State: React Hooks + Context
```

### **Estructura del Proyecto**
```
src/
├── components/          # Componentes reutilizables
│   ├── Button.tsx      # Botón con variantes
│   ├── Input.tsx       # Input con validación
│   ├── Header.tsx      # Header de MercadoLibre
│   └── FormGenerator.tsx # Generador de formularios
├── pages/              # Páginas de la aplicación
│   ├── StartTest.tsx   # Página de inicio
│   ├── UpdateData.tsx  # Formulario de datos
│   └── Confirmation.tsx # Página de confirmación
├── hooks/              # Custom hooks
│   ├── useUser.ts      # Gestión de datos de usuario
│   ├── useCountries.ts # Lista de países
│   └── useRecaptcha.ts # Integración reCAPTCHA
├── services/           # Servicios de API
├── utils/              # Utilidades
├── i18n/               # Configuración de idiomas
└── __tests__/          # Tests unitarios
```

## 🎯 Flujo de la Aplicación

### **1. Página de Inicio (`/es`)**
- Presentación del proceso de verificación
- Botón para iniciar la actualización de datos
- Detección automática del idioma

### **2. Formulario de Datos (`/es/update-data`)**
- Formulario con datos del usuario
- Selección de país desde API
- Integración con reCAPTCHA
- Validación en tiempo real

### **3. Confirmación (`/es/confirmation`)**
- Resumen de datos actualizados
- Confirmación del proceso
- Redirección al flujo original

## 🚫 Implementación No-Script

### **¿Cómo funciona?**
Cuando JavaScript está deshabilitado, la aplicación muestra automáticamente:

1. **Componente NoScript** (`/src/components/NoScript.tsx`)
   - Se renderiza automáticamente cuando JS está deshabilitado
   - Incluye logo de MercadoLibre
   - Selector de idiomas funcional
   - Instrucciones para habilitar JavaScript

2. **HTML Base** (`index.html`)
   - Fallback mínimo y directo
   - Mensaje simple de JavaScript requerido
   - Enlace directo a MercadoLibre

### **Características del No-Script**
- ✅ **Sin SSR** - Todo del lado del cliente
- ✅ **Sencillo y directo** - Un solo componente
- ✅ **Mantenible** - Fácil de modificar
- ✅ **Consistente** - Integrado con React
- ✅ **Limpio** - Sin archivos redundantes

### **Estructura del No-Script**
```typescript
// src/components/NoScript.tsx
const NoScript = () => (
  <noscript>
    <div>
      {/* Header con logo */}
      {/* Selector de idiomas */}
      {/* Mensaje informativo */}
      {/* Enlace a MercadoLibre */}
    </div>
  </noscript>
);
```

## 🛠️ Instalación y Desarrollo

### **Prerrequisitos**
```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### **Instalación**
```bash
# Clonar el repositorio
git clone https://github.com/sebas10casti/meli.git
cd meli

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### **Scripts Disponibles**
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run test         # Tests en modo watch
npm run test:run     # Tests una sola vez
npm run test:ui      # Interfaz web de tests
npm run test:coverage # Tests con cobertura
npm run lint         # Linting del código
```

## 🧪 Testing

### **Cobertura de Tests**
- ✅ **11 archivos de test**
- ✅ **33 tests en total**
- ✅ **100% de tests pasando**
- ✅ **Tiempo de ejecución: ~4 segundos**

### **Tipos de Tests**
```typescript
// Componentes
Button.test.tsx      // Renderizado, variantes, loading
Input.test.tsx       // Label, errores, eventos
Header.test.tsx      // Logo, enlaces, estilos

// Páginas
StartTest.test.tsx   // Título, botón, navegación
UpdateData.test.tsx  # Formulario, validación
Confirmation.test.tsx # Confirmación, datos

// Hooks
useUser.test.ts      # Datos de usuario, helpers
useCountries.test.ts # Lista de países
useRecaptcha.test.ts # Verificación reCAPTCHA

// Servicios
userService.test.ts  # API de usuario
countryService.test.ts # API de países
recaptchaService.test.ts # Servicio reCAPTCHA
```

## 🌐 Despliegue

### **GitHub Pages**
La aplicación está configurada para desplegarse automáticamente en GitHub Pages:

```bash
# Build para producción
npm run build

# Los archivos se generan en /dist
# GitHub Pages sirve automáticamente desde /dist
```

### **Configuración de Routing**
- **Desarrollo**: `http://localhost:5173/es`
- **Producción**: `https://sebas10casti.github.io/es`
- **Basename dinámico** según el entorno
- **Redirecciones automáticas** para SEO

## 🔧 Configuración Avanzada

### **Variables de Entorno**
```typescript
// src/config/environments.ts
export const environment = {
  useMockData: true,        // Usar datos mock vs API real
  apiBaseUrl: 'https://api.mercadolibre.com',
  recaptchaSiteKey: 'your-site-key'
}
```

### **Internacionalización**
```json
// src/i18n/locales/es.json
{
  "start_test": {
    "title": "Verificación de Compra",
    "subtitle": "Actualiza tu información para continuar"
  }
}
```

## 📊 Métricas de Performance

### **Bundle Size**
- **JavaScript**: ~292KB (gzipped: ~93KB)
- **CSS**: ~18KB (gzipped: ~4KB)
- **Tiempo de build**: ~4 segundos

### **Lighthouse Score**
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 90+

## 🚀 Características Técnicas Destacadas

### **1. Routing Inteligente**
- Detección automática de idioma desde URL
- Redirecciones inteligentes para SEO
- Manejo de rutas en producción y desarrollo

### **2. Gestión de Estado**
- Custom hooks para lógica reutilizable
- Context API para estado global
- Local storage para persistencia

### **3. Optimizaciones**
- Lazy loading de componentes
- Memoización de funciones costosas
- Debouncing en inputs
- Caching de datos de API

### **4. Accesibilidad**
- Navegación por teclado
- Screen reader friendly
- Contraste de colores WCAG AA
- Labels semánticos

## 🤝 Contribución

### **Estructura de Commits**
```bash
feat: nueva funcionalidad
fix: corrección de bug
test: agregar tests
docs: actualizar documentación
refactor: refactorización de código
```

### **Estándares de Código**
- **ESLint** para linting
- **Prettier** para formato
- **TypeScript** estricto
- **Conventional Commits**

## 📝 Notas de Desarrollo

### **Comparación de Ramas**

| Rama | Stack | No-Script | SSR | Complejidad | Estado |
|------|-------|-----------|-----|-------------|--------|
| `react` | React + Vite | ✅ Elegante | ❌ | 🟢 Baja | ✅ Activa |
| `react-ssr` | React + Express | ✅ HTML estático | ✅ | 🟡 Media | 🔄 Dev |
| `react-no-script` | React + HTML | ✅ Completo | ❌ | 🟡 Media | ✅ Estable |
| `next-js` | Next.js 14 | ✅ Nativo | ✅ | 🔴 Alta | 🔄 Dev |

### **¿Cuál rama usar?**

- **🚀 Para desarrollo rápido**: `react` (actual)
- **⚡ Para máxima compatibilidad**: `react-no-script`
- **🔄 Para SEO avanzado**: `react-ssr` o `next-js`
- **🏢 Para producción enterprise**: `next-js`

### **Decisiones Técnicas**
1. **Vitest vs Jest**: Mayor velocidad y mejor integración con Vite
2. **Tailwind CSS**: Desarrollo más rápido y consistencia visual
3. **React Router v7**: Última versión con mejor performance
4. **TypeScript**: Type safety y mejor DX
5. **No-Script Component**: Solución elegante sin SSR

### **Próximas Mejoras**
- [ ] PWA (Progressive Web App)
- [ ] Tests E2E con Playwright
- [ ] Storybook para componentes
- [ ] CI/CD con GitHub Actions
- [ ] Monitoreo con Sentry

## 📞 Contacto

**Desarrollador**: Sebastián Castillo
**Email**: sebas10casti@gmail.com
**GitHub**: [@sebas10casti](https://github.com/sebas10casti)
**LinkedIn**: [Sebastián Castillo](https://linkedin.com/in/sebas10casti)

---

*Desarrollado como prueba técnica para MercadoLibre - 2024*