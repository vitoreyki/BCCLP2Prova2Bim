import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Usuario } from "../../types/entity-types";
import estadoStore from "../../recursos/store";

const urlBase = "https://backend-bcc-2-b.vercel.app/usuario";

export type UsuarioState = {
    status: number;
    mensagem: string;
    listaUsuarios: Usuario[]
}

const initialState: UsuarioState = {
    status: estadoStore.ocioso,
    mensagem: "",
    listaUsuarios: [],
};

export const buscarUsuario = createAsyncThunk('usuario/buscar', async () => {
    try {
        const resposta = await fetch(urlBase, { method: 'GET' });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                listaUsuarios: dados.listaUsuarios
            }
        }
        else {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
            }
        }
    } catch (erro: any) {
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao recuperar os usuários da base de dados:' + erro.message
        }
    }
});

export const gravarUsuario = createAsyncThunk('usuario/gravar', async (usuario: Usuario) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nickname: usuario.nickname,
                urlAvatar: usuario.urlAvatar
            }),
        });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                id: dados.id,
                mensagem: dados.mensagem,
            };
        } else {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
            };
        }
    } catch (erro: any) {
        return {
            status: false,
            mensagem: "Error: " + erro.mensagem,
        };
    }
})

export const alterarUsuario = createAsyncThunk('usuario/alterar', async (usuario: Usuario) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: usuario.id,
                nickname: usuario.nickname,
                urlAvatar: usuario.urlAvatar
            }),
        });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
            };
        } else {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
            };
        }
    } catch (erro: any) {
        return {
            status: false,
            mensagem: "Error: " + erro.mensagem,
        };
    }
})

export const removerUsuario = createAsyncThunk('usuario/deletar', async (usuario: Usuario) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: usuario.id
            }),
        });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
            };
        } else {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
            };
        }
    } catch (erro: any) {
        return {
            status: false,
            mensagem: "Error: " + erro.mensagem,
        };
    }
});

const usuarioSlicer = createSlice({
    name: "usuario",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(buscarUsuario.pending, (state, action) => {
          state.status = estadoStore.pendente;
        })
        .addCase(buscarUsuario.fulfilled, (state, action) => {
          if (action.payload.status) {
            state.status = estadoStore.ocioso;
            state.mensagem = action.payload.mensagem as string;
            state.listaUsuarios = action.payload.listaUsuarios;
          } else {
            state.status = estadoStore.erro;
            state.mensagem = action.payload.mensagem;
          }
        })
        .addCase(buscarUsuario.rejected, (state, action: any) => {
          state.status = estadoStore.erro;
          state.mensagem = action.error.message;
          state.listaUsuarios = [];
        })
        .addCase(gravarUsuario.pending, (state, action) => {
          state.status = estadoStore.pendente;
        })
        .addCase(gravarUsuario.fulfilled, (state, action) => {
          if (action.payload.status) {
            state.status = estadoStore.ocioso;
            state.mensagem = action.payload.mensagem;
          } else {
            state.status = estadoStore.erro;
            state.mensagem = action.payload.mensagem;
          }
        })
        .addCase(gravarUsuario.rejected, (state, action) => {
          state.status = estadoStore.erro;
          state.mensagem = action.error.message as string;
        })
        .addCase(alterarUsuario.pending, (state, action) => {
          state.status = estadoStore.pendente;
        })
        .addCase(alterarUsuario.fulfilled, (state, action) => {
          if (action.payload.status) {
            state.status = estadoStore.ocioso;
            state.mensagem = action.payload.mensagem as string;
          } else {
            state.status = estadoStore.erro;
            state.mensagem = action.payload.mensagem;
          }
        })
        .addCase(alterarUsuario.rejected, (state, action) => {
          state.status = estadoStore.erro;
          state.mensagem = action.error.message as string;
        })
        .addCase(removerUsuario.pending, (state, action) => {
          state.status = estadoStore.pendente;
        })
        .addCase(removerUsuario.fulfilled, (state, action) => {
          if (action.payload.status) {
            state.status = estadoStore.ocioso;
            state.mensagem = action.payload.mensagem;
          } else {
            state.status = estadoStore.erro;
            state.mensagem = action.payload.mensagem;
          }
        })
        .addCase(removerUsuario.rejected, (state, action) => {
          state.status = estadoStore.erro;
          state.mensagem = action.error.message as string;
        });
    },
  });
  
  export default usuarioSlicer.reducer;
  