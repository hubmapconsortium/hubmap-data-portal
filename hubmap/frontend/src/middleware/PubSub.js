import PubSub from 'pubsub-js';

export default class {
tokens = {};

subscribe = (topic, subscriber) => {
  this.tokens[subscriber] = PubSub.subscribe(topic, subscriber);
}

publish = (topic, object) => {
  PubSub.publish(topic, object);
}

unsubscribe = (token) => {
  PubSub.unsubscribe(token);
}
}
