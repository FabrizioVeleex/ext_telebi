/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("pak.global.invia.Controller", {
  extend: "Ext.app.ViewController",
  alias: "controller.pak-v1-global-invia",

  /**
   * Called when the view is created
   */
  init: function () { },
  onAfterRender: function () {
    let me = this,
      vm = me.getViewModel(),
      storedocumenti = vm.getStore("griddocumenti");

    Ext.Ajax.request({
      url: Backend.REST_API + "global/getinvia/",
      method: "POST",
      jsonData: { records: me.getView().recordsGood },
      success: function (res) {
        // me.view.el.unmask();
        let rest = Ext.decode(res.responseText);
        // me.getView().fireEvent("closePrintOk", rest);
        // me.getView().destroy();
        storedocumenti.loadData(rest.data, false);
        if (rest.totalCount !== 0)
          vm.set("htmlNumeroDest", "<div style='font-size:18px;color:green'>" + Locale.t("pak.forms.documento.sendmail.nDest.yes") + ": " + rest.totalCount + "</div>")
        else
          vm.set("htmlNumeroDest", "<div style='font-size:18px;color:red'>" + Locale.t("pak.forms.documento.sendmail.nDest.no") + "</div>")

      },
      failure: function (res) {
        // me.view.el.unmask();
        let rest = Ext.decode(res.responseText);
        Ext.Msg.show({
          title: Locale.t("global.attenzione"),
          msg: rest["msg"],
          icon: Ext.MessageBox.INFO,
          buttonText: {
            no: Locale.t("pak.grids.documenti.winprint.firmaok"),
          },
        });
      },
    });

    let nRecordGood = this.getView().recordsGood.length;
    let noSpool = this.getView().recordsGood.filter(r => r.spool === 0);
    if (noSpool.length > 0) {
      let result = Locale.t("pak.forms.documento.sendmail.documentsselected") + ":" + (nRecordGood - noSpool.length) + '/' + nRecordGood;
      if (noSpool.length > 0) {
        vm.set("htmlNoSpool", `<span style="font-size:19px;">${result} </br><span style="color:red;"><hr>${Locale.t("pak.forms.documento.sendmail.result")}</span></span>`);
      } else {
        vm.set("htmlNoSpool", `<span style="font-size:19px;">${result}</span>`);
      }
    }
  },
  onInvia: function (btn) {
    let me = this,
      vm = me.getViewModel(),
      storedocumenti = vm.getStore("griddocumenti"),
      records = [];

    storedocumenti.each(function (rec) {
      if (rec.data.spool === 1 && rec.data.emails.length > 0) {
        records.push(rec.data);
      }
    }, this);
    me.view.el.mask(Locale.t("global.actions.incorso"));
    Ext.Ajax.request({
      scope: this,
      url: Backend.REST_API + "global/sendmail/",
      method: "POST",
      jsonData: { azione: btn.azione, records: records },
      success: function (res) {
        me.view.el.unmask();
        let rest = Ext.decode(res.responseText);
        me.getView().fireEvent("closeSend", rest);
        me.getView().destroy();
      },
      failure: function (res) {
        me.view.el.unmask();
        let rest = Ext.decode(res.responseText);
        // if (rest.errorDest.length !== 0) {
        //   //TODO mostrare errorwindow e caricare il suo store
        //   let griderrors = vm.get("griderrors")
        //   griderrors.loadData(rest.errorDest);
        // }
        Ext.Msg.show({
          title: Locale.t("global.attenzione"),
          msg: rest["msg"],
          icon: Ext.MessageBox.INFO,
          buttonText: {
            no: Locale.t("global.btn.close.text"),
          },
        });
      },
    });
  },
  onCloseWin: function () {
    this.getView().destroy();
  },
});
