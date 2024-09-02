/**
 * Created by fabrizio on 15/02/2022.
 * TODO gestire casistice tipo documento in formula
 */
Ext.define("spl.forms.documento.model.ViewModel", {
  extend: "portal.v1.view.forms.mainCard.Model",
  alias: "viewmodel.v1-spl-form-documento",
  requires: [
    'spl.forms.documento.component.fieldAssociazione.StoreSoggetto',
    "spl.forms.documento.component.mail.tagEmail.Store",
    'spl.forms.documento.component.mail.tagAttach.Store',
    "spl.forms.documento.component.gridMail.Store",
    "spl.forms.documento.component.gridDup.Store"
  ],
  stores: {
    storeMail: { type: "v1-spl-forms-documento-gridmail", autoload: false },
    comboSoggetto: { type: "v1-spl-form-documento-soggetti" },
    storeEmailDefault: { type: "v1-spl-forms-documento-tagemaildefault" },
    storeEmailNew: { type: "v1-spl-forms-documento-tagemaildefault" },
    storeAttachNew: { type: "v1-spl-forms-documento-gridattach" },
    storeMailDup: { type: "v1-spl-forms-documento-griddup" },
  },
  data: {
    destinazione: {
      destinatario: "",
      indirizzo: "",
      cap: "",
      idlocalita: "",
      provincia: "",
      regione: "",
    },
    email: {
      subject: "",
      corpo: "",
      mailto: [],
      mailfrom: "",
      listAttach: [],
      replyTo: ""
    },
    noDdt: true,
    exception: true,
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

        const tipo_spool = data.tipo_spool || '-';
        const data_doc = Ext.Date.format(new Date(data.data_doc), "d/m/Y");
        const cd_sogg_fatt = data.cd_sogg_fatt || '-';
        const num_doc = data.num_doc || '-';
        const gruppo_num_doc = data.gruppo_num_doc || '-';
        let tipo = 'Non definito'
        switch (data.tag) {
          case "BOL":
            if (tipo_spool === "V") {
              tipo = Locale.t("spl.grids.documenti.bol.v");
            } else {
              tipo = Locale.t("spl.grids.documenti.bol.t");
            }
            break;
          case "FAT":
            if (tipo_spool === "F") {
              tipo = Locale.t("spl.grids.documenti.fat.f");
            } else if (tipo_spool === "N") {
              tipo = Locale.t("spl.grids.documenti.fat.n");
            } else if (tipo_spool === "S") {
              tipo = Locale.t("spl.grids.documenti.fat.s");
            } else if (tipo_spool === "P") {
              tipo = Locale.t("spl.grids.documenti.fat.p");
            }
            break;
          case "ORD":
            if (tipo_spool === "C") {
              tipo = Locale.t("spl.grids.documenti.ord.c");
            } else if (tipo_spool === "R") {
              tipo = Locale.t("spl.grids.documenti.ord.r");
            }
            break;
          case "ORF":
            tipo = Locale.t("spl.grids.documenti.orf.o");
            break;
        }
        if (gruppo_num_doc === "")
          return tipo + '  ' + Locale.t("spl.grids.documenti.strings.numero") + ': ' + num_doc + ', ' + Locale.t("spl.grids.documenti.strings.data") + ': ' + data_doc
        else
          return tipo + '  ' + Locale.t("spl.grids.documenti.strings.numero") + ': ' + gruppo_num_doc + "/" + num_doc + ', ' + Locale.t("spl.grids.documenti.strings.data") + ': ' + data_doc
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
          return Locale.t("spl.grids.documenti.strings.cliente") + ' ' + data.rag_soc
        } else if (data.tipo_sogg === "F") {
          return Locale.t("spl.grids.documenti.strings.fornitore") + ' ' + data.rag_soc
        } else {
          return Locale.t("spl.grids.documenti.strings.assente")
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
