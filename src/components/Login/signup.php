<?php
header('Content-Type: application/json');
include_once 'connect.php'; 

// Get POST data
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Check if the user already exists
$query = "SELECT * FROM user WHERE Email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['message' => 'User already exists.']);
    exit();
}

// Insert the user into the database
$query = "INSERT INTO user (Username, Email, Password, Role, Joindate, Address, points) VALUES (?, ?, ?, 'user', NOW(), '', 0)";
$stmt = $conn->prepare($query);
$stmt->bind_param("sss", $username, $email, $hashedPassword);
if ($stmt->execute()) {
    echo json_encode(['message' => 'User registered successfully.']);
} else {
    echo json_encode(['message' => 'Error registering user.']);
}

$stmt->close();
$conn->close();
?>
