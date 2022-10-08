const deletePost = async (event) => {
    event.preventDefault();

    const postNumber = specificId.innerHTML;

  const response = await fetch(`/api/posts/${postNumber}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });


  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    console.log(err)
  }
  };

   document.querySelector('#deletePost').addEventListener('click', deletePost);

// const editPost = async (event) => {
//     event.preventDefault();

//     const postNumber = specificId.innerHTML;

//   const response = await fetch(`/api/posts/${postNumber}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });


//   if (response.ok) {
//     document.location.replace("/editPost");
//   } else {
//     console.log(err)
//   }
//   };

//    document.querySelector('#editPost').addEventListener('click', editPost);