import PostTemplate from './postTemplate_script'

export default class PostType1{
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
                    <img src="https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.0-9/16195861_10154444512113915_2095302407570852635_n.jpg?_nc_cat=0&oh=61abe98535fa2256e4a43cb06469b891&oe=5BC9E7BA">
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