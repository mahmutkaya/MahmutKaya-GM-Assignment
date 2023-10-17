@api @regression @smoke @books
Feature: Books

  Background: Create a user
    Given I have a user with following details:
      | userName | password  |
      | mahmut   | M@hmut123 |

  @smoke @books1 @deleteUser
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

  @smoke @books2 @deleteUser
  Scenario: Add a non-existent book for the created user
    When I add following books:
      | isbn           |
      | 9781449325862X |
    Then I verify that status code is 400
    And I verify that response contains message "ISBN supplied is not available in Books Collection!"

  @smoke @books3 @deleteUser
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

  @smoke @books4 @deleteUser
  Scenario: Remove a non-existent book from the collection
    And I have following book:
      | isbn          |
      | 9781449331818 |
    When I remove the book with isbn '9781449331818X'
    Then I verify that status code is 400
    And I verify that response contains message "ISBN supplied is not available in User's Collection!"
