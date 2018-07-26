import EditEl from './editEl_script';
import Reaction from './reaction_script';
import RemoveEl from './removeEl_script';
import Comments from './comments_script'

export default class PostTemplate{
    constructor(el){
        this.el = el;
        this.editEl = new EditEl(this.el);
        this.reaction = new Reaction(this.el , 0);
        this.removeEl = new RemoveEl(this.el);
        this.comments = new Comments(this.el);
        
    }
}