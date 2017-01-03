FROM node:6-alpine

RUN apk update && \
    apk add curl && \
    rm -rf /var/cache/apk/*

# install node modules
COPY package.json /opt/app/
WORKDIR /opt/app
RUN npm install


# Install ContainerPilot
ENV CONTAINERPILOT_VERSION 2.6.0
RUN export CP_SHA1=c1bcd137fadd26ca2998eec192d04c08f62beb1f \
    && curl -Lso /tmp/containerpilot.tar.gz \
         "https://github.com/joyent/containerpilot/releases/download/${CONTAINERPILOT_VERSION}/containerpilot-${CONTAINERPILOT_VERSION}.tar.gz" \
    && echo "${CP_SHA1}  /tmp/containerpilot.tar.gz" | sha1sum -c \
    && tar zxf /tmp/containerpilot.tar.gz -C /bin \
    && rm /tmp/containerpilot.tar.gz

# COPY ContainerPilot configuration
ENV CONTAINERPILOT_PATH=/etc/containerpilot.json
COPY containerpilot.json ${CONTAINERPILOT_PATH}
ENV CONTAINERPILOT=file://${CONTAINERPILOT_PATH}

COPY lib/ /opt/app/lib/

EXPOSE 3000
# ENTRYPOINT ["/bin/containerpilot", "npm"]
# CMD ["--prefix=/opt/app/", "run", "start"]
# ENTRYPOINT ["/bin/containerpilot", "node"]
# CMD ["/opt/app"]

