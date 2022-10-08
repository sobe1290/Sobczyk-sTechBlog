const editPostHandler = async (event) => {
  event.preventDefault();

  const postNumber = specificId.innerHTML;
  const postTitle = document.querySelector('#post-title').value.trim();
  const postBody = document.querySelector('#post-body').value.trim();

  if (postTitle && postBody) {
    const response = await fetch(`/api/posts/${postNumber}`, {
      method: 'PUT',
      body: JSON.stringify({ postTitle, postBody }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post.');
    }
  }
};

document
  .querySelector('.newpost-form')
  .addEventListener('submit', editPostHandler);
