import {Hive} from './hive.model';

export class User {

    id: string;
    creationDate: string;
    email: string;
    name: string;



    constructor(id?: string, email?: string, name?: string, creationDate?: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.creationDate = creationDate;
    }
}
