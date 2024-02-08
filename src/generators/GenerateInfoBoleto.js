/**
 * 
 * @param {string} mes Mês que inicia o vencimento do primeiro boleto
 * @param {string} ano Ano que inicia o vencimento do primeiro boleto
 * @param {number} numDocInicio Número do primeiro boleto
 * @param {number} valorCurso Valor do curso 
 * @param {*} descontoPlano 
 * @param {*} acrescimoPlano 
 * @param {*} numeroParcelas 
 * @param {*} quandoAplicar 
 * @param {*} pularMesParaVencimento 
 * @param {*} vencimentoEscolhido 
 * @param {*} informacoesBoleto 
 * @param {*} distribuirAcrescimosEDescontos 
 * @returns 
 */
const generateInfoBoleto = (mes, ano, numDocInicio, valorCurso, descontoPlano, acrescimoPlano, numeroParcelas, quandoAplicar, pularMesParaVencimento, vencimentoEscolhido, informacoesBoleto, distribuirAcrescimosEDescontos) => {
    const getDaysInMonth = (month, year) => {
        // Here January is 1 based
        //Day 0 is the last day in the previous month
        return new Date(year, month, 0).getDate();
        // Here January is 0 based
        // return new Date(year, month+1, 0).getDate();
    };

    function gera() {
        let mesInicio = Number(mes) // Exemplo: mes = 05 
        let anoInicio = ano
        let qtdeDocs = numDocInicio === 0 ? numDocInicio : numDocInicio - 1
        let docsGerados = []
        var now = new Date()
        var dataProcessamento = `${Number(now.getDate()) <= 9 ? '0' + now.getDate() : now.getDate()}/${Number(now.getMonth()) + 1 <= 9 ? '0' + (Number(now.getMonth()) + 1) : now.getMonth()}/${now.getFullYear()}`
        
        let pag = 1
        let bol = 0

        try {
            let continuar = true

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
                            if (parcela == quandoAplicar) {
                                valorParcelaGlobal = parseFloat(saldo / contadorParcelas).toFixed(2)
                            }
                            
                            valorParcela = valorParcelaGlobal
                            acrescimoParcela = (saldoAcrescimo/contadorParcelas).toFixed(2)
                            descontoParcela = (saldoDesconto/contadorParcelas).toFixed(2)
                        } else {
                            valorParcela = valorParcelaGlobal
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
                        somaParcelas += Number(parseFloat(valorFinal / numeroParcelas))
                    }
                    saldo = (parcela >= quandoAplicar ? valorFinal : valorCurso) - somaParcelas
                    
                    let startDate = new Date(anoInicio, mesInicio - 1)
                    let dueDate = new Date(startDate.getFullYear(), startDate.getMonth() + parcela)
                    let mesParcela = dueDate.getMonth() + 1
                    let anoVencimento = dueDate.getFullYear()
                    let proximoDiaVencimento = pularMesParaVencimento === 'true' ? true : false
                    let diaVencimento = vencimentoEscolhido
                    let mesVencimento = mesParcela
                    if (getDaysInMonth(mesParcela, anoVencimento) < vencimentoEscolhido) {
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
            }
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
            }  
        }

        return docsGerados;

    }

    const docsInfo = gera()
    return docsInfo
}

export default generateInfoBoleto;