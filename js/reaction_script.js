export default class Reaction {
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