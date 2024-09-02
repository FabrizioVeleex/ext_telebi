/**
 * Created by fabrizio on 15/02/2022.
 * TODO gestire casistice tipo documento in formula
 */
Ext.define("orf.forms.documento.model.ViewModel", {
  extend: "portal.v1.view.forms.mainCard.Model",
  alias: "viewmodel.v1-model-documento",
  requires: [
    "orf.forms.documento.component.gridMail.Store",
    "orf.forms.documento.component.tagEmail.Store",
    'orf.forms.documento.component.comboSoggetto.Store',
    'orf.forms.documento.component.tagAttach.Store',
    "orf.forms.documento.component.gridDup.Store",
    "orf.forms.documento.component.formDocumento.StoreDettaglio"
  ],
  stores: {
    storemail: { type: "v1-orf-forms-documento-gridmail", autoload: false },
    storeDettaglio: { type: "v1-orf-forms-documento-griddettaglio", autoload: false },
    comboSoggetto: { type: "v1-orf-form-documento-soggetti" },
    storeEmailDefault: { type: "v1-orf-forms-documento-tagemaildefault" },
    storeEmailNew: { type: "v1-orf-forms-documento-tagemaildefault" },
    storeAttachNew: { type: "v1-orf-forms-documento-gridattach" },
    storeMailDup: { type: "v1-orf-forms-documento-griddup" },
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
        // aggiornamre lingua sul backend
        const data_doc = Ext.Date.format(new Date(data.data_doc), "d/m/Y");
        const num_doc = data.num_doc || '-';
        const gruppo_num_doc = data.gruppo_num_doc || '';
        let tipo = '[N.D.]'

        if (data.tipo_spool === "C") {
          tipo = Locale.t("orf.forms.documento.confermaordine");
        } else if (data.tipo_spool === "P") {
          tipo = Locale.t("orf.forms.documento.proforma");
        }

        if (gruppo_num_doc === "")
          return tipo + " " + Locale.t("orf.forms.documento.number") + ' : ' + num_doc + ', ' + Locale.t("orf.forms.documento.date") + ': ' + data_doc
        else
          return tipo + " " + Locale.t("orf.forms.documento.number") + ' : ' + gruppo_num_doc + "/" + num_doc + ', ' + Locale.t("orf.forms.documento.date") + ': ' + data_doc
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
          return Locale.t("orf.forms.documento.client") + ' ' + data.rag_soc
        } else if (data.tipo_sogg === "F") {
          return Locale.t("orf.forms.documento.supplier") + ' ' + data.rag_soc
        } else {
          return Locale.t("orf.forms.documento.nosupplier")
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
