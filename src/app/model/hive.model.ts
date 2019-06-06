import {HiveCard} from './hive-card.model';

export class Hive {
    id: number;
    erstelldatum: string;
    name: string;
    königinFarbe: string;
    rasse: string;
    beutenart: string;
    stockkarten : HiveCard[];
    mitglieder: string[];
    adminId: string;



    constructor(id?: number, stockkarten?: HiveCard[], erstelldatum?: string, name?: string, königinFarbe?: string, rasse?: string, beutenart?: string,
                 mitglieder?: string[], adminId?: string) {
        this.id = id;
        this.erstelldatum = erstelldatum;
        this.name = name;
        this.königinFarbe = königinFarbe;
        this.rasse = rasse;
        this.beutenart = beutenart;
        this.stockkarten = stockkarten;
        this.mitglieder = mitglieder;
        this.adminId = adminId
    }
}
