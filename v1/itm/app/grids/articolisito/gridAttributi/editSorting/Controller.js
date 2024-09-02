/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("itm.grids.articolisito.editSorting.Controller", {
  extend: "Ext.app.ViewController",
  alias: "controller.itm-v1-grids-editsorting",

  init: function () { },
  onAfterRender: function () {
    let me = this,
      vm = me.getViewModel(),
      store = vm.getStore("gridAttributi");

    vm.set('insert2', this.getView().isNew)
    // gestione inserimento nuovo attribbuti mancanti nella selezione categorizzata
    let listAtrNoSorting = []
    let listAtr = this.getView().listAtr;
    if (me.getView().actionSave) {
      listAtrNoSorting = listAtr.filter((el) => el.data.sorting === null)
      if (listAtrNoSorting.length > 0) {
        let n = this.getView().storeAttributi.length;
        for (const row of listAtrNoSorting) {
          this.getView().storeAttributi.push({
            attributo: row.data.attributo,
            sorting: n,
            id_atr: row.data.id_atr,
            isNew: 1
          })
          n++;
        }
      }
    }

    if (me.getView().isNew) {
      this.getView().storeAttributi.unshift({
        attributo: "",
        sorting: 0,
        id_atr: "",
        isNew: 2
      })
    }

    vm.set('record', this.getView().record);
    store.loadData(this.getView().storeAttributi);
  },

  onCloseWin: function () {
    this.getView().destroy();
  },

  onBeforeConfirm: function () {
    let me = this,
      vm = me.getViewModel(),
      store = vm.getStore("gridAttributi"),
      record = vm.get('record')

    let item = store.data.items.filter((el) => el.data.isNew === 2)

    if (item.length === 1 && item[0].data.attributo.trim() === '') {
      Ext.Msg.show({
        title: Locale.t("itm.grids.articoli.editsorting.title"),
        message: Locale.t("itm.grids.articoli.editsorting.valore"),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR
      });
      return;
    }

    Ext.Ajax.request({
      method: "POST",
      url: Backend.REST_API + 'grids/articoli/changeSortingAtr',
      jsonData: { id: record.id, item: item[0].data, step: 15 },
      success: function (response) {
        let r = Ext.decode(response.responseText);
        if (r.stepNext) {
          me.onConfirm()
        } else {
          Ext.Msg.show({
            title: Locale.t("itm.grids.articoli.editsorting.title"),
            message: r.msg,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        }

      },
      failure: function (response) {
        let r = response.responseText;
        Ext.Msg.show({
          title: Locale.t("itm.grids.articoli.editsorting.title"),
          message: r.msg,
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.ERROR
        });
      },
    });
  },

  onConfirm: function () {
    let me = this,
      vm = me.getViewModel(),
      store = vm.getStore("gridAttributi"),
      record = vm.get('record'),
      attributi = []


    for (const row of store.data.items) {
      attributi.push(row.data)
    }

    Ext.Ajax.request({
      method: "POST",
      url: Backend.REST_API + 'grids/articoli/changeSortingAtr',
      jsonData: { id: record.id, data: record, storeAttributi: attributi, step: 20 },
      success: function (response) {
        let r = Ext.decode(response.responseText);
        me.getView().fireEvent('closeWindow', { win: me.getView(), container: me.getView().containerGrid, storeAttributi: r.storeAttributi })
        me.getView().destroy();
      },
      failure: function (response) {
        let r = response.responseText;
        Ext.Msg.show({
          title: Locale.t("itm.grids.articoli.editsorting.title"),
          message: r.msg,
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.ERROR
        });
      },
    });
  },
  onBeforeDrop: function (node, data, overModel, dropPosition, dropHandlers) {
    // Setto record per evidenziare lo spostamento
    data.records[0].set('changed', true)
    // cambio il valore per abilitare il tasto di salvataggio ordinamento
    this.getViewModel().set('saveChanged', true)

  },
});
