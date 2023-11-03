import {EGanttChart} from "./eganttchart/EGanttChart.js";

document.querySelector('body').appendChild(
    new EGanttChart(
        {
            title: "No Title",
            date: new Date('2023-11-02T20:00:00'),
            zoom: "day",
            rows: [
                {
                    id: 1,
                    name: "Row One (The best row)"
                },
                {
                    id: 2,
                    name: "Row Two (The second best row)"
                }
            ],
            events: [
                {
                    id: 1,
                    parentRowId: 1,
                    startTime: new Date('2023-11-05T13:00:00'),
                    endTime: new Date('2023-11-07T15:00:00'),
                    name: "Alpha"
                }
            ]
        },
        {
            numColumnsToLoad: 92,
            columnWidth: 20,
            leftHeaderWidth: 75,
            zoomWidthMap: {
                month: 20,
                day: 50,
                shift: 75,
                hour: 50,
            }
        }
    )
)
