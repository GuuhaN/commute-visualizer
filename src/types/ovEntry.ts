export interface OVEntry {
    datum: Date;
    checkIn: string;
    vertrek: string;
    checkUit: string;
    bestemming: string;
    bedrag: number;
    transactie: "Check-in" | "Check-uit";
    klasse: string;
    product: string;
    type: "trein" | "overig";
    opmerkingen: string;
    naam: string;
    kaartnummer: string;
}