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

//date("H:i d M Y", strtotime($unformatedDate));
$name = $_GET['name'];
$date = $_GET['date'];
$bookingref = $_GET['bookingref'];
$cargoquantity = $_GET['cargoquantity'];

$body = "

<!DOCTYPE html>
<html xmlns:v='urn:schemas-microsoft-com:vml' xmlns:o='urn:schemas-microsoft-com:office:office' lang='en'>
 
<head>
                <title></title>
                <meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
                <!--[if !mso]><!-->
                <link href='https://fonts.googleapis.com/css2?family=Inter&amp;family=Work+Sans:wght@700&amp;display=swap' rel='stylesheet' type='text/css'>
                <link href='https://fonts.googleapis.com/css2?family=Inter:wght@700&amp;family=Work+Sans:wght@700&amp;display=swap' rel='stylesheet' type='text/css'>
                <!--<![endif]-->
                <style>
                                * {
                                                box-sizing: border-box;
                                }
 
                                body {
                                                margin: 0;
                                                padding: 0;
                                }
 
                                a[x-apple-data-detectors] {
                                                color: inherit !important;
                                                text-decoration: inherit !important;
                                }
 
                                #MessageViewBody a {
                                                color: inherit;
                                                text-decoration: none;
                                }
 
                                p {
                                                line-height: inherit
                                }
 
                                .desktop_hide,
                                .desktop_hide table {
                                                mso-hide: all;
                                                display: none;
                                                max-height: 0px;
                                                overflow: hidden;
                                }
 
                                @media (max-width:720px) {
 
                                                .image_block img.big,
                                                .row-content {
                                                                width: 100% !important;
                                                }
 
                                                .mobile_hide {
                                                                display: none;
                                                }
 
                                                .stack .column {
                                                                width: 100%;
                                                                display: block;
                                                }
 
                                                .mobile_hide {
                                                                min-height: 0;
                                                                max-height: 0;
                                                                max-width: 0;
                                                                overflow: hidden;
                                                                font-size: 0px;
                                                }
 
                                                .desktop_hide,
                                                .desktop_hide table {
                                                                display: table !important;
                                                                max-height: none !important;
                                                }
                                }
                </style>
</head>
 
<body style='background-color: #f6f6f6; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;'>
                <table class='nl-container' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6;'>
                                <tbody>
                                                <tr>
                                                                <td>
                                                                                <table class='row row-1' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                <tbody>
                                                                                                                <tr>
                                                                                                                                <td>
                                                                                                                                                <table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #201f42; color: #000000; width: 700px;' width='700'>
                                                                                                                                                                <tbody>
                                                                                                                                                                                <tr>
                                                                                                                                                                                                <td class='column column-1' width='100%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                <div class='spacer_block' style='height:6px;line-height:6px;font-size:1px;'>&#8202;</div>
                                                                                                                                                                                                </td>
                                                                                                                                                                                </tr>
                                                                                                                                                                </tbody>
                                                                                                                                                </table>
                                                                                                                                </td>
                                                                                                                </tr>
                                                                                                </tbody>
                                                                                </table>
                                                                                <table class='row row-2' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                <tbody>
                                                                                                                <tr>
                                                                                                                                <td>
                                                                                                                                                <table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;' width='700'>
                                                                                                                                                                <tbody>
                                                                                                                                                                                <tr>
                                                                                                                                                                                                <td class='column column-1' width='33.333333333333336%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-left: 10px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
       <table class='image_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                                                                                                                                                <tr>
                                                                                                                                                                                                                                                <td style='padding-bottom:20px;padding-left:20px;padding-top:20px;width:100%;padding-right:0px;'>
                                                                                                                                                                                                                                                                <div style='line-height:10px'><img src='https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/823907_807865/Yello.png' style='display: block; height: auto; border: 0; width: 112px; max-width: 100%;' width='112'></div>
                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                </table>                                                                                                                                                                                                         
                                                                                                                                                                                                </td>
                                                                                                                                                                                                <td class='column column-2' width='16.666666666666668%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                <div class='spacer_block' style='height:0px;line-height:0px;font-size:1px;'>&#8202;</div>
                                                                                                                                                                                                                <div class='spacer_block mobile_hide' style='height:10px;line-height:10px;font-size:1px;'>&#8202;</div>
                                                                                                                                                                                                                <div class='spacer_block' style='height:0px;line-height:0px;font-size:1px;'>&#8202;</div>
                                                                                                                                                                                                </td>
                                                                                                                                                                                                <td class='column column-3' width='50%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                <div class='spacer_block' style='height:0px;line-height:0px;font-size:1px;'>&#8202;</div>
                                                                                                                                                                                                                <table class='paragraph_block mobile_hide' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;'>
                                                                                                                                                                                                                                <tr>
                                                                                                                                                                                                                                                <td style='padding-bottom:35px;padding-left:20px;padding-right:30px;padding-top:35px;'>
                                                                                                                                                                                                                                                                <div style='color:#201f42;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:right;mso-line-height-alt:16.8px;'>
                                                                                                                                                                                                                                                                                <p style='margin: 0;'>It's Just so Nippy!</p>
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                </table>
                                                                                                                                                                                                                <div class='spacer_block' style='height:0px;line-height:0px;font-size:1px;'>&#8202;</div>
                                                                                                                                                                                                </td>
                                                                                                                                                                                </tr>
                                                                                                                                                                </tbody>
                                                                                                                                                </table>
                                                                                                                                </td>
                                                                                                                </tr>
                                                                                                </tbody>
                                                                                </table>
                                                                                <table class='row row-3' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                <tbody>
                                                                                                                <tr>
                                                                                                                                <td>
                                                                                                                                                <table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8fbf7; color: #000000; width: 700px;' width='700'>
                                                                                                                                                                <tbody>
                                                                                                                                                                                <tr>
                                                                                                                                                                                                <td class='column column-1' width='58.333333333333336%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                <table class='heading_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                                                                                                                                                <tr>
                                                                                                                                                                                                                                                <td style='padding-bottom:10px;padding-left:30px;padding-right:20px;padding-top:115px;text-align:center;width:100%;'>
                                                                                                                                                                                                                                                                <h1 style='margin: 0; color: #01caa6; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 27px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;'><span class='tinyMce-placeholder'><span style='color: #000000;'>Hey, $name</span><br></span></h1>
                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                </table>
                                                                                                                                                                                                                <table class='paragraph_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;'>
                                                                                                                                                                                                                                <tr>
                                                                                                                                                                                                                                                <td style='padding-bottom:15px;padding-left:30px;padding-right:20px;padding-top:10px;'>
                                                                                                                                                                                                                                                                <div style='color:#201f42;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:24px;'>
                                                                                                                                                                                                                                                                                <p style='margin: 0;'>Thank you for your order, the below is a receipt for the services rendered.</p>
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                </table>
                                                                                                                                                                                                </td>
                                                                                                                                                                                                
                                                                                                                                                                                </tr>
                                                                                                                                                                </tbody>
                                                                                                                                                </table>
                                                                                                                                </td>
                                                                                                                </tr>
                                                                                                </tbody>
                                                                                </table>
                                                                                
                                                                                <table class='row row-5' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                <tbody>
                                                                                                                <tr>
                                                                                                                                <td>
                                                                                                                                                <table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;' width='700'>
                                                                                                                                                                <tbody>
                                                                                                                                                                                <tr>
                                                                                                                                                                                                <td class='column column-1' width='100%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 10px; padding-bottom: 10px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                </table>
                                                                                                                                                                                                </td>
                                                                                                                                                                                </tr>
                                                                                                                                                                </tbody>
                                                                                                                                                </table>
                                                                                                                                </td>
                                                                                                                </tr>
                                                                                                </tbody>
                                                                                </table>
                                                                                <table class='row row-6' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                <tbody>
                                                                                                                <tr>
                                                                                                                                <td>
                                                                                                                                                <table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;' width='700'>
                                                                                                                                                                <tbody>
                                                                                                                                                                                <tr>
                                                                                                                                                                                                <td class='column column-1' width='50%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                
                                                                                                                                                                                                </td>
                                                                                                                                                                                                <td class='column column-2' width='50%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                
                                                                                                                                                                                                </td>
                                                                                                                                                                                </tr>
                                                                                                                                                                </tbody>
                                                                                                                                                </table>
                                                                                                                                </td>
                                                                                                                </tr>
                                                                                                </tbody>
                                                                                </table>
                                                                                <table class='row row-7' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                <tbody>
                                                                                                                <tr>
                                                                                                                                <td>
                                                                                                                                                <table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;' width='700'>
                                                                                                                                                                <tbody>
                                                                                                                                                                                <tr>
                                                                                                                                                                                                <td class='column column-1' width='100%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 10px; padding-bottom: 10px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                </table>
                                                                                                                                                                                                </td>
                                                                                                                                                                                </tr>
                                                                                                                                                                </tbody>
                                                                                                                                                </table>
                                                                                                                                </td>
                                                                                                                </tr>
                                                                                                </tbody>
                                                                                </table>
                                                                                <table class='row row-8' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                <tbody>
                                                                                                                <tr>
                                                                                                                                <td>
                                                                                                                                                <table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;' width='700'>
                                                                                                                                                                <tbody>
                                                                                                                                                                                <tr>
                                                                                                                                                                                                <td class='column column-1' width='50%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                
                                                                                                                                                                                                </td>
                                                                                                                                                                                                <td class='column column-2' width='50%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                
                                                                                                                                                                                                </td>
                                                                                                                                                                                </tr>
                                                                                                                                                                </tbody>
                                                                                                                                                </table>
                                                                                                                                </td>
                                                                                                                </tr>
                                                                                                </tbody>
                                                                                </table>
                                                                                <table class='row row-9' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                <tbody>
                                                                                                                <tr>
                                                                                                                                <td>
                                                                                                                                                <table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;' width='700'>
                                                                                                                                                                <tbody>
                                                                                                                                                                                <tr>
                                                                                                                                                                                                <td class='column column-1' width='100%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 2px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                
                                                                                                                                                                                                                <table class='heading_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                                                                                                                                                <tr>
                                                                                                                                                                                                                                                <td style='padding-bottom:10px;padding-left:30px;padding-right:5px;padding-top:10px;text-align:center;width:100%;'>
                                                                                                                                                                                                                                                                <h2 style='margin: 0; color: #01caa6; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;'><span class='tinyMce-placeholder' style='color: #fb8500;'>Delivery Summary</span></h2>
                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                </table>
                                                                                                                                                                                                </td>
                                                                                                                                                                                </tr>
                                                                                                                                                                </tbody>
                                                                                                                                                </table>
                                                                                                                                </td>
                                                                                                                </tr>
                                                                                                </tbody>
                                                                                </table>
                                                                                <table class='row row-10' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                <tbody>
                                                                                                                <tr>
                                                                                                                                <td>
                                                                                                                                                <table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;' width='700'>
                                                                                                                                                                <tbody>
                                                                                                                                                                                <tr>
                                                                                                                                                                                                <td class='column column-1' width='50%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                <table class='heading_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                                                                                                                                                <tr>
                                                                                                                                                                                                                                                <td style='padding-left:30px;padding-right:5px;text-align:center;width:100%;'>
                                                                                                                                                                                                                                                                <h2 style='margin: 0; color: #201f42; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;'><span class='tinyMce-placeholder'>Trip Details</span></h2>
                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                </table>
                                                                                                                                                                                                                <table class='paragraph_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;'>
                                                                                                                                                                                                                                <tr>
                                                                                                                                                                                                                                                <td style='padding-bottom:10px;padding-left:30px;padding-right:30px;padding-top:10px;'>
                                                                                                                                                                                                                                                                <div style='color:#393d47;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;'>
                                                                                                                                                                                                                                                                                <p style='margin: 0; margin-bottom: 00px;'>Booking Reference <br>Date <br></p>
                                                                                                                                                                                                                                                                                <p style='margin: 0;'>Total Loads</p>
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                </table>
                                                                                                                                                                                                </td>
                                                                                                                                                                                                <td class='column column-2' width='50%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                <table class='heading_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                                                                                                                                                <tr>
                                                                                                                                                                                                                                                <td style='padding-left:30px;padding-right:5px;text-align:center;width:100%;'>
                                                                                                                                                                                                                                                                <h2 style='margin: 0; color: #ffffff; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;'><span class='tinyMce-placeholder'>.</span></h2>
                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                </table>
                                                                                                                                                                                                                <table class='paragraph_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;'>
                                                                                                                                                                                                                                <tr>
                                                                                                                                                                                                                                                <td style='padding-bottom:10px;padding-left:30px;padding-right:30px;padding-top:10px;'>
                                                                                                                                                                                                                                                                <div style='color:#393d47;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:700;letter-spacing:0px;line-height:120%;text-align:right;mso-line-height-alt:16.8px;'>
                                                                                                                                                                                                                                                                                <p style='margin: 0; margin-bottom: 0px;'>$bookingref <br>$date <br></p>
                                                                                                                                                                                                                                                                                <p style='margin: 0;'>$cargoquantity </p>
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                </table>
                                                                                                                                                                                                </td>
                                                                                                                                                                                </tr>
                                                                                                                                                                </tbody>
                                                                                                                                                </table>
                                                                                                                                </td>
                                                                                                                </tr>
                                                                                                </tbody>
                                                                                </table>
                                                                                <table class='row row-11' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                <tbody>
                                                                                                                <tr>
                                                                                                                                <td>
                                                                                                                                                <table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;' width='700'>
                                                                                                                                                                <tbody>
                                                                                                                                                                                <tr>
                                                                                                                                                                                                <td class='column column-1' width='50%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                
                                                                                                                                                                                                                
                                                                                                                                                                                                </td>
                                                                                                                                                                                                <td class='column column-2' width='50%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                <table class='heading_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                                                                                                                                                <tr>
                                                                                                                                                                                                                                                <td style='padding-left:30px;padding-right:5px;text-align:center;width:100%;'>
                                                                                                                                                                                                                                                                <h2 style='margin: 0; color: #ffffff; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;'><span class='tinyMce-placeholder'>.</span></h2>
                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                </table>
                                                                                                                                                                                                                
                                                                                                                                                                                                </td>
                                                                                                                                                                                </tr>
                                                                                                                                                                </tbody>
                                                                                                                                                </table>
                                                                                                                                </td>
                                                                                                                </tr>
                                                                                                </tbody>
                                                                                </table>
                                                                                <table class='row row-12' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                <tbody>
                                                                                                                <tr>
                                                                                                                                <td>
                                                                                                                                                <table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;' width='700'>
                                                                                                                                                                <tbody>
                                                                                                                                                                                <tr>
                                                                                                                                                                                                <td class='column column-1' width='100%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 2px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                </table>
                                                                                                                                                                                                                
                                                                                                                                                                                                                <div class='spacer_block desktop_hide' style='mso-hide: all; display: none; max-height: 0; overflow: hidden; height: 20px; line-height: 20px; font-size: 1px;'>&#8202;</div>
                                                                                                                                                                                                                <div class='spacer_block' style='height:5px;line-height:5px;font-size:1px;'>&#8202;</div>
                                                                                                                                                                                                </td>
                                                                                                                                                                                </tr>
                                                                                                                                                                </tbody>
                                                                                                                                                </table>
                                                                                                                                </td>
                                                                                                                </tr>
                                                                                                </tbody>
                                                                                </table>
                                                                                <table class='row row-13' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                <tbody>
                                                                                                                <tr>
                                                                                                                                <td>
                                                                                                                                                <table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8faf7; color: #000000; width: 700px;' width='700'>
                                                                                                                                                                <tbody>
                                                                                                                                                                                <tr>
                                                                                                                                                                                                <td class='column column-1' width='100%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; background-color: #d9d9d9; padding-top: 30px; padding-bottom: 10px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                
                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                </table>
                                                                                                                                                                                                </td>
                                                                                                                                                                                </tr>
                                                                                                                                                                </tbody>
                                                                                                                                                </table>
                                                                                                                                </td>
                                                                                                                </tr>
                                                                                                </tbody>
                                                                                </table>
                                                                                <table class='row row-14' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                <tbody>
                                                                                                                <tr>
                                                                                                                                <td>
                                                                                                                                                <table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;' width='700'>
                                                                                                                                                                <tbody>
                                                                                                                                                                                <tr>
                                                                                                                                                                                                <td class='column column-1' width='100%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                
                                                                                                                                                                                                </td>
                                                                                                                                                                                </tr>
                                                                                                                                                                </tbody>
                                                                                                                                                </table>
                                                                                                                                </td>
                                                                                                                </tr>
                                                                                                </tbody>
                                                                                </table>
                                                                                <table class='row row-15' align='center' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>
                                                                                                <tbody>
                                                                                                                <tr>
                                                                                                                                <td>
                                                                                                                                                <table class='row-content stack' align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #333333; color: #000000; width: 700px;' width='700'>
                                                                                                                                                                <tbody>
                                                                                                                                                                                <tr>
                                                                                                                                                                                                <td class='column column-1' width='100%' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-right: 20px; padding-top: 0px; padding-bottom: 10px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;'>
                                                                                                                                                                                                                <table class='paragraph_block' width='100%' border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;'>
                                                                                                                                                                                                                                <tr>
                                                                                                                                                                                                                                                <td style='padding-bottom:15px;padding-left:30px;padding-right:15px;padding-top:25px;'>
                                                                                                                                                                                                                                                                <div style='color:#ffffff;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:12px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:14.399999999999999px;'>
                                                                                                                                                                                                                                                                                <p style='margin: 0;'>Copyright © 2022 Zipi Now (PTY) Ltd, All rights reserved.</p>
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                </table>
                                                                                                                                                                                                </td>
                                                                                                                                                                                </tr>
                                                                                                                                                                </tbody>
                                                                                                                                                </table>
                                                                                                                                </td>
                                                                                                                </tr>
                                                                                                </tbody>
                                                                                </table>
                                                                </td>
                                                </tr>
                                </tbody>
                </table><!-- End -->
</body>
 
</html>
";

$subject = "Zipi Customer Request Alert";
$address = "nelo@landsea-shipping.co.za";
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: Zipi <noreply@zipi.co.za>' . "\r\n";

$headers .= 'Bcc: tech@landsea-shipping.co.za' . "\r\n";
$headers .= 'Bcc: kelan@landsea-shipping.co.za' . "\r\n";

mail($email, $subject, $body, $headers,);


?>