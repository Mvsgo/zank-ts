import { IconButton, makeStyles, Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

interface Sistema {
	nome: string;
	ativo: boolean;
	id: number;
}

const useStyles = makeStyles(theme => ({
    container:{
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems:'center',
        flexDirection: 'column',
    },
    paper:{
        display:'flex',
        width: '100%',
        maxWidth: 800,
        flexDirection: 'column',
    },
    coluna:{
        display:'flex',
        justifyContent: 'flex-start',
        alignItems:'space-around',
        '& div':{
            margin: '5px',
            fontSize: '27px',
            fontWeight: 40,            
        },
    },
    button:{
        flex: 1,
        margin:'16px 0',
    },
   
}));

const Lista =  () => {
    const classes = useStyles();
    const [posts, setPosts] = useState<Sistema[]>();
    //const [posts, setPosts] = useState([]);

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
        <div className={classes.container}>
            <Paper className={classes.paper}>
                <h2>Lista de sistemas</h2>
                <Divider />
                {posts?.map(s => 
                    <>
                    <div key={s.id} className={classes.coluna}>
                        <div>{s.id}</div>
                        <div>{s.nome}</div>
                        <div>Ativo: {s.ativo ? 'sim' : 'não' }</div>
                        <IconButton>
                        <FaTrash color="#000000" />
                        </IconButton>
                    </div>            
                    <Divider />
                    </>
                )}
            </Paper>
        </div>
    );

}

export default Lista;