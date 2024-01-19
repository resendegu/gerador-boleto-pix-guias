import { Fragment, useEffect, useState } from 'react';
import ErrorDialog from './ErrorDialog';
import FullScreenDialog from './FullscreenDialog';
import { Checkbox, Container, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, LinearProgress, Select, TextField } from '@mui/material';
import $ from 'jquery';
import CrudTable from './DataGrid';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     },
//     fields: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//     },
//     button: {
//         alignSelf: 'center',
        
//       },
//       selectEmpty: {
//         marginTop: theme.spacing(2),
//       },
//     formControl: {
//         padding: theme.spacing(2),
//     }
//   }));

const ContractConfigure = ({ isOpen, setOpenDialog }) => {

    const [ saveDisabled, setSaveDisabled ] = useState(true);

    useEffect(() => {
        setSaveDisabled(false)
        //handleGetData()
    }, [isOpen])

    const handleGetData = () => {
        // handleMountContractScreen()//courseInfo.val())   
    }

    const [ shrink, setShrink ] = useState(true);

    const [ plans, setPlans ] = useState([{value: '', label: '', key: ''}])
    const [ plan, setPlan ] = useState([{id: ''}])

    const [ openDialogError, setOpenDialogError ] = useState(false);

    // const handleMountContractScreen = () => {

    //     let plansInfo = courseInfo.planos;
    //     let plansArray = [];
    //     for (const key in plansInfo) {
    //         if (Object.hasOwnProperty.call(plansInfo, key)) {
    //             const plan = plansInfo[key];
    //             plansArray.push({value: key, label: plan.nomePlano, key: key})
    //         }
    //     }
    //     console.log(plansArray)
       
    // }

    // const classes = useStyles();
    //const [ data, setData ] = useState(null);

    const [state, setState] = useState({
        planId: '',
        name: '',
    });

    const columns = [
        { field: 'col1', headerName: 'Parcela', width: 110 }, 
        { field: 'col2', headerName: 'Valor Inicial', width: 147 },
        { field: 'col3', headerName: 'Acréscimos', width: 142 },
        { field: 'col4', headerName: 'Descontos', width: 135 },
        { field: 'col5', headerName: 'Valor Final', width: 147 },
    ]
      
    const [ rows, setRows ] = useState([{id: 1, col1: '1', col2: 0, col3: 0, col4: 0, col5: 0},]);

    const contractHandler = async (save = false) => {
        
        let form = document.querySelector('#contractForm');
        let formData = new FormData(form);
        let fieldsData = $('#contractForm').serializeArray();
        console.log(fieldsData)

        let internData = {};
        fieldsData.forEach(field => {
            let values = formData.getAll(field.name);
            internData[field.name] = values.length === 1 ?  values[0] : values;
        })
        let internPlan

        internData.vencimentoEscolhido = internData.diasDeVencimento
            
            
        try {
            internData.valorDesconto = (Number(internData.valorCurso) * (internData.descontoPlano/100)).toFixed(2)
            internData.valorAcrescimo = (Number(internData.valorCurso) * (internData.acrescimoPlano/100)).toFixed(2)
            internData.valorFinal = (Number(internData.valorCurso) + (internData.valorAcrescimo - internData.valorDesconto)).toFixed(2)
            setRows([])
            let saldo = internData.valorCurso
            let saldoAcrescimo = internData.valorAcrescimo
            let saldoDesconto = internData.valorDesconto
            let contadorParcelas = internData.numeroParcelas
            let somaParcelas = 0
            let valorParcelaGlobal = 0
            let internRows = []
            for (let parcela = 0; parcela < internData.numeroParcelas; parcela++) {
                let row = {}
                if (internData.distribuirAcrescimosEDescontos === 'on') {
                    
                    
                    let acrescimoParcela 
                    let descontoParcela 
                    let valorParcela
                    valorParcelaGlobal = parcela === 0 ? parseFloat(saldo / contadorParcelas).toFixed(2) : valorParcelaGlobal
                    
                    valorParcela = valorParcelaGlobal
                    
                    // saldo = saldo - valorParcela
                    acrescimoParcela = parseFloat(internData.valorAcrescimo / internData.numeroParcelas).toFixed(2)
                    descontoParcela = parseFloat(internData.valorDesconto / internData.numeroParcelas).toFixed(2)
                    
                    saldoAcrescimo = saldoAcrescimo - acrescimoParcela
                    saldoDesconto = saldoDesconto - descontoParcela
                    
                    row = {id: parcela, col1: parcela + 1, col2: `R$${valorParcela}`, col3: ` ${acrescimoParcela !== 0 || acrescimoParcela !== '' ? '+ R$' + acrescimoParcela : ''}`, col4: ` ${descontoParcela !== 0 || descontoParcela !== '' ? '- R$' + descontoParcela : ''}`, col5: `R$${(Number(valorParcela) + (acrescimoParcela - descontoParcela)).toFixed(2)}`} 
                    console.log(row)
                    somaParcelas += (Number(valorParcela) + (acrescimoParcela - descontoParcela))
                } else {
                    saldo = parcela === 0 ? internData.valorFinal : saldo
                    row = {id: parcela, col1: `Parcela ${parcela + 1}`, col2: `R$${parseFloat(internData.valorFinal / internData.numeroParcelas).toFixed(2)}`, col3: '0', col4: '0', col5: `R$${parseFloat(internData.valorFinal / internData.numeroParcelas).toFixed(2)}`}
                    // saldo = saldo - parseFloat(internData.valorFinal / internData.numeroMaximoParcelasPlano).toFixed(2)
                    somaParcelas += Number(parseFloat(internData.valorFinal / internData.numeroParcelas))
                }
                saldo = (internData.valorCurso) - somaParcelas
                console.log(saldo)
                internRows.push(row)
                console.log(internRows)
                // addParcela(`Saldo: R$${saldo}`)
                contadorParcelas--
            }
            setRows(internRows)
            // addParcela(`Total: R$${somaParcelas.toFixed(2)}`)

        } catch (error) {
            console.log(error)
        }
            

            for (const id in internData) {
                if (Object.hasOwnProperty.call(internData, id)) {
                    const value = internData[id];
                    document.getElementById(id).value = value;
                }
            }

            if (save) {
                let boletos = JSON.parse(sessionStorage.getItem('contratoConfigurado'))
                
                //sessionStorage.setItem('planoOriginal', JSON.stringify(internPlan));
                //let contractCode = await contractRef.push().key;
                //sessionStorage.setItem('codContrato', contractCode);
                if ((internData.vencimentoEscolhido && internData.numeroParcelas && internData['ano-mes']) !== '') {
                    setOpenDialog(false);
                    if (boletos) {
                        boletos.push(internData)
                    } else {
                        boletos = [internData]
                    }
                    sessionStorage.setItem('contratoConfigurado', JSON.stringify(boletos));
                    window.dispatchEvent(new Event('storage'))
                } else {
                    alert('Erro: Preencha todos os campos necessários do boleto.');
                }
                
            }
    }

      const [ day, setDay ] = useState(1)
      const handleChangeDay = (event) => {
        setDay(event.target.value)
      }

      const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        let formData = new FormData(document.getElementById('contractForm'))
  
        let data = Object.fromEntries(formData.entries());
        console.log(data)
        //sessionStorage.setItem(activeStep, JSON.stringify(data))
      }

      const daysOptions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]

      
    return(
        <Fragment>
            {openDialogError && <ErrorDialog onClose={() => {setOpenDialogError(false)}} isOpen={true} title={openDialogError.title} message={openDialogError.message} /> }
            <FullScreenDialog 
                isOpen={isOpen}
                onClose={() => {
                    setOpenDialog(false);
                }}
                onSave={() => {
                    contractHandler(true);
                }}
                title={"Configurar contrato"}
                saveButton={"Gerar boleto"}
                saveButtonDisabled={saveDisabled}
            >
                <>
                <Container>
                    <form onSubmit={handleSubmit} onBlur={() => {contractHandler()}} id="contractForm" autoComplete="off">
                        
                        <h1>Dados do Boleto:</h1>
                        <h6>Todos os valores brutos estão em R$ (BRL - Brazilian Real / Real Brasileiro)</h6>
                        <Grid
                            justifyContent="flex-start"   
                            container
                            direction="row"
                            spacing={2}
                        >
                        
                            <Grid item>
                                <FormControl > 
                                    <TextField variant="filled" autoComplete="off"  InputLabelProps={{shrink: shrink,}}  label="Nome deste boleto" type="text" id="nomeBoleto" name="nomeBoleto" aria-describedby="my-helper-text" />
                                    <FormHelperText>Nome para identificar este boleto.</FormHelperText>
                                </FormControl>
                            </Grid>     
                            
                            <Grid item>
                                <FormControl > 
                                    <TextField variant="filled" autoComplete="off"  InputLabelProps={{shrink: shrink,}}  label="Valor Integral" type="text" id="valorCurso" name="valorCurso" aria-describedby="my-helper-text" />
                                    <FormHelperText>Valor integral sem descontos.</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl > 
                                    <TextField variant="filled" autoComplete="off" InputLabelProps={{shrink: shrink,}} label="Desconto (%)" type="text" id="descontoPlano" name="descontoPlano" aria-describedby="my-helper-text" />
                                    <FormHelperText>Desconto sobre o valor integral.</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl > 
                                    <TextField variant="filled" autoComplete="off" InputProps={{readOnly: true}} InputLabelProps={{shrink: shrink,}} label="Valor do desconto" type="text" id="valorDesconto" name="valorDesconto" aria-describedby="my-helper-text" />
                                    
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl > 
                                    <TextField variant="filled" autoComplete="off"  InputLabelProps={{shrink: shrink,}} label="Acréscimo (%)" type="text" id="acrescimoPlano" name="acrescimoPlano" aria-describedby="my-helper-text" />
                                    <FormHelperText>Acréscimo sobre o valor integral.</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl > 
                                    <TextField variant="filled" autoComplete="off" InputProps={{readOnly: true}} InputLabelProps={{shrink: shrink,}} label="Valor do acréscimo" type="text" id="valorAcrescimo" name="valorAcrescimo" aria-describedby="my-helper-text" />
                                    
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl > 
                                    <TextField variant="filled" autoComplete="off"  InputLabelProps={{shrink: shrink,}} label="Valor integral final" type="text" id="valorFinal" name="valorFinal" InputProps={{readOnly: true}} aria-describedby="my-helper-text" />
                                    
                                </FormControl>
                            </Grid>
                            
                        </Grid>
                        <hr />
                        <h2>Parcelas</h2>
                        <Grid
                            justifyContent="flex-start"   
                            container
                            direction="row"
                            spacing={2}
                        >
                            
                            <Grid item>
                                <FormControl > 
                                    <TextField variant="filled" autoComplete="off" InputLabelProps={{shrink: true,}} required label="Nº de parcelas" type="text" id="numeroParcelas" name="numeroParcelas" aria-describedby="my-helper-text" />
                                    <FormControlLabel
                                        control={<Checkbox value={'on'} defaultChecked name="distribuirAcrescimosEDescontos" id="distribuirAcrescimosEDescontos" inputProps={{
                                            name: 'distribuirAcrescimosEDescontos',
                                            id: 'distribuirAcrescimosEDescontos',
                                        }} onChange={(e) => contractHandler(e.target.id)} />}
                                        label="Distribuir Descontos e Acréscimos"
                                    />
                                </FormControl>
                                
                            </Grid>
                            <Grid item>
                                <FormControl >
                                    <CrudTable rows={rows} columns={columns} rowHeight={25} disableColumnMenu disableDensitySelector disableColumnSelector disableColumnFilter hideFooter />
                                    <FormHelperText>Esta tabela serve apenas para visualizar a simulação de parcelamento. Esta é a distribuição de parcelas. </FormHelperText>
                                </FormControl>
                                
                            </Grid>
                                
                            
                        </Grid>
                        <hr />
                        <h2>Vencimento</h2>
                        <Grid
                            justifyContent="flex-start"   
                            container
                            direction="row"
                            spacing={2}
                            alignContent="center" 
                            alignItems="center"
                        >
                            <Grid item >
                            <FormControl variant="filled">
                                <InputLabel htmlFor="filled-age-native-simple">Escolha um dia</InputLabel>
                                <Select
                                    required
                                    native
                                    value={state.value}
                                    onChange={handleChangeDay}
                                    inputProps={{
                                        name: 'diasDeVencimento',
                                        id: 'diasDeVencimento',
                                    }}
                                >
                                    {daysOptions.map(dayOpt => <option value={dayOpt}>{dayOpt}</option>)}
                                    
                                </Select>
                                <FormHelperText>Escolha o dia de vencimento do boleto/carnê. </FormHelperText>
                            </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl > 
                                    <TextField variant="filled" autoComplete="off" InputProps={{readOnly: true}} InputLabelProps={{shrink: true,}} required label="Dia Escolhido" value={day} type="text" id="vencimentoEscolhido" name="vencimentoEscolhido" aria-describedby="my-helper-text" />
                                    <FormHelperText> Dia escolhido para o vencimento. </FormHelperText>
                                </FormControl>
                                
                            </Grid>
                            <Grid item>
                                <FormControl > 
                                    <TextField name="ano-mes" variant="filled"  InputLabelProps={{shrink: true,}}  id="ano-mes" required autoComplete="off"  type="month" label="Escolha quando será o primeiro vencimento"/>
                                    <FormHelperText> Escolha o mês e o ano para iniciar a geração dos boletos. </FormHelperText>
                                </FormControl >
                            </Grid>

                            <Grid item>
                                <FormControl > 
                                    <TextField variant="filled" autoComplete="off" InputLabelProps={{shrink: shrink,}} required label="Informações e avisos"  type="text" id="descricaoPlano" name="descricaoPlano" aria-describedby="my-helper-text" />
                                    <FormHelperText> Informações e avisos para serem gerados no boleto. </FormHelperText>
                                </FormControl>
                                
                            </Grid>
                            
                                
                            
                        </Grid>
                    </form>
                
                
                </Container>
                </>
            </FullScreenDialog>
            
        </Fragment>
    );
}

export default ContractConfigure;