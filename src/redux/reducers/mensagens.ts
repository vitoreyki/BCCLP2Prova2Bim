import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Mensagem } from "../../types/entity-types";
import estadoStore from "../../recursos/store";

const urlBase = "https://backend-bcc-2-b.vercel.app/mensagem";

export type MensagemState = {
    status: number;
    mensagem: string;
    listaMensagem: Mensagem[]
}

const initialState: MensagemState = {
    status: estadoStore.ocioso,
    mensagem: "",
    listaMensagem: [],
};

export const buscarMensagem = createAsyncThunk('mensagem/buscar', async () => {
    try {
        const resposta = await fetch(urlBase, { method: 'GET' });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                listaMensagens: dados.listaMensagens
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

export const gravarMensagem = createAsyncThunk('mensagem/gravar', async(mensagem: Mensagem) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mensagem: mensagem.mensagem,
                usuario: {
                    id: mensagem.usuario?.id
                }
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
});

export const alterarMensagem = createAsyncThunk('mensagem/alterar', async(mensagem: any) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: mensagem.id,
                lida: mensagem.lida
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

export const removerMensagem = createAsyncThunk('mensagem/remover', async(mensagem: Mensagem) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: mensagem.id
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

const mensagemSlicer = createSlice({
    name: "mensagem",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(buscarMensagem.pending, (state, action) => {
          state.status = estadoStore.pendente;
        })
        .addCase(buscarMensagem.fulfilled, (state, action) => {
          if (action.payload.status) {
            state.status = estadoStore.ocioso;
            state.mensagem = action.payload.mensagem as string;
            state.listaMensagem = action.payload.listaMensagens;
          } else {
            state.status = estadoStore.erro;
            state.mensagem = action.payload.mensagem;
          }
        })
        .addCase(buscarMensagem.rejected, (state, action: any) => {
          state.status = estadoStore.erro;
          state.mensagem = action.error.message;
          state.listaMensagem = [];
        })
        .addCase(gravarMensagem.pending, (state, action) => {
          state.status = estadoStore.pendente;
        })
        .addCase(gravarMensagem.fulfilled, (state, action) => {
          if (action.payload.status) {
            state.status = estadoStore.ocioso;
            state.mensagem = action.payload.mensagem;
          } else {
            state.status = estadoStore.erro;
            state.mensagem = action.payload.mensagem;
          }
        })
        .addCase(gravarMensagem.rejected, (state, action) => {
          state.status = estadoStore.erro;
          state.mensagem = action.error.message as string;
        })
        .addCase(alterarMensagem.pending, (state, action) => {
          state.status = estadoStore.pendente;
        })
        .addCase(alterarMensagem.fulfilled, (state, action) => {
          if (action.payload.status) {
            state.status = estadoStore.ocioso;
            state.mensagem = action.payload.mensagem as string;
          } else {
            state.status = estadoStore.erro;
            state.mensagem = action.payload.mensagem;
          }
        })
        .addCase(alterarMensagem.rejected, (state, action) => {
          state.status = estadoStore.erro;
          state.mensagem = action.error.message as string;
        })
        .addCase(removerMensagem.pending, (state, action) => {
          state.status = estadoStore.pendente;
        })
        .addCase(removerMensagem.fulfilled, (state, action) => {
          if (action.payload.status) {
            state.status = estadoStore.ocioso;
            state.mensagem = action.payload.mensagem;
          } else {
            state.status = estadoStore.erro;
            state.mensagem = action.payload.mensagem;
          }
        })
        .addCase(removerMensagem.rejected, (state, action) => {
          state.status = estadoStore.erro;
          state.mensagem = action.error.message as string;
        });
    },
  });
  
  export default mensagemSlicer.reducer;