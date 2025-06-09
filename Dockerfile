## it is for python server

FROM python:3.13-alpine AS backend-build
WORKDIR /backend
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt 
COPY . . 
CMD ["python" ,"server.py"]
EXPOSE 8000

## it for frontend build
FROM node:22.8.0 AS frontend-build
WORKDIR /frontend
COPY ./frontend/build /frontend/build
COPY ./config/config.env ./config/config.env

# it is for that main server
FROM node:22.8.0 AS final
WORKDIR /
COPY ./server.js ./server.js
COPY ./package.json ./package-lock.json ./
COPY ./node_modules ./node_modules
COPY ./frontend/build /frontend/build
COPY ./config/config.env ./config/config.env
RUN npm install
EXPOSE 3000
EXPOSE 3001
CMD ["npm", "run", "start"]

