Feature: BnB Booking Platform End-to-End Behaviour (Lite)
  As a guest or admin user
  I want the booking platform to behave consistently and reliably
  So that bookings, rooms, and messages can be managed effectively

  # ------------------------------------------------
  # Guest User – Positive Scenarios
  # ------------------------------------------------

  Background:
    Given the user navigates to "https://automationintesting.online"

  Scenario: 1. Guest views available rooms for selected dates
    Given the guest is on the home page
    When they select check-in date "2025-07-01" and check-out date "2025-07-05"
    Then available rooms should be displayed
    And unavailable rooms should not appear in the results

  Scenario: 2. Guest completes a successful room booking
    Given the guest has selected an available room
    When they fill in firstname "<firstname>", lastname "<lastname>", email "<email>", phone "<phone>" and booking dates "<checkin>" to "<checkout>"
    Then the booking should be confirmed
    And a confirmation message containing "Booking Successful" should be shown

    Examples:
      | firstname | lastname | email              | phone       | checkin    | checkout   |
      | John      | Doe      | john@example.com   | 01234567890 | 2025-07-01 | 2025-07-05 |
      | Jane      | Smith    | jane@example.com   | 07911123456 | 2025-08-10 | 2025-08-15 |

  Scenario: 3. Guest submits a valid contact message
    Given the guest is on the contact page
    When they submit the form with name "Alice Brown", email "alice@example.com", phone "01234567890" and message "I have a question about accessibility."
    Then the system should accept the message
    And a success notification should be displayed

  Scenario: 4. Guest sees room details before booking
    Given the guest is viewing available rooms on the home page
    When they open a room's details panel
    Then the room description, price per night, and amenities should be displayed
    And the option to book the room should be available

  # ------------------------------------------------
  # API + UI Hybrid Scenarios
  # ------------------------------------------------

  Scenario: 5. Room availability service returns empty results
    Given the guest is on the home page
    When the room availability service is intercepted to return an empty rooms list
    Then the UI should display a "No rooms available for your selected dates" message
    And no room cards should be rendered on the page

  Scenario: 6. Booking conflicts are prevented for already-booked rooms
    Given a room is already booked via the API for dates "2025-07-01" to "2025-07-05"
    When a guest searches for rooms with check-in "2025-07-02" and check-out "2025-07-04"
    Then that room should not appear in the available rooms list

  # ------------------------------------------------
  # Negative Scenarios (Guest + Admin)
  # ------------------------------------------------

  Scenario: 7. Guest cannot book a room with invalid or missing details
    Given the guest has selected an available room
    When they submit the booking form with firstname "<firstname>", lastname "<lastname>", email "<email>" and phone "<phone>"
    Then a validation error for "<missing_field>" should be displayed
    And the booking should not be created

    Examples:
      | firstname | lastname | email            | phone       | missing_field |
      |           | Doe      | john@example.com | 01234567890 | firstname     |
      | John      |          | john@example.com | 01234567890 | lastname      |
      | John      | Doe      |                  | 01234567890 | email         |
      | John      | Doe      | john@example.com |             | phone         |

  Scenario: 8. Guest cannot search with an invalid date range
    Given the guest is on the home page
    When they select a check-out date "2025-07-01" that is earlier than the check-in date "2025-07-05"
    Then an error message should be displayed informing the guest the dates are invalid
    And no rooms should be shown

  Scenario: 9. Guest cannot submit a contact form with missing required fields
    Given the guest is on the contact page
    When they submit the form with name "<name>", email "<email>", phone "<phone>" and message "<message>"
    Then a validation error for the "<missing_field>" field should be displayed
    And the message should not be sent

    Examples:
      | name  | email            | phone       | message | missing_field |
      |       | test@example.com | 01234567890 | Hello   | name          |
      | Alice |                  | 01234567890 | Hello   | email         |
      | Alice | test@example.com |             | Hello   | phone         |
      | Alice | test@example.com | 01234567890 |         | message       |
