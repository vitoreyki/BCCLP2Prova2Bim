import { Alert } from "react-bootstrap";
import { Props } from "./types";

export const Rodape = ({ content }: Props) => {
    return (
        <footer>
            <div style={{
                position: 'absolute',
                border: '1px solid black',
                borderRadius: '5px',
                padding: '5px',
                margin: '3px',
                width: '99%',
                left: 0,
                bottom: 0,
            }}>
                <p>{content || ""}</p>
            </div>
        </footer>
    )
}