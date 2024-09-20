let scores= JSON.parse(localStorage.getItem
    ('scores'))||{win:0,lose:0,tie:0};
    
    document.querySelector
    ('.js-scores').innerHTML=`Wins:${scores.win},Losses:${scores.lose},Ties:${scores.tie}`;

    let computer='';
    let result='';
    let play='';
    function playit(play){
        
        computer=computermove();
        result=playgame(play,computer);
        sumscore(result);
        document.querySelector('.js-result').innerHTML=`You ${result}.`;
        document.querySelector('.js-move').innerHTML=`
        You 
        <img src="image/${play}-emoji.png">
        vs 
        <img src="image/${computer}-emoji.png"> Computer`;

    }
    let isauto=false;
    let intervalid;
    function autoplay(){
        if(!isauto){
           intervalid= setInterval(function(){
                const player=computermove();
                playit(player);
            },0.1)
            isauto=true;
            document.querySelector('.js-auto').innerHTML="Stop Auto Play";
        }
        else{
            clearInterval(intervalid);
            isauto=false;
            document.querySelector('.js-auto').innerHTML="Auto Play";
        
        }
        
        
        
    }
    function computermove(){
        let num=Math.random();
        if(num<=1/3){
            return "Rock";
        }
        else if(num<=2/3&&num>1/3){
            return "Paper";
        }
        else{
            return "Scissors";
        }
    }
    function playgame(player, computer){
        if(player=="Rock"){
            if(computer=="Rock"){
                return "Tie"
            }
            else if(computer=="Paper"){
                return "Lose";
            }
            else{
                return "Win";
            }
        }
        if(player=="Paper"){
            if(computer=="Rock"){
                return "Win";
            }
            else if(computer=="Paper"){
                return "Tie";
            }
            else{
                return "Lose";
            }
        }
        if(player=="Scissors"){
            if(computer=="Rock"){
                return "Lose";
            }
            else if(computer=="Paper"){
                return "Win";
            }
            else{
                return "Tie";
            }
        }
    }
    function sumscore(result){
        if(result=="Win"){
            scores.win++;
        }
        else if(result=="Lose"){
            scores.lose++;
        }
        else{
            scores.tie++;
        }
        localStorage.setItem('scores',JSON.stringify(scores));
        document.querySelector
    ('.js-scores').innerHTML=`Wins:${scores.win},Losses:${scores.lose},Ties:${scores.tie}`;
    }
    function reset(){
        scores.win=0;
        scores.lose=0;
        scores.tie=0;
        document.querySelector
        ('.js-scores').innerHTML=`Wins:${scores.win},Losses:${scores.lose},Ties:${scores.tie}`;
        document.querySelector('.js-result').innerHTML=' ';
        document.querySelector('.js-move').innerHTML=' ';
        localStorage.removeItem('scores');
    }
    document.body.addEventListener('keydown',(event)=>{
        if(event.key=='r'){
            playit('Rock');
        }
        else if(event.key=='p'){
            playit('Paper');
        }
        else if(event.key=='s'){
            playit('Scissors')
        }
    })
    document.querySelector('.js-auto').addEventListener('click',()=>{
        autoplay();
    })
    document.querySelector('.js-reset').addEventListener('click',()=>{
            document.querySelector('.js-notice').innerHTML=
            `<div style="display:inline-block;">Are you sure you want to rest the score?</div>
            <button class="button-yes">YES</button>
            <button class="button-no">NO</button>`;
            document.querySelector('.button-yes').addEventListener('click',()=>{
                reset();
                document.querySelector('.js-notice').innerHTML='';
                console.log('yes');
            })

            document.querySelector('.button-no').addEventListener('click',()=>{            
                document.querySelector('.js-notice').innerHTML='';
                console.log('yes');
            })
    })
    
