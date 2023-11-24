import {EGanttChart} from "./eganttchart/EGanttChart.js";

document.querySelector('body').appendChild(
    new EGanttChart(
        {
            title: "No Title",
            date: new Date('2023-11-02T20:00:00'),
            zoom: "day",
            selectedEvent: null,
            groups: [
                {
                    id: 1,
                    name: "Group 1"
                },
                {
                    id: 2,
                    name: "Group 2",
                    disabled: true
                }
            ],
            rows: [
                {
                    id: 1,
                    parentGroupIds: [1, 2],
                    name: "Row One"
                },
                {
                    id: 2,
                    parentGroupIds: [1],
                    name: "Row Two",
                    disabled: true
                },
                {
                    id: 3,
                    parentGroupIds: [2],
                    name: "Row Three"
                },
                {
                    id: 4,
                    parentGroupIds: [2],
                    name: "Row Three"
                },
                {
                    id: 5,
                    parentGroupIds: [2],
                    name: "Row Three"
                },
                {
                    id: 6,
                    parentGroupIds: [2],
                    name: "Row Three"
                },
                {
                    id: 7,
                    parentGroupIds: [2],
                    name: "Row Three"
                },
                {
                    id: 8,
                    parentGroupIds: [2],
                    name: "Row Three"
                },
                {
                    id: 9,
                    parentGroupIds: [2],
                    name: "Row Three"
                },
                {
                    id: 10,
                    parentGroupIds: [2],
                    name: "Row Three"
                },
                {
                    id: 11,
                    parentGroupIds: [2],
                    name: "Row Three"
                },
                {
                    id: 12,
                    parentGroupIds: [2],
                    name: "Row Three"
                },
                {
                    id: 13,
                    parentGroupIds: [2],
                    name: "Row Three"
                },
                {
                    id: 14,
                    parentGroupIds: [2],
                    name: "Row Three"
                },
                {
                    id: 15,
                    parentGroupIds: [2],
                    name: "Row Three"
                },
                {
                    id: 16,
                    parentGroupIds: [2],
                    name: "Row Three"
                },
                {
                    id: 17,
                    parentGroupIds: [2],
                    name: "Row Three"
                },
                {
                    id: 18,
                    parentGroupIds: [2],
                    name: "Row Three"
                }
            ],
            events: [
                {
                    id: 1,
                    parentRowIds: [1],
                    startTime: new Date('2023-11-03T13:00:00'),
                    endTime: new Date('2023-11-04T15:00:00'),
                    name: "Alpha",

                },
                {
                    id: 2,
                    parentRowIds: [1],
                    startTime: new Date('2023-11-04T13:00:00'),
                    endTime: new Date('2023-11-07T15:00:00'),
                    name: "Bravo"
                },
                {
                    id: 3,
                    parentRowIds: [2],
                    startTime: new Date('2023-11-05T13:00:00'),
                    endTime: new Date('2023-11-07T15:00:00'),
                    name: "Charlie",
                    disabled: true
                }
            ]
        },
        {
            numColumnsToLoad: 92,
            columnWidth: 20,
            leftHeaderWidth: 100,
            filterRowsWithNoVisibleEvents: false,
            zoomWidthMap: {
                month: 20,
                day: 50,
                shift: 75,
                hour: 50,
            }
        }
    )
)
