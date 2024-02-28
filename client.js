const WebSocket = require('ws');
const { calculateSMA } = require('./SMA');
const { calculateEMA } = require('./EMA');

let Data;
let OpenData;
let CloseData;
let HighData;
let LowData;
const OpenValues = [];
const CloseValues = [];
const HighValues = [];
const LowValues = [];


const ws = new WebSocket("ws://localhost:3000/"); // Replace with your server URL and port

ws.onopen = function() {
    console.log("WebSocket connection opened!");
    // You can send data to the server now
    ws.send("Hello from JavaScript!");
};


ws.onmessage = function(event) {
    let message = event.data;
    message = JSON.parse(message)
    Data = message
};

setTimeout(

    ()=>{
        const {Open, Close, High, Low} =  Data;
        
        for (const key in Open) {
            const value = Open[key];
            OpenValues.push(value);
          }
        
        for (const key in Close) {
            const value = Close[key];
            CloseValues.push(value);
          }
        
        for (const key in High) {
            const value = High[key];
            HighValues.push(value);
        }

        for (const key in Low) {
            const value = Low[key];
            LowValues.push(value);
          }

        const ndays = 15;
        const smaSeries = calculateSMA(CloseValues, ndays);
        console.log(smaSeries);
        // console.log(calculateEMA);
        
        // console.log(OpenValues);
        // console.log(CloseValues);
        // console.log(HighValues);
        // console.log(LowValues);
    }
    ,1500)


// ws.onerror = function(error) {
//     console.error("WebSocket error:", error);
// };

// ws.onclose = function(event) {
//     const reason = event.reason;
//     console.log("WebSocket connection closed:", reason);
// };
