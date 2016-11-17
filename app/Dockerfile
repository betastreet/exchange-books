FROM mhart/alpine-node:6

# install node modules
COPY package.json /opt/books/
WORKDIR /opt/books
RUN npm install

# copy application
COPY index.js /opt/books/
COPY knexfile.js /opt/books/

COPY lib/ /opt/books/lib/
# COPY authkey.pem /opt/books/

EXPOSE 3000
CMD ["npm", \
     "run", \
     "start" \
]

