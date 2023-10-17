@ui @regression @elements
Feature: Elements

  Background: Navigate to elements page
    Given I am on the 'elements' page

  @elements1
  Scenario: Verify user can enter new data into the table
    When I click on 'Web Tables' item in the left panel
    And I click on 'Add' button in elements page
    Then I verify that registration form is displayed
    When I enter 'Alden' in the 'First Name' input field in elements page
    And I enter 'Cantrell' in the 'Last Name' input field in elements page
    And I enter '30' in the 'Age' input field in elements page
    And I enter 'test@test.com' in the 'Email' input field in elements page
    And I enter '12345' in the 'Salary' input field in elements page
    And I enter 'QA' in the 'Department' input field in elements page
    And I click on 'Submit' button
    Then I verify that web table has following record:
      | First Name | Last Name | Age | Email         | Salary | Department |
      | Alden      | Cantrell  | 30  | test@test.com | 12345  | QA         |

  @elements2
  Scenario: Verify user can edit the row in a table
    Given I have a record in web table with following details:
      | First Name | Last Name | Age | Email             | Salary | Department |
      | Alden      | Cantrell  | 45  | alden@example.com | 12000  | Compliance |
    When I click on 'edit record' icon of the record that contains firstname 'Alden'
    And I fill in registration form with following details:
      | First Name | Last Name |
      | Gerimedica | BV        |
    And I click on 'Submit' button
    Then I verify that web table has following record:
      | First Name | Last Name | Age | Email             | Salary | Department |
      | Gerimedica | BV        | 45  | alden@example.com | 12000  | Compliance |

  @elements3
  Scenario: Verify broken image
    When I click on 'Broken Links And Images' item in the left panel
    Then I verify that 'Toolsqa1' image is broken
