

console.log('Hello World');
// try grabbing the body element after 3 seconds since gmail seems to never load

//console.log(emailBody.outerHTML);
setTimeout(() => {
  let emailBody = document.querySelector("body");
  let bestringed = emailBody.outerHTML;
  let dateString = bestringed.match(/Date: ([^<]*)/)[1];
  let timeString = bestringed.match(/Time: ([^<]*)/)[1];
  console.log(dateString);
  console.log(timeString);



  // create an object to store the time zone possibilities
  const timeZoneOptions = {
    EST: ['America/New_York', '-05:00'],
    EDT: ['America/New_York', '-04:00'],
    ET: ['America/New_York', '-05:00'],
    PST: ['America/Los_Angeles', '-08:00'],
    PDT: ['America/Los_Angeles', '-07:00'],
    PT: ['America/Los_Angeles', '-08:00'],
    CST: ['America/Mexico_City', '-06:00'],
    CDT: ['America/Mexico_City', '-05:00'],
    CT: ['America/Mexico_City', '-06:00']
  }
  const monthToDigits = {
      January: '01',
      February: '02',
      March: '03',
      April: '04',
      May: '05',
      June: '06',
      July: '07',
      August: '08',
      September: '09',
      October: '10',
      November: '11',
      December: '12'
  }
  function timeZoner(str) {
    let timeZone;
    for (let key in timeZoneOptions) {
      if (str.includes(key[0])) {
        timeZone = timeZoneOptions[key][0];
      }
    }
    return timeZone;
  }
  function timeZoneUTC(str) {
    let timeZone;
    for (let key in timeZoneOptions) {
      if (str.includes(key[1])) {
        timeZone = timeZoneOptions[key][1];
      }
    }
    return timeZone;
  }
  const userTZUTC = timeZoneUTC(timeString);
  const userTimeZone = timeZoner(timeString);
  const eventStartTime = getTimes(timeString, dateString, userTimeZone, true);
  const eventEndTime = getTimes(timeString, dateString, userTimeZone, false);

  if (dateString && timeString) {
    const response = confirm(
      `I noticed that you have a nice date in your email.
It looks like this:
Date: ${dateString.match(/[\w]*/)[0]} ${dateString.match(/[\d]+/)[0]}, ${dateString.match(/[\d]+/g)[1]} Time: ${timeString}
Would you like to add it to your Google Calendar?
If so, click OK.
By the way, the Google Calender API would love to see your date in this format if you can get it to work:
Start Time: ${eventStartTime}
End Time: ${eventEndTime}`);
    if (response === true) {
      open('https://calendar.google.com');
    }
  }

  console.log(userTimeZone)
  function twelveto24(num) {
    return Number(num) + 12;
  }
  // format the time correctly
  function getTimes(timeString, dateString, userTimeZone, isStart) {
    
    // get the year
    // const year = dateString.slice(dateString.length - 4);
    const year = dateString.match(/[\d]+/g)[1];
    // get the month
    const monthString = dateString.match(/[\w]*/)[0];
    const monthNum = monthToDigits[monthString];
    // get the day
    const day = dateString.match(/[\d]+/)[0];
    // get the start time and end times
    const startTime = timeString.match(/[\d]{1,2}:[\d]{2}/g)[0].replace(/[\d]+/, twelveto24);
    const endTime = timeString.match(/[\d]{1,2}:[\d]{2}/g)[1].replace(/[\d]+/, twelveto24);
    // build the dateAndTime string
    let dateAndTime = "";
    if (isStart === true) {
      dateAndTime = `${year}-${monthNum}-${day}T${startTime}${userTZUTC}`;
      return dateAndTime;
    }
    else {
      dateAndTime = `${year}-${monthNum}-${day}T${endTime}${userTZUTC}`;
      return dateAndTime;
    }

    
    // return the start and end times
  }
  console.log(getTimes(timeString, dateString, userTimeZone, true));
  console.log(getTimes(timeString, dateString, userTimeZone, false));


  // Refer to the JavaScript quickstart on how to setup the environment:
  // https://developers.google.com/calendar/quickstart/js
  // Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
  // stored credentials.

  let event = {
    'start': {
      'dateTime': eventStartTime,
      'timeZone': userTimeZone
    },
    'end': {
      'dateTime': eventEndTime,
      'timeZone': userTimeZone
    }
  };

  // var request = gapi.client.calendar.events.insert({
  //   'calendarId': 'primary',
  //   'resource': event
  // });

  // request.execute(function(event) {
  //   appendPre('Event created: ' + event.htmlLink);
  // });
  
}, 14000);

//location.href = https://calendar.google.com/calendar
// create some popup that allows the user to choose to create an event in Google Calendar
// window.prompt("display text", "default text")
// ex: let popup = prompt("Add this event to your calendar?", "[pass in the date and time here]")
//if click OK, returns value in input value (default text, though they can change it), otherwise returns null

// Figure out what Google Cal needs
  // format of information
  // how to send the information

//{EDT: "America", EST: "America"}