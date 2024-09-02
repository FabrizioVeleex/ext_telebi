/**
 * Created by fabrizio on 15/02/2022.
 * TODO gestire casistice tipo documento in formula
 */
Ext.define("bol.forms.documento.model.ViewModel", {
  extend: "portal.v1.view.forms.mainCard.Model",
  alias: "viewmodel.v1-model-documento",
  requires: [
    "bol.forms.documento.component.gridMail.Store",
    "bol.forms.documento.component.tagEmail.Store",
    'bol.forms.documento.component.comboSoggetto.Store',
    'bol.forms.documento.component.tagAttach.Store',
    "bol.forms.documento.component.gridDup.Store",
    "bol.forms.documento.component.formDocumento.StoreDettaglio"
  ],
  stores: {
    storemail: { type: "v1-bol-forms-documento-gridmail", autoload: false },
    storeDettaglio: { type: "v1-bol-forms-documento-griddettaglio", autoload: false },
    comboSoggetto: { type: "v1-bol-form-documento-soggetti" },
    storeEmailDefault: { type: "v1-bol-forms-documento-tagemaildefault" },
    storeEmailNew: { type: "v1-bol-forms-documento-tagemaildefault" },
    storeAttachNew: { type: "v1-bol-forms-documento-gridattach" },
    storeMailDup: { type: "v1-bol-forms-documento-griddup" },
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
    cardactive: "dashboard",
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

        const data_doc = Ext.Date.format(new Date(data.data_doc), "d/m/Y");
        const num_doc = data.num_doc || '-';
        const gruppo_num_doc = data.gruppo_num_doc || '-';
        let tipo = '[N.D.]'
        Locale.t("global.form.openerror")
        switch (data.tipo_spool) {
          case "V":
            tipo = Locale.t("bol.forms.documento.tipobolla.vendita");
            break;
          case "T":
            tipo = Locale.t("bol.forms.documento.tipobolla.trasferimento");
            break;
          case "O":
            tipo = Locale.t("bol.forms.documento.tipobolla.omaggio");
            break;
          default:
            break;
        }

        if (gruppo_num_doc === "")
          return tipo + ' ' + Locale.t("bol.forms.documento.tipobolla.extra.numero") + ': ' + num_doc + ', ' + Locale.t("bol.forms.documento.tipobolla.extra.data") + ': ' + data_doc
        else
          return tipo + ' ' + Locale.t("bol.forms.documento.tipobolla.extra.numero") + ': ' + gruppo_num_doc + "/" + num_doc + ', ' + Locale.t("bol.forms.documento.tipobolla.extra.data") + ': ' + data_doc
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
          return Locale.t("bol.forms.documento.htmlsogg.cliente") + ': ' + data.rag_soc
        } else if (data.tipo_sogg === "F") {
          return Locale.t("bol.forms.documento.htmlsogg.fornitore") + ': ' + data.rag_soc
        } else {
          return Locale.t("bol.forms.documento.htmlsogg.nessuno")
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
