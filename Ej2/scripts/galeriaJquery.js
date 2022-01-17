$(document).ready(function(){//todo lo que debe esperar a que se cargue la pagina se mete en esta función
    let contador = 0;
    
    $("#insert").click(function(){
        let num = event.timeStamp;
        contador = contador+1;
        if(contador==1){
            $("table").append("<tr>");
        }
        
        $("tr").append("<td><img src='https://loremflickr.com/200/200/acnh?+"+num+"'></td>");
        
        if (contador==7){    
            $("table").append("</tr>");
            $("table").append("<tr>");
            $("tr").append("<td><img src='https://loremflickr.com/200/200/acnh?+"+num+"'></td>");
            contador=1;
        }
    });
});
    