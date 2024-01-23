FROM node:18.15

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3001

# Command to start the application
CMD ["bash","migrate-and-start.sh"]

# docker build -t backend-node .
# docker run --name api-node -d -p 3001:3001 backend-node