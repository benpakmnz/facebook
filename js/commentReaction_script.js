export default class CommentReaction {
    constructor(el) {   
    this.el = el;
    this.commentReaction = this.el.querySelector('.post-friends-comments .comments-reactions span');
    this.commentReaction.addEventListener('click', () => console.log("like"));
    }
}