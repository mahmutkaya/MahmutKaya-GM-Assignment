@api @smoke @books
Feature: Books

  Background: Create a user
    Given I have a user with following details:
      | userName | password  |
      | mahmut   | M@hmut123 |

  @books1 @deleteUser
  Scenario: Add a list of books for the created user
    When I add following books:
      | isbn          |
      | 9781449325862 |
      | 9781449331818 |
      | 9781449365035 |
    Then I verify that status code is 201
    When I get user details
    Then I verify that response contains following books details:
      | isbn          | title                               | author               |
      | 9781449365035 | Speaking JavaScript                 | Axel Rauschmayer     |
      | 9781449331818 | Learning JavaScript Design Patterns | Addy Osmani          |
      | 9781449325862 | Git Pocket Guide                    | Richard E. Silverman |

  @books2 @deleteUser
  Scenario: Remove one of the added books
    And I have following books:
      | isbn          |
      | 9781449331818 |
      | 9781449365035 |
    When I remove the book with isbn '9781449331818'
    Then I verify that status code is 204
    When I get user details
    Then I verify that response contains following book details:
      | isbn          | title               | author           |
      | 9781449365035 | Speaking JavaScript | Axel Rauschmayer |
    And I verify that response  does not contain a book with isbn '9781449331818'
