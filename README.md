# project-21
This is our group project for EECS 1012. We are trying to make a playable version of 21 (ie. blackjack) on a webapage. Read the README for more info.

Name of team: Desperados
Members of Team:
- Carlos Dela Cruz (carlos18@my.yorku.ca), Section B lab 4
- Ivan Korpalo (ivantk@my.yorku.ca), Section B lab 4

Title: Project 21

Description: Our group has chosen to make a playable game of 21. 21 is the family-friendly name for blackjack. The rules are simple. A dealer and a player are both dealt a card. They can choose to either draw a card or keep their hand. They repeat till satisfied. The goal is to finish with a hand with the highest value. If the value exceeds 21 though, the player is out of the game.

Notably, cards will be drawn from a simulated 52-card deck. After the initial shuffle, card draw is deterministic. This allows you to use the skill of card-counting for future rounds. Deck is shuffled when halfway empty. You can bet “confidence points” and slowly gain leaderboard score.


Requirements Definition:

1. Does the user know the rules of 21?

    -Yes: Continue to game.
    
    -No: display the rules of playing 21
    
2. We will use a 52-card deck

    -13 different ranks of cards (ace, 2-10, jack, queen, king)
    
    -4 different suits ( clubs, diamonds, hearts, spades)
    
    -Each suite includes all 13 ranks of cards
    
      Ex, clubs(13 ranks), diamonds (13 ranks), hearts (13 ranks), spades (13 ranks)
      
3. Game objective: the user attempts to beat the dealer by getting a count as close to 21 as possible, without going over 21.

4. The user will initially receive 2 cards

    -Cards are drawn from the top of the deck
    
    -Create a variable “playerSum” to store the value of the player’s sum of cards.
    
    -Show the value of one card to the user, its  value to “playerSum”
    
    -Hide the other card from the user. Keep the value of the card stored.

5. The dealer will play 2 cards visible to the user

    -Create a variable “dealerSum” to store the value of the dealer’s sum of cards
    
    -Store the value of the sum of both cards to “dealerSum”
    
    -Output the sum for the user to see.
    
6. Be ready for Aces.

    -Aces can be either a 1 or 11
    
    -User and Dealer must choose upon first receiving it
    
    -If this is too complicated to implement, value of Ace will default to 1
    
7. More to come
    
    -This is a reminder that we are not finished yet. We must continue to add more stuff to this document.

