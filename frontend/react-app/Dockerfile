FROM node:19-alpine as buildrun
WORKDIR /app
COPY . .
RUN npm install

# COPY ../../api/TViewer-api.yaml .
# RUN source generate-API

CMD ["npm", "start"]