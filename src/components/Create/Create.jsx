import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Create.css'

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState('');
  const [tagOptions, setTagOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [codeSnippet, setCodeSnippet] = useState('');
  const [postSuccess, setPostSuccess] = useState('');

  // Fetch categories and tags from the backend
  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        // Fetch categories
        const categoryResponse = await axios.get('http://localhost/your-backend-url/categories.php');
        setCategoryOptions(categoryResponse.data);

        // Fetch tags
        const tagResponse = await axios.get('http://localhost/your-backend-url/tags.php');
        setTagOptions(tagResponse.data);
      } catch (error) {
        console.error('Error fetching categories or tags', error);
      }
    };

    fetchCategoriesAndTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      description,
      tags: tags.join(','), // Join selected tags as a comma-separated string
      category,
      codeSnippet,
    };

    try {
      const response = await axios.post('http://localhost/your-backend-url/create.php', postData);

      if (response.data.success) {
        setPostSuccess('Post created successfully!');
      } else {
        setPostSuccess('Error creating post.');
      }
    } catch (error) {
      setPostSuccess('Error creating post.');
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      {postSuccess && <p>{postSuccess}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            {categoryOptions.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.Categoryname}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Tags:</label>
          <select
            multiple
            value={tags}
            onChange={(e) => setTags([...e.target.selectedOptions].map(option => option.value))}
          >
            {tagOptions.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.Tagname}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Code Snippet (optional):</label>
          <textarea
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
            placeholder="Enter code here..."
          />
        </div>

        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
