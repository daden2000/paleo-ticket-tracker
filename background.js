// background.js


// background.js

// Test notification creation
chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: "Test Notification",
    message: "This is a test notification"
});


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
});
