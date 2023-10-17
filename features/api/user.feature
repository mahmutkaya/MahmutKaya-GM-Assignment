@api @regression @user
Feature: User

  @smoke @user1 @deleteUser
  Scenario: Create user with valid credentails
    When I create a user with following details:
      | userName | password  |
      | mahmut   | M@hmut123 |
    Then I verify that status code is 201
    And I verify that response contains username "mahmut"

  @smoke @user2
  Scenario Outline: Create user with <testCase>
    When I create a user with following details:
      | userName   | password   |
      | <userName> | <password> |
    Then I verify that status code is 400
    And I verify that response contains message "<message>"

    Examples:
      | testCase                 | userName | password  | message                                                                                                                                                                                                    |
      | NO USERNAME              |          | M@hmut123 | UserName and Password required.                                                                                                                                                                            |
      | NO PASSWORD              | mahmut   |           | UserName and Password required.                                                                                                                                                                            |
      | NO UPPERCASE PASSWORD    | mahmut   | m@hmut123 | Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer. |
      | NO LOWERCASE PASSWORD    | mahmut   | M@HMUT123 | Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer. |
      | NO DIGIT PASSWORD        | mahmut   | M@HMUTABC | Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer. |
      | NO SPECIAL CHAR PASSWORD | mahmut   | Mahmut123 | Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer. |
      | 7 CHAR PASSWORD          | mahmut   | M@h123    | Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer. |

