// on load
// 1. request data from server
// 2. convert it to json
// 3.convert it to posts with username, picture, date, body text and curr likes.

// requesting data :
// for the class UserService: 
//     userName:
//     1. request data from server
//     2. then convert it to json
    class UserService{
        getUserName(id) {
            return fetch('https://jsonplaceholder.typicode.com/users/' + id)
        .then(res => res.json())
        .then(user => new User(user))
        }
    }
    
// for the UserPictureService:
//     1. request data from server
//     2. then convert it to json
    // class UserPicService{
    //     getUserPic(id) {
    //         return fetch('https://jsonplaceholder.typicode.com/photos/' + id)
    //         .then(res => res.json())
    //         .then(user => new User(user))
    //     }
    // }
    
// for the PostService: 
//     1. request data from server
//     2. then convert it to json
    class PostsService{
        getPosts(user) {
            return fetch('https://jsonplaceholder.typicode.com/posts/?userId=' + user.id)
            .then(res => res.json())
            .then(posts => posts.map(post => new Post(post.body, user)));
        }
    }

// create instance for all the services (so we have accses to them)  
let userService = new UserService();
// let UserPicService = new UserPicService();
let postsService = new PostsService();



// getting the userName arguments we gonne use from the userName Service class
class User {
    constructor(userObj){
        this.fullname = userObj.name;
        this.id = userObj.id;
    }
}
class UserPic{

}
// feed element will be the one class that wil merge all 
// the data and append it as a full post element in the dome  

// the constructor declare on two arguments:
// feedEl will select the HTML area that suppose to hold the new post
// userId is the argument that gives us the specific user/post/picture 
// it mainly will be use in the services @ begining of the script 
class Feed {
    constructor(feedEl , userId){
        this.feedEl = feedEl;
        this.fetchUser(userId);
        this.textArea = document.querySelector('textarea');
    }

//fetchUser function calls the getUserName function @ userName class
// & activate it using the userId 
// then uses its results to call onUser function 
    fetchUser(userId) {
        userService
            .getUserName(userId)
            .then(user => this.onUser(user));
    }
//fetchPost function calls the getPostService function @ PostsService class
// & activate it using the user argument that we reacive from the onUser function
// then uses its result to call onPosts function 

    fetchPosts() {
        postsService
            .getPosts(this.user)
            .then(posts => this.onPosts(posts));

    }
// onUser function will use the userName data & send it to 
// diferent functions that will result it to appear in the HTML areas 
    onUser(user) {
        this.user = user;
        this.fetchPosts();
        this.postingArea();  /*posting Area function*/ 
    }

    onPosts(posts) {
        posts.forEach(post => this.feedEl.appendChild(post.el));
    }
// posting Area function responsble on the user-post element  
    postingArea() {
        this.postButton = this.feedEl.querySelector('button');
        this.textArea.setAttribute(`placeholder`, `What's on your mind, ${this.user.fullname}?`);
        this.postButton.addEventListener('click', () => this.createPost());
    }
// createPost function responsble on dealing with the click eventListener on the postingArea button  
    createPost() {
        let postBody = this.textArea.value;
        this.textArea.value = '';
        let post = new Post(postBody, this.user);
        this.feedEl.insertBefore(post.el, this.feedEl.children[1]);
      }
    

}
class Post{
    constructor(postBody , author){
        this.el = document.createElement(`article`);
        this.el.className = `post-content`;
        this.el.innerHTML =`
            <div class="post-top">
            <div class="user-img">
                <img src="img/user-img.jpg">
            </div>
            <div class="info">
                <div class="postting-name">${author.fullname}</div>
                <div class="text-small">${new Date()}</div>
            </div>
            <div class="icons more post">
                <div class="post-menu">
                    <ul>
                        <li>Edit post</li>
                        <li>Remove post</li>
                    </ul>
                </div>
            </div>

        </div>
        <div class="post-text">${postBody}</div>
        
        <div class="post-react-buttons">
            <div class="react-button like">
                <div class="icon"></div>Like</div>
            <div class="react-button comment">
                <div class="icon"></div>Comment</div>
            <div class="react-button share">
                <div class="icon"></div>Share</div>
        </div>
        <div class="reaction-status">
            <div class="like-emoji"></div>
            <span></span>
        </div>
        
        <div class="post-user-comments">
            <div class="add-comment">
                <div class="user-img">
                    <img src="img/user-img.jpg">
                </div>
                <div class="text-area-container">
                    <form>
                        <input type="text" placeholder="Write a comment">
                    </form>
                    <div class="emoji">
                        <div class="commentEmojiIcon"></div>
                        <div class="commentEmojiIcon"></div>
                        <div class="commentEmojiIcon"></div>
                        <div class="commentEmojiIcon"></div>
                    </div>
                </div>
            </div>
        </div>`;  

        this.removeButton = this.el.querySelectorAll('li')[1];
        this.removeButton.addEventListener('click', () => this.remove());
    }
    remove() {
        this.el.parentNode.removeChild(this.el);
      }
}

let mainEl = document.querySelector('.main');
new Feed(mainEl, 7);

