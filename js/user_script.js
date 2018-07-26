// getting the userName arguments we gonne use from the userName Service class
export default class User {
    constructor(userObj){
        this.fullname = userObj.name;
        this.id = userObj.id;
    }
}