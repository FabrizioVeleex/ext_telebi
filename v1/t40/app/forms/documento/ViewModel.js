/**
 * Created by fabrizio on 15/02/2022.
 * TODO gestire casistice tipo documento in formula
 */
Ext.define("t40.forms.documento.model.ViewModel", {
  extend: "portal.v1.view.forms.mainCard.Model",
  alias: "viewmodel.v1-model-documento",
  requires: [
    "t40.forms.documento.component.gridMail.Store",
    "t40.forms.documento.component.tagEmail.Store",
    't40.forms.documento.component.comboSoggetto.Store',
    't40.forms.documento.component.tagAttach.Store',
    "t40.forms.documento.component.gridDup.Store"
  ],
  stores: {
    storemail: { type: "v1-t40-forms-documento-gridmail", autoload: false },
    comboSoggetto: { type: "v1-t40-form-documento-soggetti" },
    storeEmailDefault: { type: "v1-t40-forms-documento-tagemaildefault" },
    storeEmailNew: { type: "v1-t40-forms-documento-tagemaildefault" },
    storeAttachNew: { type: "v1-t40-forms-documento-gridattach" },
    storeMailDup: { type: "v1-t40-forms-documento-griddup" },
  },
  data: {
    email: {
      subject: "",
      corpo: "",
      mailto: [],
      mailfrom: "",
      listAttach: [],
      replyTo: ""
    },
    statusMail0: true,
    statusMailNeg1: true,
    statusMailPos: true,
    cardactive: "info",
    tagEmailDefault: [],
  },
  formulas: {
    noIdSoggetto: {
      bind: {
        id_sogg_fat: '{record.id_sogg_fat}',
      },
      get: function (data) {
        return typeof data.id_sogg_fat === "string" && data.id_sogg_fat.length === 32;
      }
    },
    htmlDoc: {
      bind: {
        data_doc: '{record.data_doc}',
        tipo_spool: '{record.tipo_spool}',
        cd_sogg_fatt: '{record.cd_sogg_fatt}',
        num_doc: '{record.num_doc}',
        gruppo_num_doc: '{record.gruppo_num_doc}',
        tag: '{record.tag}',
      },
      get: function (data) {
        if (!data.data_doc) return '---'

        const tipo_doc = data.tipo_doc || '-';
        const data_doc = Ext.Date.format(new Date(data.data_doc), "d/m/Y");
        const cd_sogg_fatt = data.cd_sogg_fatt || '-';
        const num_doc = data.num_doc || '-';
        const gruppo_num_doc = data.gruppo_num_doc || '-';
        let tipo = 'Non definito'
        switch (data.tag) {
          case "BOL":
            if (tipo_doc === "V") {
              tipo = '_Bolla di vendita';
            } else {
              tipo = '_Bolla di trasferimento';
            }
            break;
          case "FAT":
            if (tipo_doc === "F") {
              tipo = '_Fattura';
            } else if (tipo_doc === "N") {
              tipo = '_Nota credito';
            } else if (tipo_doc === "S") {
              tipo = '_Sollecito';
            }
            break;
          case "ORD":
            if (tipo_doc === "C") {
              tipo = 'Conferma d\'ordine';
            } else if (tipo_doc === "P") {
              tipo = 'Proforma';
            } else if (tipo_doc === "R") {
              tipo = 'Residuo';
            }
            break;
          case "ORF":
            tipo = '_Ordine a fornitore'
            break;
        }
        if (gruppo_num_doc === "")
          return tipo + ' numero : ' + num_doc + ', data: ' + data_doc
        else
          return tipo + ' numero : ' + gruppo_num_doc + "/" + num_doc + ', data: ' + data_doc
      }
    },
    htmlSogg: {
      bind: {
        tipo_sogg: '{record.tipo_sogg}',
        rag_soc: '{record.rag_soc}',
      },
      get: function (data) {
        if (!data) {
          return
        }
        if (data.tipo_sogg === "C") {
          return 'Cliente ' + data.rag_soc
        } else if (data.tipo_sogg === "F") {
          return 'Fornitore ' + data.rag_soc
        } else {
          return 'Nessun soggetto trovato per l\'associazione'
        }

      }
    },
    dataDoc: {
      bind: {
        record: '{record}',
        data_doc: '{record.data_doc}'
      },
      get: function (data) {
        const data_doc = data && data.record && data.data_doc ? data.data_doc : false;
        if (!data_doc) {
          return "";
        }
        return Ext.Date.format(new Date(data_doc), "d/m/Y");
      }
    }
  }
});
