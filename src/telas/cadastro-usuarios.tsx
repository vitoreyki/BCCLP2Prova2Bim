import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { UsuarioState, gravarUsuario } from "../redux/reducers/usuario";
import { Menu } from "../templates/menu";
import { Usuario } from "../types/entity-types";

export const CadastroUsuários = () => {

    const usuarioDispatch: ThunkDispatch<UsuarioState, any, AnyAction> = useDispatch()
    const initialState: Usuario = {
        id: 0,
        dataIngresso: "",
        nickname: "",
        mensagens: [],
        urlAvatar: ""
    }

    const [usuario, setUsuario] = useState(initialState)

    function changesData(e: any) {
        const component = e.currentTarget;
        setUsuario({ ...usuario, [component.name]: component.value });
    }

    function enviarUsuario () {
        console.log(usuario);
        
        usuarioDispatch(gravarUsuario(usuario))
    }

    return (
        <>
            <Menu />
            <div style={{ width: "80%", margin: "0 auto" }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 50, marginTop: 100 }}>
                    <Form.Control
                        value={usuario.nickname}
                        onChange={changesData}
                        name="nickname"
                        placeholder="Insira seu nickname"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                    />
                    <Form.Control
                        value={usuario.urlAvatar}
                        onChange={changesData}
                        name="urlAvatar"
                        placeholder="URL do seu avatar"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                    />
                </div>
                <Button style={{ marginTop: 20 }} variant="primary" onClick={enviarUsuario} >Enviar</Button>
            </div>
        </>
    )
}