Ext.define("spl.forms.documento.cards.json.InfoController", {

  managerInfo: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record');

    try {
      if (record.get("tag") === "BOL") {
        vm.set("noDdt", false);

        // Popolo dati spedizione differente se popolati
        if (record.data.json && record.data.json.destinazione) {
          vm.set("destinazione", {
            destinatario: record.data.json.destinazione.destinatario,
            indirizzo: record.data.json.destinazione.indirizzo,
            cap: record.data.json.destinazione.cap,
            localita: record.data.json.destinazione.localita,
            provincia: record.data.json.destinazione.provincia,
            regione: record.data.json.destinazione.regione,
            nazione: record.data.json.destinazione.nazione,
          })
        }
      }
    } catch (err) {
      console.log(arguments.callee.name, error)
    }
  },

  onShowPdfDup: function (pnl) {
    if (pnl.preview === true) {
      return;
    }
    let me = this,
      vm = me.getViewModel(),
      record = vm.get("record");

    pnl.preview = true
    Ext.Ajax.request({
      url: Backend.REST_API + "functions/form/getfilepdfdup/",
      method: "POST",
      binary: true,
      jsonData: {
        record: { ...record.data, id_duplicato: pnl.id_duplicato, tipodoc: pnl.tag },
      },
      success: function (response) {
        let headers = response.getAllResponseHeaders();
        let blob = new Blob([response.responseBytes], { type: headers["content-type"] });
        let binarypdf = window.URL.createObjectURL(blob);
        let cardtmp = me.listForms.filter((obj) => {
          return obj.posizione === pnl.posizione;
        });
        if (cardtmp.length === 1) {
          cardtmp[0].card.add({
            xtype: "component",
            layout: "fit",
            autoEl: {
              tag: "iframe",
              width: "100%",
              height: "100%",
              style: "border: none",
              src: binarypdf, //immagine binaria di ritorno
            },
          }
          );
        } else {
          me.onErrorShowPdf(pnl)
        }
      },
      failure: function () {
        me.onErrorShowPdf(pnl)
      },
    });
  },

})
