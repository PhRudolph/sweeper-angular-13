export class Panel{         //default panel properties
    value = "";
    revealed = false;
    adjmines = 0;
    flag = false;

    id: number;
    constructor(takid: number){ 
        this.id = takid; 
    }
}