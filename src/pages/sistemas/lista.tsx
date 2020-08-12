import 'react-tabulator/lib/css/tabulator.min.css';
import 'react-tabulator/lib/styles.css';

import { Button, makeStyles, Menu, MenuItem, Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import { useConfirm } from 'material-ui-confirm';
import React, { SetStateAction, useCallback } from 'react';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { reactFormatter, ReactTabulator } from 'react-tabulator';

//import 'material-icons';
interface Sistema {
  nome: string;
  ativo: boolean;
  id: number;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  paper: {
    display: 'flex',
    maxWidth: 800,
    flexDirection: 'column',
    padding: '10px',
  },
  coluna: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'space-around',
    '& div': {
      margin: '5px',
      fontSize: '27px',
      fontWeight: 40,
    },
  },
  button: {
    flex: 1,
    margin: '16px 0',
  },
}));

const Lista = () => {
  const confirm = useConfirm();
  const classes = useStyles();
  const [data, setData] = useState<Sistema[]>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const rect = anchorEl?.getBoundingClientRect();
  const style: React.CSSProperties = {
    top: rect ? `${rect.top + 10}px` : 'unset',
    left: rect ? `${rect.left}px` : 'unset',
  };

  const deleteFunc = useCallback((event: React.BaseSyntheticEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log('target', event.target.closest('div'));
    setAnchorEl(event.currentTarget);
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5630/sistemas').then((result) => {
      setData(result.data);
      console.log(result.data);
      //await new Promise(resolve => setTimeout(resolve,500));
    });
  }, []);

  if (!data) return <div>loading...</div>;

  // function deleteFunc(event: any, cell: any){
  //   const data = cell.getRow().getData();

  //   console.log(data.id+ '  '+ data.nome);

  // confirm({
  //   title: 'Confirmação',
  //   confirmationText: 'Confirmar',
  //   cancellationText: 'Cancelar',
  //   description: 'Confirmar excluir o sistema: '+data.nome })
  //   .then( async () => {
  //     await axios.delete(`http://localhost:5630/sistemas/${data.id}`)
  //     cell.getRow().delete()
  //   });

  //.catch(() => { /* */ });

  //SetStateAction<null>
  // const st =  document.getElementById("icone");
  // st?.closest()
  //     console.log('target', event.target.closest('div'))
  //     setAnchorEl( event.target.closest('div') );

  // };

  const columns = [
    {
      title: 'Exclir',
      formatter: reactFormatter(<FaTrash id="icone" name="icone" aria-controls="simple-menu" aria-haspopup="true" />),
      headerSort: false,
      hozAlign: 'center',
      cellClick: deleteFunc,
      width: 50,
    },
    { title: 'id', field: 'id', width: 100 },
    { title: 'Nome', field: 'nome', width: 200 },
    { title: 'Ativo', field: 'ativo', width: 80 },
  ];

  const options = {
    history: true,
    layoutColumnsOnNewData: true,
    virtualDom: false,
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event?.currentTarget);
    console.log(event?.currentTarget);
  };

  //-----------------------------------------------------------------------------------------------------------------------
  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <h2>Lista de sistemas</h2>

        <Divider />
        <ReactTabulator data={data} options={options} columns={columns} tooltips={true} layout={'fitData'} />

        <Button id="bbb1" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Open Menu
        </Button>

        <Menu style={style} id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
          <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
        </Menu>
      </Paper>
    </div>
  );
};

export default Lista;

// <div className={classes.container}>
//     <Paper className={classes.paper}>
//         <h2>Lista de sistemas</h2>
//         <Divider />
//         {posts?.map(s =>
//             <>
//             <div key={s.id} className={classes.coluna}>
//                 <div>{s.id}</div>
//                 <div>{s.nome}</div>
//                 <div>Ativo: {s.ativo ? 'sim' : 'não' }</div>
//                 <IconButton>
//                 <FaTrash color="#000000" />
//                 </IconButton>
//             </div>
//             <Divider />
//             </>
//         )}
//     </Paper>
// </div>
