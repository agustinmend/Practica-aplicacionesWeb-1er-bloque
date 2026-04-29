export type ObserverCallback = (state: any) => void;

export class Observer {
    private subscribers: ObserverCallback[] = [];

    subscribe(callback: ObserverCallback) {
        this.subscribers.push(callback);
    }

    notify(state: any) {
        this.subscribers.forEach(callback => callback(state));
    }
}