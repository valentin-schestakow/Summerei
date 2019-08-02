
/**
 * Model of a User
 */
export class User {

    /**
     * id from Firebase
     */
    id: string;
    /**
     * self explanatory
     */
    email: string;
    /**
     * self explanatory
     */
    name: string;


    /**
     * self explanatory
     *
     * @param id
     * @param email
     * @param password
     * @param name
     */
    constructor(id?: string, email?: string, password?:string, name?: string) {
        this.id = id;
        this.email = email;
        this.name = name;
    }
}
