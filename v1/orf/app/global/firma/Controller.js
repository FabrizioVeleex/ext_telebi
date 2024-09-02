/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("orf.global.firma.Controller", {
  extend: "Ext.app.ViewController",
  alias: "controller.winfirma",
  requires: [],
  init: function () {
    this.canvas;
  },
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
  onChangeStampante: function (combobox, newvalue) {
    let me = this,
      vm = me.getViewModel(),
      record = combobox.findRecordByValue(newvalue);
    if (record) {
      vm.set("nomestampante", record.data.descrizione);
    }
  },
  onAvviaFirma: function () {
    let opzioniFirma = this.lookupReference("opzioniFirma");
    let firmapad = this.lookupReference("firmapad");
    let btnavviafirma = this.lookupReference("btnavviafirma");
    let btnstampa = this.lookupReference("btnstampa");
    let btnclearfirma = this.lookupReference("btnclearfirma");
    opzioniFirma.hide();
    btnavviafirma.hide();
    firmapad.show();
    btnstampa.show();
    btnclearfirma.show();
    let wrapper = document.getElementById("signature-pad");
    this.canvas = wrapper.querySelector("canvas");
    this.resizeCanvas();
    this.signaturePad = new SignaturePad(this.canvas);
  },
  onClear: function () {
    this.signaturePad.clear();
  },

  onStampa: function () {
    if (this.signaturePad.isEmpty()) {
      Ext.Msg.show({
        title: Locale.t("global.attenzione"),
        msg: Locale.t("orf.grids.documenti.winfirma.firmavuota"),
        icon: Ext.MessageBox.INFO,
        buttonText: {
          no: Locale.t("orf.grids.documenti.winfirma.firmavuotabtn"),
        },
      });
    } else {
      let firmabar = this.lookupReference("firmatoolbar");
      if (firmabar) {
        firmabar.disable();
      }
      let me = this,
        vm = me.getViewModel(),
        dataFirma = this.signaturePad.toDataURL(),
        signatureData = dataFirma.replace(/^data:image\/(png|jpg);base64,/, ""),
        dataprint = new Date(), //forzo data-ora del momento
        data = Ext.Date.format(dataprint, "d/m/Y"),
        ora = Ext.Date.format(dataprint, "H:i"),
        copie = vm.get("noStampa") === false ? vm.get("copie") : 0,
        idstampante = vm.get("idstampante"),
        conducente = vm.get("conducente"),
        vettore = vm.get("vettore"),
        cessionario = vm.get("cessionario"),
        note = vm.get("note"),
        storedocumenti = vm.getStore("griddocumenti"),
        records = [];



      storedocumenti.each(function (rec) {
        if (rec.data.spool === 1) {
          records.push(rec.data);
        }
      }, this);
      me.view.el.mask(Locale.t("global.actions.incorso"));
      Ext.Ajax.request({
        scope: this,
        url: Backend.REST_API + "global/firma/",
        method: "PUT",
        jsonData: {
          signatureData: signatureData,
          data: data,
          ora: ora,
          copie: copie,
          idstampante: idstampante,
          conducente: conducente,
          vettore: vettore,
          cessionario: cessionario,
          note: note,
          records: records,
        },
        success: function (res) {
          me.view.el.unmask();
          let rest = Ext.decode(res.responseText);
          me.getView().fireEvent("closeFirmaOk", rest);
          me.getView().destroy();
        },
        failure: function (res) {
          me.view.el.unmask();
          let firmabar = this.lookupReference("firmatoolbar");
          if (firmabar) {
            firmabar.enable();
          }
          let rest = Ext.decode(res.responseText);
          Ext.Msg.show({
            title: Locale.t("global.attenzione"),
            msg: rest["msg"],
            icon: Ext.MessageBox.INFO,
            buttonText: {
              no: Locale.t("orf.grids.documenti.winprint.firmaok"),
            },
          });
        },
      });
    }
  },
  resizeCanvas: function () {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    let ratio = Math.max(window.devicePixelRatio || 1, 1);
    this.canvas.width = this.canvas.offsetWidth * ratio;
    this.canvas.height = this.canvas.offsetHeight * ratio;
    this.canvas.getContext("2d").scale(ratio, ratio);
  },
  onCloseWin: function () {
    this.getView().destroy();
  },
});
