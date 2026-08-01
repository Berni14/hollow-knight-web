# Hollow Knight Enemies — Web

Frontend en React que consume la [Hollow Knight Enemies API](https://github.com/Berni14/hollow-knight-api) para mostrar un catálogo interactivo de los enemigos del juego.

⚠️ Proyecto de fan, sin ánimo de lucro, no afiliado a Team Cherry. No se usan assets oficiales del juego; los iconos son genéricos (Lucide Icons).

## Demo en vivo

**https://hollow-knight-web-gvnt.vercel.app**

## Características

- Catálogo de 77 enemigos con datos reales de la API
- Rueda selectora de zonas (estilo iOS) con temática de color dinámica según la zona activa
- Filtro por nombre en tiempo real
- Ordenamiento por categoría (normal → mini-boss → boss) y por vida
- Vista de detalle con estadísticas completas al hacer clic en cada enemigo
- Diseño responsive con paleta inspirada en la estética de Hollow Knight

## Stack

- React 18 (JavaScript, sin TypeScript)
- Vite
- Tailwind CSS v4
- Lucide Icons

## Instalación local

1. Clona el repositorio:
```bash
   git clone https://github.com/Berni14/hollow-knight-web.git
   cd hollow-knight-web
```

2. Instala las dependencias:
```bash
   npm install
```

3. Arranca el servidor de desarrollo:
```bash
   npm run dev
```

4. Abre `http://localhost:5173`

📌 El frontend consume la API en producción por defecto (configurado en `src/config/api.js`). Si quieres apuntar a una API corriendo en local, cambia la URL en ese archivo.

## Estructura del proyecto
hollow-knight-web/
├── src/
│ ├── components/
│ │ ├── EnemyCard.jsx # Tarjeta individual de enemigo
│ │ ├── EnemyDetailModal.jsx # Modal de detalle al hacer click
│ │ ├── AreaWheelPicker.jsx # Rueda selectora de zonas
│ │ └── FilterBar.jsx # Filtro de nombre + ordenamiento
│ ├── config/
│ │ ├── api.js # URL base de la API
│ │ ├── areaThemes.js # Paleta de colores por zona
│ │ └── enemyIcons.js # Iconos por categoría de enemigo
│ ├── App.jsx
│ └── index.css
└── README.md
## Proyecto relacionado

- [hollow-knight-api](https://github.com/Berni14/hollow-knight-api) — API REST que alimenta esta web

## Autor

Miguel Bernier

## Correo de contacto

m.bebon14@gmail.com