
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
					url: 'http://reservationappgo.hopto.org:5123/reservaciones/consultas.php',
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
							cargar("reserva",info[0]);
							$("#reload").attr("info",info[0])
						}
					}
		});
		}else{
			$('#login_e').addClass("invalid");
		}
	});
	//Reload
	$(document).on("click",".reload",function(){ cargar("events",$(this).attr("info"));cargar("reserva",$(this).attr("info"));});
	//registro
	$(document).on('click',"#registro_p",function (){
	var x=1;
	$('#form_resgistre').find(':input.validate').each(function(){
	if($(this).hasClass("valid")){}else{$(this).addClass("invalid");x=0;}
	});
	if(x==1){
		$.ajax({
					type: 'POST',
					url: 'http://reservationappgo.hopto.org:5123/reservaciones/updates.php',
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
					url: 'http://reservationappgo.hopto.org:5123/reservaciones/consultas.php',
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
		$("#modal_content_reserva").html('<div class="preloader-wrapper  big active">
		<div class="spinner-layer spinner-blue-only">
		<div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>');
		var info=$($(this).attr("target")).val()+","+$($(this).attr("target")).attr("info");
			$.ajax({
					type: 'POST',
					url: 'http://reservationappgo.hopto.org:5123/reservaciones/updates.php',
					data: 'tipo=reserva&info='+info,
					dataType: 'json',
					success: 
					function guepa(result){
							if(parseInt(result['user'])){
							$("#modal_content_reserva").html(result['mensaje']);
							cargar("reserva",result['user']);
							$('.collapsible').collapsible({accordion : false});
							}
					}
				});
	


});
$(document).on('click',".confirm",function (){
		var close=$(this).attr("str");
		$(close).trigger("click");
});
$(document).on("click",".cancelar",function(){
	var data=$(this).attr("cancel");
	$.ajax({
					type: 'POST',
					url: 'http://reservationappgo.hopto.org:5123/reservaciones/updates.php',
					data: 'tipo=cancelar&info='+data,
					success: 
					function guepa(result){
							if(parseInt(result)){
							cargar("reserva",result);
							$('.collapsible').collapsible({accordion : false});
							}
					}
				});
	
});
$(document).on("change",".type", function(){
	$($(this).attr("target")).removeClass("hide");
});
