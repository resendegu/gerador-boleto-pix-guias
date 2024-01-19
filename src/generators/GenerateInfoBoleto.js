const generateInfoBoleto = (mes, ano, numDocInicio, valorCurso, descontoPlano, acrescimoPlano, numeroParcelas, quandoAplicar, pularMesParaVencimento, vencimentoEscolhido, informacoesBoleto, distribuirAcrescimosEDescontos) => {
    const getDaysInMonth = (month, year) => {
        // Here January is 1 based
        //Day 0 is the last day in the previous month
        return new Date(year, month, 0).getDate();
        // Here January is 0 based
        // return new Date(year, month+1, 0).getDate();
    };

    function gera() {
        // let alunoRef = admin.database().ref('sistemaEscolar/alunos/' + matricula + '/')
        // let alunosDesativadosRef = admin.database().ref('sistemaEscolar/alunosDesativados')
        // let contratoRef = admin.database().ref('sistemaEscolar/infoEscola/contratos').child(codContrato)
        // let infoEscola = await admin.database().ref('sistemaEscolar/infoEscola').once('value')
        // let docsSistemaVal = await admin.database().ref('sistemaEscolar/docsBoletos').once('value')
        // let dadosEscola = infoEscola.val()
        // console.log(dadosEscola)
        // let dadosAluno = await alunoRef.once('value')
        // dadosAluno = dadosAluno.exists() ? dadosAluno : await alunosDesativadosRef.child(matricula + '/dadosAluno').once('value')
        // let aluno = dadosAluno.val()
        // let contratos = aluno.contratos
        // let contrato = contratos[contratos.indexOf(codContrato)]
        // let data = dadosEscola.contratos[codContrato].contratoConfigurado
        // let plano = dadosEscola.contratos[codContrato].planoOriginal
        let mesInicio = mes // Exemplo: mes = 05 
        let anoInicio = ano
        // let docsSistema = docsSistemaVal.val()
        let qtdeDocs = numDocInicio === 0 ? numDocInicio : numDocInicio - 1
        let docsGerados = []
        var now = new Date()
        var dataProcessamento = `${Number(now.getDate()) <= 9 ? '0' + now.getDate() : now.getDate()}/${Number(now.getMonth()) + 1 <= 9 ? '0' + (Number(now.getMonth()) + 1) : now.getMonth()}/${now.getFullYear()}`
        
        let pag = 1
        let bol = 0

        try {

            // let docsBoletosGerados = await contratoRef.child('docsBoletos').once('value')
            // var numerosDeDoc = docsBoletosGerados.val()
            let continuar = true
            // if (numerosDeDoc != null) {
            //     continuar = window.confirm('O sistema identificou débitos ativos para este contrato. Deseja gerar novos débitos/boletos? (Para gerar, clique em OK)')
                
            // }

            if (continuar) {
                let valorDesconto = (Number(valorCurso) * (descontoPlano/100)).toFixed(2)
                let valorAcrescimo = (Number(valorCurso) * (acrescimoPlano/100)).toFixed(2)
                let valorFinal = (Number(valorCurso) + (valorAcrescimo - valorDesconto)).toFixed(2)
                let saldo = valorCurso
                let saldoAcrescimo = valorAcrescimo
                let saldoDesconto = valorDesconto
                let contadorParcelas = numeroParcelas
                let somaParcelas = 0
                let valorParcelaGlobal = 0
                let mesParcela
                let numDoc = qtdeDocs + 1
                let numerosDeDoc = []

                for (let parcela = 0; parcela < numeroParcelas; parcela++) {
                    let valorParcela
                    let valorCobrado
                    let acrescimoParcela = 0
                    let descontoParcela = 0
                    numerosDeDoc.push(numDoc)
                    if (distribuirAcrescimosEDescontos) {
                        if (parcela == 0) { 
                            valorParcelaGlobal = parseFloat(saldo / contadorParcelas).toFixed(2) 
                        } 
                        if (parcela >= quandoAplicar) {
                            // parcela == quandoAplicar ? saldo = valorFinal - somaParcelas : null
                            if (parcela == quandoAplicar) {
                                valorParcelaGlobal = parseFloat(saldo / contadorParcelas).toFixed(2)
                            }
                            
                            valorParcela = valorParcelaGlobal
                            acrescimoParcela = (saldoAcrescimo/contadorParcelas).toFixed(2)
                            descontoParcela = (saldoDesconto/contadorParcelas).toFixed(2)
                            // saldo = (Number(saldo) - valorParcela) - Number(acrescimoParcela - descontoParcela)
                        } else {
                            valorParcela = valorParcelaGlobal
                            
                            // saldo = saldo - valorParcela
                            acrescimoParcela = 0
                            descontoParcela = 0
                        }
                        
                        saldoAcrescimo = saldoAcrescimo - acrescimoParcela
                        saldoDesconto = saldoDesconto - descontoParcela
                        
                        valorCobrado = (Number(valorParcela) + (acrescimoParcela - descontoParcela)).toFixed(2)
                        somaParcelas += (Number(valorParcela) + (acrescimoParcela - descontoParcela))
                    } else {
                        if (parcela === 0) {
                            saldo = valorFinal
                        }

                        valorCobrado = parseFloat(valorFinal / numeroParcelas).toFixed(2)
                        valorParcela = valorCobrado
                        // saldo = saldo - parseFloat(valorFinal / numeroMaximoParcelasPlano).toFixed(2)
                        somaParcelas += Number(parseFloat(valorFinal / numeroParcelas))
                    }
                    saldo = (parcela >= quandoAplicar ? valorFinal : valorCurso) - somaParcelas
                    console.log(saldo)
                    mesParcela = mesInicio + parcela
                    if ((mesInicio + parcela) > 12) {
                        mesParcela = mesParcela - 12
                    }
                    if (mesParcela === 1 && parcela !== 0) {
                        anoInicio++
                    }
                    let proximoDiaVencimento = pularMesParaVencimento === 'true' ? true : false
                    let diaVencimento = vencimentoEscolhido
                    let mesVencimento = mesParcela
                    let anoVencimento = anoInicio
                    if (getDaysInMonth(mesParcela, anoInicio) < vencimentoEscolhido) {
                        if (proximoDiaVencimento) {
                            diaVencimento = 1
                            mesVencimento = mesParcela === 12 ? 1 : mesParcela + 1
                            anoVencimento = mesVencimento === 1 && parcela !== 0 ? anoInicio + 1 : anoInicio
                        } else {
                            diaVencimento = getDaysInMonth(mesParcela, anoInicio)
                        }
                    }
                    
                    
                    let doc = addParcela(parcela + 1, numeroParcelas, `${diaVencimento <= 9 ? '0' + diaVencimento : diaVencimento}/${mesVencimento <= 9 ? '0' + mesVencimento : mesVencimento}/${anoVencimento}`, numDoc, valorParcela, descontoParcela, acrescimoParcela, valorCobrado, dataProcessamento, informacoesBoleto)
                    docsGerados.push(doc)
                    // addParcela(`Saldo: R$${saldo}`)
                    contadorParcelas--
                    numDoc++
                    
                }

                
            } 
            

            

        } catch (error) {
            console.log(error)
        }

        
        
        function addParcela(parcelaAtual, numDeParcelas, vencimento, numeroDoc, valorDoc, descontos, acrescimos, totalCobrado, dataProcessamento, informacoes) {
            
            bol++
            if (bol > 3 && pag >= 1) {
                pag++
                bol = 0
                // document.getElementById('livro').innerHTML += `
                // <div class="page">
                //     <div class="subpage">
                //         <div id="boletos${pag}"></div>
                //     </div>
                // </div>
                // `
            }
            //let boletos = document.getElementById('boletos' + pag)
            return {
                numeroDoc: numeroDoc,
                valorDoc: valorDoc,
                vencimento: vencimento,
                parcelaAtual: parcelaAtual,
                numDeParcelas: numDeParcelas,
                descontos: descontos,
                acrescimos: acrescimos,
                totalCobrado: totalCobrado,
                dataProcessamento: dataProcessamento,
                informacoes: informacoes,
                //codContrato: codContrato,
                //matricula: matricula  
            }  
        }

        return docsGerados;

    }

    const docsInfo = gera()
    return docsInfo
}

export default generateInfoBoleto;