// set up global variables
var playername;
var playermoney = 1000; //starting cash

var gamedeck = new Deck();

// set up a list of cards
//Define a constructor for a cards object
function Card(suit, value, name, image){
   this.suit = suit;
   this.value = value;
   this.name = name;
   this.image = "images/cards/"+image+".png";
}

//Define a constructor for a deck object
function Deck(){
   // A list of all possible suits, values, and names
   var suits = ["Spades","Hearts","Clubs", "Diamonds"];
   var values = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
   var names = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
   // 0 Stands for an ace without its value defined.
   
   // We start with a deck with no cards inside
   var protodeck = [];
   
   //We create a 52 cards. One for each possible name and suit combination and insert it into the deck
   for (var s = 0; s<4; s++){
      for (var v =0; v <13; v++){
         protodeck.push(new Card(suits[s], values[v], names[v]+" of "+suits[s], names[v]+"_"+suits[s]));
      }
   }

   this.deck = protodeck;
   this.discard = [];//This is an empty discard pile, cards from hands are placed here, after a round.

   //Define a method to draw a card. Cards are drawn starting from the highest index
   this.draw= function(){
      return this.deck.pop();
   };
   
   //Define a method to shuffle the deck based on the amount of existing cards. A mutator method
   this.shuffle= function(){
      //Create a temporary buffer deck that will be filled with random cards
      var temp= [];

      //randomly select a card from the deck, remove it and insert it into the buffer deck.
      while (this.deck.length > 0){
         var choice = Math.floor(Math.random()*this.deck.length);
         temp.push(this.deck.splice(choice, 1)[0]);//Splice returns a single element array. The [0] allows me to access and insert it
      };

      //Swap the now empty deck with the now filled buffer
      this.deck = temp;
   };

   //A debug method that lists every card and value in the deck or discard in the order they will be drawn
   this.view= function(choice){//choice can be either Deck.deck or Deck.discard
      var output = []

      for (var i = choice.length - 1; i >= 0; i--){
         var card = choice[i];
         output.push(card.name+" "+card.value);
      }
      alert(output);
   }
}

function drawcard(){

   var card = gamedeck.draw();
   //This alert is only for testing purposes. Final function will simply return the card.
   alert("You drew : "+card.name+"\nValue: "+card.value);
}
