FROM node:10.14.1-alpine

WORKDIR /usr/src/app

ENTRYPOINT ["/run.sh"]