# Tic Tac Toe with Socket.IO

Play tic tac toe with a friend! Battle them out with X's and O's. Send them messages via chat. Check your stats and see your rank on the leaderboards.

### Install Instructions
Will be added soon

### Change Log
--1.0----------------------------------------
- Login with username and password
--forgot password is not working, just a button
- Logout with button
- Create account
---Username
---email
---passwords
- Update Account coming soon
- Create Chat message
- Delete chat message
- User Validation errors
- Alert who wins (or draw) when game ends
- Slide out menu (Drawer) with...
--Play
--Update Account (coming soon)
- Socket.io on user connect and disconnect
- Morgan logs - HTTP methods
- GameBoard
--alert who wins
--1.1---------------------------------------
- Update Account
--Email
--Password
- Personal stats
--win Rate
--Loses
--wins
--Games Played
--longest and shortest game (static values for now)
- Leaderboards placeholder (coming soon)
- Redesigned message bubble (still needs work)
--1.2-------07.08.2017-----------------------
- Fixed form issues with state
- Added private/protected routes with Redirects
--1.3-------07.18.2017-----------------------
- Added Leaderboards layout with Pagination
- Updated License
--------------------------------------------

### Issues/Bugs
- 'Forget Password' button on login screen overflows and looks smaller, doesnt work either
- ~~chat message bubble - time overflows~~
- avatar and logout seem too close to Tic Tac Toe title on mobile
- user not authenticated when total page refresh
- cannot pick X or O, can only be X
- ~~does not mark win for diagonals~~
- ~~desktop -> X and 0 are HUGE!~~
- desktop -> message bubble really huge
- ~~if more than message bubble, you can't see top~~
- ~~on form submission if error occurs, state is lost even though it looks the field is filled with text~~
- Personal stats do not update after each Games
- time on chat is not saving actual time, it is saving time logged in
- Leaderboard need to be cleaned up with a better scalable layout
- Leaderboard needs better Pagination
