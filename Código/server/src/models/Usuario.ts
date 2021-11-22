import { Empresa, Aluno } from ".prisma/client";

export default abstract class Usuario{
    abstract login(data: any): Promise<boolean>

    abstract cadastrar(data: any): Promise<Empresa | Aluno>
}
