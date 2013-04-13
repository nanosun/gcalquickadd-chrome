# This is a chrome extension which lets you quick add an event to Google Calendar.

This simple extension communicates with Google Calendar API's quick add function. Just type in an event in a natural way like "Meet my boss at 5 pm in her office". This extension would then help you create a event and display the event information as well as the url to the event in the GCalendar.

### Google's description about Quick Add feature
http://support.google.com/calendar/answer/36604?hl=en

### OAuth Needed
You will need a google calendar account.

The extension asks for OAuth grant when first launches. You can clear access token in the options page. 
If "add event" button happens not work, try re-grant access.

### Multi Calendar Support
If you have many calendars, you can choose which calendar to write in the options page. Default calendar is the first one in your list.

### About the icon
The current icon is a lovely sketch of my girlfriend. I will replace it when I find a proper replacement.


--------------------------------------------------------
### Update Log

* 1.1.0(4/13): Add a open calendar button
* 1.0.1(4/11): resolve expired access-token issue