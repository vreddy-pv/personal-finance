#!/bin/bash

# Kill any process running on port 8080
kill -9 $(lsof -t -i:8080)

# Run the application
java -jar target/finance-manager-0.0.1-SNAPSHOT.jar
