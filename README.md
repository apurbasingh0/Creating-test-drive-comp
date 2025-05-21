"# Creating-test-drive-comp" 
# Test Drive Lightning Web Component (LWC)

This Salesforce Lightning Web Component enables booking test drives for both existing and new users, integrating product details and lead management.

---

## Features

- Toggle between **Existing User** and **New User** test drive booking.
- Search and select existing leads by mobile number.
- Create new leads with customer and product details.
- Schedule and update test drive appointment dates.
- Send and verify OTP for mobile number validation.
- Displays detailed product info on booking form.

---

## Components

- **Apex Class:** `TestDriveHelper` - Creates `Test_Drive__c` records from Leads.
- **LWC JavaScript:** Handles UI logic, data binding, calls Apex methods.
- **LWC HTML:** Responsive UI for test drive booking form and lead search.

---

## Usage

1. Select user type (existing/new).
2. For existing users, search and select lead, then book or update appointment.
3. For new users, fill in details, verify OTP, and schedule test drive.
4. Submit form to create or update Lead and Test Drive records.

---
