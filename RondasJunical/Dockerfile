# Utiliza la imagen base de OpenJDK 11
#FROM openjdk:20-ea-1-jdk-slim
FROM openjdk:21
#FROM openjdk:22-ea-1-jdk-slim



# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo JAR de la aplicación a la imagen
COPY target/RondasJunical-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto en el que la aplicación Spring Boot escucha
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["java", "-jar", "app.jar"]
