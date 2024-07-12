# Usa una imagen de Node.js oficial para construir y ejecutar la aplicación Node.js
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación Node.js
RUN npm install

# Copia el resto de los archivos de la aplicación Node.js al contenedor
COPY . .

# Expone el puerto en el que la aplicación Node.js está escuchando
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación Node.js
CMD ["node", "src/server.js"]
