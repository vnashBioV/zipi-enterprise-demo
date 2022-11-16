<?php
    if (isset($_SERVER["HTTP_ORIGIN"]) === true) {
      $origin = $_SERVER["HTTP_ORIGIN"];
      $allowed_origins = array(
        "http://localhost",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3004",
        "127.0.0.1",
        "::1",
        "http://www.enterprise.zipi.co.za",
        "http://enterprise.zipi.co.za",
        "https://www.enterprise.zipi.co.za",
        "https://enterprise.zipi.co.za",
        "http://www.zipi.co.za",
        "http://zipi.co.za",
        "https://www.zipi.co.za",
        "https://zipi.co.za",
        "http://complaints.zipi.co.za",
        "http://www.complaints.zipi.co.za",
        "https://complaints.zipi.co.za",
        "https://www.complaints.zipi.co.za",
        "http://www.developer.zipi.co.za",
        "htpp://developer.zipi.co.za",
        "https://www.developer.zipi.co.za",
        "https://developer.zipi.co.za"
      );
      if (in_array($origin, $allowed_origins, true) === true) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Credentials: true');
      }
      
      if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
        exit; // OPTIONS request wants only the policy, we can stop here
      }
    }
    header('Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS, PATCH, DELETE');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Authorization, Content-Type, x-xsrf-token, x_csrftoken, Cache-Control, X-Requested-With');
error_reporting(E_ALL);

$date = $_GET['date'];
$name = $_GET['name'];
$email = $_GET['email'];
$message = $_GET['message'];
$type = $_GET['type'];

$body = "
<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
  <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
  <meta name='viewport' content='width=device-width, initial-scale=1' />
  <title>Delivery Invoice</title>
</head>

<body>
        <h1>New request</h1>
        <p>$name is making a request</p>
        <p>Date: $date</p>
        <p>Message: $message</p>
</body>
</html>";

$subject = "Zipi Customer Request Alert";
$address = "nelo@landsea-shipping.co.za";
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: Zipi <noreply@zipi.co.za>' . "\r\n";

$headers .= 'Bcc: tech@landsea-shipping.co.za' . "\r\n";
$headers .= 'Bcc: kelan@landsea-shipping.co.za' . "\r\n";
$headers .= 'Bcc: tshilidzi@landsea-shipping.co.za' . "\r\n";

mail($email, $subject, $body, $headers, "-fnoreply@zipi.co.za");