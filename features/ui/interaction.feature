@ui @regression @interaction
Feature: Interaction

  Background: Navigate to interaction page
    Given I am on the 'interaction' page

  @interaction1
  Scenario: Verify the tooltip
    When I click on 'Droppable' item in the left panel
    And I drag the 'Drag me' box to 'Drop here' area
    Then I verify that 'Drop here' element has 'Dropped!' text
