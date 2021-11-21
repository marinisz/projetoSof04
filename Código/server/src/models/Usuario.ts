export default abstract class Usuario{
    protected nome: string;
    protected senha: string;

    constructor(nome: string, senha: string) {
        this.nome = nome
        this.senha = senha
    }
}
