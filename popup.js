// popup.js

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve selected days from storage
    chrome.storage.sync.get('selectedDays', function(data) {
        var selectedDays = data.selectedDays || [];
        // Check checkboxes for saved days
        selectedDays.forEach(function(day) {
            var checkbox = document.querySelector('input[name="day"][value="' + day + '"]');
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    });

    var form = document.getElementById('daysForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var selectedDays = [];
        var checkboxes = document.getElementsByName('day');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                selectedDays.push(checkboxes[i].value);
            }
        }
        chrome.storage.sync.set({ 'selectedDays': selectedDays }, function() {
            console.log('Selected days saved');
        });
        window.close();
    });
});
