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