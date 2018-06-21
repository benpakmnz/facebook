class User{
    constructor(name, lastname){
      this.name = name;
      this.lastname = lastname;
    }
    get fullname(){
      return `${this.name} ${this.lastname}`;
    }
  }
  

  
  class Feed {
    constructor(feedEl){
      this.feedEl=feedEl;
      this.user = new User('Benny', 'Pakman');
      this.postButton = document.querySelector('button');
      this.textArea = document.querySelector('textarea');
      // this.likeStatus = document.querySelector('react-button.like');
      this.postButton.addEventListener('click', () => this.createPost());

    }
    
    createPost(){
      let postBody = this.textArea.value;
      this.textArea.value = '';
      let post = new Post(postBody, this.user);
      this.feedEl.insertBefore(post.el, this.feedEl.children[1]);
    }
    
  }
  
  class Post{
    constructor(postBody , author ){
      
      this.el = document.createElement('article');
      this.el.className = "post-content";
      this.el.innerHTML =`
      <div class="post-top">
      <div class="user-img">
          <img src="img/user-img.jpg">
      </div>
      <div class="info">
          <div class="postting-name">${author.fullname}</div>
          <div class="text-small">1 hr</div>
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
                this.likeButton = this.el.querySelector('.react-button.like');
                this.likeButton.addEventListener('click', () => this.addReaction());
                this.reactionCounter= 0;
                this.postEditButton = this.el.querySelector('.post-top .icons.more.post ul li:nth-child(1)');
                this.postEditButton.addEventListener('click', () => this.editPost());


                
    }
    remove() {
      this.el.parentNode.removeChild(this.el);
    }
    addReaction() {
      this.reaction = this.el.querySelector('.reaction-status');
      this.reactionCounter ++;
      this.reactionStatus = this.reaction.querySelector('span');
      console.log(this.reactionStatus);
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
        this.textarea2Edit.innerHTML=`<div class="post-text">${this.approvalText}</div>`;
    }

  }




  
  new Feed(document.querySelector('.main'));



  
