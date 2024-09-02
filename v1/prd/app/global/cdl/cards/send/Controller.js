Ext.define("prd.global.cdl.cards.send.Controller", {
  extend: "Ext.app.ViewController",
  alias: "controller.v1-prd-controller-panotec-send",
  init: function () {
    let me = this,
      vm = me.getViewModel(),
      storeFolders = vm.getStore("storeFolders");

    // definisco root iniziale di ricerca folder
    storeFolders.setDefaultRootId(me.getView().valori.listOrders[0].cdArt);
    storeFolders.getProxy().extraParams.idCdl = me.getView().valori.idCdl;

  },
  onAfterRender: function () {
    let me = this,
      vm = me.getViewModel(),
      storeSend = vm.getStore("storeSend");

    me.valori = me.getView().valori;

    // gestione tasti invio
    let listBtn = []
    if (me.valori.isNew) {
      storeSend.loadData(me.getView().valori.listOrders)
      listBtn.push({ text: Locale.t("prd.forms.cdl.btn.undo.text"), handler: "onClose", iconCls: "fas fa-window-close bd-color-blue" })
      listBtn.push({ text: Locale.t("prd.forms.cdl.btn.sendOrder.text"), handler: "onSend", ui: "green", iconCls: "fas fa-paper-plane bd-color-blue", bind: { disabled: "{disableSend}" } });
    }
    this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
      dock: 'top',
      items: listBtn
    });

    this.getView().addDocked(this.toolBar, 0);
  },
  onLoadStore: function (store, records, success, operation, node) {
    let me = this,
      vm = me.getViewModel();

    if (success) {
      vm.set("message", operation._response.responseJson.message)
      if (operation._response.responseJson.status !== 200) {
        vm.set("programSelected", `<div style="border:1px solid;padding:10px;margin:5px;display:inline-block;">La lista programmi è vuota</div>`)
      } else {
        if (records.length > 0) {
          let grid = me.getView().down('#treePanel');
          if (grid) {
            //TODO grid.expandNode(grid.getRootNode().nextNode());
          }
        }
      }
    } else {
      vm.set("message", operation.error.statusText)
    }
  },
  onClose: function () {
    this.getView().fireEvent("closePanel", this.valori, true);
  },
  onSelectionchange: function (view, selected) {
    let me = this,
      vm = me.getViewModel();

    if (selected[0].data.file && selected[0].data.file !== "") {
      vm.set("programSelected", `<div style="font-style:italic;font-size:small;">Programma selezionato</div><div style="border:1px solid;padding:10px;margin:5px;display:inline-block;">${selected[0].data.path + "/" + selected[0].data.file}</div>`)
      vm.set("disableSend", false);
      vm.set("programFile", selected[0].data.path + "/" + selected[0].data.file);
    } else {
      vm.set("programSelected", `<div style="border:1px solid;padding:10px;margin:5px;display:inline-block;">Selezionare un programma dall'elenco per proseguire</div>`)
      vm.set("disableSend", true);
      vm.set("programFile", "")
    }
  },
  onSend: function () {
    let me = this,
      vm = me.getViewModel();

    let path = vm.get("programFile");

    Ext.Ajax.request({
      method: "POST",
      jsonData: { valori: me.valori, path: path },
      url: Backend.REST_API + "forms/cdl/sendOrder/",
      success: function (res) {
        bdFunctions.bdTips.msg("Invio Ordine", "Programma in fase di invio al centro di lavoro", "PRD-64");
        me.onClose();
      },
      failure: function (res) {
        try {
          let response = Ext.decode(res.responseText);

          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: response.message,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        } catch (e) {
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: e.message,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        }
      }
    });

  }
})