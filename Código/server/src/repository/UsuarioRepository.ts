class UsuarioRepository {
    static readonly modelName = 'usuario'
    async login(key: string, data: any) {
        const result = {}

        return result;
    }

    async cadastrar(data: any) {
        const result = {}

        return result;
    }

    private buildMessage(data: any) {
        return {
            modelName: UsuarioRepository.modelName,
            data
        }
    }
}

export default new UsuarioRepository();
