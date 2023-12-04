import { MensagemState } from "./reducers/mensagens"
import { UsuarioState } from "./reducers/usuario"

export type ReduxState = {
    usuario: UsuarioState,
    mensagem: MensagemState
}