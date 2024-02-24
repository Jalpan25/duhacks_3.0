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
    $mail->Subject = 'Welcoming mail';
    $mail->Body = 'This is the HTML message body in bold!';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    
    // Add an attachment
    $mail->addAttachment('path/to/your/file.txt', 'file.txt');
    
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
