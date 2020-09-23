import { yupResolver } from '@hookform/resolvers';
import { Box, Button, Divider, FormControlLabel, Paper, Switch, TextField, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import { TiArrowBack } from 'react-icons/ti';
import { useParams } from 'react-router-dom';
import useApi from 'src/api';

import helper, { ISistemasFormData } from './helper';

const Sistema = (props: any) => {
  const { id } = useParams();
  //const [idKey, setIdKey] = useState<number>(0);
  //const [data, setData] = useState<ISistemasFormData>();
  const { Api } = useApi();

  //const classes = helper.useStyles();

  const { control, handleSubmit, reset, errors, formState } = useForm<ISistemasFormData>({
    defaultValues: helper.defaultValues,
    resolver: yupResolver(helper.schema),
  });

  console.log('inicio id = ', id);

  useEffect(() => {
    if (id > 0) {
      Api()
        .get(`/sistemas/${id}`)
        .then((result) => {
          console.log(result.data);
          //await reset(result.data);
          //await setIdKey(result.data.id);
          //setData(result.data);
          reset(result.data);
        });
    }
  }, [id]);

  const submitForm = handleSubmit(async (data, event) => {
    event?.preventDefault();

    //console.log('submitForm = ', data);

    if (id > 0) {
      console.log('edit id = ', id);
      Api()
        .put(`/sistemas/${id}`, data)
        .then((result) => {
          //props.history.push('/lista');
          //import { useHistory } from "react-router-dom";
          props.history.goBack();
        });
    } else {
      console.log('novo id = ', id);
      Api()
        .post('/sistemas', data)
        .then((result) => {});
    }

    //simulando uma demora na resposta do backend
    await new Promise((resolve) => setTimeout(resolve, 500));

    reset({ ...helper.defaultValues });
    // alert('Sistema inserido com sucesso!');

    // <Alert variant="filled" severity="success">
    // This is a success alert — check it out!
    // </Alert>;
  });

  const handleCancelar = () => {
    props.history.goBack();
  };

  // justifyContent="space-between"
  return (
    <Box clone p={3} maxWidth="800px">
      <Paper>
        <form onSubmit={submitForm} noValidate autoComplete="off">
          <Box clone mb={1} display="flex" justifyContent="space-between">
            <header>
              <Typography variant="h5" gutterBottom>
                Cadastro de Sistemas
              </Typography>

              <Box clone mb={2} display="flex" justifyContent="space-between">
                <div>
                  <Button type="submit" size="small" startIcon={<FaCheck />} color="primary" variant="contained" disabled={formState.isSubmitting}>
                    salvar
                  </Button>
                  <Button variant="contained" size="small" startIcon={<TiArrowBack />} color="secondary" onClick={handleCancelar}>
                    Voltar
                  </Button>
                </div>
              </Box>
            </header>
          </Box>

          <Divider />

          <Box clone mt={3}>
            <div>
              <Controller
                name="nome"
                control={control}
                defaultValue=""
                as={
                  <TextField
                    label="Informe o nome do sistema"
                    variant="outlined"
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                    fullWidth
                    required
                    autoFocus
                  />
                }
              />
              <Controller
                name="ativo"
                control={control}
                render={({ value, onChange }) => (
                  <FormControlLabel label="Sistema Ativo ?" control={<Switch onChange={(e) => onChange(e.target.checked)} checked={value} />} />
                )}
              />
            </div>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Sistema;

// <div className={classes.container}>
// <Paper className={classes.paper}>
//   <Typography variant="h4">Cadastro de Sistemas</Typography>

//   <form onSubmit={submitForm} className={classes.form} noValidate autoComplete="off">
//     {/* <TextField
//       label="Informe o nome do Sistema"
//       name="nome"
//       variant="outlined"
//       error={!!errors.nome}
//       helperText={errors.nome?.message}
//       inputRef={register}
//       fullWidth
//       required
//       autoFocus
//     /> */}
//     {/* <FormControlLabel label="Sistema Ativo?" control={<Switch name="ativo" inputRef={register} defaultChecked />} /> */}

//     <Controller
//       name="nome"
//       control={control}
//       defaultValue=""
//       as={
//         <TextField
//           label="Informe o nome do sistema"
//           variant="outlined"
//           error={!!errors.nome}
//           helperText={errors.nome?.message}
//           fullWidth
//           required
//           autoFocus
//         />
//       }
//     />
//     <Controller
//       name="ativo"
//       control={control}
//       render={({ value, onChange }) => (
//         <FormControlLabel label="Sistema Ativo ?" control={<Switch onChange={(e) => onChange(e.target.checked)} checked={value} />} />
//       )}
//     />

//     <Button type="submit" className={classes.button} color="primary" variant="contained" fullWidth disabled={formState.isSubmitting}>
//       salvar
//     </Button>
//   </form>
// </Paper>
// </div>
