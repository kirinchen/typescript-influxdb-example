import { config } from 'dotenv';
import * as path from 'path';
const { hostname } = require('os')
const ENV_FILE = path.join(__dirname, '..', './myconfig/typescript-influxdb-example.env');
config({ path: ENV_FILE });

console.log("influxdata.url:" + process.env.influxdata_url);
console.log("influxdata.url:" + process.env.influxdata_token);

import { InfluxDB, FluxTableMetaData, Point, HttpError } from '@influxdata/influxdb-client'
// You can generate a Token from the "Tokens Tab" in the UI
const client = new InfluxDB({ url: process.env.influxdata_url, token: process.env.influxdata_token })

console.log('Hello world');

const writeApi = client.getWriteApi('0d8d34b36826efb3', 'Test')

console.log('*** WRITE POINTS ***')

// setup default tags for all writes through this API
writeApi.useDefaultTags({ location: hostname() })

const dateTime = new Date().getTime();
const timestamp  = Math.floor(dateTime / 1000);
const point1 = new Point('temperature')
    .timestamp(timestamp +'')
    .tag('example', 'Change Timestamp')
    .floatField('value', 20 + Math.round(100 * Math.random()) / 10)
writeApi.writePoint(point1)
console.log(` ${point1}`)
const point2 = new Point('temperature')
    .tag('example', 'write.ts')
    .floatField('value', 10 + Math.round(100 * Math.random()) / 10)
writeApi.writePoint(point2)
console.log(` ${point2}`)

// flush pending writes and close writeApi
writeApi
    .close()
    .then(() => {
        console.log('FINISHED ... now try ./query.ts')
    })
    .catch(e => {
        console.error(e)
        if (e instanceof HttpError && e.statusCode === 401) {
            console.log('Run ./onboarding.js to setup a new InfluxDB database.')
        }
        console.log('\nFinished ERROR')
    })





function query() {

    const fluxQuery =
        'from(bucket:"Test") |> range(start: -15m, stop: now()) '
    const queryApi = client.getQueryApi('0d8d34b36826efb3')
    console.log('*** QUERY ROWS ***')
    // performs query and receive line table metadata and rows
    // https://v2.docs.influxdata.com/v2.0/reference/syntax/annotated-csv/
    queryApi.queryRows(fluxQuery, {
        next(row: string[], tableMeta: FluxTableMetaData) {
            const o = tableMeta.toObject(row)
            // console.log(JSON.stringify(o, null, 2))
            console.log(
                `${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`
            )
        },
        error(error: Error) {
            console.error(error)
            console.log('\nFinished ERROR')
        },
        complete() {
            console.log('\nFinished SUCCESS')
        },
    })
}



var readline = require('readline');
let cs = readline.createInterface(process.stdin, process.stdout);
cs.setPrompt('guess> ');
cs.prompt();
cs.on('line', function (line) {
    if (line === "right") this.close();
    this.rl.prompt();
}).on('close', function () {
    process.exit(0);
});