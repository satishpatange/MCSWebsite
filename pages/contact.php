<?php
$from = '';
$sendTo = 'email@email.com';
$subject = 'New message from contact form';
$fields = array('name' => 'Name', 'email' => 'Email', 'phone' => 'Phone', 'message' => 'Message');

$okMessage = 'Thank you for your message. I will write back soon.';
$errorMessage = 'There is an error while sending message. Please try again later.';

try {if (!empty($_POST)) {
    $emailText = "You have a new message from your contact form\n=====\n";
    foreach ($_POST as $key => $value) {
       if (isset($fields[$key])) {
         $emailText .= "$fields[$key]: $value\n";
       }
    }
    $headers = array('Content-Type: text/plain; charset="UTF-8";',
     'From: ' . $from,
     'Reply-To: ' . $from,
     'Return-Path: ' . $from,
    );
    mail($sendTo, $subject, $emailText, implode("\n", $headers));
    $responseArray = array('type' => 'success', 'message' => $okMessage);
    }
}
catch (\Exception $e) {
  $responseArray = array('type' => 'danger', 'message' => $e->getMessage());
}
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
 $encoded = json_encode($responseArray);
 header('Content-Type: application/json');
 echo $encoded;
} else {
echo $responseArray['message'];
}
?>
