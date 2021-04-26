# MVPs:
- Accounts/Citizens
- Leaders/Automated Leader Signup & Email Invite
- Offices/Automated Office Creation
- Regions/Automated Region Creation
- Problems/Highlights/Commitees
- Solutions/Up-Down Vote
- Subscriptions/Feed
- Bonus: Google maps
- Bonus: Webcam Functionality (Photo Authentication)
- Bonus: Content Analysis Filter (Cloudmersive NLP API)

## - Accounts
- Users can sign up, log in, and log out
- Once signed up, a user will be directed to a private profile page where they can view and manage their subscriptions.
- Users can verify their account by entering personal details including name, address, and government issued photo ID number 
- (BONUS: upload photo of ID using camera to verify information, photo will only be analyzed and not saved).
## - Citizens
- Once verified as a citizen, a user will be asked to select what information will be publicly visible, if any at all.
- While on their (or anothers) profile page, the user will be able to see a list of all subscriptions and a list of all of their leaders as well as problems or solutions proposed and items voted on/highlighted (subject to privacy settings).
## - Leaders
- When a citizen is verified, an account will be created and assign to its respective offices for each of the citizens leaders with an email sent to the office email (if the account for the leader does not already exist, dummy email for POC purposes) asking them to sign up to be able to interact with their constituents.
## - Regions
- Whenever an office is created, a region will be created for that office if it does not already exist.
- Users are able to view problems and offices by region.
## - Offices
- When a citizen is verified, an office will be created for each of its leaders and their respective office.
- Upon creation, an email will be sent to the office email asking them to verify their account by replying (if the office does not already exist). 
- (BONUS: once a day, the database will refresh and if the leader doesnt match the office, the office will become unverified and a new account will be created for the new leader as per Leaders feature, and a new email will be sent to the office for verification)
## - Problems
- Any verified citizen is able to present a problem to one of their leaders regions (federal, state, city) and assign it a topic. 
- The problem will be limited to between 500 and 5000 characters and should be structered in as objective a way as possible, with references and images provided if possible. 
- Citizens can then highlight the problem; once 5% of a regions verified users have highlighted a problem, an email will be sent to the leaders within that jurisdiction. 
- (BONUS: content will be analyzed by Cloudmersives NLP API for objectivity, hate speech, profanity, and value (+ ~ -) and rejected if the tests do not pass.)
## - Commitees
- Once a problem reaches 5%, a commitee is formed. 
- The commitee comprises of any office that falls within the jurisdiction of the problem. 
- Upon formation, an email will be sent to each office within the commitee informing them of the problem and if any solutions have been proposed.
## - Solutions
- Any verified citizen is able to read through a problem and propose a well thought out, objective solution with references and images. 
- This solution should be a minimum of 1000 characters and a maximum of 10000. 
- Citizens can then either up or downvote the solution, but are not allowed to comment to avoid division. 
- If a citizen decides that they do not agree with a proposed solution, their only option within the platform is to downvote the solution, and/or to propose a solution of their own. 
- (BONUS: content will be analyzed by Cloudmersives NLP API for objectivity, hate speech, profanity, and value (+ ~ -) and rejected if the tests do not pass.)
## - Topics
- Users can view problems by topic.
## - Subscriptions/Feed
- Users with accounts can subscribe to citizens, offices, problems (solutions added, 5/10/15..% reached), solutions (10/100/1000 votes reached), regions, and topics to see the updates in their feed. 
- Creating a problem or solution, or voting on a solution will automatically subscribe you.
- Leaders of offices in the commitee of a problem will automatically be subscribed
## Bonus: Webcam Functionality
## Bonus: Google Maps
## Bonus: Content Analysis
