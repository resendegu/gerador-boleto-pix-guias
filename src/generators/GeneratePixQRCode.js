import { Merchant } from 'steplix-emv-qrcps';
import QRCode from 'qrcode'

const generatePixQRCode = (chavePix, valor, nomePix, identificador, tipoChavePix, cidadePix) => {
    class BrCode {
        constructor(key, amount, name, reference, key_type, city) {
          this.key = key;
          this.amount = amount;
          this.name = name;
          this.reference = reference;
          this.key_type = key_type;
          this.city = city;
        }
      
        static format_text(text) {
          return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        }
      
        formated_name() {
          return this.constructor.format_text(this.name);
        }
      
        formated_city() {
          return this.constructor.format_text(this.city);
        }
      
        formated_amount() {
          return this.amount.replace(',','.').replace(' ','').replace("R$", '');
        }
      
        formated_reference() {
          return this.constructor.format_text(this.reference).replace(' ','');
        }
      
        formated_key() {
          var rkey = this.key;
          var ktype = this.key_type;
          if (ktype == 'telefone' || ktype == 'cnpj' || ktype == "cpf") {
            rkey = rkey.replace(/\D/g,'');
          }
      
          if (ktype == "telefone") {
            rkey = "+55" + rkey
          }
      
          return rkey
        }
      
        generate_qrcp() {
        
          var emvqr = Merchant.buildEMVQR();
            
          emvqr.setPayloadFormatIndicator("01");
          emvqr.setCountryCode("BR")
          emvqr.setMerchantCategoryCode("0000");
          emvqr.setTransactionCurrency("986");
          const merchantAccountInformation = Merchant.buildMerchantAccountInformation();
          merchantAccountInformation.setGloballyUniqueIdentifier("BR.GOV.BCB.PIX");
      
          merchantAccountInformation.addPaymentNetworkSpecific("01", this.formated_key());
      
          emvqr.addMerchantAccountInformation("26", merchantAccountInformation);
      
          if (this.name) {
            emvqr.setMerchantName(this.formated_name());
          }
      
          if (this.city) {
            emvqr.setMerchantCity(this.formated_city());
          }
      
          if (this.amount && this.amount != '') {
            emvqr.setTransactionAmount(this.formated_amount());
          }
      
          const additionalDataFieldTemplate = Merchant.buildAdditionalDataFieldTemplate();
      
          if (this.reference) {
            additionalDataFieldTemplate.setReferenceLabel(this.formated_reference());
          }
          else {
            additionalDataFieldTemplate.setReferenceLabel("***");
          }
      
          emvqr.setAdditionalDataFieldTemplate(additionalDataFieldTemplate);
          let payLoadTEst = emvqr.generatePayload();
          
          return payLoadTEst;
        }
    }

    async function criaCod() {
        const lineCode = new BrCode(chavePix, valor, nomePix, identificador, tipoChavePix, cidadePix);
        const code = lineCode.generate_qrcp();
        const QR_CODE_SIZE = 400;
        return QRCode.toDataURL(code, {width: QR_CODE_SIZE, height: QR_CODE_SIZE}).then(qrcode => {
            return qrcode;
        }).catch(err => {
            console.error(err)
        })
    
    }

    const generatedQRCodePix = criaCod(); 
    return generatedQRCodePix;
}

export default generatePixQRCode;