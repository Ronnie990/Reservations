
$(document).ready(function(){
	$("form").submit(function(e){
        e.preventDefault();
    });
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
	 $('select').material_select();
	 
	
  });
  window.onload = function() {
 
	$(".drag-target").addClass('hide');
	
}
    $(".button-collapse").sideNav();
		$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });

    $(document).ready(function(){
      $('.slider').slider({full_width: true});
    });

	$(document).on('click',".barra",function (){
		var lcarga2=$(this).attr("type");
		$($(this).attr("str")).removeClass('hide').siblings().addClass('hide');
		$("#slide-out").sideNav('hide');
		//$(".drag-target").removeClass('hide');
	});
	
	//login
	$(document).on('click',"#login",function (){
	direcion=$(this).attr("href")
	if($('#login_e').hasClass("valid")){
		var login_e=$('#login_e').val();
		var login_p=$('#login_p').val();
		$.ajax({
					type: 'POST',
					url: 'http://148.0.33.109:5123/reservaciones/consultas.php',
					data: 'tipo=login&email='+login_e+"&paswd="+login_p,
					success: 
					function guepa(result){
						if(result==0){
							alert("error");
						}else{
							info=result.split("*");
							$("#nombre_user").append(info[1]);
							cambio(direcion);
							cargar("events",info[0]);
						}
					}
		});
		}else{
			$('#login_e').addClass("invalid");
		}
	});
	//registro
	$(document).on('click',"#registro_p",function (){
	var x=1;
	$('#form_resgistre').find(':input.validate').each(function(){
	if($(this).hasClass("valid")){}else{$(this).addClass("invalid");x=0;}
	});
	if(x==1){
		$.ajax({
					type: 'POST',
					url: 'http://148.0.33.109:5123/reservaciones/updates.php',
					data: $('#form_resgistre').serialize()+'&tipo=registro',
					success: 
					function guepa(result){
						if(result==0){
							alert("error");
						}else{
							cambio('#login_page');
						}
					}
		});
	}
	
	
	});
	
	
	$(document).on("click",".cambio",function(){
		cambio($(this).attr("href"));
	});
	function cambio(direcion){
	$(".page").addClass('hide');
	$(direcion).removeClass('hide');
	if(direcion=="#page_content"){
	$(".drag-target").removeClass('hide');	
	}
	};

//cargar contenido
	function cargar(lcarga,id){
			$.ajax({
					type: 'POST',
					url: 'http://148.0.33.109:5123/reservaciones/consultas.php',
					data: 'tipo='+lcarga+'&id='+id,
					success: 
					function guepa(result){
						$('#'+lcarga+'_cards').html(result);
						$('.modal-trigger').leanModal();
						$('select').material_select();
						
					}
				});}
//reserva

$(document).on('click',".reserva",function (){
		data=$(this).attr("info");
			$.ajax({
					type: 'POST',
					url: 'http://148.0.33.109:5123/reservaciones/updates.php',
					data: 'tipo=reserva&info='+data,
					success: 
					function guepa(result){
							if(result){
							cargar("reserva",result);
							$('.collapsible').collapsible({accordion : false});
							}
					}
				});
	


});
$(document).on('click',".confirm",function (){
		var close=$(this).attr("str");
		$(close).trigger("click");

});