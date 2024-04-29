// content.js

// Function to check ticket availability for selected days
function checkTicketAvailability(selectedDays) {
    // Only proceed if the current URL matches the festival website URL
    var allowedURL = "https://tickets.paleo.ch/content?lang=en";

    if (window.location.href === allowedURL) {
        // Loop through each div with class "stx-product-content"
        $('.stx-product-content').each(function() {
            // Find the <p> element containing the day of the week
            var dayOfWeek = $(this).find('p').text().trim().toLowerCase().split(' ')[0];;
            console.log(dayOfWeek);
            // Check if the day of the week matches one of the selected days
            if (selectedDays.includes(dayOfWeek)) {
                console.log("Checking for " + dayOfWeek);
                // Check if a span with text "Sold out" exists within the div
                if ($(this).find('span:contains("Sold out")').length === 0) {
                    console.log("Tickets are available for " + dayOfWeek);
                    // Tickets are available, send a notification
                    chrome.runtime.sendMessage({ message: "Tickets are available!"});
                }
            }
        });
    }
}

// Get selected days from storage
chrome.storage.sync.get('selectedDays', function(data) {
    var selectedDays = data.selectedDays || [];
    checkTicketAvailability(selectedDays);
});

// Check ticket availability periodically
setInterval(function() {
    chrome.storage.sync.get('selectedDays', function(data) {
        var selectedDays = data.selectedDays || [];
        checkTicketAvailability(selectedDays);
    });
},2000);
//}, 30*60*1000); // Check every 30 minutes (adjust interval as needed)
