import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

export interface Sistema {
	nome: string;
	ativo: boolean;
	id: number;
}

const Lista =  () => {
    const [posts, setPosts] = useState<Sistema[]>();

    useEffect(() => {
        axios.get('http://localhost:5630/sistemas').then(result => {
            //simulando uma demora na resposta do backend
            setPosts(result.data);
            console.log(result.data);
            //await new Promise(resolve => setTimeout(resolve,500));
        })
    }, []);

    if (!posts ) return <div>loading...</div>;

    //converte para tipo sistema
    //const newPosts = posts as Sistema[];
    
    return (
        <ul>

           { 
           posts?.map(s =>  <li> {s.id} - {s.nome} - {s.ativo.valueOf } </li> )
           }

       </ul>
    );
}

export default Lista;

