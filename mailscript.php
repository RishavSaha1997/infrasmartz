<?php

require("vendor/mail/class.phpmailer.php");

$mail = new PHPMailer();
$mail->isSMTP();
$mail->Host = 'smtp.mailtrap.io';
$mail->SMTPAuth = true;
$mail->Port = 2525;
$mail->Username = 'aff92dc15ddfb2';
$mail->Password = '8f435e172ef3bc';

// $mail = new PHPMailer();
// $mail->IsSMTP();
// $mail->Mailer = "smtp";
// $mail->SMTPDebug  = 1;
// $mail->SMTPAuth   = true;
// $mail->SMTPSecure = "tls";
// $mail->Port       = 587;
// $mail->Host       = "smtp.gmail.com";
// $mail->Username = "checkermail102@gmail.com";
// $mail->Password = "P@55w0rd123";

$mail->AddAddress("alok.deka@ekodus.com");
$mail->SetFrom("checkermail102@gmail.com", "INFRASMARTZ");
$mail->AddReplyTo($_POST["email"], $_POST["name"]);

$mail->IsHTML(true);
$MESSAGE_BODY = "Name: " . check_input($_POST["name"]) . "<br/>";
$MESSAGE_BODY .= "Email: " . check_input($_POST["email"]) . "<br/>";
$MESSAGE_BODY .= "Phone: " . check_input($_POST["phone"]) . "<br/>";
$MESSAGE_BODY .= "Subject: " . check_input($_POST["subject"]) . "<br/>";
$MESSAGE_BODY .= "Message: " . check_input($_POST["message"]) . "<br/>";

$mail->Subject = "Contact";
$mail->Body = $MESSAGE_BODY;

if (!$mail->Send()) {
   $return['msgType'] = false;
   $return['msg'] = $mail->ErrorInfo;
   $return['icon'] = "error";
   $return['title'] = "Oops...";
   echo json_encode($return);
} else {
   $return['msgType'] = true;
   $return['msg'] = "Message has been sent";
   $return['icon'] = "success";
   $return['title'] = "Done";
   echo json_encode($return);
}

function check_input($data)
{
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}
