const createPostHandler = async (event) => {
    event.preventDefault();
  
    const postTitle = document.querySelector('#post-title').value.trim();
    const postBody = document.querySelector('#post-body').value.trim();

    if (postTitle && postBody) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({postTitle, postBody}),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      })

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post.');
      }

    }
  
  
    
  };
  
  document
    .querySelector('.newpost-form')
    .addEventListener('submit', createPostHandler);