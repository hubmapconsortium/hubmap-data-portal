#!/usr/bin/env bash
echo "You will need to pull the image first"
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.0.0
echo "Start Elastic search"
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.0.0
