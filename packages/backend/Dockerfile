# Use a imagem base oficial do Node.js
FROM node:16-alpine

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências
COPY package.json yarn.lock ./

# Instale as dependências
RUN yarn install

# Copie o restante dos arquivos
COPY . .

# Exponha a porta que o Fastify usa
EXPOSE 3001

# Comando para iniciar o servidor Fastify
CMD ["yarn", "dev"]
