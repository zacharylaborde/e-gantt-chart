export class EGC_InMemoryRepository {
    constructor(state) {
        this.state = state;
    }

    update(keys, value) {
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

    *delete(...keys) {
        if (keys.length === 0) {
            throw new Error('At least one key must be provided');
        }

        let currentObj = this.state;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (Array.isArray(currentObj) && !Number.isNaN(Number(key))) {
                // If the current object is an array and the key is a valid index, continue to the next index
                currentObj = currentObj[Number(key)];
            } else if (currentObj.hasOwnProperty(key) && typeof currentObj[key] === 'object') {
                // If the current object is an object, navigate to the next object property
                currentObj = currentObj[key];
            } else {
                return; // Key path not found, nothing to delete
            }
        }

        const lastKey = keys[keys.length - 1];
        yield currentObj[lastKey];
        if (Array.isArray(currentObj) && !Number.isNaN(Number(lastKey))) {
            // If the last key is a valid index, remove the element from the array
            currentObj.splice(Number(lastKey), 1);
        } else if (currentObj.hasOwnProperty(lastKey)) {
            // If the last key is an object property, delete it
            delete currentObj[lastKey];
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