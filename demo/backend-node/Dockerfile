FROM node:18.15

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm" , "run", "dev"]

# docker build -t backend-node .
# docker run --name api-node -d -p 3001:3001 backend-node