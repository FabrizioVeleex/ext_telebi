Ext.define('skd.view.main.mixins.ControllerFiltriMancanti', {


  onAfterRender_filtri_mancanti: function () {
    let vm = this.getViewModel();
    let confMod = Ext.global.Vars.confMod;

    if (confMod.main.filtriMancanti === undefined) {
      confMod.main.filtriMancanti = {
        operatore: []
      }
      this.setConfMod();
    }
  },
  onLoadDataGridMancanti: function () {
    let me = this,
      i,
      vm = this.getViewModel(),
      filtriMancanti = vm.get("filtriMancanti")

    filtriMancanti.idGrid = "gridMancanti";

    Ext.global.Vars.confMod.main.filtriMancanti = filtriMancanti;
    this.setConfMod();

    //ripulisco dati cruscotto
    this.onRemoveDataCruscotto();
    vm.set("selectCell", null);
    vm.set("infoCell", null);
    vm.set("row", null);

    this.getView().el.mask("Caricamento dati in corso...");
    Ext.Ajax.request({
      // timeout: 220000,
      method: "POST",
      jsonData: filtriMancanti,
      url: Backend.REST_API + "grids/",
      success: function (response) {
        let resp = Ext.decode(response.responseText);
        if (resp["success"] === true) {
          me.getView().el.unmask();
          me.gridMancanti.fireEvent("prepareStoreData", resp, null);
        } else {
          //TODO messaggio errore su loaddata gtid
          me.getView().el.unmask();
        }
      },
      failure: function (response) {
        //TODO messaggio errore su loaddata gtid
        me.getView().el.unmask();
      },
    });
  },

})