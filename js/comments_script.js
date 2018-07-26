import CommentReaction from './commentReaction_script' ;
export default class Comments{
    constructor(el){
        this.el = el;
        this.postCommentButton = this.el.querySelector('.post-user-comments .add-comment .text-area-container .emoji');
        this.commentInput = this.el.querySelector('input');
        this.postCommentButton.addEventListener('click', () => this.addComment());  
            

    }
    addComment() {
        // this.commentBody = this.el.querySelector('input')
        // this.commentBody = this.el.querySelector('input');
        this.commentBody = $(this.el).find(`input`)
        // this.commentText = this.commentBody.value;
        // this.commentArea = document.createElement(`DIV`);
        this.commentArea = $(`<div></div>`)
        .html(`<div class="post-top">
        <div class= "user-img"><img src="https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.0-9/16195861_10154444512113915_2095302407570852635_n.jpg?_nc_cat=0&oh=61abe98535fa2256e4a43cb06469b891&oe=5BC9E7BA"></div>
        <div class="info"> 
            <div class="postting-name">Benny Pakman</div>
            <div class="text-small">${this.commentBody.val()}</div>
        </div>
        </div><div class="comments-reactions"><span>Like</span> . Replay . 6h</div>`)
        .addClass(`post-friends-comments`)
        .appendTo(this.el);

        // this.commentArea.className = `post-friends-comments`;
        // this.commentArea.style.margin = "1px 10px";
        // this.commentArea.innerHTML=`
        // <div class="post-top">
        //     <div class= "user-img"><img src="https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.0-9/16195861_10154444512113915_2095302407570852635_n.jpg?_nc_cat=0&oh=61abe98535fa2256e4a43cb06469b891&oe=5BC9E7BA"></div>
        //     <div class="info"> 
        //         <div class="postting-name">Benny Pakman</div>
        //         <div class="text-small">${this.commentText}</div>
        //     </div>
        // </div> `;
        // this.el.insertBefore(this.commentArea, this.el.lastChild);
        // this.commentBody= $(text(`write a comment`));
        this.commentBody.val(` `)
        this.CommentReaction = new CommentReaction(this.el); 

      }
}
