
# New Dockerfile with public and private keys

# First stage: build the application
FROM maven:3.9.4-eclipse-temurin-17-alpine AS build
COPY . /app
WORKDIR /app

# Install OpenSSL in the Alpine Linux-based image
RUN apk add --no-cache openssl

# Generate the certificates within the project directory
RUN mkdir -p src/main/resources/certs
RUN openssl genrsa -out src/main/resources/certs/keypair.pem 2048 && \
    openssl rsa -in src/main/resources/certs/keypair.pem -pubout -out src/main/resources/certs/public.pem && \
    openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in src/main/resources/certs/keypair.pem -out src/main/resources/certs/private.pem

# Build the application JAR
RUN mvn package -DskipTests

# Second stage: create a slim image
FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp

# Copy the compiled application JAR
COPY --from=build /app/target/AniList-0.0.1-SNAPSHOT.jar /app.jar

# Set the working directory to the application root
WORKDIR /

# Define the entry point for your Spring Boot application
ENTRYPOINT ["java", "-jar", "/app.jar"]


#---------------------------------------------------------------------
# Old Dockerfile

# # First stage: build the application
# FROM maven:3.9.4-eclipse-temurin-17-alpine AS build
# COPY . /app
# WORKDIR /app
# RUN mvn package -DskipTests

# # Second stage: create a slim image
# FROM eclipse-temurin:17-jdk-alpine
# VOLUME /tmp
# COPY --from=build /app/target/AniList-0.0.1-SNAPSHOT.jar /app.jar
# ENTRYPOINT ["java", "-jar", "/app.jar"]