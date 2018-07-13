let moment = require('moment');

// All timestamps are in refference the 'unix epic' which is on the Jan 1st 1970 00:00:00 am
// In javascript, time is used in milliseconds
// This is where moment comes to save the day

/* let date = new Date();
console.log(date.getMonth()); */

let date = moment();
console.log(date.format('h:mm a'));
