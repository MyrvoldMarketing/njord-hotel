<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

header('Content-Type: application/json');

try {
    // Get form data
    $firstname = $_POST['firstname'] ?? '';
    $lastname = $_POST['lastname'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $details = $_POST['details'] ?? '';
    $marketing = isset($_POST['marketing']) ? 'Ja' : 'Nei';
    $research = isset($_POST['research']) ? 'Ja' : 'Nei';

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    // Server settings
    $mail->isSMTP();
    $mail->Host = 'mail.njordhotel.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@njordhotel.com';
    $mail->Password = 'R)wmpJdi9dWD';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    // Recipients
    $mail->setFrom('info@njordhotel.com', 'Njord Hotel Website');
    $mail->addAddress('info@njordhotel.com', 'Njord Hotel');

    // Content
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = 'Ny intresseanmälan från ' . $firstname . ' ' . $lastname;

    // Email body
    $body = "
    <h2>Ny intresseanmälan</h2>
    <p><strong>Namn:</strong> {$firstname} {$lastname}</p>
    <p><strong>E-post:</strong> {$email}</p>
    <p><strong>Telefon:</strong> {$phone}</p>
    <p><strong>Ytterligare information:</strong><br>{$details}</p>
    <p><strong>Godkänner marknadsföring:</strong> {$marketing}</p>
    <p><strong>Godkänner undersökningar:</strong> {$research}</p>
    ";

    $mail->Body = $body;
    $mail->AltBody = strip_tags($body);

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Tack för din intresseanmälan! Vi återkommer så snart som möjligt.']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Ett fel uppstod. Vänligen försök igen senare.']);
}
