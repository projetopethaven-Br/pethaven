import "./MercadoDetalhe.css";

import { useParams } from "react-router-dom";

export default function MercadoDetalhe(){

    const {id}=useParams();

    return(

        <div className="mercado-detalhe">

            <h1>Ficha da Empresa</h1>

            <p>ID da pesquisa:</p>

            <strong>{id}</strong>

        </div>

    );

}