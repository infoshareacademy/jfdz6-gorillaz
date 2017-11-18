let Observable = function () {
    let subscribers = [];

    function subscribe(fn) {
        subscribers.push(fn);
    }

    function next(data) {
        if (subscribers) {
            subscribers.forEach((fn) => fn(data));
        }
    }

    return {
        subscribe: subscribe,
        next: next
    };
};