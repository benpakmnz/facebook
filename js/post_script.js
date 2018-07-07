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
      localStorage.setItem("post", JSON.stringify(res)) 
      res.posts.forEach(element => {
        let feedEl = document.querySelector('.main');
        let post = new PostType1(element.message, element , element.userProfilePic);
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
        let post = new PostType1(postBody, this.user, this.profilePicUrl);
        this.appendPost(post.el);
      }
    appendPost(postToAppend){
        this.feedEl.insertBefore(postToAppend, this.feedEl.children[1]);
    }
     
}

class PostTemplate{
    constructor(el){
        this.el = el;
        this.editEl = new EditEl(this.el);
        this.reaction = new Reaction(this.el , 0);
        this.removeEl = new RemoveEl(this.el);
        this.comments = new Comments(this.el);
    }
}
class PostType1{
    constructor(postBody , author , userPic){
        this.el = document.createElement(`article`);
        this.el.className = `post-content`;
        this.el.innerHTML =`
            <div class="post-top">
            <div class="user-img"><img src="${userPic}">
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
        this.postTemplate = new PostTemplate(this.el);
    }
}

class Comments{
    constructor(el){
        this.el = el;
        this.postCommentButton = this.el.querySelector('.post-user-comments .add-comment .text-area-container .emoji');
        this.commentInput = this.el.querySelector('input');
        this.postCommentButton.addEventListener('click', () => this.addComment()); 
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

class EditEl {
    constructor(el){
        this.el= el;
        this.postEditButton = this.el.querySelector('.post-top .icons.more.post ul li:nth-child(1)');
        this.postEditButton.addEventListener('click', () => this.editPost());
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
}

class Reaction {
    constructor(el , counter) {
        this.el= el;
        this.reactionCounter= counter;
        this.likeButton = this.el.querySelector('.react-button.like');
        this.likeButton.addEventListener('click', () => this.addReaction(1));
        
        }

    addReaction(calculate) { 
        this.reaction = this.el.querySelector('.reaction-status');
        this.reactionStatus = this.reaction.querySelector('span');
        this.reactionCounter =  this.reactionCounter + calculate;
        this.reactionStatus.innerText = this.reactionCounter;
        this.reaction.style.display = "flex";  
    
    }


}

class RemoveEl {
    constructor(el) {   
        this.el =el;
    this.removeButton = this.el.querySelectorAll('li')[1];
    this.removeButton.addEventListener('click', () => this.remove());
    }
    remove() {
        this.el.parentNode.removeChild(this.el);
    }

}

let mainEl = document.querySelector('.main');
new Feed(mainEl, 7);

