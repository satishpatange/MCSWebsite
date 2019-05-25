$(function () {

    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator

    $('#pilot_form').validator();

    $(function () {
        $("#btnSubmit").click(function () {
           // alert(" aj get call cname="+$("#company-name").val());
            var loading_image = $('#pr-loading');
            loading_image.show();

            $.ajax({
                url: "pilot-run.php",
                type: "POST",
                data: function () {
                    var data = new FormData();
                    data.append("name", $("#pr-name").val());
                    data.append("company-name", $("#company-name").val());
                    data.append("phone", $("#pr-phone").val());
                    data.append("email", $("#pr-email").val());
                    data.append("services", $("#form-services").val());
                    data.append("domains", $("#form-domains").val());
                    data.append("message", $("#pr-message").val());
                    data.append("file", $("#chooseFile").get(0).files[0]);
                    return data;
                }(),
                contentType: false,
                processData: false,
                success: function (data) {    
                    //alert(data);
                    // data = JSON object that contact.php returns

                    // we recieve the type of the message: success x danger and apply it to the 
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    
                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        $('#pilot_form').find('.messages').html(alertBox);
                        // empty the form
                        $('#pilot_form')[0].reset();
                    }
                    $('#pilot_form')[0].reset();
                    loading_image.hide();
                },
                error: function (jqXHR, textStatus, errorMessage) {
                    console.log(errorMessage);
                  //  var messageAlert = 'alert-' + errorMessage.type;
                    var messageText = errorMessage;
                    
                
                   loading_image.hide();

                }
            });
        });
    });
    // when the form is submitted
   /* $('#pilot_form').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var loading_image = $('#loading');
            var url = "pilot-run.php";
            loading_image.show();
            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    // data = JSON object that contact.php returns

                    // we recieve the type of the message: success x danger and apply it to the 
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    
                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        $('#pilot_form').find('.messages').html(alertBox);
                        // empty the form
                        $('#pilot_form')[0].reset();
                    }
                },
                complete: function(data){
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;
                    
                
                   loading_image.hide();
                }
            });
            return false;
        }
    })*/
});