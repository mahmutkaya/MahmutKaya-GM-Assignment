@ui @regression @forms
Feature: Forms

  Background: Navigate to forms page
    Given I am on the 'forms' page

  @forms1
  Scenario: Verify user can submit the form
    When I click on 'Practice Form' item in the left panel
    And I fill in student registration form with following details:
      | First Name      | Gerimedica            |
      | Last Name       | BV                    |
      | Email           | test@test.com         |
      | Mobile          | 0123456789            |
      | Date of Birth   | 15 January 1990       |
      | Subjects        | Playwright Assignment |
      | Current Address | Netherlands           |
    And I click on 'Male' option in gender list
    And I check 'Reading' option in hobbies list
    And I select 'NCR' option in 'state' dropdown
    And I select 'Delhi' option in 'city' dropdown
    And I upload 'images/pw-logo.png' image to 'Select picture' input field
    And I click on 'Submit' button
    Then I verify that success modal is displayed with 'Thanks for submitting the form' title
