import { useSelector, useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { ReduxState } from "../../redux/types";
import { useEffect, useState } from "react";
import { MensagemState, alterarMensagem, buscarMensagem, gravarMensagem } from "../../redux/reducers/mensagens";
import { UsuarioState, buscarUsuario } from "../../redux/reducers/usuario";
import { Button, Container, Form, Image } from "react-bootstrap";
import { ChatBox, ChatBoxContent, ChatBoxInfo, ChatBoxMessage } from "./bate-papo.styles";
import { Mensagem } from "../../types/entity-types";
import { Menu } from "../../templates/menu";

export const BatePapo = () => {
    const usuarioDispatch: ThunkDispatch<UsuarioState, any, AnyAction> = useDispatch()
    const mensagemDispatch: ThunkDispatch<MensagemState, any, AnyAction> = useDispatch()
    const { status, listaUsuarios } = useSelector((state: ReduxState) => state.usuario)
    const { listaMensagem } = useSelector((state: ReduxState) => state.mensagem)
    const [usuarioId, setUsuarioID] = useState(0)

    const initialState: Mensagem = {
        id: 0,
        dataHora: "",
        lida: false,
        mensagem: "",
        usuario: {
            id: 0,
            dataIngresso: "",
            mensagens: [],
            nickname: "",
            urlAvatar: "",
        }
    }

    const [mensagem, setMensagem]: any = useState(initialState)

    function changesData(e: any) {
        const component = e.currentTarget;
        setMensagem({ ...mensagem, [component.name]: component.value });
    }

    function changedId(e: any) {
        const component = e.currentTarget;
        setMensagem({
            ...mensagem, usuario: {
                id: component.value
            }
        });
    }

    useEffect(() => {
        usuarioDispatch(buscarMensagem());
        mensagemDispatch(buscarUsuario());

        listaMensagem.forEach((item) => {
            const alter = {
                id: item.id, 
                lida: true
            }
            
            mensagemDispatch(alterarMensagem(alter));
        })

    }, [usuarioDispatch, mensagemDispatch])

    const renderListaUsuarios = () => {
        return (
            <Form.Select
                style={{ width: 350 }}
                value={mensagem.usuario.id}
                onChange={changedId}
            >
                {listaUsuarios.map((item) => (
                    <option value={item.id}>{item.nickname}</option>
                ))}
            </Form.Select>
        )
    }

    const renderInputMensagem = () => {

        function enviarMensagem() {
            console.log(mensagem);

            mensagemDispatch(gravarMensagem(mensagem))
        }

        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <Form.Control
                    value={mensagem.mensagem}
                    onChange={changesData}
                    name="mensagem"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                />
                <Button style={{ marginTop: 20 }} variant="primary" onClick={enviarMensagem} >Enviar</Button>
            </div>
        )
    }

    const renderListaMensagens = () => {

        return (
            <>
                {listaMensagem.map((item) => (
                    <>
                        {renderLista(item)}
                    </>
                ))
                }
            </>
        )
    }

    const renderLista = (item: Mensagem) => {

        return (
            <ChatBox>
                <ChatBoxContent>
                    <ChatBoxInfo>
                        <Image src={item.usuario?.urlAvatar} width={50} height={50} />
                        <h6>{item.usuario?.nickname}</h6>
                    </ChatBoxInfo>

                    <ChatBoxMessage>
                        {item.mensagem}
                    </ChatBoxMessage>

                </ChatBoxContent>
            </ChatBox >
        )

    }

    return (
        <>
            <Menu />
            {renderListaMensagens()}
            <Container style={{ display: "flex", gap: 20, marginTop: 250, marginBottom: 150 }}>
                {renderListaUsuarios()}
                {renderInputMensagem()}
            </Container>
        </>
    )
} 