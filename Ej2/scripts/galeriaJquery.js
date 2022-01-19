$(document).ready(function(){//todo lo que debe esperar a que se cargue la pagina se mete en esta función
    let identificador=0;
    $("#insert").click(function(event){
        let num = event.timeStamp;//se crea el timestamp para que vaya cambiando la imagen

        let td = $("<td id="+identificador+"><img src='https://loremflickr.com/200/200/acnh?+"+num+"'></td>");
        td.css("display","none");
        let numfilas = $("table tr").length;//número de filas de la tabla
        
        if (numfilas==0||identificador%7==0){   //si tiene cero filas o si el id del td es multiplo de 7 se crea una fila nueva
            $("table").append("<tr></tr>");
        }
        identificador++;
        $("table tr").last().append(td);//se añade el td al ultimo tr que tenga la tabla
        $(td).fadeIn(2000);//se añade el efecto que automaticamente cambia el display a visible
    });
    $("#remove").click(function(event){
        $("table tr td").last().fadeOut(2000,function(){
            $("table tr td").last().remove();
        }); 
        
        if ($("table tr").last().children() == 0){
            $("table tr").last().remove();
        }
        identificador--;
    });
});
    