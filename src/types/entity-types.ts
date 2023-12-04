export type Usuario = {
    id?: number;
    nickname?: string;
    urlAvatar?: string;
    dataIngresso?: string;
    mensagens?: Mensagem[]
};

export type Mensagem = {
    id?: number;
    dataHora?: string;
    lida?: boolean;
    mensagem?: string;
    usuario?: Usuario
}