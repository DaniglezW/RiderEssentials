# Usa una imagen de Node.js oficial para construir y ejecutar la aplicación Angular
FROM node:14 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación Angular
RUN npm install

# Copia el resto de los archivos de la aplicación Angular al contenedor
COPY . .

# Construye la aplicación Angular para producción
RUN npm run build --prod

# Usa una imagen de nginx oficial para servir la aplicación Angular
FROM nginx:alpine

# Copia los archivos construidos de la aplicación Angular al contenedor nginx
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Configuración adicional para manejar rutas SPA en Nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

# Expone el puerto en el que nginx está sirviendo la aplicación Angular
EXPOSE 80

# Comando por defecto para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]
