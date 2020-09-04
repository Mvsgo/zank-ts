import 'react-tabulator/lib/css/tabulator.min.css';
import 'react-tabulator/lib/styles.css';

import { Button, Dialog, Paper, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { useConfirm } from 'material-ui-confirm';
import React, { useEffect, useState } from 'react';
import { reactFormatter, ReactTabulator } from 'react-tabulator';
import api from 'src/api';
import CustomMenu from 'src/utils/custom-menu';

import Cadastro from './cadastro';
import helper, { ISistemasFormData } from './helper';

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: 'flex',
//     height: '100%',
//     width: '100%',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     flexDirection: 'column',
//   },
//   paper: {
//     display: 'flex',
//     maxWidth: 800,
//     flexDirection: 'column',
//     padding: '10px',
//   },
//   coluna: {
//     display: 'flex',
//     justifyContent: 'flex-start',
//     alignItems: 'space-around',
//     '& div': {
//       margin: '5px',
//       fontSize: '27px',
//       fontWeight: 40,
//     },
//   },
//   button: {
//     flex: 1,
//     margin: '16px 0',
//   },
// }));

const Lista = (props: any) => {
  const confirm = useConfirm();
  const [data, setData] = useState<ISistemasFormData[]>([]);
  const [row, setDataRow] = useState<ISistemasFormData>(helper.defaultValues);
  const [openCad, setOpenCad] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const imEditar = 'Editar',
    imDeletar = 'Deletar';

  useEffect(() => {
    api()
      .get('/sistemas')
      .then((result) => {
        console.log(result.data);
        setData(result.data.docs);
        //await new Promise(resolve => setTimeout(resolve,500));
      });
  }, []);

  if (!data) return <div>loading...</div>;

  const handleItemMenu = (caption: string, row: any) => {
    //console.log('clicked item menu > ' + caption + ':' + row.data.nome);

    if (caption === imDeletar) {
      confirm({
        title: 'Confirmação',
        confirmationText: 'Confirmar',
        cancellationText: 'Cancelar',
        description: 'Confirmar excluir o sistema: ' + row.data.nome,
      }).then(async () => {
        await api().delete(`/sistemas/${row.data._id}`);
        row.delete();
      });
    } else if (caption === imEditar) {
      //props.history.push(`/sistema/${row.data._id}`);
      setDataRow(row.data); //as ISistemasFormData
      setOpenCad(true);
    }
  };

  function SimpleButton(props: any) {
    const rowData = props.cell._cell.row;
    //return <ResponsiveDialog />;
    return <CustomMenu row={rowData} onClickItemMenu={handleItemMenu} items={[imEditar, imDeletar]} />;
  }

  const columns = [
    { formatter: 'rownum', hozAlign: 'center', headerSort: false, width: 50 },
    { formatter: reactFormatter(<SimpleButton />), hozAlign: 'center', headerSort: false, width: 50 },
    { title: 'id', field: '_id', width: 50 },
    { title: 'Nome', field: 'nome', width: 300 },
    { title: 'Ativo', field: 'ativo', width: 50, hozAlign: 'center', formatter: 'tickCross', headerSort: false },
  ];

  const options = {
    history: true,
    layoutColumnsOnNewData: true,
    virtualDom: false,
    width: '400px',
  };

  const handleClose = () => {
    setOpenCad(false);
  };

  const handleNovo = () => {
    //props.history.push('/sistema/0');
    setDataRow(helper.defaultValues);
    setOpenCad(true);
  };

  const handleRetorno = (row?: ISistemasFormData) => {
    setOpenCad(false);

    if (!row) {
      console.log('row._id -------------- row is null');
      return;
    }

    console.log('row._id --------------', row._id);
    const index = data.findIndex((e) => e._id === row._id);

    if (index > -1) {
      data[index] = row;
      //ou esse aqui data.splice(index, 1, row);
      //setData(data);
      setDataRow(row);
    } else {
      console.log('index  --------------', index);
      data.push(row);
      setDataRow(row);
    }
  };

  //-----------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <Box clone p={3} maxWidth="800px">
        <Paper>
          <Box clone mb={2} display="flex" justifyContent="space-between">
            <header>
              <Typography variant="h5" gutterBottom>
                Lista de sistemas
              </Typography>
              <Button variant="contained" size="small" color="secondary" onClick={handleNovo}>
                Novo
              </Button>
            </header>
          </Box>
          <Divider />
          <Box clone mt={2}>
            <ReactTabulator data={data} columns={columns} tooltips={true} layout={'fitColumns'} options={options} />
          </Box>
        </Paper>
      </Box>

      <Dialog open={openCad} aria-labelledby="form-dialog-title" fullScreen={fullScreen} onClose={handleClose}>
        <Cadastro open={openCad} retornar={handleRetorno} rowSistema={row} />
      </Dialog>
    </>
  );
};

//rowSistema={row}

export default Lista;
