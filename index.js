// set up global variables
var playername;
var playermoney = 1000; //starting cash
var maxmoney = playermoney;
var pot = 0;

var gamedeck = new Deck();

var playerhand = [];
var dealerhand = [];

var ace_anchor = new Card("Joker", -1, "Joker", "back");//A dummy object meant to carry the value of floating ace once the deck is shuffle. Bloody pointers!
var floatingAce = ace_anchor;

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
      this.deck;
      return this.deck.pop();
      //return this.deck[0];//This comment is switched on for debug only. Makes every card drawn an Ace of Spades
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
   };
}

function drawcardDebug(){

   var card = gamedeck.draw();
   //This alert is only for testing purposes. Final function will simply return the card.
   document.getElementById("card").innerHTML= "<img src="+card.image+">";
   //alert("You drew : "+card.name+"\nValue: "+card.value);
}

function drawDelay(cardimage){//Draws a card, then waits a bit for dramatic effect
   
   var card = gamedeck.draw();
   return card;
}

function resetDeck(){
   gamedeck = new Deck();
   gamedeck.shuffle();
}

function addDiscard(cards){//Cards is an array
   for (var i = 0; i< cards.length;i++){
      var card = cards[i];
      //rests aces to their default value before putting them back in the deck
      if (card.value == 1 || card.value == 11){
         card.value = 0;
      }

      gamedeck.discard.push(card);//Puts the card on top of the discard
   }
   return [];//This empty array is meant to empty the hand
}

//Merge Carlos' work
function enterName(){
   //saves player name into the global variable
   playername = document.getElementById("myName").value;
   shuffle();
}

//split Carlos work into two functions. Only this called gets called when the game loops
function shuffle(){
   updateFooter();
   resetDeck(); //For now, will be uncommented in final version



   //reveals gif of shuffling cards
   document.getElementById('id01').style.display='block';

   // prints the player name and a message
   var text1 = document.getElementById("shufflename");
   text1.innerHTML = "Prepare to place your bets "+ playername+"!";
   
   //sets timer of 3 seconds before switching screens
   setTimeout(function(){ 
      //hide old stuff
      document.getElementById('id01').style.display='none';
      document.getElementById('splash').style.display='none';
      
      //reveal new stuff
      document.getElementsByTagName("header")[0].style.display='block';
      document.getElementsByTagName("footer")[0].style.display='block';
      document.getElementById('current').style.display='block';

   }, 3000);
}

//end of merging


//Phase 2

function toggleHelp(){
   var header = document.getElementsByTagName("header")[0];
   var footer = document.getElementsByTagName("footer")[0];
   var title = document.getElementsByTagName("h1")[0];

   var body = document.getElementById("current");
   var instructions =  document.getElementById("instructions");

   var hbutton = document.getElementById("headerbutton");
   var fbutton = document.getElementById("footerbutton");

   //header.style.color = "blue";

   if (body.style.display === "none"){ //resets
      header.style.height = "initial";
      body.style.display = "block";
      title.innerHTML = "Desperado Blackjack";
      instructions.style.display = "none";

      document.getElementsByTagName("body")[0].style.backgroundColor = "green";
      document.getElementsByTagName("footer")[0].style.backgroundColor = "transparent";

      //header.style.borderBottom = "3px solid grey";      
      hbutton.style.display = "inline";

      footer.style.zIndex = "initial";
      footer.style.borderStyle = "none";      
      fbutton.style.display = "none";

   } else {
      body.style.display = "none"; //toggled
      header.style.height = "100%";
      document.getElementsByTagName("h1")[0].innerHTML = "How to Play";
      //document.getElementbyId("p1").innerHTML = "Placeholder?";//Write down how to play in here eventually
      instructions.style.display = "inline";
      document.getElementsByTagName("body")[0].style.backgroundColor = "darkslategray";

      document.getElementsByTagName("footer")[0].style.backgroundColor = "green";
      footer.style.zIndex = "1";
      footer.style.borderTop = "3px solid grey";      
      fbutton.style.display = "inline";
      
      //header.style.borderStyle = "none";  
      hbutton.style.display = "none";
   }
}


function makeBet(){
   var bet = parseInt(document.getElementById("bet").value, 10);
   //alert(bet);

   if (bet-bet !== 0){//This is a version of isNaN() that is compatible with older browsers
      alert("Not a valid number. Please type in a number to play")
   } else if(bet<20||bet>500){//Adding the Min and Max value to the form was pointless. Have to add this check anyway
      alert("Number is outside of constraints. Please enter an integer between 20 and 500 inclusive");
   } else if(bet>playermoney){
      alert("You only have $"+playermoney+". You can't bet more money than you actually have. Try again.");
   } else{ //Once all other checks are passed execute
      //Update backend
      pot = bet*2;
      playermoney -= bet;

      //Tweak frontend
      updateFooter();
      document.getElementById("toptext").innerHTML = "Pot: $"+pot;
      document.getElementById("betting").style.display = "none";
      document.getElementById("main").style.display = "block";

      initialDraw();
   }
}


function updateFooter(){ // Does what the title says. Updates info of the footer to its current value
   //Should be called when name is first inputted, and at the end of every round

   document.getElementById("name").innerHTML = playername;
   document.getElementById("money").innerHTML = playermoney;
   document.getElementById("max").innerHTML = maxmoney;
}

function initialDraw(){//Draws the cards for the player and dealer via "animation", then makes buttons visible upon completion
   document.getElementById("headerbutton").disabled = "true"; //disable help button to avoid jank

   //check top card of discard pile and display it
   var discard = document.getElementById("discard"); //get the discard pile
   //alert("Hello discard!");

   if (gamedeck.discard.length == 0){ //if discard pile is empty
      //alert("Hello empty discard!");
      discard.innerHTML = '<h2>Discard</h2><img src="images/cards/emptydiscard.png">';
   } else {
      //alert("Hello filled discard!");
      discard.innerHTML = '<h2>Discard</h2><img src='+gamedeck.discard[gamedeck.discard.length-1].image+'>';
   }

   //Some back-end setup for giving cards to players
   var phand= document.getElementById("playerhand");
   var dhand= document.getElementById("dealerhand");

   var firstcard = gamedeck.draw();
   var secondcard = gamedeck.draw();

   //Give to player

   phand.innerHTML = '<img src='+firstcard.image+'>';
   //playerhand.push(firstcard);
   
   setTimeout(function(){
      playerhand.push(firstcard);
      phand.innerHTML += '<img src='+secondcard.image+'>';
      playerhand.push(secondcard);
      setTimeout(function(){
         //Give to dealer
         var dfirstcard = gamedeck.draw();
         var dsecondcard = gamedeck.draw();
         
         //check aces as dealer and have him choose their values
         if (dfirstcard.value == 0 && dsecondcard.value == 0){
            dfirstcard.value = 1;
            dsecondcard.value = 1;

         } else if (dfirstcard.value == 0){
            if (dsecondcard.value > 5){
               dfirstcard.value = 11;
            } else {
               dfirstcard.value = 1;
            }
            
         } else if (dsecondcard.value == 0){
            if (dfirstcard.value > 5){
               dsecondcard.value = 11;
            } else {
               dsecondcard.value = 1;
            }
         }
         
         
         dhand.innerHTML = '<img src="images/cards/back.png">';//shows only the back of the card
         setTimeout(function(){
            dealerhand.push(dfirstcard);
            dhand.innerHTML += '<img src='+dsecondcard.image+'>';
            dealerhand.push(dsecondcard);

            //reveal buttons and allow player to act again
            document.getElementById("leftbutt").style.display = "inline";
            document.getElementById("rightbutt").style.display = "inline";
            document.getElementById("headerbutton").disabled = false;//Re-enable it at the end of the animation. Have to use boolean literals here
            initialPlayeraceCheck();

         },500);
      }, 500);
   }, 500);   

}

//button change tests (Success!)
function changeRight(){
   alert("Testing click");
   document.getElementById("rightbutt").setAttribute("onclick", "clicked(5)");
}


function initialPlayeraceCheck(){
   if (playerhand[0].value == 0 && playerhand[1].value == 0){
      
      //alert("Both are aces");

      floatingAce = playerhand[1];
      
      //Remove the second ace from the div and hand so playerAceChosen doesn't insert a duplicate
      document.getElementById("playerhand").innerHTML = '<img src='+playerhand[0].image+'>';
      playerhand.pop();
      
      //alert(floatingAce.value);

      playerAceFirstChoice();
   } else if (playerhand[0].value == 0){
      //alert("First is ace");
      //floatingAce = playerhand[0];
      //floatingAce.value = 3 //It could be any inane number besides 0
      playerAceFirstChoice();
   } else if (playerhand[1].value == 0){
      //alert("Second is ace");
      floatingAce = playerhand[1];

      //Remove the second ace from the div so playerAceChosen doesn't insert a duplicate
      document.getElementById("playerhand").innerHTML = '<img src='+playerhand[0].image+'>';   
      playerhand.pop();

      playerAceChoice();
   }
   else {
      updatePlayerValue();
   }
}


//In case the first card the player draws is an ace
function playerAceFirstChoice(){
   var card = playerhand[0];

   var title = document.getElementById("toptext");
   var invisible = document.getElementById("ace");

   title.innerHTML= "Ace! Choose a value!";
   invisible.src = card.image;

   //button changes
   document.getElementById("leftbutt").setAttribute("onclick", "playerAceSecondChoice(1)");
   document.getElementById("leftbutt").innerHTML = "1";
   document.getElementById("rightbutt").setAttribute("onclick", "playerAceSecondChoice(11)");
   document.getElementById("rightbutt").innerHTML = "11";
}

function playerAceSecondChoice(num){
   //assign the value of the ace
   //alert("ace value chosen");
   //alert(floatingAce.value);
   playerhand[0].value = num;//This should simultaneously change floating ace to Nan.
   //alert(floatingAce.value);

   if (floatingAce.value == 0){//Only execute if both cards drawn were aces
      
      var title = document.getElementById("toptext");
      var invisible = document.getElementById("ace");
      
      title.innerHTML= "Another Ace! Another Choice!";
      invisible.src = floatingAce.image;

      //button changes
      document.getElementById("leftbutt").setAttribute("onclick", "playerAceChosen(1)");
      document.getElementById("leftbutt").innerHTML = "1";
      document.getElementById("rightbutt").setAttribute("onclick", "playerAceChosen(11)");
      document.getElementById("rightbutt").innerHTML = "11";
   } else {//If only the first card was an ace
      //Change everything back to normal
      //alert("Attempting to change things back to normal");
      var title = document.getElementById("toptext");
      var invisible = document.getElementById("ace");
      
      title.innerHTML= "Pot $"+pot;
      invisible.src = "images/cards/empty.png";
      
      //buttons back to normal
      document.getElementById("leftbutt").setAttribute("onclick", "playerHit()");//experiment with initial
      document.getElementById("leftbutt").innerHTML = "Hit!";
      document.getElementById("rightbutt").setAttribute("onclick", "playerStay()");
      document.getElementById("rightbutt").innerHTML = "Stay!";

      //Update Value
      updatePlayerValue();
   }
}

//maybe add a second choice ace function


function playerAceChoice(){

   //create custom text and show card in middle
   var title = document.getElementById("toptext");
   var invisible = document.getElementById("ace");

   title.innerHTML= "Ace! Choose a value!";
   invisible.src = floatingAce.image;

   //button changes
   document.getElementById("leftbutt").setAttribute("onclick", "playerAceChosen(1)");
   document.getElementById("leftbutt").innerHTML = "1";
   document.getElementById("rightbutt").setAttribute("onclick", "playerAceChosen(11)");
   document.getElementById("rightbutt").innerHTML = "11";
}

function playerAceChosen(num){
   //alert("you chose your ace to be "+num);

   //change and insert the ace into the hand
   floatingAce.value = num;
   playerhand.push(floatingAce);
   document.getElementById("playerhand").innerHTML+= '<img src='+floatingAce.image+'>';

   //reset things to normal
   var title = document.getElementById("toptext");
   var invisible = document.getElementById("ace");

   title.innerHTML= "Pot $"+pot;
   invisible.src = "images/cards/empty.png";

   //change buttons back
   document.getElementById("leftbutt").setAttribute("onclick", "playerHit()");//experiment with initial
   document.getElementById("leftbutt").innerHTML = "Hit!";
   document.getElementById("rightbutt").setAttribute("onclick", "playerStay()");
   document.getElementById("rightbutt").innerHTML = "Stay!";

   //Update Value
   updatePlayerValue();
}

function clicked(arg){//debug function used to test if a button works
   alert("this button clicks! "+arg);
}

function updatePlayerValue(){
   document.getElementById("value").style.display = "inline";

   var value = calculateValue(playerhand);
   //alert("Your value is "+value);

   if (value > 21){
      value = 0;
      document.getElementById("value").innerHTML= "Value: Bust!";
      playerStay();
   } else {
      document.getElementById("value").innerHTML= "Value: "+value;
   }
}

function calculateValue(hand){
   
   var value = 0;

   for (var i=0; i<hand.length; i++){
      //alert(hand[i].name);
      value += hand[i].value;
   }

   return value
}

function playerHit(){
   //alert("You hit!");
   //add a new card
   var newcard = gamedeck.draw();

   //check if it's an ace
   if (newcard.value == 0){
      floatingAce = newcard;
      playerAceChoice();
   } else {
      //if not an ace, updateplayer value
      document.getElementById("playerhand").innerHTML += '<img src='+newcard.image+'>';
      playerhand.push(newcard);
      updatePlayerValue();
   }

}

function playerStay(){
   //alert("You stayed!");

   //disable buttons
   document.getElementById("rightbutt").style.display = "none";
   document.getElementById("leftbutt").style.display = "none";
   document.getElementById("headerbutton").disabled = "true";

   //reveal the dealer's hidden card, by refreshing the whole hand
   document.getElementById("dealerhand").innerHTML= '<img src='+dealerhand[0].image+'>'+'<img src='+dealerhand[1].image+'>';
   document.getElementById("dealervalue").style.display= "inline";

   //begin dealer turn
   //alert("Deal rumbles")
   dealerTurn();
}


function dealerTurn(){
   //dealer checks if the value of his hand is greater than 16 (or equal to zero)
   var value = calculateValue(dealerhand);
   var playervalue = calculateValue(playerhand);
   document.getElementById("dealervalue").innerHTML = "Value: "+value;

   if (value>16){
      if (value>21){
         value = 0;
         document.getElementById("dealervalue").innerHTML = "Value: Bust!";
      }
      //final showdown
      showDown();
   } else if (playervalue< 22 && value < playervalue){
      var newcard = gamedeck.draw();

      if (newcard.value == 0){//check if it's an ace
         if (value > 5 && value < 11) {//If making the ace an 11 will push the value to at least 17 without busting, then make the ace 17, otherwise make it 1
            newcard.value = 11;
         } else {
            newcard.value = 1;
         }
      }
      //Finally add the new card to the hand after processing
      dealerhand.push(newcard);
      document.getElementById("dealerhand").innerHTML += '<img src='+newcard.image+'>';

      setTimeout(function(){//This should hopefully add a nice delay
         dealerTurn();
      },500);
       
   } else {
      showDown();
   }
}

function showDown(){
   var playervalue = calculateValue(playerhand);
   var dealervalue = calculateValue(dealerhand);

   //Value isn't a global variable so I have to keep busting it
   if (playervalue > 21){
      playervalue = 0;
   }
   if (dealervalue > 21){
      dealervalue = 0;
   }

   var toptext = document.getElementById("toptext");

   if (playervalue == dealervalue){//update money totals based on outcome
      //tie
      toptext.innerHTML = "Tie. Have a refund. Play again?"
      playermoney += pot/2;
   } else if (playervalue > dealervalue){
      //player wins
      toptext.innerHTML = "You won! Enjoy your winnings. Play again?"
      playermoney += pot;
   } else {
      //dealerwins
      toptext.innerHTML = "You lost it all! Play again?"
   }

   //update maxmoney if necessary
   if (playermoney > maxmoney){
      maxmoney = playermoney;
   }
   
   toptext.style.display = "block";
   updateFooter();

   //update buttons
   document.getElementById("rightbutt").style.display = "inline";
   document.getElementById("leftbutt").style.display = "inline";
   document.getElementById("headerbutton").disabled = false;

   document.getElementById("leftbutt").setAttribute("onclick", "restart()");
   document.getElementById("leftbutt").innerHTML = "Again!";
   document.getElementById("rightbutt").setAttribute("onclick", "quit()");
   document.getElementById("rightbutt").innerHTML = "Quit!";
   floatingAce = ace_anchor;
   //alert(ace_anchor.value);

}

function restart(){
   if (playermoney > 19){
      //alert("You can afford another game!");
      document.getElementById("dealerhand").innerHTML = '<img src="images/cards/empty.png">';
      document.getElementById("playerhand").innerHTML = "";
      document.getElementById("dealervalue").style.display = "none";
      document.getElementById("value").innerHTML = "Hand Value: ";
      document.getElementById("value").style.display = "none";
      document.getElementById("main").style.display = "none";
      document.getElementById("betting").style.display = "inline";
      document.getElementById("leftbutt").setAttribute("onclick", "playerHit()");
      document.getElementById("leftbutt").innerHTML = "Hit!";
      document.getElementById("leftbutt").style.display = "none";
      document.getElementById("rightbutt").setAttribute("onclick", "playerStay()");
      document.getElementById("rightbutt").innerHTML = "Stay";
      document.getElementById("rightbutt").style.display = "none";
      //shuffle
      //alert(gamedeck.deck.length);
      if (gamedeck.deck.length < 26) {//then shuffle
         document.getElementById("current").style.display = "none";
         document.getElementById("splash").style.display = "inline";
         shuffle();
         //gamedeck.view(gamedeck.deck);
         playerhand = [];
         dealerhand = [];
      } else {
         //alert("attempting to empty hands");
         playerhand =addDiscard(playerhand);
         dealerhand =addDiscard(dealerhand);
         //alert(playerhand);
         //alert(dealerhand);
      }
   } else {
      alert("Sorry, you don't have enough to play");
      quit();
   }
}

function quit(){
   alert("You left with $"+playermoney+" worth of winnings. You could have left with $"+maxmoney);
   if (playermoney == maxmoney){
      alert("Good job!");
   }

   document.getElementById("leftbutt").disabled = "true";
   document.getElementById("rightbutt").disabled = "true";
}
