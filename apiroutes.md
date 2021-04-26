## Accounts
- Users can create account.
    + ```POST /api/users```
- Users can view verified citizens accounts.
    + ```GET /api/users/:id```
- Users can verify their account.
    + ```PUT /api/users/:id/verify```
- Users can subscribe to other accounts.
    + ```POST /api/users/:id/subscribe```
- Users can delete their account.
    + ```DELETE /api/users/:id```
## Offices
- Users can view office pages.
    + ```GET /api/offices/:id```
- Users can subscribe to office pages.
    + ```POST /api/offices/:id/subscribe```
- Leaders can verify their office.
    + ```PUT /api/offices/:id/verify```
## Problems
- Citizens can present a problem.
    + ```POST /api/problems```
- Users can view a problem.
    + ```GET /api/problems/:id```
- Users can subscribe to a problem.
    + ```POST /api/problems/:id/subscribe```
- Citizens can highlight a problem.
    + ```POST /api/problems/:id/highlight```
## Solutions
- Citizens can propose a solution.
    + ```POST /api/problems/:id/solution```
- Users can view a solution.
    + ```GET /api/problems/:id/solution/:id```
- Users can subscribe to a solution.
    + ```POST /api/problems/:id/solution/:id/subscribe```
- Users can vote on a solution.
    + ```POST /api/problems/:id/solution/:id/vote```
## Regions
- Users can view region pages.
    + ```GET /api/region/:id```
- Users can subscribe to region pages.
    + ```POST /api/region/:id/subscribe```
## Topics
- Users can view topic pages.
    + ```GET /api/region/:id```
- Users can subscribe to topic pages.
    + ```POST /api/topic/:id/subscribe```