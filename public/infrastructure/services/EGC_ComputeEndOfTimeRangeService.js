export class EGC_ComputeEndOfTimeRangeService {
    constructor(name) {
        this.name = name;
    }

    compute(callback) {
        this.generateUpperTimeline = callback;
        return this;
    }
}