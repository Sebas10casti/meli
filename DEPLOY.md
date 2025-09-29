# Configuración de Deploy

## Configuración de GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages cuando se hace push a la rama `main`.

### Configuración necesaria en GitHub

1. **Habilitar GitHub Pages:**
   - Ve a Settings > Pages
   - Selecciona "GitHub Actions" como fuente

2. **Configurar Secrets:**
   - Ve a Settings > Secrets and variables > Actions
   - Agrega los siguientes secrets:
     - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: Tu clave pública de reCAPTCHA
     - `RECAPTCHA_SECRET_KEY`: Tu clave secreta de reCAPTCHA

3. **Permisos del repositorio:**
   - Ve a Settings > Actions > General
   - En "Workflow permissions", selecciona "Read and write permissions"
   - Marca "Allow GitHub Actions to create and approve pull requests"

### Estructura del proyecto

- El proyecto se construye con `npm run build`
- Los archivos estáticos se generan en la carpeta `out/`
- Se incluye un archivo `.nojekyll` para evitar conflictos con Jekyll

### Variables de entorno

El proyecto usa las siguientes variables de entorno:

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: Clave pública de reCAPTCHA
- `RECAPTCHA_SECRET_KEY`: Clave secreta de reCAPTCHA (solo para el servidor)

### Troubleshooting

Si el deploy falla:

1. Verifica que los secrets estén configurados correctamente
2. Asegúrate de que GitHub Pages esté habilitado
3. Revisa los logs del workflow en la pestaña "Actions"
4. Verifica que el archivo `next.config.ts` tenga la configuración correcta

### URLs

- Desarrollo local: `http://localhost:3000`
- Producción: `https://tu-usuario.github.io/Meli`
