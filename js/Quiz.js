class Quiz {
  constructor(){
    this.AnswerTitle = createElement("H1");
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //escribe aquí el código para ocultar los elementos de la pregunta
    question.hide();

    //escribe aquí el código para cambiar el color de fondo 
    background(121, 202, 206);

    //escribe el código para mostrar un encabezado que indique el resultado del Cuestionario
    this.AnswerTitle.html("Resultado del cuestionario");
    this.AnswerTitle.position(250, 0);

    //llama aquí a getContestantInfo( )
    Contestant.getPlayerInfo();
    
    //escribe la condición para comprobar si contestantInfor no está indefinido 
    if(allContestants !== undefined){
      fill(195, 6, 177);
      textSize(20);
      text("*NOTA: ¡El concursante que respondió correctamente, está resaltado en color verde!", 30, 230);
      var display_position = 260;
      for(var plr in allContestants){
        var correctAns = "2";
        if (correctAns === allContestants[plr].answer){
          fill("green")
        }else{
          fill("black");
        }
        display_position+=23;
        textSize(20);
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 120,display_position)
      }
    }

    //escribe aquí el código para agregar una nota

    //escribe el código para resaltar al concursante que respondió correctamente
    
      
    }
}