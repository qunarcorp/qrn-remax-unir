import EventEmitter from "../../vendor/emitter/EventEmitter";
import EventSubscriptionVendor from "../../vendor/emitter/EventSubscriptionVendor";

class DeviceEventEmitter extends EventEmitter {

    constructor() {
        const sharedSubscriber = new EventSubscriptionVendor();
        super(sharedSubscriber);
        this.sharedSubscriber = sharedSubscriber;
    }

    addListener = (
        eventType,
        listener,
        context
    ) => {
        return super.addListener(eventType, listener, context);
    }

    removeAllListeners = (eventType) => {
        super.removeAllListeners(eventType);
    }

    removeSubscription = (subscription) => {
        if (subscription.emitter !== this) {
            subscription.emitter.removeSubscription(subscription);
        } else {
            super.removeSubscription(subscription);
        }
    }
}

const deviceEventEmitter = new DeviceEventEmitter()

export default deviceEventEmitter;
