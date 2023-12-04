import { Cabecalho } from "./cabecalho";
import { Menu } from "./menu";
import { Rodape } from "./rodape";
import { Props } from "./types";

export const Pagina = ({children}: Props) => {
    return (
        <>
            <Cabecalho content='Bate-Papo' />
            <Menu />
            <div>
                {
                    // filhos da página
                }
                {children} 
            </div>
            <Rodape content="Aplicação realizada na prova de LP2 BCC"/>
        </>
    )
}