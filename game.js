$(document).ready(function(){
  
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    
    questions: {
      q1: "What is the Dwight's second name?",
      q2: "Who said thos quote'Beets, bears, Battlestar Galactica'",
      q3: 'How died Ed Truck?',
      q4: 'What is the real name of the Scranton Strangler?',
      q5: " What was the married Jan's last name ",
      q6: "'Sometimes I think the people I work with are stupid' Who said this?",
      q7: "What was the entire name of the Fun Run?"
    },
    options: {
      q1: ['Jeremias', 'Friederik', 'Kurt', 'Martin'],
      q2: ['Dwight', 'Michael', 'Mose', 'Jim'],
      q3: ['Car accident', 'He was decapitated by the Scranton Strangler', 'Heart Attack', 'Overdosis of drugs'],
      q4: ['Martin Skub', 'George Howard', 'Wyatt Dylan', 'Toby Flenderson'],
      q5: ['Gould','Anderson','Fisher','Goldberg'],
      q6: ['Michael','Oscar','Dwight','Kevin'],
      q7: ["Michael Scott's Dunder Mifflin Meredith Palmer Memorial Scranton Celebrity Rabies Awareness Fun Run Pro Am Race for the Cure.", "Dunder Mifflin Scranton Meredith Palmer Memorial Fun Run Pro Am Race for the Cure.", "Michael Scott's Dunder Mifflin Scranton Meredith Palmer Memorial Celebrity Rabies Awareness Fun Run Pro Am Race for the Cure.","Michael Scott's Dunder Mifflin Scranton Meredith Palmer Memorial Celebrity Rabies Awareness Fun Run ."]
    },
    answers: {
      q1: 'Kurt',
      q2: 'Jim',
      q3: 'Car accident',
      q4: 'George Howard',
      q5: 'Gould',
      q6: 'Kevin',
      q7: "Michael Scott's Dunder Mifflin Scranton Meredith Palmer Memorial Celebrity Rabies Awareness Fun Run Pro Am Race for the Cure."
    },
   
    startGame: function(){
      
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
    
      $('#game').show();
      
      
      $('#results').html('');
      
     
      $('#timer').text(trivia.timer);
      
   
      $('#start').hide();
  
      $('#remaining-time').show();
      
    
      trivia.nextQuestion();
      
    },
   
    nextQuestion : function(){
      
     
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
  
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },




  
    timerRunning : function(){
    
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
     
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
    
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
      
             $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        




      
             $('#game').hide();
        
       
        $('#start').show();
      }
      
    },








    guessChecker : function() {
      
      var resultId;
      
      
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      
      if($(this).text() === currentAnswer){

        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      else{
    
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
  
    guessResult : function(){
      

      trivia.currentSet++;
      
    
      $('.option').remove();
      $('#results h3').remove();
      

      trivia.nextQuestion();
       
    }
  
  }
    