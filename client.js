fetch('http://127.0.0.1:3000')
  .then((data) => {
    data.json()
      .then((res) => {
        res.posts.forEach(element => {
          createPost(element.message);
        });
      });
  });

  function createPost(message) {
    let postDiv = document.createElement("div");
    postDiv.innerHTML = message;
    document.body.appendChild(postDiv);
  }