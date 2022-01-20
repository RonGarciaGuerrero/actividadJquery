$(document).ready(function(){
    let contador = 0;
    $("#homer").click(function(event){
        contador++;
        if(contador%2!=0){//cada clic incrementa contador el primero es impar y el segundo impar
            $("#homerp").fadeIn(2000);
        }else{
            $("#homerp").slideUp(2000);
        }
        
    });
    $("#marge").click(function(event){
        contador++;
        if(contador%2!=0){//cada clic incrementa contador el primero es impar y el segundo impar
            $("#margep").slideDown(2000);
        }else{
            $("#margep").fadeOut(2000);
        }
    });
    $("#marge").click(function(event){
        contador++;
        if(contador%2!=0){//cada clic incrementa contador el primero es impar y el segundo impar
            $("#margep").slideDown(2000);
        }else{
            $("#margep").fadeOut(2000);
        }
    });
    $("#bart").click(function(event){
        contador++;
        if(contador%2!=0){//cada clic incrementa contador el primero es impar y el segundo impar
            $("#bartp").show(1000);
        }else{
            $("#bartp").hide(2000);
        }
    });
    $("#lisa").click(function(event){
        contador++;
        if(contador%2!=0){//cada clic incrementa contador el primero es impar y el segundo impar
            $("#lisap").slideDown(2000).css("color", "red");
        }else{
            $("#lisap").slideUp(2000).css("color", "blue");
        }
    });
    $("#maggie").click(function(event){
        contador++;
        if(contador%2!=0){//cada clic incrementa contador el primero es impar y el segundo impar
            $("#maggiep").show(3000).animate({height: '150px', width:'300px',left: '150px'}, "slow").css({"background-color":"#D4D4D4"});
        }else{
            $("#maggiep").animate({height: '50px',width:'60%', left: '100px'}, "slow").fadeOut(2000);
        }
    });
});