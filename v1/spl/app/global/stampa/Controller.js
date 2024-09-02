/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("spl.global.stampa.Controller", {
  extend: "Ext.app.ViewController",
  alias: "controller.spl-v1-global-stampa",

  /**
   * Called when the view is created
   */
  init: function () { },
  onAfterRender: function () {
    let me = this,
      vm = me.getViewModel(),
      storedocumenti = vm.getStore("griddocumenti");
    vm.set("idstampante", Ext.global.Vars.infoUser.idstampante);
    storedocumenti.loadData(this.getView().recordsGood, false);


    let nRecordGood = this.getView().recordsGood.length;
    let noSpool = this.getView().recordsGood.filter(r => r.spool === 0);
    if (noSpool.length > 0) {

      vm.set("htmlNoSpool", `<span style="font-size:19px;">Documenti selezionati : ${nRecordGood} </br><span style="color:red;"><hr>ATTENZIONE! ${noSpool.length} in attesa di pdf, avvia la stampa dal gestionale per vederli</span></span>`);
    }
  },
  onStampa: function () {
    let me = this,
      vm = me.getViewModel(),
      copie = vm.get("copie"),
      idstampante = vm.get("idstampante"),
      storedocumenti = vm.getStore("griddocumenti"),
      records = [];

    storedocumenti.each(function (rec) {
      // if (rec.data.spool === 1) {
      records.push(rec.data);
      // }
    }, this);
    me.view.el.mask(Locale.t("global.actions.incorso"));
    Ext.Ajax.request({
      scope: this,
      url: Backend.REST_API + "functions/grid/stampa/",
      method: "PUT",
      jsonData: { records: records, copie: copie, idstampante: idstampante },
      success: function (res) {
        me.view.el.unmask();
        let rest = Ext.decode(res.responseText);
        me.getView().fireEvent("closePrintOk", rest);
        me.getView().destroy();
      },
      failure: function (res) {
        me.view.el.unmask();
        let rest = Ext.decode(res.responseText);
        Ext.Msg.show({
          title: Locale.t("global.attenzione"),
          msg: rest["msg"],
          icon: Ext.MessageBox.INFO,
          buttonText: {
            no: Locale.t("spl.grids.documenti.winprint.firmaok"),
          },
        });
      },
    });
  },
  onCloseWin: function () {
    this.getView().destroy();
  },
});
