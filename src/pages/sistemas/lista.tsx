import 'react-tabulator/lib/css/tabulator.min.css';
import 'react-tabulator/lib/styles.css';

import { Button, Paper, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { useConfirm } from 'material-ui-confirm';
import React from 'react';
import { useEffect, useState } from 'react';
import { reactFormatter, ReactTabulator } from 'react-tabulator';
import api from 'src/api';
import CustomMenu from 'src/utils/custom-menu';

import Sistema from './sistemas';

interface Sistema {
  nome: string;
  ativo: boolean;
  id: number;
}

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
  //const classes = useStyles();
  const [data, setData] = useState<Sistema[]>();
  //const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const imEditar = 'Editar',
    imDeletar = 'Deletar';

  // const rect = anchorEl?.getBoundingClientRect();
  // const style: React.CSSProperties = {
  //   top: rect ? `${rect.top + 10}px` : 'unset',
  //   left: rect ? `${rect.left}px` : 'unset',
  // };

  // const deleteFunc = useCallback((event: React.BaseSyntheticEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   console.log('target', event.target.closest('div'));
  //   setAnchorEl(event.currentTarget);
  // }, []);

  useEffect(() => {
    api()
      .get('/sistemas')
      .then((result) => {
        setData(result.data);
        console.log(result.data);
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
        await api().delete(`/sistemas/${row.data.id}`);
        row.delete();
      });
    } else if (caption === imEditar) {
      props.history.push(`/sistema/${row.data.id}`);
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
    { title: 'id', field: 'id', width: 50 },
    { title: 'Nome', field: 'nome' },
    { title: 'Ativo', field: 'ativo', width: 50, hozAlign: 'center', formatter: 'tickCross', headerSort: false },
  ];

  const options = {
    history: true,
    layoutColumnsOnNewData: true,
    virtualDom: false,
    width: '400px',
  };

  const handleNovo = () => {
    props.history.push('/sistema/0');
  };

  //-----------------------------------------------------------------------------------------------------------------------

  return (
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
  );
};

export default Lista;

//  <div className={classes.container}>
// <Paper className={classes.paper}>
//   <h2>Lista de sistemas</h2>
//   <Divider />
//   <ReactTabulator data={data} options={options} columns={columns} tooltips={false} layout={'fitData'} />
// </Paper>
// </div>

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
