<?php
header('Content-Type: application/json');
include_once 'connect.php'; // Your database connection file

// Get POST data
$email = $_POST['email'];
$password = $_POST['password'];

// Fetch user by email
$query = "SELECT * FROM user WHERE Email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['message' => 'User not found.']);
    exit();
}

$user = $result->fetch_assoc();

// Verify password
if (!password_verify($password, $user['Password'])) {
    echo json_encode(['message' => 'Invalid credentials.']);
    exit();
}

// Optionally, you can generate a JWT token here for authenticated users

echo json_encode(['message' => 'Login successful.']);
$stmt->close();
$conn->close();
?>
