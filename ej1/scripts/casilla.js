
window.addEventListener("DOMContentLoaded", function () {//todo lo que debe esperar a que se cargue la pagina se mete en esta función
    //Entorno:
    let jugando = true;
    
    let template=null;//aqui va la tematica escogida con los avatares 
    let turno = 1;
    const marcador = {//se llamaba ranking pero le he cambiado el nombre a marcador porque el ranking es el numero de partidas ganadas por un jugador, marcador es de la serie de partidas actual
        partidasJ1: 0,
        partidasJ2: 0,
        partidasEmpate:0    
    }

    const jugador1 = {
        nombre: '',
        marcador:0
        //avatar: '' el avatar se coge del template, 
    }

    const jugador2 = {
        nombre: '',
        marcador:0
        //avatar: ''
    }

    const templates = {
        
        clasico: {
            avatar1: './img/circulo.gif',
            avatar2: './img/equis.gif',
            //background: 'clasico'
            class: 'clasico'
        },
        matrix: {
            avatar1: './img/neo.png',
            avatar2: './img/trinity.png',
            //background: 'red'
            class: 'matrix'
        },
        derbi:{
            avatar1: './img/sevilla.png',
            avatar2: './img/betis.png',
            class: 'derbi'
        }
    }

    //Ranking
    //set key localstorage
    //se pregunta si existe de antes el objeto ranking y si no existe se crea vacio
    const ranking = localStorage.getItem('ranking');
    
    if (!ranking){
        localStorage.setItem('ranking', '{}');
    }

    //Funcion comprobación

    //con el evento change muestro el avatar cogido en el select
    const selectElement = document.querySelector('#selectAvatar1');
    selectElement.addEventListener('change', (event) => {
        //const jugador = document.querySelector('#jugador1');
        //jugador.innerHTML = '<img src="'+`${event.target.value}`+'" height="80">';//${} string template no se necesita usar el + para concatenar

        const selectedTemplate = event.target.value; //value seleccionado por el usuario cuando cambia la opción del select, si el selectedTemplate es vacio da error
        const jugadorDiv1 = document.querySelector('#j1Imagen');
        const jugadorDiv2 = document.querySelector('#j2Imagen');
        //si no se selecciona ningun template se deja todo sin imagenes y sin color de fondo
        if(selectedTemplate==''){
            jugadorDiv1.innerHTML='';
            jugadorDiv2.innerHTML='';
            document.querySelector('body').className = '';
            template=null;
        }else{
            const templateInfo = templates[selectedTemplate];//no se usa la notación del punto porque es dinámico y no se sabe cual es la temática que se va a escoger
            //actualiza info de jugadores
            //jugador1.avatar = templateInfo.avatar1;
            //jugador2.avatar = templateInfo.avatar2;
            template=templateInfo;
            //Actualizar imagen que se muestra en la configuracion
        
            jugadorDiv1.innerHTML = `<img src="${template.avatar1}" height="80">`;

            jugadorDiv2.innerHTML = `<img src="${template.avatar2}" height="80">`;

            //actualizar el background
            //document.querySelector('body').style.backgroundColor = templateInfo.background;
            document.querySelector('body').className = templateInfo.class;
        }
    });
    
    document.querySelector('#iniciarPartido').addEventListener('click', function() {
        document.getElementById('errores').innerHTML='';
        //validar que se haya seleccionado un template
        let hayErrores=false;
        if(!template){
            hayErrores=true;
            document.getElementById('errores').innerHTML+='No se puede iniciar la partida si no se ha seleccionado una temática<br/>';
        }
        //validar que los nombres se hayan colocado
        let regex = /^[\da-zA-Z]+$/;//alfanumérico
        let nomJ1 = document.querySelector('#j1').value;
        let nomJ2 = document.querySelector('#j2').value;
        if(!regex.test(nomJ1)){
            hayErrores=true;
            document.getElementById('errores').innerHTML+='No se puede iniciar el juego sin haber establecido un nombre correcto de entre 3 y 16 caracteres para jugador 1<br/>';
        }
        if(!regex.test(nomJ2)){
            hayErrores=true;
            document.getElementById('errores').innerHTML+='No se puede iniciar el juego sin haber establecido un nombre correcto de entre 3 y 16 caracteres para jugador 2<br/>';
        }
        

        if (!hayErrores){
            //se debe asignar los nombres a los jugadores
            jugador1.nombre=document.getElementById('j1').value;
            jugador2.nombre=document.getElementById('j2').value;

            //desaparecer la seccion de configuracion
                document.querySelector('#seccionConfiguracion').style.display='none';
            // aparecer el tablero y asignar el turno inicial
            document.querySelector('.tablero').style.display='inline-block';
        } 
        
        /*
        Cuando un jugador hace click en una casilla
        1) valido si no se ha jugado ya
        
        2) Cambio el fondo de la casilla por el avatar de ese jugador y cambio de turno
        */
        let arrayCasillas = document.querySelectorAll('.casilla'); 
        for(let i=0;i<arrayCasillas.length;i++){
            arrayCasillas[i].addEventListener('click',function(event){

                let ganador = comprobacion();
                if (ganador!=null){
                    return;//con este return ya no se ejecuta lo que esta debajo, el juego se ha terminado
                }
                

                //miro si la casilla esta blanca, es decir si no se ha jugado
                if(esCasillaVacia(event.target.id)){
                    let rutaImagen=null;
                    if(turno==1){
                        rutaImagen="url("+template.avatar1+")";
                        turno=2;
                    }else{
                        rutaImagen="url("+template.avatar2+")";
                        turno=1;
                    }
                    event.target.style.backgroundImage=rutaImagen;
                }
                
                //comprobacion();

                //TERMINAR EL JUEGO
                ganador = comprobacion();
                //5) Si ha ganado o empatado, finalizo juego
                if(ganador==1||ganador==2||ganador==0){
                //¿como finalizo el juego?
                    if(ganador==0){
                        document.getElementById('aviso').innerHTML='Es un empate';
                        marcador.partidasJ1=marcador.partidasJ1+1;
                        marcador.partidasJ2=marcador.partidasJ2+1;
                    }else{
                        let nombreGanador, nombrePerdedor;
                        if(ganador==1){
                            nombreGanador=jugador1.nombre;
                            nombrePerdedor=jugador2.nombre;
                        }else{
                            nombreGanador=jugador2.nombre;
                            nombrePerdedor=jugador1.nombre;
                        }
                        rankingInfo = JSON.parse(localStorage.getItem('ranking'));//se obtiene del localstorage la cadena guardada como ranking y se convierte como objeto JavaScript
                        if(!(nombreGanador  in rankingInfo)){
                            rankingInfo[nombreGanador]={ganadas:1,perdidas:0}
                        }else{//si existe
                            rankingInfo[nombreGanador].ganadas=rankingInfo[nombreGanador].ganadas+1;
                        }
                        if(!(nombrePerdedor in rankingInfo)){
                            rankingInfo[nombrePerdedor]={ganadas:0,perdidas:1}
                        }else{//si existe
                            rankingInfo[nombrePerdedor].ganadas=rankingInfo[nombrePerdedor].perdidas+1;
                        }
                        //ahora se modifica el ranking existente con la informacion nueva
                        localStorage.setItem('ranking',JSON.stringify(rankingInfo));

                        document.getElementById('aviso').innerHTML='El ganador es el jugador '+ganador;
                    }
                }
            })
        }
        
        function esCasillaVacia(idCasilla){
            return document.getElementById(idCasilla).style.backgroundImage=='url("./img/blanco.gif")'|| document.getElementById(idCasilla).style.backgroundImage=='';
        }

        //3) compruebo si ya se ha ganado o no, la funcion devuelve 1 si ha ganado el jug1, 2 si haganado el jg2, 0 si es un empate y null si se puede seguir jugando
        function comprobacion (){
            let ganador=null;
            let imagenGanadora=null;
            //aunque las no jugadas tienen una imagen blanca de fondo, esta imagen viene de una regla css por que no es accesible haciendo .style.backgroundImage. Las no jugadas devuelven vacio por no tener inline styles

            

            //En este bloque de 8 if compruebo si las imagenes o el avatar de una serie de casillas son iguales, en caso que lo sean se identifica como la imagen ganadora y el jugador asociado a esa imagen es el ganador
            if(!esCasillaVacia('c1')&&document.getElementById('c1').style.backgroundImage==document.getElementById('c2').style.backgroundImage && document.getElementById('c2').style.backgroundImage==document.getElementById('c3').style.backgroundImage){
                imagenGanadora=document.getElementById('c1').style.backgroundImage;
                //se elimina el url que rodea a la imagen de fondo ganadora
                imagenGanadora=imagenGanadora.substring(5,imagenGanadora.length-2);
            }
            if(!esCasillaVacia('c4')&&document.getElementById('c4').style.backgroundImage==document.getElementById('c5').style.backgroundImage && document.getElementById('c5').style.backgroundImage==document.getElementById('c6').style.backgroundImage){
                imagenGanadora=document.getElementById('c4').style.backgroundImage;
                //se elimina el url que rodea a la imagen de fondo ganadora
                imagenGanadora=imagenGanadora.substring(5,imagenGanadora.length-2);
            }
            if(!esCasillaVacia('c7')&&document.getElementById('c7').style.backgroundImage==document.getElementById('c8').style.backgroundImage && document.getElementById('c8').style.backgroundImage==document.getElementById('c9').style.backgroundImage){
                imagenGanadora=document.getElementById('c7').style.backgroundImage;
                //se elimina el url que rodea a la imagen de fondo ganadora
                imagenGanadora=imagenGanadora.substring(5,imagenGanadora.length-2);
            }
            if(!esCasillaVacia('c1')&&document.getElementById('c1').style.backgroundImage==document.getElementById('c4').style.backgroundImage && document.getElementById('c4').style.backgroundImage==document.getElementById('c7').style.backgroundImage){
                imagenGanadora=document.getElementById('c1').style.backgroundImage;
                //se elimina el url que rodea a la imagen de fondo ganadora
                imagenGanadora=imagenGanadora.substring(5,imagenGanadora.length-2);
            }
            if(!esCasillaVacia('c2')&&document.getElementById('c2').style.backgroundImage==document.getElementById('c5').style.backgroundImage && document.getElementById('c5').style.backgroundImage==document.getElementById('c8').style.backgroundImage){
                imagenGanadora=document.getElementById('c2').style.backgroundImage;
                //se elimina el url que rodea a la imagen de fondo ganadora
                imagenGanadora=imagenGanadora.substring(5,imagenGanadora.length-2);
            }
            if(!esCasillaVacia('c3')&&document.getElementById('c3').style.backgroundImage==document.getElementById('c6').style.backgroundImage && document.getElementById('c6').style.backgroundImage==document.getElementById('c9').style.backgroundImage){
                imagenGanadora=document.getElementById('c3').style.backgroundImage;
                //se elimina el url que rodea a la imagen de fondo ganadora
                imagenGanadora=imagenGanadora.substring(5,imagenGanadora.length-2);
            }
            if(!esCasillaVacia('c1')&&document.getElementById('c1').style.backgroundImage==document.getElementById('c5').style.backgroundImage && document.getElementById('c5').style.backgroundImage==document.getElementById('c9').style.backgroundImage){
                imagenGanadora=document.getElementById('c1').style.backgroundImage;
                //se elimina el url que rodea a la imagen de fondo ganadora
                imagenGanadora=imagenGanadora.substring(5,imagenGanadora.length-2);
            }
            if(!esCasillaVacia('c3')&&document.getElementById('c3').style.backgroundImage==document.getElementById('c5').style.backgroundImage && document.getElementById('c5').style.backgroundImage==document.getElementById('c7').style.backgroundImage){
                imagenGanadora=document.getElementById('c3').style.backgroundImage;
                //se elimina el url que rodea a la imagen de fondo ganadora
                imagenGanadora=imagenGanadora.substring(5,imagenGanadora.length-2);
            }

            //basado en la imagen ganadora, se determina quien ha ganado
            if(imagenGanadora!=null){//SI NO HAY IMAGEN GANADORA, NO HA GANADO NADIE
                console.log('ig='+imagenGanadora);
                console.log('av1='+template.avatar1);
                if(template.avatar1==imagenGanadora){
                    ganador=1;
                    jugador1.marcador=jugador1.marcador+1;
                    marcador.partidasJ1=marcador.partidasJ1+1;
                    //Mostrar opcion de revancha o inicio 
                    document.querySelector('.finalizar').style.display='block';
                    //actualizar marcador
                    document.getElementById('marcador').innerHTML='Marcador:<br/>'+jugador1.nombre+"="+jugador1.marcador+'  |  '+jugador2.nombre+"="+jugador2.marcador;
                }else{
                    ganador=2;
                    jugador2.marcador=jugador2.marcador+1;
                    marcador.partidasJ2=marcador.partidasJ2+1;
                    //Mostrar opcion de revancha o inicio
                    document.querySelector('.finalizar').style.display='block';
                    //actualizar marcador
                    document.getElementById('marcador').innerHTML='Marcador:<br/>'+jugador1.nombre+"="+jugador1.marcador+'  |  '+jugador2.nombre+"="+jugador2.marcador;
                
                }
            }
            
            let todasLasCasillas=document.querySelectorAll('.casilla');
            let hayBlancas=false;
            for(let i=0;i<todasLasCasillas.length;i++){
                if(esCasillaVacia(todasLasCasillas[i].id)){//se cambia la condicion por la funcion 
                    hayBlancas=true;
                    break;//paro cuando hay una blanca y salgo
                }  
            }
            
            //un empate es cuando estan todas las casillas llenas y no hay ganador 
            if (imagenGanadora==null && !hayBlancas){
                ganador=0;
                //Mostrar opcion de revancha o inicio 
                document.querySelector('.finalizar').style.display='block';
            }
            console.log('ganador= '+ganador);
            return ganador;
        }
        
        function reiniciarPartida (){
            //1) limpiar casillas
            //document.querySelectorAll('.casilla').style.backgroundImage='';
            let todasLasCasillas = document.querySelectorAll('.casilla');
            for(let i=0;i<todasLasCasillas.length;i++){
                todasLasCasillas[i].style.backgroundImage='url("./img/blanco.gif")';
            }
            // 2) reiniciar turno
            turno=1;
            document.getElementById('aviso').innerHTML='';
        }

        document.getElementById('reiniciar').addEventListener('click',function(event){
            reiniciarPartida();
            document.querySelector('.finalizar').style.display='none';
            ganador=null;
        })
    });

    function volver (){
        location.reload();
    }
    document.getElementById('volver').addEventListener('click',function(){
        volver();
    })
    
    //MOSTRAR RANKING falta ordenar, muestra una lista pero
    document.getElementById('verRanking').addEventListener('click',function(){
        let cadena='<ol>';
        rankingInfo = JSON.parse(localStorage.getItem('ranking'));
        
            for(let nombreJugador in rankingInfo){//para iterar en el objeto
                cadena+='<li>'+nombreJugador+': '+rankingInfo[nombreJugador].ganadas+' ganadas, '+rankingInfo[nombreJugador].perdidas+' perdidas</li>';
            }
            cadena+='</ol>'
        document.getElementById('ranking').innerHTML= cadena;
    });
    
});


// https://ibb.co/QvP3k9c
//https://ibb.co/nnLrvCJ