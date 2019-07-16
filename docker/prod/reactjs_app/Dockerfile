FROM node:12.4.0

COPY . /opt/hubmap-data-portal
WORKDIR /opt/hubmap-data-portal/hubmap/frontend
RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]
