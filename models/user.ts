interface User {
    id: string;
    cpf: string;
    nome: string;
    perfil: string;
    ativo: boolean;
    password: string;
    confirmationToken?: string;
    recoverToken?: string;
    criadoPor: string;
    criadoEm: Date;
    atualizadoPor: string;
    atualizadoEm: Date;
}