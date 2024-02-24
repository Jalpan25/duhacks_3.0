<?php

    $host = "localhost";
    $username = 'root';
    $password = '';
    $dbname = 'testdb';

    $conn = new mysqli($host, $username, $password, $dbname);
  if(isset($_POST['submit']))
  {
    if ($conn -> connect_error)
    {
        die('Connection failed!' . $conn -> connect_error);
    }
    $uname = $_POST['uname'];
    $pass = $_POST['upass'];
    $query = "SELECT * FROM registration WHERE uname='$uname' AND pwd='$pass'";
    $result = $conn -> query($query);
    if($result -> num_rows == 1)
    {
        $conn -> close();
        header('Location: restaurant.php');
    }
    else
    {
        echo '<script>alert("Form submission failed!");</script>';
        $conn -> close();
    }
  }
?>

<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>Login Page</title>
  <link rel="stylesheet" href="../css/style.css">

</head>
<body>
<div id="bg"></div>

<form action="http://localhost/Restaurant/html/login.php" method="post">
  <div class="form-field">
    <input type="text" placeholder="Username" name="uname" required/>
  </div>
  
  <div class="form-field">
    <input type="password" placeholder="Password" name="upass" required/>                         
  </div>
  
  <div class="form-field">
    <input type="submit" value="Submit" name="submit" id="submit">
  </div>
  <label for="register">NOT registered? <a href="register.html">Register</a></label>
</form>
</body>
</html>
