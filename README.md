# project-21
This is our group project for EECS 1012. We are trying to make a playable version of 21 (ie. blackjack) on a webapage. Read the README for more info.

Name of team: The Desperados

Members of Team:
- Carlos Dela Cruz (carlos18@my.yorku.ca), Section B lab 4
- Ivan Korpalo (ivantk@my.yorku.ca), Section B lab 4

Title: Project 21

Description: Our group has chosen to make a playable game of 21. 21 is the family-friendly name for blackjack. The rules are simple. A dealer and a player are both dealt a card. They can choose to either draw a card or keep their hand. They repeat till satisfied. The goal is to finish with a hand with the highest value. If the value exceeds 21 though, the player is out of the game.

Notably, cards will be drawn from a simulated 52-card deck. After the initial shuffle, card draw is deterministic. This allows you to use the skill of card-counting for future rounds. Deck is shuffled when halfway empty. You can bet in-game money and slowly gain a virtual fortune.


Requirements Definition:

~~1. New players will be given a list of rules through a helpful window that they can close and open as needed.~~
    
~~2. We will use a simulated standard 52-card deck with full compliment of suits and ranks. Deck is shuffled at the beginning and when it is halfway depleted. An obvious notification is played when this happens.~~
      
~~3. Game objective: the user attempts to beat the dealer by getting a count as close to 21 as possible, without going over 21.~~

~~4.	To start a round, the user must click a button which will then prompt them to make a bet. The minimum and maximum limits are $20 to $500 respectively.~~

~~5.	Once bets are made, the user will receive 2 cards drawn from the top of the deck and afterwards the dealer will as well. The user’s hand and its corresponding value will be displayed on screen, while only the dealer’s first card will be visible.~~

~~6. The player can choose to stand on the two cards originally dealt to them, or they may ask the dealer for additional cards (hit), one at a time, until deciding to stand on the total (if it is 21 or under), or goes "bust" (if it is over 21).~~

~~7.	After the user completed their turn, the dealer will reveal their other card. They will then draw more cards according to the algorithm.~~

~~8.	The dealer's algorithm follows the same rules dealers use in casinos. If the total is 17 or more, the dealer must stand. If the total is 16 or under, they must take a card. If the dealer has an ace, and counting it as 11 would bring the total to 17 or more (but not over 21), the dealer must count the ace as 11 and stand.~~

~~9. Once the dealer is finished, the value of the user and dealer's hands are compared. If it is higher than 21, it is automatically set to zero. A winner or tie is then declared. User is then asked if they want to play again or quit.~~

~~10. The user gets double their back bet if they win, a refund if they tie, and nothing if they lose.~~

~~11. The user is given an initial pool of cash to bet with, whose value is tracked as they play games.~~
    
~~12. Be ready for Aces. Aces can be either a 1 or 11. User and Dealer must choose a value upon first receiving it~~
    
~~13.	Before the user can receive their starting money, they are first asked to input a name.~~

~~14. If a player has less than $20 in their wallet they will not be allowed to start a new round. They will have no choice but to quit~~

~~15. There will be a counter displaying the highest amount of money they managed to hold in a single session.~~

Project Design:

![Wireframe](/Wireframe.drawio.png)
