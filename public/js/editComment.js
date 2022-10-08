const editCommentHandler = async (event) => {
  event.preventDefault();

  const id = specificId.innerHTML;
  const commentBody = document.getElementById('commentBody').value;

  if (id && commentBody) {
    const response = await fetch('/updatecomment', {
      method: 'PUT',
      body: JSON.stringify({ commentBody, id }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to update comment.');
    }
  }
};

document
  .querySelector('.newcomment-form')
  .addEventListener('submit', editCommentHandler);

const deleteComment = async (event) => {
  event.preventDefault();

  const id = specificId.innerHTML;

  const response = await fetch(`/comment/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    console.log(err);
  }
};

document.querySelector('#deleteComment').addEventListener('click', deleteComment);
