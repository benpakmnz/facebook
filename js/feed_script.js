// feed element will be the one class that wil merge all 
// the data and append it as a full post element in the dome  

// the constructor declare on two arguments:
// feedEl will select the HTML area that suppose to hold the new post
// userId is the argument that gives us the specific user/post/picture 
// it mainly will be use in the services @ begining of the script 
console.log('hiiiiiiiiiiiiiiiiiiiiiiiiii');
import {userService , postsService , userProfilePicsService} from './fetch_script';
import PostType1 from './postType1_script';

export default class Feed {
    constructor(feedEl , userId){
        this.feedEl = feedEl;
        this.fetchUser(userId);
        this.textArea = document.querySelector('textarea');
        console.log(`hi ${userId}`)
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

// // onUser function will use the userName data & send it to 
// // diferent functions that will result it to appear in the HTML areas 
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
// // posting Area function responsble on the user-post element  
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

