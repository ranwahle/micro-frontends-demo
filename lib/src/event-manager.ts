declare type eventCallback = ((...args: any[]) => any);

export class EventManager {

    private readonly eventSubscriptions: { [eventName: string]: eventCallback[] }

    constructor() {
        this.eventSubscriptions = {};
    }

    /**
     * Suscribe to an event
     * @param {string} eventName
     * @param {eventCallback} callback
     */
    subscribe(eventName: string, callback: eventCallback): void {
        const eventSubscriptions: eventCallback[] = this.eventSubscriptions[eventName] || [];
        eventSubscriptions.push(callback);

        this.eventSubscriptions[eventName] = eventSubscriptions;
    }


    /**
     * Publish event
     * @param {string} eventName
     * @param args
     */
    publish(eventName: string, ...args: any[]) {
        if (!this.eventSubscriptions[eventName]) {
            return;
        }
        this.eventSubscriptions[eventName].forEach(subscriber => subscriber(args) )
    }


}
