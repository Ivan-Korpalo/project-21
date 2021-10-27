# project-21
This is our group project for EECS 1012. We are trying to make a playable version of 21 (ie. blackjack) on a webapage. Read the README for more info.

Name of team: The Desperados

Members of Team:
- Carlos Dela Cruz (carlos18@my.yorku.ca), Section B lab 4
- Ivan Korpalo (ivantk@my.yorku.ca), Section B lab 4

Title: Project 21

Description: Our group has chosen to make a playable game of 21. 21 is the family-friendly name for blackjack. The rules are simple. A dealer and a player are both dealt a card. They can choose to either draw a card or keep their hand. They repeat till satisfied. The goal is to finish with a hand with the highest value. If the value exceeds 21 though, the player is out of the game.

Notably, cards will be drawn from a simulated 52-card deck. After the initial shuffle, card draw is deterministic. This allows you to use the skill of card-counting for future rounds. Deck is shuffled when halfway empty. You can bet “confidence points” and slowly gain leaderboard score.


Requirements Definition:

1. New players will be given a list of rules through a helpful window that they can then close.
    
2. We will use a simulated standard 52-card deck with full compliment of suits and ranks. Deck is shuffled at the beginning and when it is halfway depleted.
      
3. Game objective: the user attempts to beat the dealer by getting a count as close to 21 as possible, without going over 21.

4. The user will initially receive 2 cards drawn from the top of the deck. The hand and its corresponding value will be displayed on screen

5. The dealer will play 2 cards visible to the user after the user completed their turn. They will then draw more cards according to the algorithm.

6. Once the dealer is finished, the value of the user and dealer's hands are compared. If it is higher than 21, it is automatically set to zero. A winner or tie is     then declared. User is then asked if they want to play again.
    
7. Be ready for Aces. Aces can be either a 1 or 11. User and Dealer must choose a value upon first receiving it
    
    -If this is too complicated to implement, value of Ace will default to 1
    
8. The player will be prompted to input how much he/she will bet. The minimum and maximum limits are $20 to $500 respectively.

9. After the player's bet is placed, the player receives two cards face up, and the dealer receives one card face up and one card face down

10. They player can choose to stand on the two cards originally dealt to them, or they may ask the dealer for additional cards (hit), one at a time, until deciding     to stand on the total (if it is 21 or under), or goes "bust" (if it is over 21).

11. After the player's turn is over, the dealers face-down card is turned up. If the total is 17 or more, it must stand. If the total is 16 or under, they must take    a card. If the dealer has an ace, and counting it as 11 would bring the total to 17 or more (but not over 21), the dealer must count the ace as 11 and stand.
 
12. 
    

