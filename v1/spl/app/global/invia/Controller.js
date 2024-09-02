/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("spl.global.invia.Controller", {
  extend: "Ext.app.ViewController",
  alias: "controller.spl-v1-global-invia",

  /**
   * Called when the view is created
   */
  init: function () { },
  onAfterRender: function () {
    let me = this,
      vm = me.getViewModel(),
      storedocumenti = vm.getStore("griddocumenti");

    Ext.Ajax.request({
      url: Backend.REST_API + "functions/grid/getinvia/",
      method: "POST",
      jsonData: { records: me.getView().recordsGood },
      success: function (res) {
        let rest = Ext.decode(res.responseText);
        storedocumenti.loadData(rest.data, false);
        vm.set("disableInviaMail", rest.totalCount === 0)
        if (rest.totalCount !== 0)
          vm.set("htmlNumeroDest", "<div style='font-size:18px;color:green'>Numero di destinatari: " + rest.totalCount + "</div>")
        else
          vm.set("htmlNumeroDest", "<div style='font-size:18px;color:red'>Nessun destinatario presente</div>")

      },
      failure: function (res) {
        // me.view.el.unmask();
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

    let nRecordGood = this.getView().recordsGood.length;
    let noSpool = this.getView().recordsGood.filter(r => r.spool === 0);
    if (noSpool.length > 0) {
      vm.set("htmlNoSpool", `<span style="font-size:19px;">Documenti selezionati : ${nRecordGood} </br><span style="color:red;"><hr>ATTENZIONE! ${noSpool.length} in attesa di pdf, avvia la stampa dal gestionale per vederli</span></span>`);
    }
  },
  onInvia: function (btn) {
    let me = this,
      vm = me.getViewModel(),
      storedocumenti = vm.getStore("griddocumenti"),
      records = [];

    for (const row of storedocumenti.data.items) {
      records.push(row.data);
    }
    me.view.el.mask(Locale.t("global.actions.incorso"));
    Ext.Ajax.request({
      scope: this,
      url: Backend.REST_API + "functions/grid/sendmulti/",
      method: "POST",
      jsonData: { azione: btn.azione, records: records },
      success: function (res) {
        me.view.el.unmask();
        Ext.Msg.show({
          title: Locale.t("global.operazioneok"),
          msg: Locale.t("global.sendmail.okmultiple"),
          icon: Ext.MessageBox.INFO,
          buttonText: {
            no: Locale.t("global.btn.close.text"),
          },
        });
        // let rest = Ext.decode(res.responseText);
        // me.getView().fireEvent("closePrintOk", rest);
        me.getView().destroy();
      },
      failure: function (res) {
        me.view.el.unmask();
        let rest = Ext.decode(res.responseText);
        Ext.Msg.show({
          title: Locale.t("global.attenzione"),
          msg: Locale.t("global.sendmail.ko"),
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
