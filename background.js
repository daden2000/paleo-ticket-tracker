// background.js

// Listen for messages from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message.startsWith("Tickets are available")) {
        // Send desktop notification
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png",
            title: "Ticket Tracker",
            message: request.message
        });
    }
    if (request.message === "closeTab") {
        // Close the tab
        chrome.tabs.remove(sender.tab.id);
    }
});

// Function to check ticket availability
function checkTicketAvailability() {
    // URL of the website to scrape
    var url = "https://tickets.paleo.ch/content?lang=en&source=extension";

    // Open a new tab with the website
    chrome.tabs.create({ url: url, active: false }, tab => {});
}

// Set up periodic alarm to trigger every 30 minutes
chrome.alarms.create("ticketAvailabilityCheck", { periodInMinutes: 30 });

// Listen for alarm event
chrome.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === "ticketAvailabilityCheck") {
        checkTicketAvailability();
    }
});

// Initial check for ticket availability
checkTicketAvailability();