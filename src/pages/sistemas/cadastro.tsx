import { yupResolver } from '@hookform/resolvers';
import { Box, Button, Divider, FormControlLabel, Paper, Switch, TextField, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import { TiArrowBack } from 'react-icons/ti';
import api from 'src/api';

import helper, { ISistemasFormData } from './helper';

export interface param {
  open: boolean;
  retornar: (row?: ISistemasFormData) => void;
  rowSistema: ISistemasFormData;
}

//React.Dispatch<React.SetStateAction<boolean>>;

const Cadastro: React.FC<param> = (props) => {
  const { control, handleSubmit, reset, errors, formState } = useForm<ISistemasFormData>({
    defaultValues: helper.defaultValues,
    resolver: yupResolver(helper.schema),
  });

  useEffect(() => {
    reset(props.rowSistema);
    console.log(' useEffect = ', props.rowSistema);
  }, [props.rowSistema, reset]);

  const submitForm = handleSubmit(async (data, event) => {
    event?.preventDefault();
    console.log('submitForm = ', data);

    if (props.rowSistema._id !== '0') {
      console.log('edit id = ', props.rowSistema._id);
      await api()
        .put(`/sistemas/${props.rowSistema._id}`, data)
        .then((result) => {
          //props.history.push('/lista');
          //props.history.goBack();
          data._id = props.rowSistema._id;
          props.retornar(result?.data);
        });
    } else {
      console.log('novo id = ', props.rowSistema._id);
      await api()
        .post('/sistemas', data)
        .then((result) => {
          props.retornar(result?.data);
        });
    }

    //simulando uma demora na resposta do backend
    //await new Promise((resolve) => setTimeout(resolve, 500));

    reset({ ...helper.defaultValues });
  });

  const handleCancelar = () => {
    props.retornar();
    //props.retornar();
  };

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

export default Cadastro;
