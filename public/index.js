import {EGanttChart} from "./eganttchart/EGanttChart.js";

document.querySelector('body').appendChild(
    new EGanttChart(
        {
            title: "No Title",
            date: new Date('2023-11-02T20:00:00'),
            zoom: "day",
            groups: [
                {
                    id: 1,
                    name: "Group 1"
                },
                {
                    id: 2,
                    name: "Group 2"
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
                    name: "Row Two"
                }
            ],
            events: [
                {
                    id: 1,
                    parentRowIds: [1],
                    startTime: new Date('2023-11-03T13:00:00'),
                    endTime: new Date('2023-11-04T15:00:00'),
                    name: "Alpha"
                },
                {
                    id: 2,
                    parentRowIds: [1],
                    startTime: new Date('2023-11-05T13:00:00'),
                    endTime: new Date('2023-11-07T15:00:00'),
                    name: "Alpha"
                }
            ]
        },
        {
            numColumnsToLoad: 92,
            columnWidth: 20,
            leftHeaderWidth: 125,
            groupHeaderHeight: 25,
            zoomWidthMap: {
                month: 20,
                day: 50,
                shift: 75,
                hour: 50,
            }
        }
    )
)
