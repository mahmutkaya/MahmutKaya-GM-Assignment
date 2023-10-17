@api @smoke @user
Feature: User

  @user1 @deleteUser
  Scenario: Create user with valid credentails
    When I create a user with following details:
      | userName | password  |
      | mahmut   | M@hmut123 |
    Then I verify that status code is 201
    And I verify that response contains userName 'mahmut'
