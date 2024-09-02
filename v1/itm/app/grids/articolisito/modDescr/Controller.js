/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("itm.grids.articolisito.modDescr.Controller", {
  extend: "Ext.app.ViewController",
  alias: "controller.itm-v1-grids-moddescr",

  /**
   * Called when the view is created
   */
  init: function () { },
  onAfterRender: function () {
    let me = this,
      vm = me.getViewModel(),
      gridArticoli = vm.getStore("gridArticoli"),
      gridArticoliMod = vm.getStore("gridArticoliMod");
    gridArticoli.getProxy().extraParams = me.getView().extraParams;
    gridArticoli.load();
  },

  onCloseWin: function () {
    this.getView().destroy();
  },

  onReplace: function () {
    let me = this,
      vm = me.getViewModel(),
      txtOld = vm.get("txtFind"),
      txtNew = vm.get("txtReplace"),
      store = vm.getStore("gridArticoli");
    for (const row of store.data.items) {
      row.set("descrizioneMod", row.data.descrizioneMod.replaceAll(txtOld, txtNew));
    }
  },
  onReset: function () {
    let me = this,
      vm = me.getViewModel(),
      store = vm.getStore("gridArticoli");
    for (const row of store.data.items) {
      row.set("descrizioneMod", row.data.descrizione);
    }
  },
  onRestoreDescriptionSingle: function (view, rowIndex, colIndex, item, event, r) {
    if (r.data.descrizione !== r.data.descrizioneMod) {
      r.set('descrizioneMod', r.data.descrizione)
    }

  },
  onConfirm: function () {
    let me = this,
      vm = me.getViewModel(),
      store = vm.getStore("gridArticoli"),
      list = []
    for (const row of store.data.items) {
      list.push(row.data)
    }
    Ext.Ajax.request({
      url: Backend.REST_API + "grids/articoli/setstoreModDesc/",
      method: "POST",
      jsonData: {
        list: list,
      },
      success: function (response) {
        me.getView().fireEvent('closeWindow')
        let r = response.responseText;
        let r1 = Ext.decode(r)
        Ext.Msg.show({
          title: Locale.t("itm.grids.articoli.moddesc.respose.title"),
          message: Locale.t("itm.grids.articoli.moddesc.respose.msgok") + '<hr>' + r1.msg,
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.INFO
        });
        me.getView().destroy();

      },
      failure: function (response) {
        me.getView().fireEvent('closeWindow')
        let r = response.responseText;
        let r1 = Ext.decode(r)
        Ext.Msg.show({
          title: Locale.t("itm.grids.articoli.moddesc.respose.title"),
          message: Locale.t("itm.grids.articoli.moddesc.respose.msgko") + '<hr>' + r1.msg,
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.ERROR
        });

        me.getView().destroy();
      },
    });
  },
  onReplaceTxtChange: function (field, newValue, oldValue) {
    if (newValue.trim() !== "") {
      this.getViewModel().set("disableReplace", false)
    }
    else {
      this.getViewModel().set("disableReplace", true)

    }
  }
});
