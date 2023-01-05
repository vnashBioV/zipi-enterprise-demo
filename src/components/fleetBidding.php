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
$booking_party = $_GET['booking_party'];
$fleet_owner = $_GET['fleet_owner'];
$fleet_init_price = $_GET['fleet_init_price'];
$booking_party_price = $_GET['booking_party_price'];
$fleet_owner_price = $_GET['fleet_owner_price'];

$body = "
<!DOCTYPE html>

<html
  lang='en'
  xmlns:o='urn:schemas-microsoft-com:office:office'
  xmlns:v='urn:schemas-microsoft-com:vml'
>
  <head>
    <title></title>
    <meta content='text/html; charset=utf-8' http-equiv='Content-Type' />
    <meta content='width=device-width, initial-scale=1.0' name='viewport' />
    <!--[if mso
      ]><xml
        ><o:OfficeDocumentSettings
          ><o:PixelsPerInch>96</o:PixelsPerInch
          ><o:AllowPNG /></o:OfficeDocumentSettings></xml
    ><![endif]-->
    <!--[if !mso]><!-->
    <link
      href='https://fonts.googleapis.com/css2?family=Inter&family=Work+Sans:wght@700&display=swap'
      rel='stylesheet'
      type='text/css'
    />
    <link
      href='https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Work+Sans:wght@700&display=swap'
      rel='stylesheet'
      type='text/css'
    />
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
        line-height: inherit;
      }

      .desktop_hide,
      .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0px;
        overflow: hidden;
      }

      @media (max-width: 720px) {
        .social_block.desktop_hide .social-table {
          display: inline-block !important;
        }

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

        .row-4 .column-1 .block-1.text_block td.pad {
          padding: 0 10px !important;
        }

        .row-3 .column-2 .block-2.text_block td.pad {
          padding: 0 10px 0 5px !important;
        }

        .row-3 .column-1 .block-3.paragraph_block td.pad > div {
          font-size: 18px !important;
        }

        .row-3 .column-1 .block-3.paragraph_block td.pad {
          padding: 0 0 0 10px !important;
        }

        .row-6 .column-1 .block-10.text_block td.pad,
        .row-6 .column-1 .block-12.text_block td.pad,
        .row-6 .column-1 .block-2.text_block td.pad,
        .row-6 .column-1 .block-4.text_block td.pad,
        .row-6 .column-1 .block-6.text_block td.pad,
        .row-6 .column-1 .block-8.text_block td.pad {
          padding: 0 5px 10px !important;
        }

        .row-5 .column-1 .block-1.text_block td.pad,
        .row-6 .column-1 .block-1.text_block td.pad,
        .row-6 .column-1 .block-11.text_block td.pad,
        .row-6 .column-1 .block-3.text_block td.pad,
        .row-6 .column-1 .block-5.text_block td.pad,
        .row-6 .column-1 .block-7.text_block td.pad,
        .row-6 .column-1 .block-9.text_block td.pad,
        .row-7 .column-1 .block-2.text_block td.pad,
        .row-8 .column-1 .block-2.text_block td.pad {
          padding: 0 5px !important;
        }

        .row-7 .column-2 .block-2.text_block td.pad,
        .row-8 .column-2 .block-2.text_block td.pad {
          padding: 0 15px 0 5px !important;
        }

        .row-9 .column-1 .block-2.text_block td.pad {
          padding: 10px 5px !important;
        }

        .row-9 .column-2 .block-2.text_block td.pad {
          padding: 10px 15px 10px 5px !important;
        }

        .row-10 .column-1 .block-1.divider_block td.pad,
        .row-12 .column-1 .block-2.social_block td.pad {
          padding: 0 !important;
        }

        .row-10 .column-1 .block-1.divider_block .alignment table {
          display: inline-table;
        }

        .row-11 .column-1 .block-1.text_block td.pad {
          padding: 15px 5px !important;
        }

        .row-12 .column-1 .block-1.text_block td.pad {
          padding: 0 10px 30px !important;
        }

        .row-13 .column-1 .block-2.paragraph_block td.pad {
          padding: 15px 10px !important;
        }

        .row-4 .column-1 {
          padding: 30px 5px 15px !important;
        }

        .row-5 .column-1,
        .row-7 .column-1,
        .row-8 .column-1 {
          padding: 15px 10px 5px !important;
        }

        .row-6 .column-1 {
          padding: 0 10px 10px !important;
        }

        .row-9 .column-1 {
          padding: 5px 10px 15px !important;
        }

        .row-11 .column-1 {
          padding: 20px 5px !important;
        }

        .row-12 .column-1 {
          padding: 30px 5px 10px !important;
        }

        .row-13 .column-1 {
          padding: 0 00px 10px 0 !important;
        }
      }
    </style>
  </head>
  <body
    style='
      background-color: #f8faf7;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    '
  >
    <table
      border='0'
      cellpadding='0'
      cellspacing='0'
      class='nl-container'
      role='presentation'
      style='
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        background-color: #f8faf7;
      '
      width='100%'
    >
      <tbody>
        <tr>
          <td>
            <table
              align='center'
              border='0'
              cellpadding='0'
              cellspacing='0'
              class='row row-1'
              role='presentation'
              style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'
              width='100%'
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align='center'
                      border='0'
                      cellpadding='0'
                      cellspacing='0'
                      class='row-content stack'
                      role='presentation'
                      style='
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #201f42;
                        color: #000000;
                        width: 700px;
                      '
                      width='700'
                    >
                      <tbody>
                        <tr>
                          <td
                            class='column column-1'
                            style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                              padding-top: 0px;
                              padding-bottom: 0px;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            '
                            width='100%'
                          >
                            <div
                              class='spacer_block'
                              style='
                                height: 6px;
                                line-height: 6px;
                                font-size: 1px;
                              '
                            >
                               
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align='center'
              border='0'
              cellpadding='0'
              cellspacing='0'
              class='row row-2'
              role='presentation'
              style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'
              width='100%'
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align='center'
                      border='0'
                      cellpadding='0'
                      cellspacing='0'
                      class='row-content'
                      role='presentation'
                      style='
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #ffffff;
                        color: #000000;
                        width: 700px;
                      '
                      width='700'
                    >
                      <tbody>
                        <tr>
                          <td
                            class='column column-1'
                            style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-left: 10px;
                              vertical-align: middle;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            '
                            width='33.333333333333336%'
                          >
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='image_block block-2'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-bottom: 20px;
                                    padding-left: 20px;
                                    padding-top: 20px;
                                    width: 100%;
                                    padding-right: 0px;
                                  '
                                >
                                  <div
                                    align='left'
                                    class='alignment'
                                    style='line-height: 10px'
                                  >
                                    <img
                                      src='https://firebasestorage.googleapis.com/v0/b/new-zipi.appspot.com/o/zipilogo%2FYello.png?alt=media&token=0c442812-be73-42a4-b027-63a2f199ebc1'
                                      style='
                                        display: block;
                                        height: auto;
                                        border: 0;
                                        width: 67px;
                                        max-width: 100%;
                                      '
                                      width='67'
                                    />
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            class='column column-2'
                            style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: middle;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            '
                            width='66.66666666666667%'
                          >
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='paragraph_block block-2'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-bottom: 15px;
                                    padding-left: 20px;
                                    padding-right: 30px;
                                    padding-top: 15px;
                                  '
                                >
                                  <div
                                    style='
                                      color: #000000;
                                      direction: ltr;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                      font-size: 14px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 120%;
                                      text-align: right;
                                      mso-line-height-alt: 16.8px;
                                    '
                                  >
                                    <p style='margin: 0'>It's Just so Nippy!</p>
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
            <table
              align='center'
              border='0'
              cellpadding='0'
              cellspacing='0'
              class='row row-3'
              role='presentation'
              style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'
              width='100%'
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align='center'
                      border='0'
                      cellpadding='0'
                      cellspacing='0'
                      class='row-content'
                      role='presentation'
                      style='
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #ffffff;
                        color: #000000;
                        width: 700px;
                      '
                      width='700'
                    >
                      <tbody>
                        <tr>
                          <td
                            class='column column-1'
                            style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-left: 5px;
                              vertical-align: middle;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            '
                            width='41.666666666666664%'
                          >
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='paragraph_block block-3'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-left: 25px;
                                    padding-top: 1px;
                                    padding-bottom: 1px;
                                  '
                                >
                                  <div
                                    style='
                                      color: #101112;
                                      direction: ltr;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                      font-size: 20px;
                                      font-weight: 700;
                                      letter-spacing: 0px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 24px;
                                    '
                                  >
                                    <p style='margin: 0'>Bidding Notification</p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            class='column column-2'
                            style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: middle;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            '
                            width='58.333333333333336%'
                          >
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-2'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-left: 30px;
                                    padding-right: 30px;
                                    padding-top: 5px;
                                    padding-bottom: 5px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 24px;
                                        color: #555555;
                                        line-height: 2;
                                      '
                                    >
                                      <p
                                        style='
                                          margin: 0;
                                          font-size: 16px;
                                          text-align: right;
                                          mso-line-height-alt: 24px;
                                        '
                                      >
                                        <span style='font-size: 12px'
                                          ><strong>Date </strong>$date
                                        </span>
                                      </p>
                                    </div>
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
            <table
              align='center'
              border='0'
              cellpadding='0'
              cellspacing='0'
              class='row row-4'
              role='presentation'
              style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'
              width='100%'
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align='center'
                      border='0'
                      cellpadding='0'
                      cellspacing='0'
                      class='row-content'
                      role='presentation'
                      style='
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #ffffff;
                        color: #000000;
                        width: 700px;
                      '
                      width='700'
                    >
                      <tbody>
                        <tr>
                          <td
                            class='column column-1'
                            style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-left: 5px;
                              padding-right: 5px;
                              vertical-align: top;
                              padding-top: 30px;
                              padding-bottom: 15px;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            '
                            width='100%'
                          >
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-1'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-left: 25px;
                                    padding-right: 10px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      <p
                                        style='
                                          margin: 0;
                                          font-size: 16px;
                                          text-align: left;
                                          mso-line-height-alt: 19.2px;
                                        '
                                      >
                                        Hi $booking_party, this email serves to inform
                                        you that fleet owner $fleet_owner have reached out to
                                        offer moving your cargo at this rate $fleet_init_price
                                      </p>
                                    </div>
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
            <table
              align='center'
              border='0'
              cellpadding='0'
              cellspacing='0'
              class='row row-5'
              role='presentation'
              style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'
              width='100%'
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align='center'
                      border='0'
                      cellpadding='0'
                      cellspacing='0'
                      class='row-content'
                      role='presentation'
                      style='
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #f0f0f0;
                        color: #000000;
                        width: 700px;
                      '
                      width='700'
                    >
                      <tbody>
                        <tr>
                          <td
                            class='column column-1'
                            style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-left: 5px;
                              padding-right: 5px;
                              vertical-align: middle;
                              padding-top: 15px;
                              padding-bottom: 5px;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            '
                            width='100%'
                          >
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-1'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-left: 25px;
                                    padding-right: 10px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      <p
                                        style='
                                          margin: 0;
                                          font-size: 16px;
                                          text-align: left;
                                          mso-line-height-alt: 19.2px;
                                        '
                                      >
                                       
                                      </p>
                                    </div>
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
            <table
              align='center'
              border='0'
              cellpadding='0'
              cellspacing='0'
              class='row row-6'
              role='presentation'
              style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'
              width='100%'
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align='center'
                      border='0'
                      cellpadding='0'
                      cellspacing='0'
                      class='row-content'
                      role='presentation'
                      style='
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #f0f0f0;
                        color: #000000;
                        width: 700px;
                      '
                      width='700'
                    >
                      <tbody>
                        <tr>
                          <td
                            class='column column-1'
                            style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                              padding-top: 0px;
                              padding-bottom: 10px;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            '
                            width='100%'
                          >
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-1'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-left: 30px;
                                    padding-right: 10px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      <p
                                        style='
                                          margin: 0;
                                          font-size: 16px;
                                          text-align: left;
                                          mso-line-height-alt: 19.2px;
                                        '
                                      >
                                        <strong>Fleet Owner</strong>
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-2'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-bottom: 10px;
                                    padding-left: 30px;
                                    padding-right: 10px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      <p
                                        style='
                                          margin: 0;
                                          font-size: 16px;
                                          text-align: left;
                                          mso-line-height-alt: 19.2px;
                                        '
                                      >
                                        $fleet_owner
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-3'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-left: 30px;
                                    padding-right: 10px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      <p
                                        style='
                                          margin: 0;
                                          font-size: 16px;
                                          text-align: left;
                                          mso-line-height-alt: 19.2px;
                                        '
                                      >
                                        <strong>Booking Party</strong>
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-4'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-bottom: 10px;
                                    padding-left: 30px;
                                    padding-right: 10px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      <p
                                        style='
                                          margin: 0;
                                          font-size: 16px;
                                          text-align: left;
                                          mso-line-height-alt: 19.2px;
                                        '
                                      >
                                        $booking_party
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-5'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-left: 30px;
                                    padding-right: 10px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      <p
                                        style='
                                          margin: 0;
                                          font-size: 16px;
                                          text-align: left;
                                          mso-line-height-alt: 19.2px;
                                        '
                                      >
                                        <strong>Booking party asking price</strong>
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-6'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-bottom: 10px;
                                    padding-left: 30px;
                                    padding-right: 10px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      <p
                                        style='
                                          margin: 0;
                                          font-size: 16px;
                                          text-align: left;
                                          mso-line-height-alt: 19.2px;
                                        '
                                      >
                                        $booking_party_price
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-7'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-left: 30px;
                                    padding-right: 10px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      <p
                                        style='
                                          margin: 0;
                                          font-size: 16px;
                                          text-align: left;
                                          mso-line-height-alt: 19.2px;
                                        '
                                      >
                                        <!-- Distance -->
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-8'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-bottom: 10px;
                                    padding-left: 30px;
                                    padding-right: 10px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      <p
                                        style='
                                          margin: 0;
                                          font-size: 16px;
                                          text-align: left;
                                          mso-line-height-alt: 19.2px;
                                        '
                                      >
                                        <!-- $distance -->
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-9'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-left: 30px;
                                    padding-right: 10px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      <p
                                        style='
                                          margin: 0;
                                          font-size: 16px;
                                          text-align: left;
                                          mso-line-height-alt: 19.2px;
                                        '
                                      >
                                        <strong>Fleet owner price</strong>
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-10'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-bottom: 10px;
                                    padding-left: 30px;
                                    padding-right: 10px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      <p
                                        style='
                                          margin: 0;
                                          font-size: 16px;
                                          text-align: left;
                                          mso-line-height-alt: 19.2px;
                                        '
                                      >
                                        $fleet_owner_price
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-11'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-left: 30px;
                                    padding-right: 10px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-12'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-left: 30px;
                                    padding-right: 10px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      
                                    </div>
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
            <table
              align='center'
              border='0'
              cellpadding='0'
              cellspacing='0'
              class='row row-7'
              role='presentation'
              style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'
              width='100%'
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align='center'
                      border='0'
                      cellpadding='0'
                      cellspacing='0'
                      class='row-content'
                      role='presentation'
                      style='
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #f0f0f0;
                        color: #000000;
                        width: 700px;
                      '
                      width='700'
                    >
                      <tbody>
                        <tr>
                          <td
                            class='column column-1'
                            style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-left: 5px;
                              padding-right: 5px;
                              vertical-align: bottom;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            '
                            width='41.666666666666664%'
                          >
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-2'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-left: 25px;
                                    padding-right: 10px;
                                    padding-bottom: 5px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            class='column column-2'
                            style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: bottom;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            '
                            width='58.333333333333336%'
                          >
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-2'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-left: 25px;
                                    padding-right: 30px;
                                    padding-top: 5px;
                                    padding-bottom: 5px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      
                                    </div>
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
            <table
              align='center'
              border='0'
              cellpadding='0'
              cellspacing='0'
              class='row row-8'
              role='presentation'
              style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'
              width='100%'
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align='center'
                      border='0'
                      cellpadding='0'
                      cellspacing='0'
                      class='row-content'
                      role='presentation'
                      style='
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #f0f0f0;
                        color: #000000;
                        width: 700px;
                      '
                      width='700'
                    >
                      <tbody>
                        <tr>
                          <td
                            class='column column-1'
                            style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-left: 5px;
                              padding-right: 5px;
                              vertical-align: bottom;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            '
                            width='41.666666666666664%'
                          >
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-2'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-left: 25px;
                                    padding-right: 10px;
                                    padding-bottom: 5px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            class='column column-2'
                            style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: bottom;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            '
                            width='58.333333333333336%'
                          >
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-2'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-left: 25px;
                                    padding-right: 30px;
                                    padding-top: 5px;
                                    padding-bottom: 5px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      
                                    </div>
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
            <table
              align='center'
              border='0'
              cellpadding='0'
              cellspacing='0'
              class='row row-9'
              role='presentation'
              style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'
              width='100%'
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align='center'
                      border='0'
                      cellpadding='0'
                      cellspacing='0'
                      class='row-content'
                      role='presentation'
                      style='
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #f0f0f0;
                        color: #000000;
                        width: 700px;
                      '
                      width='700'
                    >
                      <tbody>
                        <tr>
                          <td
                            class='column column-1'
                            style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            '
                            width='50%'
                          >
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-2'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-bottom: 25px;
                                    padding-left: 30px;
                                    padding-right: 10px;
                                    padding-top: 15px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            class='column column-2'
                            style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            '
                            width='50%'
                          >
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-2'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-bottom: 15px;
                                    padding-left: 10px;
                                    padding-right: 30px;
                                    padding-top: 15px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      
                                    </div>
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
            <table
              align='center'
              border='0'
              cellpadding='0'
              cellspacing='0'
              class='row row-10'
              role='presentation'
              style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'
              width='100%'
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align='center'
                      border='0'
                      cellpadding='0'
                      cellspacing='0'
                      class='row-content'
                      role='presentation'
                      style='
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #f0f0f0;
                        color: #000000;
                        width: 700px;
                      '
                      width='700'
                    >
                      <tbody>
                        <tr>
                          <td
                            class='column column-1'
                            style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                              padding-top: 5px;
                              padding-bottom: 5px;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            '
                            width='100%'
                          >
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='divider_block block-1'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-left: 30px;
                                    padding-right: 30px;
                                  '
                                >
                                  <div align='center' class='alignment'>
                                    <table
                                      border='0'
                                      cellpadding='0'
                                      cellspacing='0'
                                      role='presentation'
                                      style='
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      '
                                      width='100%'
                                    >
                                      <tr>
                                        <td
                                          class='divider_inner'
                                          style='
                                            font-size: 1px;
                                            line-height: 1px;
                                            border-top: 1px solid #a9a9a9;
                                          '
                                        >
                                          <span> </span>
                                        </td>
                                      </tr>
                                    </table>
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
            <table
              align='center'
              border='0'
              cellpadding='0'
              cellspacing='0'
              class='row row-11'
              role='presentation'
              style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'
              width='100%'
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align='center'
                      border='0'
                      cellpadding='0'
                      cellspacing='0'
                      class='row-content stack'
                      role='presentation'
                      style='
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #f0f0f0;
                        color: #000000;
                        width: 700px;
                      '
                      width='700'
                    >
                      <tbody>
                        <tr>
                          <td
                            class='column column-1'
                            style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-left: 30px;
                              padding-right: 30px;
                              vertical-align: top;
                              padding-top: 20px;
                              padding-bottom: 20px;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            '
                            width='100%'
                          >
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-1'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-bottom: 15px;
                                    padding-top: 15px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='button_block block-2'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              '
                              width='100%'
                            >
                              <tr>
                                <td class='pad' style='text-align: center'>
                                  <div align='center' class='alignment'>
                                    <!--[if mso]><v:roundrect xmlns:v='urn:schemas-microsoft-com:vml' xmlns:w='urn:schemas-microsoft-com:office:word' style='height:37px;width:153px;v-text-anchor:middle;' arcsize='109%' stroke='false' fillcolor='#ffe200'><w:anchorlock/><v:textbox inset='0px,0px,0px,0px'><center style='color:#000000; font-family:Arial, sans-serif; font-size:16px'><![endif]-->
                                    <div
                                      style='
                                        text-decoration: none;
                                        display: inline-block;
                                        color: #000000;
                                        background-color: #ffe200;
                                        border-radius: 40px;
                                        width: auto;
                                        border-top: 0px solid transparent;
                                        font-weight: 400;
                                        border-right: 0px solid transparent;
                                        border-bottom: 0px solid transparent;
                                        border-left: 0px solid transparent;
                                        padding-top: 03px;
                                        padding-bottom: 03px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        text-align: center;
                                        mso-border-alt: none;
                                        word-break: keep-all;
                                      '
                                    >
                                      
                                    </div>
                                    <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
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
            <table
              align='center'
              border='0'
              cellpadding='0'
              cellspacing='0'
              class='row row-12'
              role='presentation'
              style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'
              width='100%'
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align='center'
                      border='0'
                      cellpadding='0'
                      cellspacing='0'
                      class='row-content stack'
                      role='presentation'
                      style='
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #f8faf7;
                        color: #000000;
                        width: 700px;
                      '
                      width='700'
                    >
                      <tbody>
                        <tr>
                          <td
                            class='column column-1'
                            style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              background-color: #d9d9d9;
                              vertical-align: top;
                              padding-top: 30px;
                              padding-bottom: 10px;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            '
                            width='100%'
                          >
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='text_block block-1'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-bottom: 15px;
                                    padding-left: 30px;
                                    padding-right: 30px;
                                  '
                                >
                                  <div style='font-family: sans-serif'>
                                    <div
                                      class=''
                                      style='
                                        font-size: 12px;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #555555;
                                        line-height: 1.2;
                                      '
                                    >
                                      <p
                                        style='
                                          margin: 0;
                                          text-align: center;
                                          mso-line-height-alt: 14.399999999999999px;
                                        '
                                      >
                                        Zipi Enterprise is a service offered by
                                        Zipi Now (PTY) Ltd.
                                      </p>
                                      <p
                                        style='
                                          margin: 0;
                                          text-align: center;
                                          mso-line-height-alt: 14.399999999999999px;
                                        '
                                      >
                                         
                                      </p>
                                      <p
                                        style='
                                          margin: 0;
                                          mso-line-height-alt: 14.399999999999999px;
                                        '
                                      >
                                        <span style='font-size: 10px'
                                          ><em
                                            >The content of this email is
                                            confidential and intended for the
                                            recipient specified in message only.
                                            If you received this message by
                                            mistake, please reply to this
                                            message and follow with its
                                            deletion, so that we can ensure such
                                            a mistake does not occur in the
                                            future.</em
                                          ></span
                                        >
                                      </p>
                                      <p
                                        style='
                                          margin: 0;
                                          mso-line-height-alt: 14.399999999999999px;
                                        '
                                      >
                                         
                                      </p>
                                      <p
                                        style='
                                          margin: 0;
                                          mso-line-height-alt: 12px;
                                        '
                                      >
                                        <span style='font-size: 10px'
                                          ><em
                                            >Visit our
                                            <a
                                              href='zipi.co.za'
                                              rel='noopener'
                                              style='text-decoration: underline'
                                              target='_blank'
                                              >website</a
                                            ></em
                                          ></span
                                        >
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='social_block block-2'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-bottom: 30px;
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 10px;
                                    text-align: center;
                                  '
                                >
                                  <div
                                    class='alignment'
                                    style='text-align: center'
                                  >
                                    <table
                                      border='0'
                                      cellpadding='0'
                                      cellspacing='0'
                                      class='social-table'
                                      role='presentation'
                                      style='
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        display: inline-block;
                                      '
                                      width='208px'
                                    >
                                      <tr>
                                        <td style='padding: 0 10px 0 10px'>
                                          <a
                                            href='https://www.facebook.com/ZipiNow'
                                            target='_blank'
                                            ><img
                                              alt='Facebook'
                                              height='32'
                                              src='https://firebasestorage.googleapis.com/v0/b/new-zipi.appspot.com/o/zipi_socials%2Ffacebook2x.png?alt=media&token=837c8615-31e2-4100-84a9-8e215f4f3991'
                                              style='
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              '
                                              title='Facebook'
                                              width='32'
                                          /></a>
                                        </td>
                                        <td style='padding: 0 10px 0 10px'>
                                          <a
                                            href='https://twitter.com/Zipi_Now'
                                            target='_blank'
                                            ><img
                                              alt='Twitter'
                                              height='32'
                                              src='https://firebasestorage.googleapis.com/v0/b/new-zipi.appspot.com/o/zipi_socials%2Ftwitter2x.png?alt=media&token=fc92571b-4ab7-4523-b659-5f02e411d926'
                                              style='
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              '
                                              title='Twitter'
                                              width='32'
                                          /></a>
                                        </td>
                                        <td style='padding: 0 10px 0 10px'>
                                          <a
                                            href='https://instagram.com/zipi_now'
                                            target='_blank'
                                            ><img
                                              alt='Instagram'
                                              height='32'
                                              src='https://firebasestorage.googleapis.com/v0/b/new-zipi.appspot.com/o/zipi_socials%2Finstagram2x.png?alt=media&token=938effea-e7fe-4140-97da-809b8eb20457'
                                              style='
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              '
                                              title='Instagram'
                                              width='32'
                                          /></a>
                                        </td>
                                        <td style='padding: 0 10px 0 10px'>
                                          <a
                                            href='https://www.linkedin.com/company/zipi-now/'
                                            target='_blank'
                                            ><img
                                              alt='LinkedIn'
                                              height='32'
                                              src='https://firebasestorage.googleapis.com/v0/b/new-zipi.appspot.com/o/zipi_socials%2Flinkedin2x.png?alt=media&token=e9435fb4-111c-480c-bd68-f901a28698b2'
                                              style='
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              '
                                              title='LinkedIn'
                                              width='32'
                                          /></a>
                                        </td>
                                      </tr>
                                    </table>
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
            <table
              align='center'
              border='0'
              cellpadding='0'
              cellspacing='0'
              class='row row-13'
              role='presentation'
              style='mso-table-lspace: 0pt; mso-table-rspace: 0pt'
              width='100%'
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align='center'
                      border='0'
                      cellpadding='0'
                      cellspacing='0'
                      class='row-content stack'
                      role='presentation'
                      style='
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #333333;
                        color: #000000;
                        width: 700px;
                      '
                      width='700'
                    >
                      <tbody>
                        <tr>
                          <td
                            class='column column-1'
                            style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-right: 20px;
                              vertical-align: top;
                              padding-top: 0px;
                              padding-bottom: 10px;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            '
                            width='100%'
                          >
                            <table
                              border='0'
                              cellpadding='0'
                              cellspacing='0'
                              class='paragraph_block block-2'
                              role='presentation'
                              style='
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              '
                              width='100%'
                            >
                              <tr>
                                <td
                                  class='pad'
                                  style='
                                    padding-bottom: 15px;
                                    padding-left: 30px;
                                    padding-right: 15px;
                                    padding-top: 25px;
                                  '
                                >
                                  <div
                                    style='
                                      color: #ffffff;
                                      direction: ltr;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                      font-size: 12px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 14.399999999999999px;
                                    '
                                  >
                                    <p style='margin: 0'>
                                      Copyright © 2022 Zipi Now (PTY) Ltd, All
                                      rights reserved.
                                    </p>
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
    </table>
    <!-- End -->
  </body>
</html>
";

$subject = "Fleet owner bidding notification ";
$address = "nelo@landsea-shipping.co.za";
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: Zipi <noreply@zipi.co.za>' . "\r\n";

$headers .= 'Bcc: tech@landsea-shipping.co.za' . "\r\n";
$headers .= 'Bcc: kelan@landsea-shipping.co.za' . "\r\n";

mail($email, $subject, $body, $headers,);


?>