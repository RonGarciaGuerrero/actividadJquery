$(document).ready(function(){//todo lo que debe esperar a que se cargue la pagina se mete en esta función
    let contador = 0;
    let identificador=0;
    $("#insert").click(function(){
        let num = event.timeStamp;
        
        contador = contador+1;
        
        if(contador==1){
            $("table").append("<tr id=id"+identificador+">");
        }
        
        $("#id"+identificador).append("<td><img src='https://loremflickr.com/200/200/acnh?+"+num+"'></td>").css('display','none');
        $("#id"+identificador).fadeIn(2000);
        if (contador==7){    
            
            $("table").append("</tr>");
            identificador++;
            $("#id"+identificador).append("<td><img src='https://loremflickr.com/200/200/acnh?+"+num+"'></td>").css('display','none');
            $("#id"+identificador).fadeIn(2000);
            contador=0;
            
        }
    });
});
    