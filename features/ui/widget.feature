@ui @regression @widgets
Feature: Widgets

  Background: Navigate to widgets page
    Given I am on the 'widgets' page

  @widgets1
  Scenario: Verify the progress bar
    When I click on 'Progress Bar' item in the left panel
    Then I verify that progress bar is at '0%'
    And I verify that 'Start and Stop' button has 'Start' text
    When I click on 'Start and Stop' button in widget page
    Then I verify that 'Start and Stop' button has 'Stop' text
    When I wait at least for 10 seconds
    Then I verify that progress bar is at '100%'
    And I verify that 'Reset' button is displayed
    And I verify that 'Start and Stop' button is not displayed

  @widgets2
  Scenario: Verify the tooltip
    When I click on 'Tool Tips' item in the left panel
    And I hover over the button 'Hover me to see'
    Then I verify that 'You hovered over the Button' tooltip is displayed
