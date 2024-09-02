/**
 * Created by fabrizio on 24/10/2023.
 * TODO gestire casistice tipo tipologia in formula
 */
Ext.define("prd.forms.tipologia.model.ViewModel", {
  extend: "portal.v1.view.forms.mainCard.Model",
  alias: "viewmodel.v1-prd-model-tipologia",
  requires: [
    // "prd.forms.tipologia.component.gridMail.Store",
    // "prd.forms.tipologia.component.tagEmail.Store",
    // 'prd.forms.tipologia.component.comboSoggetto.Store',
    // 'prd.forms.tipologia.component.tagAttach.Store',
    // "prd.forms.tipologia.component.gridDup.Store",
    // "prd.forms.tipologia.component.formDocumento.StoreDettaglio"
  ],
  stores: {
    //   storemail: { type: "v1-prd-forms-tipologia-gridmail", autoload: false },
    //   storeDettaglio: { type: "v1-prd-forms-tipologia-griddettaglio", autoload: false },
    //   comboSoggetto: { type: "v1-prd-form-tipologia-soggetti" },
    //   storeEmailDefault: { type: "v1-prd-forms-tipologia-tagemaildefault" },
    //   storeEmailNew: { type: "v1-prd-forms-tipologia-tagemaildefault" },
    //   storeAttachNew: { type: "v1-prd-forms-tipologia-gridattach" },
    //   storeMailDup: { type: "v1-prd-forms-tipologia-griddup" },
  },
  data: {
    cardactive: "tipologia",
  },
  formulas: {

  }
});
