import {} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Container } from '@mui/material';
import InicioBoletos from './components/InicioBoletos';
import Beneficiario from './components/Beneficiario';
import Sacado from './components/Sacado';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const App = () => {

  return (
    <Container sx={{marginTop: '10px'}}>
      <div>
        <h1>Gerador de Boletos</h1>
        
        <p>Preencha os campos abaixo, crie um boleto e depois clique em Gerar Boletos. Os boletos são armazenados localmente em sessionStorage do seu navegador. Se fechar esta aba seus boletos serão perdidos. Os dados colocados ou gerados neste site não serão salvos em nenhum servidor, este é apenas um ambiente de testes. Você pode visitar o repositório do projeto (<a href="https://github.com/resendegu/gerador-boleto-pix-guias">https://github.com/resendegu/gerador-boleto-pix-guias</a>) e usar gratuitamente o código para implementar o gerador de boletos em seu próprio projeto. Esta aplicação não possui nenhuma integração bancária e a geração de boletos não incide em nenhum compromisso financeiro.</p>
      </div>
      
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} justifyContent={'center'}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Item sx={{ height: '100%' }}>
              <Sacado />
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Item sx={{ height: '100%' }}>
              <Beneficiario />
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Item sx={{ height: '100%' }}>
              <InicioBoletos />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
    
  )
}

export default App
