import { configureStore } from "@reduxjs/toolkit";
import usuarioSlicer from "./reducers/usuario"
import mensagemSlicer from "./reducers/mensagens"

const store = configureStore({
    reducer: {
        usuario: usuarioSlicer,
        mensagem: mensagemSlicer,
    }
})

export default store;