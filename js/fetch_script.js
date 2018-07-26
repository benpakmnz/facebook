// on load
// 1. request data from server
// 2. convert it to json
// 3.convert it to posts with username, picture, date, body text and curr likes.

// requesting data :
// for the class UserService: 
//     userName:
//     1. request data from server
//     2. then convert it to json
import PostType1 from './postType1_script'
import Reaction from './reaction_script';
import User from './user_script';


fetch('http://127.0.0.1:3000')
.then((data) => {
  data.json()
    .then((res) => {
      localStorage.setItem("post", JSON.stringify(res)) 
      res.posts.forEach(element => {
        let feedEl = document.querySelector('.main');
        let post = new PostType1(element.message, element.name , element.userProfilePic);
        feedEl.insertBefore(post.el, feedEl.children[1]);
        new Reaction(post.el , element.likes).addReaction(0)
      });
    });
})
.catch((error) => {
    console.log('error');
    let data = JSON.parse(localStorage.getItem("post"));
        data.posts.forEach(element => {
            let feedEl = document.querySelector('.main');
            let post = new PostType1(element.message, element.name , element.userProfilePic);
            feedEl.insertBefore(post.el, feedEl.children[1]);

          });
        });   

    

    class UserService{
        getUserName(id) {
            return fetch('https://jsonplaceholder.typicode.com/users/' + id)
        .then(res => res.json())
        .then(user => new User(user))
        }
    }
// for the UserProfilePictureService:
//     1. request data from server
//     2. then convert it to json
    class UserProfilePicsService{
        getUserPics(user) {
            return fetch('https://jsonplaceholder.typicode.com/photos/?albumId=' + user.id)
            .then(res => res.json())
            .then(profilePics => profilePics)
        }
    }
// for the PostService: 
//     1. request data from server
//     2. then convert it to json

    class PostsService{
        getPosts(user) {
            return fetch('https://jsonplaceholder.typicode.com/posts/?userId=' + user.id)
            .then(res => res.json())
            .then(posts => posts.map(post => new PostType1(post.body, user , "https://scontent.ftlv2-1.fna.fbcdn.net/v/t1.0-9/16195861_10154444512113915_2095302407570852635_n.jpg?_nc_cat=0&oh=f34fa57c3d8f43ed96aab9cf8fc4cc33&oe=5BA25ABA")))
        }

    }

// create instance for all the services (so we have accses to them)  
let userService = new UserService();
let postsService = new PostsService();
let userProfilePicsService = new UserProfilePicsService();


export {
     userService,
     postsService,
     userProfilePicsService,
}
