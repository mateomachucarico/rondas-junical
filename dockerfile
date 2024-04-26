# Utiliza la imagen base de Node.js para construir la aplicación Angular
FROM node:20.12.2-alpine as builder

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala Angular CLI globalmente
RUN npm install -g @angular/cli

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye el proyecto Angular
RUN npm run build

# Cambia a la imagen base de Nginx para servir la aplicación Angular
FROM nginx:alpine

# Copia la aplicación Angular construida desde la etapa anterior al directorio del servidor Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expone el puerto 80 al mundo exterior
EXPOSE 80

# Comando para ejecutar el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
