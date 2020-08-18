import { makeStyles, Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FcCheckmark } from 'react-icons/fc';

import CustomMenu from '../utils/custom-menu';

//import { useConfirm } from 'material-ui-confirm';
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
  //const confirm = useConfirm();
  const classes = useStyles();
  const [data, setData] = useState<Sistema[]>();
  //const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5630/sistemas').then((result) => {
      //simulando uma demora na resposta do backend
      setData(result.data);
      console.log(result.data);
      //await new Promise(resolve => setTimeout(resolve,500));
    });
  }, []);

  if (!data) return <div>loading...</div>;

  //const state: any = { selectedRows: [], toggleCleared: false, data: data };

  const handleButtonClick = (event: any, id: any) => {
    //setAnchorEl(event.currentTarget);
    //console.log('clicked row >');
    //console.log('clicked row = ', id);
  };

  //function deleteFunc(idKey: number) {
  // confirm({
  //   title: 'Confirmação',
  //   confirmationText: 'Confirmar',
  //   cancellationText: 'Cancelar',
  //   description: 'Confirmar excluir o sistema: ' + data.nome,
  // })
  //   .then(async () => {
  //     await axios.delete(`http://localhost:5630/sistemas/${idKey}`);
  //     cell.getRow().delete();
  //   })
  //   .catch(() => {
  //     /* */
  //   });

  const handleItemMenu = (caption: string, row: Sistema) => {
    console.log('clicked item menu > ' + caption + ':' + row.id);

    // if (window.confirm(`Are you sure you want to delete:\r ${row.nome}?`)) {
    //   const { data } = state;
    //   const index = data.findIndex((r: Sistema) => r === row);

    //   // setState((state) => ({
    //   //   toggleCleared: !state.toggleCleared,
    //   //   data: [...state.data.slice(0, index), ...state.data.slice(index + 1)],
    //   // }));
    // }
  };
  ///}

  const columns = [
    {
      name: 'Menu',
      cell: (row: Sistema) => <CustomMenu row={row} onClickItemMenu={handleItemMenu} items={['Editar', 'Deletar']} />,
      button: true,
    },
    { name: 'id', selector: 'id', sortable: true },
    { name: 'Nome', selector: 'nome', sortable: true },
    { name: 'Ativo', cell: (row: Sistema) => (row.ativo ? <FcCheckmark /> : null), button: false },
  ];

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
