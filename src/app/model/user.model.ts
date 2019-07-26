import {Hive} from './hive.model';

export class User {

    id: string;
    email: string;
    name: string;



    constructor(id?: string, email?: string, password?:string, name?: string) {
        this.id = id;
        this.email = email;
        this.name = name;
    }
}
