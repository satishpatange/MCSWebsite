$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 50) {
        $(".navbar-dark, .navbar-dark .dropdown-menu").addClass("darkHeader");
    } else {
        $(".navbar-dark, .navbar-dark .dropdown-menu").removeClass("darkHeader");
    }
});

$(document).ready(function() {
$(".contact-us").click(function(){
	$(".right-contact-panel").addClass("right-0");					 
});
$(".contact-us-close").click(function(){
	$(".right-contact-panel").removeClass("right-0");					 
});


//document upload js start
$('#chooseFile').bind('change', function () {
	  var filename = $("#chooseFile").val();
	  if (/^\s*$/.test(filename)) {
		$(".common-file-upload .file-upload").removeClass('active');
		$("#noFile").text("No file chosen..."); 
	  }
	  else {
		$(".common-file-upload .file-upload").addClass('active');
		$("#noFile").text(filename.replace("C:\\fakepath\\", "")); 
	  }
	});
$('input[name=file-type]').click(function () {
		if (this.id == "other-field-1") {
			$(".other-input-1").show();
		} else {
			$(".other-input-1").hide();
		}
	});
$('input[name=file-del]').click(function () {
		if (this.id == "other-field-2") {
			$(".other-input-2").show();
		} else {
			$(".other-input-2").hide();
		}
	});
$('input[name=line-text]').click(function () {
		if (this.id == "line-text-1") {
			$(".line-text-input-1").removeClass('disable-div');
			$(".line-text-input-2").addClass('disable-div');
		} else if (this.id == "line-text-2"){
			$(".line-text-input-2").removeClass('disable-div');
			$(".line-text-input-1").addClass('disable-div');
		}
	});	
//document upload js end
});

/**** Navigation ****/

$(document).ready(function(){
	$(".dropdown").hover(function(){
		var dropdownMenu = $(this).children(".dropdown-menu");
		if(dropdownMenu.is(":visible")){
			dropdownMenu.parent().toggleClass("open");
		}
	});
});	

$(document).ready(function () {

  $('.hamburger-button').on('click', function () {

    $('.hamburger-icon').toggleClass('open');
  });
});
/**** Navigation ****/

/***** Contact Us form *****/

$(function()
{
    function after_form_submitted(data) 
    {
        if(data.result == 'success')
        {
            $('form#contact_form_popup').hide();
            $('form#pilot_form_popup').hide();
            $('#success_message').show();
            $('#error_message').hide();
        }
        else
        {
            $('#error_message').append('<ul></ul>');

            jQuery.each(data.errors,function(key,val)
            {
                $('#error_message ul').append('<li>'+key+':'+val+'</li>');
            });
            $('#success_message').hide();
            $('#error_message').show();

            //reverse the response on the button
            $('button[type="button"]', $form).each(function()
            {
                $btn = $(this);
                label = $btn.prop('orig_label');
                if(label)
                {
                    $btn.prop('type','submit' ); 
                    $btn.text(label);
                    $btn.prop('orig_label','');
                }
            });
            
        }//else
    }

	$('#contact_form_popup, #pilot_form_popup').submit(function(e)
      {
        e.preventDefault();
        var url = "../contactMail.php";

        $form = $(this);
        //show some response on the button
        $('button[type="submit"]', $form).each(function()
        {
            $btn = $(this);
            $btn.prop('type','button' ); 
            $btn.prop('orig_label',$btn.text());
            $btn.text('Sending ...');
        });
        

                    $.ajax({
                type: "POST",
                url: url,
                data: $form.serialize(),
                success: after_form_submitted,
                dataType: 'json' 
            });        
        
      });	
});


$(function () {
  $('#contact-form').on('submit', function (e) {
   if (!e.isDefaultPrevented()) {
    var url = "../contact.php";

    $.ajax({
     type: "POST",
     url: url,
     data: $(this).serialize(),
     success: function (data) {
      var messageAlert = 'alert-' + data.type;
      var messageText = data.message;
      var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
      if (messageAlert && messageText) {
       $('#contact-form').find('.messages').html(alertBox);
       $('#contact-form')[0].reset();
      }
     }
    });
    return false;

   }
  })
});

/***** Contact us form *****/

/*==== Accordion =====*/

$(document).ready(function() {
  $('.collapse.in').prev('.panel-heading').addClass('active');
  $('#accordion, #bs-collapse')
    .on('show.bs.collapse', function(a) {
      $(a.target).prev('.panel-heading').addClass('active');
    })
    .on('hide.bs.collapse', function(a) {
      $(a.target).prev('.panel-heading').removeClass('active');
    });
});

/*==== Accordion =====*/