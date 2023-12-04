import { Alert } from "react-bootstrap";
import { Props } from "./types";
export const Cabecalho = ({ content }: Props) => {
    return (
        <header>
            <Alert variant="light" className={'text-center'} style={{marginTop: 50}}>
                {content || ""}
            </Alert>
        </header>
    )
}