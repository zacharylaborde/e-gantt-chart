export class EGC_InMemoryRepository {
    constructor(state) {
        this.state = state;
    }

    update(keys, value) {
        console.log(keys, value);
        if (!Array.isArray(keys) || keys.length === 0)
            throw new Error("Keys should be an array with at least one key");
        const isPositiveInteger = key => Number.isInteger(+key) && +key >= 0;
        const lastKey = keys.pop();
        const target = keys.reduce((acc, key) => {
            if (isPositiveInteger(key)) {
                if (!Array.isArray(acc))
                    throw new Error(`Expected an array but found an object at key: ${key}`);
                while (acc.length <= key) acc.push({});
                return acc[key];
            } else {
                if (typeof acc[key] === 'undefined') acc[key] = {};
                return acc[key];
            }
        }, this.state);

        if (isPositiveInteger(lastKey)) {
            if (!Array.isArray(target))
                throw new Error(`Expected an array but found an object at key: ${lastKey}`);
            if (target.length > lastKey) target[lastKey] = value;
            else target.push(value);
        } else {
            target[lastKey] = value;
        }
    }

    getState(...keys) {
        if (keys.length === 0) throw new Error("Provide at least one key");
        try {
            return keys.reduce((acc, key) => {
                if (Number.isInteger(+key) && +key >= 0) {
                    if (!Array.isArray(acc)) throw new Error();
                    return acc[key];
                } else {
                    if (typeof acc[key] === 'undefined') throw new Error(`${acc} doesn't contain key ${key}.`);
                    return acc[key];
                }
            }, this.state);
        } catch (error) {
            return undefined; // Return undefined if the path does not exist
        }
    }
}