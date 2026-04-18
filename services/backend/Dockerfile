# Build stage
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /app
COPY pom.xml .
COPY .mvn ./.mvn
COPY mvnw .

RUN ./mvnw dependency:go-offline -DskipTests -q

COPY src ./src

RUN ./mvnw clean package -DskipTests -q

# Runtime stage
FROM eclipse-temurin:17-jre-slim

WORKDIR /app

# Copy JAR from builder stage
COPY --from=builder /app/target/personal-finance-service-*.jar app.jar

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

CMD ["java", "-jar", "app.jar"]
