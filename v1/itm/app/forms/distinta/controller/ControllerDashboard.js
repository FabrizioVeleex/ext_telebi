Ext.define("itm.forms.distinta.controller.ControllerDashboard", {
  managerViewDashboard: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record'),
      readOnly = vm.get('readOnly');

    let storeClassi = vm.getStore('storeClassi') //store x la combo classe
    let storeFamiglie = vm.getStore('storeFamiglie') //store x la combo famiglia
    let storeGruppi = vm.getStore('storeGruppi') //store x la combo gruppo
    let storeSottogruppi = vm.getStore('storeSottogruppi') //store x la combo gruppo
    let storeLegami = vm.getStore('storeLegami') // store lista figli

    try {
      storeClassi.loadData(record.data['storeclassi'])
      storeFamiglie.loadData(record.data['storefamiglie'])
      storeGruppi.loadData(record.data['storegruppi'])
      storeSottogruppi.loadData(record.data['storesottogruppi'])
      storeLegami.loadData(record.data['gridlegami'])

      // Gestione immagine

      const pos = Object.keys(this.listForms).find(key => this.listForms[key]['posizione'] === 'dashboard');
      this.listForms[pos].card.down('#imgUser').setSrc(record.data.imagepred)

      this.gridLegami = Ext.create("itm.forms.articolo.component.gridlegami.GridLegami")
      if (storeLegami.data.length > 0) {
        this.listForms[pos].card.down('#gridLegami').add(this.gridLegami)
      }
    } catch (err) {
      console.log(err)
      //TODO gestire errore
    }


  },
  onOpenFiglio: function (view, rowIndex, colIndex, item, opt, record) {

    let itemId = 'f' + record.data['id_figlio'];
    let main = this.getView().up('app-main')
    let mainController = main.getController();
    if (mainController.checkFormMain(itemId)) {
      return
    }
    mainController.createTabMain(Ext.create('itm.forms.articolo.ArticoloPanel', {
      itemId: 'f' + record.data['id_figlio'],
      record: record,
      valori: {
        id: record.data['id_figlio'],
        isnew: 0
      }
    }), null)
  },
});
