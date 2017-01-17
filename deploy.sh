docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
docker build -t $REPO ./app/
docker tag $REPO $REPO:$TRAVIS_BUILD_NUMBER
docker push $REPO;
