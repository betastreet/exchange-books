FROM mhart/alpine-node:6

# install curl
RUN apk update && apk add \
    curl \
    && rm -rf /var/cache/apk/*

# install node modules
COPY package.json /opt/books/
WORKDIR /opt/books
RUN npm install

# get containerpilot
ENV CONTAINERPILOT_VERSION 2.4.4
RUN export CP_SHA1=6194ee482dae95844046266dcec2150655ef80e9 \
    && curl -Lso /tmp/containerpilot.tar.gz \
        "https://github.com/joyent/containerpilot/releases/download/${CONTAINERPILOT_VERSION}/containerpilot-${CONTAINERPILOT_VERSION}.tar.gz" \
    && echo "${CP_SHA1}  /tmp/containerpilot.tar.gz" | sha1sum -c \
    && tar zxf /tmp/containerpilot.tar.gz -C /bin \
    && rm /tmp/containerpilot.tar.gz

# copy application
COPY index.js /opt/books/
COPY knexfile.js /opt/books/

COPY lib/ /opt/books/lib/
# COPY authkey.pem /opt/books/

# containerpilot config and scripts
COPY reload.sh /usr/local/bin/reload.sh
COPY containerpilot.json /etc/containerpilot.json
ENV CONTAINERPILOT=file:///etc/containerpilot.json

EXPOSE 3000
CMD ["/bin/containerpilot", \
     "node", \
     "/opt/books/index.js" \
]

