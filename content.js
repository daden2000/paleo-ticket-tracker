// Content script to be executed in the opened tab
// This script will scrape the content and send a notification

// Wait for the page to fully load
window.addEventListener("load", function() {
    // Check if tickets are available
    var availableDays = [];
    var selectedDays = [];
    console.log("Checking for tickets");
    // Get selected days from storage
    chrome.storage.sync.get('selectedDays', function(data) {
        selectedDays = data.selectedDays || [];
        // Your code here
        console.log(selectedDays);
        // Loop through each div with class "stx-product-content"
        $('.stx-product-content').each(function() {
            // Find the <p> element containing the day of the week
            var dayOfWeek = $(this).find('p').text().trim().toLowerCase().split(' ')[0];
            // Check if the day of the week matches one of the selected days
            if (selectedDays.includes(dayOfWeek)) {
                console.log("Checking for " + dayOfWeek);
                // Check if a span with text "Sold out" exists within the div
                if ($(this).find('span:contains("Sold out")').length === 0) {
                    // Tickets are available, send a notification
                    availableDays.push(dayOfWeek);}
            }
        });
    
        if (availableDays.length > 0) {
            chrome.runtime.sendMessage({ message: "Tickets are available for: " + availableDays.join(", ")});
        }

    });
    // Check if the URL contains the parameter "source" with value "extension"
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('source') && urlParams.get('source') === 'extension') {
        // The website was opened by the extension
        // Close the tab
        chrome.runtime.sendMessage({ message : "closeTab"});
    }
});
