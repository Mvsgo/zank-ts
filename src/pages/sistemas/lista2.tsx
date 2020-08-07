import { Button, IconButton, makeStyles, Menu, MenuItem, Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import { useConfirm } from 'material-ui-confirm';
import React, { SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FiMoreVertical } from 'react-icons/fi';

import CustomMenu from '../utils/custon-menu';

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

const Lista2 = () => {
  const confirm = useConfirm();
  const classes = useStyles();
  const [data, setData] = useState<Sistema[]>();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5630/sistemas').then((result) => {
      //simulando uma demora na resposta do backend
      setData(result.data);
      console.log(result.data);
      //await new Promise(resolve => setTimeout(resolve,500));
    });
  }, []);

  if (!data) return <div>loading...</div>;

  const handleButtonClick = (event: any, id: any) => {
    setAnchorEl(event.currentTarget);
    //console.log('clicked row >');
    //console.log('clicked row = ', id);
  };

  const handleClick = (event: any) => {
    console.log('clicked ---------------');
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const columns = [
    {
      name: 'Menu',
      //cell: (row: Sistema) => <IconButton color="primary" onClick={() => handleButtonClick(row.id)}><FiMoreVertical /></IconButton>,
      cell: () => <CustomMenu items = { {caption:'Deletar',funcao:'nada'},{caption:'Editar',funcao:'ndada'}[] } />,
      button: true,
    },
    { name: 'id', selector: 'id', sortable: true },
    { name: 'Nome', selector: 'nome', sortable: true },
    { name: 'Ativo', selector: 'ativo', sortable: true },
  ];
  //cell: (row) => <div style={{ fontWeight: bold }}>{row.nome}</div>,

  //-----------------------------------------------------------------------------------------------------------------------
  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <h2>Lista de sistemas</h2>

        <Divider />

        <DataTable columns={columns} data={data} onRowClicked={handleButtonClick} />
      </Paper>
    </div>
  );
};

export default Lista2;
