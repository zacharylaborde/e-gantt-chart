import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <e-gantt-chart></e-gantt-chart>
`

setupCounter(document.querySelector('#counter'))
