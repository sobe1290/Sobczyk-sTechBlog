const createCommentHandler = async (event) => {
    event.preventDefault();

    const postNumber = document.getElementById('specificId').value;
    const commentBody = document.getElementById('commentBody').value;

    if (postNumber && commentBody) {
      const response = await fetch('/addcomment', {
        method: 'POST',
        body: JSON.stringify({commentBody, postNumber}),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      })

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create comment.');
      }

    }
  
  
    
  };
  
  document
    .querySelector('.newcomment-form')
    .addEventListener('submit', createCommentHandler);