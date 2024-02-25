<?php
    use PHPMailer\PHPMailer\PHPMailer;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';

    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $uname = $_POST['uname'];
    $pasword = $_POST['pwd'];

    $host = 'localhost';
    $username = 'root';
    $password = '';
    $dbname = 'testdb';
    $mail = new PHPMailer;
    
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'krishgoswami211@gmail.com';
    $mail->Password = 'lawztohtogygoryy';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    
    // Set up the sender and recipient
    $mail->setFrom('krishgoswami211@gmail.com');
    $mail->addAddress($email);
    
    // Set up the email content
    $mail->isHTML(true);
    $mail->Subject = '🎉 Welcome to RandomScript! 🎉';
    $mail->Body = 'We're thrilled to have you join our community of randomness enthusiasts! At Random Script, we believe in the power of randomness to bring excitement and efficiency to various aspects of life. Whether you're in need of a random QR code, a randomly generated team, a robust password, or even selecting a random winner, our platform has got you covered.
As a new member, you've taken the first step towards unlocking a world of endless possibilities. Your journey with us begins now, and we can't wait to see how you'll utilize our tools to enhance your projects, events, or daily tasks.📧 But wait, there's more! 📧 We've just sent you a welcome email containing important information about your account and how to get started. Be sure to check your inbox (and spam folder, just in case!) to ensure you don't miss out on anything.
Once again, welcome to Random Script! Let's embrace the randomness together and make every moment a little more unpredictable and exciting.

Best regards,
RandomScript Team';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    
   
    
    // Send the email
    if(!$mail->send()) {
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message has been sent successfully';
    }
    

    $conn = new mysqli($host, $username, $password, $dbname);

    if ($conn -> connect_error)
    {
        die('Connection failed!' . $conn -> connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO registration(FirstName, LastName, Email,uname,pwd) VALUES (?, ?, ?,?,?)");
    $stmt->bind_param("sssss", $fname, $lname, $email,$uname,$pasword);
    $stmt->execute();
    
    echo "Entries added!";
    $stmt->close();
    $conn->close();
    header('Location: home.html');
