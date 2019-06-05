FROM node:12.4.0

WORKDIR /opt
RUN git clone https://github.com/hubmapconsortium/hubmap-data-portal.git
WORKDIR /opt/hubmap-data-portal/frontend
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]
