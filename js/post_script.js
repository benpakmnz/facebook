// on load
// 1. request data from server
// 2. convert it to json
// 3.convert it to posts with username, picture, date, body text and curr likes.

// requesting data :
// for the class UserService: 
//     userName:
//     1. request data from server
//     2. then convert it to json


fetch('http://127.0.0.1:3000')
.then((data) => {
  data.json()
    .then((res) => {
      res.posts.forEach(element => {
        createPrePost(element.name , element.lastname , element.message , element.likes);
      });
    });
});

function createPrePost(name, lastname, message , likes){
    this.feedEl = document.querySelector('.main');
    let postBody = message;
    this.user = new User(name, lastname);
    let post = new Post(postBody, this.user);
    this.feedEl.insertBefore(post.el, this.feedEl.children[1]);
    this.reaction = this.feedEl.children[1].querySelector('.reaction-status');
    this.reactionCounter = likes;
    this.reactionStatus = this.reaction.querySelector('span');
    this.reactionStatus.innerText = this.reactionCounter;
    this.reaction.style.display = "flex";  

  }  
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
    let userProfilePicsService = new UserProfilePicsService();
// for the PostService: 
//     1. request data from server
//     2. then convert it to json

    class PostsService{
        getPosts(user) {
            return fetch('https://jsonplaceholder.typicode.com/posts/?userId=' + user.id)
            .then(res => res.json())
            .then(posts => posts.map(post => new Post(post.body, user)))
        }

    }

// create instance for all the services (so we have accses to them)  
let userService = new UserService();
let postsService = new PostsService();
// let userProfilePicsService = new UserProfilePicsService();



// getting the userName arguments we gonne use from the userName Service class
class User {
    constructor(userObj){
        this.fullname = userObj.name;
        this.id = userObj.id;
    }
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

    fetchUserProfilePics(){
        userProfilePicsService
            .getUserPics(this.user)
            .then(pic => this.onProfilePics(pic));
            // .then(profilePic => this.onProfilePic(profilePic.url));
            
            
            
    }
// onUser function will use the userName data & send it to 
// diferent functions that will result it to appear in the HTML areas 
    onUser(user) {
        this.user = user;
        this.fetchPosts();
        this.fetchUserProfilePics();
        this.postingArea();  /*posting Area function*/ 
    }

    onProfilePics(pic) {
        this.profilePicUrl = pic[0].url;
        console.log(this.profilePicUrl);
    }

    onPosts(posts) {
        posts.forEach(post => this.feedEl.insertBefore(post.el, this.feedEl.children[1]));
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
        let post = new Post(postBody, this.user, this.profilePicUrl);
        this.appendPost(post.el);
      }
    appendPost(postToAppend){
        this.feedEl.insertBefore(postToAppend, this.feedEl.children[1]);
    }
     
}
class Post{
    constructor(postBody , author, pic){
        this.el = document.createElement(`article`);
        this.el.className = `post-content`;
        this.el.innerHTML =`
            <div class="post-top">
            <div class="user-img"><img src="${pic}">
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
                        <input type="text" placeholder="Write a comment"></input>
                        </form>
                    <div class="emoji">
                        <button>post</button>
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
        this.likeButton = this.el.querySelector('.react-button.like');
        this.likeButton.addEventListener('click', () => this.addReaction());
        this.reactionCounter= 0;
        this.postEditButton = this.el.querySelector('.post-top .icons.more.post ul li:nth-child(1)');
        this.postEditButton.addEventListener('click', () => this.editPost());
        this.postCommentButton = this.el.querySelector('.post-user-comments .add-comment .text-area-container .emoji');
        this.commentInput = this.el.querySelector('input');
        this.postCommentButton.addEventListener('click', () => this.addComment());
        
        
    
        
    }
    remove() {
        this.el.parentNode.removeChild(this.el);
      }

    addReaction() { 
    this.reaction = this.el.querySelector('.reaction-status');
    this.reactionStatus = this.reaction.querySelector('span');
        // if(this.reactionStatus.innerHTML>0){
        //     this.number = this.reactionStatus.innerHTML;
        //     console.log (this.number)
        //     this.reactionCounter + this.number + 1;
        // }else{
            this.reactionCounter ++;
        // }
    this.reactionStatus.innerText = this.reactionCounter;
    this.reaction.style.display = "flex";  

    }
    editPost(){
        this.textarea2Edit = this.el.querySelector('.post-text');
        this.text2Edit = this.textarea2Edit.innerText;
        this.textarea2Edit.innerHTML=`
        <div class="post-text edit"><textarea rows="4" cols="50">${this.text2Edit}</textarea>
        <button>Post</button>
        `
        this.postEditApproveButton = this.el.querySelector('.post-text .post-text.edit button');
        this.postEditApproveButton.addEventListener('click', () => this.editApprove());
    }
    editApprove(){
        this.editedText= this.el.querySelector('.post-text .post-text.edit');
        this.textArea2= this.editedText.querySelector('textarea');
        this.text2Save = this.textArea2.value;
        this.textarea2Edit.innerHTML=`<div class="post-text">${this.text2Save}</div>`;
    }

    addComment() {
        // this.userCommentForm = this.el.querySelector('.post-user-comments');
        this.commentBody = this.el.querySelector('input')
        this.commentText = this.commentBody.value;
        this.commentArea = document.createElement(`DIV`);
        this.commentArea.className = `post-friends-comments`;
        this.commentArea.style.margin = "1px 10px";
        this.commentArea.innerHTML=`
        <div class="post-top">
            <div class= "user-img"><img src="img/user-img.jpg"></div>
            <div class="info"> 
                <div class="postting-name">Benny Pakman</div>
                <div class="text-small">${this.commentText}</div>
            </div>
        </div> `;
        this.el.insertBefore(this.commentArea, this.el.lastChild);
        this.commentBody.value = ' ';
        
      }

}

let mainEl = document.querySelector('.main');
new Feed(mainEl, 7);

