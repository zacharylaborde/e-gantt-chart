import {EGanttChart} from "./eganttchart/EGanttChart.js";

document.querySelector('body').appendChild(
    new EGanttChart(
        {
            title: "No Title",
            date: new Date(new Date(new Date().setHours(0, 0, 0, 0)).getTime() - new Date().getTimezoneOffset() * 60000),
            zoom: "month",
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
                    startTime: new Date('10-24-2022'),
                    endTime: new Date('10-29-2023'),
                    name: "Alpha"
                }
            ]
        },
        {
            numColumnsToLoad: 92,
            columnWidth: 75,
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
