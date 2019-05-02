export interface ITrain {
    id?: number;
    name?: string;
    addr?: string;
    contactNumber?: number;
}

export class Train implements ITrain {
    constructor(public id?: number, public name?: string, public addr?: string, public contactNumber?: number) {}
}
