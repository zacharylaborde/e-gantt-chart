export class EGC_TimeRangeGeneratorService {
    constructor(name) {
        this.name = name;
    }

    lowerTimelineStrategy(callback) {
        this.generateLowerTimeline = callback;
        return this;
    }

    upperTimelineStrategy(callback) {
        this.generateUpperTimeline = callback;
        return this;
    }
}