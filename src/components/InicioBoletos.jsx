import { useEffect, useState } from 'react'
import { Button, IconButton, List, ListItem, ListItemText, Stack, Tooltip } from '@mui/material'
import { Delete, PlusOne, Print, Refresh } from '@mui/icons-material'
import GenerateBoletoImpresso from '../generators/GenerateBoletoImpresso'
import ContractConfigure from '../FormDadosBoleto'
import { toast } from 'sonner'

function InicioBoletos() {
    const [openBoletoImpresso, setOpenBoletoImpresso] = useState(false)
    const [openBoletosInfo, setBoletosInfo] = useState(false)
    const [boletoEscolhido, setBoletoEscolhido] = useState('none');
    let boletosStorage = JSON.parse(sessionStorage.getItem('contratoConfigurado'))
    if (boletosStorage === null) {
        sessionStorage.setItem('contratoConfigurado', JSON.stringify([]))
    }
    const [boletos, setBoletos] = useState(JSON.parse(sessionStorage.getItem('contratoConfigurado')));

    const updateBoletos = () => {
        const updatedBoletos = JSON.parse(sessionStorage.getItem('contratoConfigurado'));
        setBoletos(updatedBoletos);
        toast.success('Boletos atualizados com sucesso!');
    };

    const handleDelete = (index) => {
        const updatedBoletos = [...boletos];
        updatedBoletos.splice(index, 1);
        sessionStorage.setItem('contratoConfigurado', JSON.stringify(updatedBoletos));
        window.dispatchEvent(new Event('storage'));
        updateBoletos();
    };
    
    useEffect(() => {
        handleStorage()
        updateBoletos()
    }, [openBoletosInfo])

    const handleChooseBoleto = (index) => {
        setBoletoEscolhido(index)
        setOpenBoletoImpresso(true)
    }

    const handleStorage = () => {
        let boletosGuardado = JSON.parse(sessionStorage.getItem('contratoConfigurado'))
        setBoletos(boletosGuardado)
    }
    

    return (
        <Stack spacing={2}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', height: '23.41px'}}>
                <h3 style={{position: 'relative', margin: 0}}>Boletos</h3>
                <IconButton sx={{ position: 'relative', top: 0, right: 0 }} onClick={updateBoletos}>
                    <Refresh />
                </IconButton>
            </div>
            <Button startIcon={<PlusOne />} variant='contained' onClick={() => setBoletosInfo(true)}>Criar boleto</Button>
            <ContractConfigure isOpen={openBoletosInfo} setOpenDialog={setBoletosInfo} />
            {openBoletoImpresso &&  
                <GenerateBoletoImpresso 
                open={openBoletoImpresso} 
                onClose={setOpenBoletoImpresso} 
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
            <List>
                {boletos.length === 0 ? (
                    <ListItem>
                        <ListItemText primary="Não há boletos" />
                    </ListItem>
                ) : (
                    boletos.map((boleto, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={boleto.nomeBoleto} />
                            <Tooltip title="Gerar boleto">
                                <IconButton onClick={() => handleChooseBoleto(index)}>
                                    <Print />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Deletar">
                                <IconButton onClick={() => handleDelete(index)}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </ListItem>
                    ))
                )}
            </List>
        </Stack>
    )
}

export default InicioBoletos