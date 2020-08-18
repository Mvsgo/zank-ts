import { yupResolver } from '@hookform/resolvers';
import { Button, FormControlLabel, Paper, Switch, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import helper, { ISistemasFormData } from './helper';

//import { Alert } from '@material-ui/lab';
const Sistema = (props: any) => {
  const { id } = useParams();
  const classes = helper.useStyles();

  const { register, handleSubmit, reset, errors, formState, setValue } = useForm<ISistemasFormData>({
    defaultValues: helper.defaultValues,
    resolver: yupResolver(helper.schema),
  });

  console.log('editar id = ', id);

  useEffect(() => {
    if (id >= 0) {
      axios.get(`http://localhost:5630/sistemas/${id}`).then((result) => {
        console.log(result.data);
        setValue('nome', result.data.nome);
        setValue('ativo', result.data.ativo);
      });
    }
  }, [id]);

  const submitForm = handleSubmit(async (data, event) => {
    event?.preventDefault();

    console.log(data);

    if (id === 0) {
      axios.post('http://localhost:5630/sistemas', data).then((result) => {
        props.history.push('/lista');
      });
    } else {
      axios.put(`http://localhost:5630/sistemas/${id}`, data).then((result) => {
        props.history.push('/lista');
      });
    }

    //simulando uma demora na resposta do backend
    await new Promise((resolve) => setTimeout(resolve, 500));

    reset({ ...helper.defaultValues });
    // alert('Sistema inserido com sucesso!');

    // <Alert variant="filled" severity="success">
    // This is a success alert — check it out!
    // </Alert>;
  });

  //
  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h4">Cadastro de Sistemas</Typography>

        <form onSubmit={submitForm} className={classes.form} noValidate autoComplete="off">
          <TextField
            label="Informe o nome do Sistema"
            name="nome"
            variant="outlined"
            error={!!errors.nome}
            helperText={errors.nome?.message}
            inputRef={register}
            fullWidth
            required
            autoFocus
          />

          <FormControlLabel label="Sistema Ativo?" control={<Switch name="ativo" inputRef={register} defaultChecked />} />

          <Button type="submit" className={classes.button} color="primary" variant="contained" fullWidth disabled={formState.isSubmitting}>
            salvar
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Sistema;
