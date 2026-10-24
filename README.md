# Nonna Rosa · Cucina Italiana

Página web de un restaurante italiano, construida a partir del moodboard *Cucina & Design*
(estilo **Trattoria rústica**: paleta A, tipografía DM Serif Display + Work Sans).

## Estructura

```
index.html      Página única: inicio, historia, destacados, carta, galería, reseñas, reservas, contacto
css/styles.css  Estilos (colores y fuentes en variables de :root)
js/main.js      Menú móvil, pestañas de la carta, reserva por WhatsApp, animaciones
```

## Verla

Abre `index.html` en el navegador. No necesita instalación ni servidor.

## Por personalizar

- `WHATSAPP_NUMBER` en `js/main.js` y el enlace del botón flotante en `index.html`.
- Dirección, teléfono, correo, redes y la búsqueda del mapa en el pie de página.
- Las reseñas son de ejemplo: reemplazarlas por reseñas reales.
- Precios de la carta.
- Fotos: son de [Unsplash](https://unsplash.com); cambiarlas por fotos reales del local cuando existan.

---

# Loli's Küche

Página de pedidos de salchichas alemanas, en la carpeta [`lolis-kuche/`](lolis-kuche/).
Abre `lolis-kuche/index.html` en el navegador.

- El menú permite elegir cantidades y arma el mensaje de pedido para WhatsApp con el total.
- Imágenes: `logo.png` (logo completo), `logo-mark.png` (ícono del menú) y `abuelo.jpg`.
- Domicilios solo en Bogotá: aparece en el inicio, el menú, los pedidos, preguntas frecuentes y contacto.

### SEO

- Título, descripción, Open Graph (`og-image.jpg`) y datos estructurados `FoodEstablishment`
  con menú, precios y zona de entrega (Bogotá) en `index.html`.
- `canonical`, `og:url`, el JSON-LD y `sitemap.xml` usan
  `https://loliskuche.netlify.app/`. Si la página se publica en otra
  dirección (por ejemplo un dominio propio), cambia esa dirección en esos lugares.
- Después de publicarla: envía `sitemap.xml` en Google Search Console y crea el perfil de
  Google Business Profile como negocio con zona de servicio en Bogotá.
