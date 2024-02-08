### Funções

- Gere boletos com QRCode PIX sem qualquer relação com bancos
- Esta aplicação permite configurar um "Carnê de pagamento" mensal parcelado
- Útil para pequenos comerciantes que desejam algo simples para controlar junto ao cliente os pagamentos das parcelas
- O QRCode PIX adiciona um identificador que contém o número de documento que identifica um boleto, facilitando a gestão do comerciante.

# Gerador de boletos com PIX QRCode

![](https://raw.githubusercontent.com/resendegu/gerador-boleto-pix-guias/main/src/assets/interface.gif)

![](https://img.shields.io/github/stars/resendegu/gerador-boleto-pix-guias.svg) ![](https://img.shields.io/github/forks/resendegu/gerador-boleto-pix-guias.svg) ![](https://img.shields.io/github/tag/resendegu/gerador-boleto-pix-guias.svg) ![](https://img.shields.io/github/release/resendegu/gerador-boleto-pix-guias.svg) ![](https://img.shields.io/github/issues/resendegu/gerador-boleto-pix-guias.svg)



#Sobre
Esse é um gerador de guias de pagamento simples (não possuem integração bancária). Uma ótima solução para comerciantes que querem apenas um canhoto para que o cliente e a empresa possam controlar pagamento de parcelas, mensalidades, etc. A guia também gera um QR Code PIX para pagamento.

#Como usar

Esta interface usa ReactJS e foi feito com o ViteJS.dev.

####Iniciando servidor de desenvolvimento
- Clone este repositório e execute os seguintes comandos
`$ npm install` para instalar as depedências do projeto
`$ npm run dev` para iniciar o servidor dev
- Depois basta acessar o link que será dado no terminal para acessar a interface

###Imagens

Tela de Início:

![](https://raw.githubusercontent.com/resendegu/gerador-boleto-pix-guias/main/src/assets/HomeScreen.png)

> Nesta tela de início você deve configurar alguns dados para que seja possível gerar o boleto e também o QRCode PIX usado para pagamentos.

Guias/Boletos de pagamento para impressão:

![](https://raw.githubusercontent.com/resendegu/gerador-boleto-pix-guias/main/src/assets/BoletosExemplo.png)