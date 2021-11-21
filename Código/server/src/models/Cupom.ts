export default class Cupom {
    private codigo: number;

    constructor(codigo: number) {
        this.codigo = codigo;
    }

    static fromJSON(json: string) {
        const data = JSON.parse(json);
        const cupom = new Cupom(data.codigo);

        return cupom;
    }

    get JSON() {
        return JSON.stringify({
            codigo: this.codigo,
        });
    }
}
