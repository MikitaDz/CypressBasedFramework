Feature: LogInFeature

Scenario:
  Given I open registration page

  When I register a new user

  Then the url is /registrierung

Scenario:
  Given I open login page

  When I log in by default user

  Then the url is /

Scenario:
  Given I open login page

  When I log in by default user with incorrect password

  Then the url is /login

  Then I see label about incorrect credentials