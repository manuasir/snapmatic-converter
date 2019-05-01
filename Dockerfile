FROM node:8

ENV SRC_DIR="/src/" \
    DST_DIR="/dst/"

COPY ./bin/snapmatic-converter-linux /bin/
CMD ["sh", "-c", "/bin/snapmatic-converter-linux $SRC_DIR $DST_DIR"]