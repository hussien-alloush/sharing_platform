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

// Get data from POST request
$title = $_POST['title'];
$description = $_POST['description'];
$tags = explode(',', $_POST['tags']); // Convert tags to an array
$category = $_POST['category'];
$codeSnippet = $_POST['codeSnippet'];
$userId = 1; // Assuming the user is logged in and we have their ID

// Insert the post into the 'post' table
$stmt = $conn->prepare("INSERT INTO post (Tittle, Description, Tags, Categoryid, Authoried, Createdate, Updatedate, Upvote, Downvote) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), 0, 0)");
$stmt->bind_param("sssis", $title, $description, $tags, $category, $userId);

if ($stmt->execute()) {
    // Get the last inserted post ID
    $postId = $stmt->insert_id;

    // Insert the tags into the 'posttag' table
    foreach ($tags as $tagId) {
        $tagStmt = $conn->prepare("INSERT INTO posttag (Postid, Tagid) VALUES (?, ?)");
        $tagStmt->bind_param("ii", $postId, $tagId);
        $tagStmt->execute();
    }

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error creating post']);
}

$stmt->close();
$conn->close();
?>
