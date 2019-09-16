import PubSub from 'pubsub-js';

export default class PubSubApi {
tokens = {};

subscribers = [];

publishedTopics = [];

subscribe(topic, subscriber) {
  this.subscribers.push(subscriber);
  this.tokens[subscriber] = PubSub.subscribe(topic, subscriber);
}

publish(topic, object) {
    this.publishedTopics[topic] = object;
    PubSub.publish(topic, object);
 /*  if (this.publishedTopics.findIndex(topic) !== -1) {
    PubSub.publish(topic, object);
  }
  else {
    this.publishedTopics[topic] = object;
    PubSub.publish(topic, object);
  } */
}

unsubscribe(token) {
    PubSub.unsubscribe(token);
}

}
