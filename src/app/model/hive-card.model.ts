export class HiveCard {

    id: number;
    volkId: number;
    erstelldatum: string;
    belagwaben: string;
    stadium: string;
    sanftmut: string;
    schwarmverhalten: string;
    koenigin_gesehen: boolean;
    auffaeligkeiten: string;
    bemerkungen: string;
    hiveName: string;


    constructor( volkId?: number, erstelldatum?: string, belagwaben?: string, stadium?: string, sanftmut?: string,
                 schwarmverhalten?: string, koenigin_gesehen?: boolean, auffaeligkeiten?: string, bemerkungen?: string, hiveName?: string) {
       this.volkId = volkId;
       this.erstelldatum = erstelldatum;
       this.belagwaben = belagwaben;
       this.stadium = stadium;
       this.sanftmut = sanftmut;
       this.schwarmverhalten = schwarmverhalten;
       this.koenigin_gesehen = koenigin_gesehen;
       this.auffaeligkeiten = auffaeligkeiten;
       this.bemerkungen = bemerkungen;
       this.hiveName = hiveName;
    }
}
