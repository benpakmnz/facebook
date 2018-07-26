export default class EditEl {
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