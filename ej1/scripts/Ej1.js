$(document).ready(function(){
    $("li").mouseover(function(){
        $(this).animate({marginLeft:'10px'},"slow");
        // $(this).css();
        $(this).css("color","white");
    });
    $("li").mouseout(function(){
        $(this).animate({marginLeft:'0'},"slow");
        $(this).css("color","black");
    });
});