<?php
// Connect to database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "blog";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch tags
$sql = "SELECT id, Tagname FROM tag";
$result = $conn->query($sql);

$tags = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $tags[] = $row;
    }
}

echo json_encode($tags);

$conn->close();
?>
