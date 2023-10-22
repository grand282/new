FROM node:18.14.2

WORKDIR /usr/src/backend

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]