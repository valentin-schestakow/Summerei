import {Hive} from './hive.model';

export class User {

    id: string;
    creationDate: string;
    email: string;
    name: string;
    hives: Hive[];



    constructor(id?: string, email?: string, name?: string, hives?: Hive[], creationDate?: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.hives = hives;
        this.creationDate = creationDate;
    }
}
