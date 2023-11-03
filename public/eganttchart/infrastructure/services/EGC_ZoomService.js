export class EGC_ZoomService {
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

    getEndTimeStrategy(callback) {
        this.getEndTime = callback;
        return this;
    }

    getStartIndexStrategy(callback) {
        this.getStartIndex = callback;
        return this;
    }

    getEndIndexStrategy(callback) {
        this.getEndIndex = callback;
        return this;
    }
}