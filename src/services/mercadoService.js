import {
    collection,
    getDocs,
    orderBy,
    query
} from "firebase/firestore";

import { db } from "../firebase";

const pesquisasRef = collection(db,"pesquisas");

export async function listarPesquisas(){

    const q=query(
        pesquisasRef,
        orderBy("metadata.criadoEm","desc")
    );

    const snapshot=await getDocs(q);

    return snapshot.docs.map(doc=>({

        id:doc.id,

        ...doc.data()

    }));

}

export async function obterIndicadores(){

    const pesquisas=await listarPesquisas();

    const estados=new Set();

    let interessados=0;

    let beta=0;

    pesquisas.forEach(item=>{

        if(item?.empresa?.estado){

            estados.add(item.empresa.estado);

        }

        if(item?.respostas?.interesse==="Sim"){

            interessados++;

        }

        if(item?.respostas?.beta==="Sim"){

            beta++;

        }

    });

    return{

        pesquisas,

        total:pesquisas.length,

        interessados,

        beta,

        estados:estados.size

    };

}