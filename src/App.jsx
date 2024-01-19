import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GenerateBoletoImpresso from './generators/GenerateBoletoImpresso'
import { useEffect, useState } from 'react'
import ContractConfigure from './FormDadosBoleto'
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { PlusOne, Print } from '@mui/icons-material'

function App() {
  const [count, setCount] = useState(0)
  const [openBoletos, setOpenBoletos] = useState(false)
  const [openBoletosInfo, setBoletosInfo] = useState(false)
  const [boletos, setBoletos] = useState()
  const [boletoEscolhido, setBoletoEscolhido] = useState('none');
  

  const handleChooseBoleto = (e) => {
    let value = e.target.value
    setBoletoEscolhido(value)
  }

  const handleOpenBoleto = () => {
    setOpenBoletos(true)
  }
  const handleStorage = () => {
    let boletosGuardado = JSON.parse(sessionStorage.getItem('contratoConfigurado'))
    setBoletos(boletosGuardado)
    console.log(boletosGuardado)
  }
  useEffect(() => {
    

    handleStorage()
    window.addEventListener('storage', handleStorage())
    return () => window.removeEventListener('storage', handleStorage())
  }, [openBoletos])

  return (
    <>
      <Button startIcon={<PlusOne />} onClick={() => setBoletosInfo(true)}>Criar um boleto</Button>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Boletos</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={boletoEscolhido}
          label="Boletos"
          onChange={(e) => handleChooseBoleto(e)}
        >
          <MenuItem value="none" disabled >
            <em>Escolha um boleto</em>
          </MenuItem>
          {boletos && boletos.map((boleto, i) => <MenuItem key={i} value={i}>{boleto.nomeBoleto}</MenuItem>)}
         
        </Select>
      </FormControl>
      <Button startIcon={<Print />} disabled={boletoEscolhido == "none" ? true : false} onClick={handleOpenBoleto}>Gerar boletos</Button>
      <ContractConfigure isOpen={openBoletosInfo} setOpenDialog={setBoletosInfo} />
      {openBoletos &&  
        <GenerateBoletoImpresso 
          open={openBoletos} 
          onClose={setOpenBoletos} 
          acrescimo={boletos[boletoEscolhido]['acrescimoPlano']}
          ano={boletos[boletoEscolhido]['ano-mes'].split('-')[0]}
          mes={boletos[boletoEscolhido]['ano-mes'].split('-')[1]}
          desconto={boletos[boletoEscolhido]['descontoPlano']}
          informacoesBoleto={boletos[boletoEscolhido]['descricaoPlano']}
          distribuirAcrescimosEDescontos={boletos[boletoEscolhido]['distribuirAcrescimosEDescontos']}
          numDocInicio={1}
          numeroParcelas={boletos[boletoEscolhido]['numeroParcelas']}
          pularMesParaVencimento={true}
          quandoAplicar={0}
          valor={boletos[boletoEscolhido]['valorFinal']}
          vencimentoEscolhido={boletos[boletoEscolhido]['vencimentoEscolhido']}
        />
      }
    </>
  )
}

export default App
