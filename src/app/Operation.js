const EventEmitter = require('events');
const define = Object.defineProperty;

class Operation extends EventEmitter {
  static setEvents(events) {
    define(this.prototype, 'events', {
      value: createevents(events),
    });
  }

  on(event, handler) {
    if (this.events[event]) {
      return this.addListener(event, handler);
    }

    throw new Error(`Invalid event "${event}" to operation ${this.constructor.name}.`);
  }
}

const createevents = (eventsArray) => {
  return eventsArray.reduce((obj, output) => {
    obj[output] = output;
    return obj;
  }, Object.create(null));
};

module.exports = Operation;
