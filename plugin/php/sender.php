<?php

$alert = '';
if (isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["message"])) {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message_content = $_POST["message"];

    $message = '<html><body>';
    $message .= '<h1><b>Email mittente: </b>' . $email . '</h1>';
    $message .= '<p><b>Nome mittente: </b>' . $name . '</p>';
    $message .= '<p><b>Messaggio: </b>' . $message_content . '</p>';
    $message .= '</body></html>';


    try {
        $to      = 'alessio_bennardo@hotmail.it';
        $subject = 'PortFolio';
        $message = $message;
        $headers = 'From: portfolio@gmail.com' . "\r\n" .
            'Reply-To: portfolio@gmail.com' . "\r\n" .
            'Content-type: text/html; charset=UTF-8' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

        mail($to, $subject, $message, $headers);
        echo json_encode(["message" => "success", "status" => 200]);
    } catch (Exception $e) {
        http_response_code(400);
        $alert = "<div class'alert-error'><span>" . $e . "</span></div>";
        echo json_encode(["message" => $e, "status" => 400]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "error", "status" => 400]);
}