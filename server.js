const http = require('http');

let app = http.createServer((req, res) => {
  console.log(req.url);
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  let resObject = {
    posts: [
      {
        name: "Benny",
        lastname: "Pakman",
        message: "I ate apple today",
        likes: 5
      },
      {
        name: "Or",
        lastname: "Pakman",
        message: "I ate apple tommorow",
        likes: 10
      }
    ]
  };

  res.end(JSON.stringify(resObject));
});

app.listen(3000, '127.0.0.1');
console.log('Server is running');