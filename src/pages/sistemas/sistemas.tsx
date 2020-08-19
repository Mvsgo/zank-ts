import { yupResolver } from '@hookform/resolvers';
import { Button, FormControlLabel, Paper, Switch, TextField, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import api from 'src/api';

import helper, { ISistemasFormData } from './helper';

const Sistema = (props: any) => {
  const { id } = useParams();
  //const [idKey, setIdKey] = useState<number>(0);
  //const [data, setData] = useState<ISistemasFormData>();

  const classes = helper.useStyles();

  const { control, handleSubmit, reset, errors, formState } = useForm<ISistemasFormData>({
    defaultValues: helper.defaultValues,
    resolver: yupResolver(helper.schema),
  });

  console.log('inicio id = ', id);

  useEffect(() => {
    if (id > 0) {
      api()
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
      api()
        .put(`/sistemas/${id}`, data)
        .then((result) => {
          props.history.push('/lista');
        });
    } else {
      console.log('novo id = ', id);
      api()
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

  //
  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h4">Cadastro de Sistemas</Typography>

        <form onSubmit={submitForm} className={classes.form} noValidate autoComplete="off">
          {/* <TextField
            label="Informe o nome do Sistema"
            name="nome"
            variant="outlined"
            error={!!errors.nome}
            helperText={errors.nome?.message}
            inputRef={register}
            fullWidth
            required
            autoFocus
          /> */}
          {/* <FormControlLabel label="Sistema Ativo?" control={<Switch name="ativo" inputRef={register} defaultChecked />} /> */}

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

          <Button type="submit" className={classes.button} color="primary" variant="contained" fullWidth disabled={formState.isSubmitting}>
            salvar
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Sistema;
