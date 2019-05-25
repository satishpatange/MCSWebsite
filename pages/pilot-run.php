<?php
//$data = json_decode(file_get_contents('php://input'), true);
//print_r($_FILES);
// message that will be displayed when everything is OK :)
$okMessage = 'Pilot run form successfully submitted. Thank you, I will get back to you soon!';

// If something goes wrong, we will display this message.
$errorMessage = 'There was an error while submitting Pilot run form. Please try again later';

  if(isset($_FILES['file'])){
    
        //The form has been submitted, prep a nice thank you message
        $output = '<h1>Thanks for your file and message!</h1>';
        //Set the form flag to no display (cheap way!)
        $flags = 'style="display:none;"';

        //Deal with the email
        $to = 'prash.893@gmail.com, satishpatange8749@gmail.com';
        $from=$_POST["email"];
        $subject = 'Pilot Run form';

        $emailText = "You have a new message from your Pilot Run form\n=============================\n";
        $fields = array('name' => 'Name', 'company-name' => 'Company Name', 'phone' => 'Phone', 'email' => 'Email', 'services' => 'Services', 'domains' => 'Domains', 'message' => 'Message'); 

        foreach ($_POST as $key => $value) {
            // If the field exists in the $fields array, include it in the email 
            if (isset($fields[$key])) {
                $emailText .= "$fields[$key]: $value\n";
            }
        }

        $attachment = chunk_split(base64_encode(file_get_contents($_FILES['file']['tmp_name'])));
        $filename = $_FILES['file']['name'];

        $boundary =md5(date('r', time())); 

        $headers = "From: $from";
        $headers .= "\r\nMIME-Version: 1.0\r\nContent-Type: multipart/mixed; boundary=\"_1_$boundary\"";

        $emailText="This is a multi-part message in MIME format.

--_1_$boundary
Content-Type: multipart/alternative; boundary=\"_2_$boundary\"

--_2_$boundary
Content-Type: text/plain; charset=\"iso-8859-1\"
Content-Transfer-Encoding: 7bit

$emailText

--_2_$boundary--
--_1_$boundary
Content-Type: application/octet-stream; name=\"$filename\" 
Content-Transfer-Encoding: base64 
Content-Disposition: attachment 

$attachment
--_1_$boundary--";

        if(mail($to, $subject, $emailText, $headers)){
             $responseArray = array('type' => 'success', 'message' => $okMessage);
            
        }else{
            $responseArray = array('type' => 'danger', 'message' => $errorMessage);
            
        }
            
    }else{
      $responseArray = array('type' => 'danger', 'message' => $errorMessage);
  }

// if requested by AJAX request return JSON response
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');

    echo $encoded;
}
// else just display the message
else {
    echo $responseArray['message'];
}

?>