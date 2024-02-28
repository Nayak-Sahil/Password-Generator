FROM node:17-alpine as ui-build
WORKDIR /app/react-app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm","run","dev"]

# FROM node:20 as final
# WORKDIR /app/react-app
# COPY --from=ui-build /app/react-app/dist/ /app/react-app/dist/
# COPY package.json .
# COPY vite.config.js .
# RUN ls
# RUN cat package.json
# RUN cat vite.config.js
# EXPOSE 8080
# CMD ["npm","run","preview"]