/**
 * Created by luca on 16/07/2018.
 */
Ext.define("rec.view.forms.reso.Controller", {
  extend: "portal.v1.view.forms.mainCard.Controller",
  mixins: ['portal.v1.global.Util','rec.view.forms.reso.components.ControllerAzioni'],
  alias: "controller.v1-reso",
  requires: [
    "Ext.menu.Menu",
    "portal.v1.view.main.global.upload.Attach",
    "portal.v1.view.main.global.upload.CardAttach",
    "portal.v1.view.main.global.upload.GridAttachModel",
    "portal.v1.view.main.global.upload.GridAttachs",
    "portal.v1.view.main.global.upload.GridImageModel",
    "portal.v1.view.main.global.upload.GridImages",
    "rec.model.forms.reso.Model",
    "rec.view.forms.reso.cards.CardArticoli",
    "rec.view.forms.reso.cards.CardImmagini",
    "rec.view.forms.reso.cards.GridArticoli",
    "rec.view.forms.reso.cards.GridRicevuti",
    "rec.view.forms.reso.cards.Reso",
    'rec.model.forms.reso.GridRicevuti',
    'rec.view.forms.reso.upload.Attach'
  ],
  init: function () {
    let vm = this.getViewModel();
    //tasti flusso
    this.btnInoltra = {xtype: "button", ui: "blue", text: Locale.t("rec.forms.reso.btn.inoltra.text"), msg: Locale.t("rec.forms.reso.btn.inoltra.msg"),
      tooltip: Locale.t("rec.forms.reso.btn.inoltra.tooltip"), iconCls: "fas fa-arrow-circle-right", step: 20, handler: "onStep"
    };
    this.btnResoCliente = {xtype: "button", ui: "blue", text: Locale.t("rec.forms.reso.btn.resocliente.text"), msg: Locale.t("rec.forms.reso.btn.resocliente.msg"),
      tooltip: Locale.t("rec.forms.reso.btn.resocliente.tooltip"), iconCls: "fas fa-arrow-circle-right", step: 21, handler: "onStep"
    };
    this.btnIngresso = {xtype: "button", ui: "blue", text: Locale.t("rec.forms.reso.btn.ingressomateriale.text"), msg: Locale.t("rec.forms.reso.btn.ingressomateriale.msg"),
      tooltip: Locale.t("rec.forms.reso.btn.ingressomateriale.tooltip"), iconCls: "fas fa-arrow-circle-right", step: 25, handler: "onIngresso"
    };
    this.btnInoltratecnico = {xtype: "button", ui: "blue", text: Locale.t("rec.forms.reso.btn.inoltratecnico.text"),msg: Locale.t("rec.forms.reso.btn.inoltratecnico.msg"),
      tooltip: Locale.t("rec.forms.reso.btn.inoltratecnico.tooltip"), iconCls: "fas fa-arrow-circle-right", step: 30, handler: "onInoltraTecnico"
    };
    this.btnCommerciali = {xtype: "button", ui: "blue", text: Locale.t("rec.forms.reso.btn.inoltradirezione.text"),msg: Locale.t("rec.forms.reso.btn.inoltradirezione.msg"),
      tooltip: Locale.t("rec.forms.reso.btn.inoltradirezione.tooltip"), iconCls: "fas fa-arrow-circle-right", step: 40, handler: "onStep"
    };
    this.btnRespingi = {xtype: "button", ui: "red", text: Locale.t("rec.forms.reso.btn.respingi.text"),msg: Locale.t("rec.forms.reso.btn.respingi.msg"),
      tooltip: Locale.t("rec.forms.reso.btn.respingi.tooltip"), iconCls: "fas fa-thumbs-down", step: 97, handler: "onRespingi"
    };
    this.btnCompleta = {xtype: "button", ui: "blue", text: Locale.t("rec.forms.reso.btn.completa.text"),msg: Locale.t("rec.forms.reso.btn.completa.msg"),
      tooltip: Locale.t("rec.forms.reso.btn.completa.tooltip"), iconCls: "fas fa-thumbs-up", step: 50, handler: "onChiudi"
    };
    this.btnAnnulla = {xtype: "button", ui: "orange", text: Locale.t("rec.forms.reso.btn.annulla.text"),msg: Locale.t("rec.forms.reso.btn.annulla.msg"),
      tooltip: Locale.t("rec.forms.reso.btn.annulla.tooltip"), iconCls: "fas x-fas fa-trash", step: 98, handler: "onAnnulla"
    };
    this.btnEsporta = {xtype: "button", ui: "green", text: Locale.t("rec.forms.reso.btn.esporta.text"),msg: Locale.t("rec.forms.reso.btn.esporta.msg"),
      tooltip: Locale.t("rec.forms.reso.btn.esporta.tooltip"), iconCls: "fas fa-file-excel", step: 98, handler: "onEsporta"
    };
    //creo tasti grid articoli
    this.toolBarGrid = Ext.create("Ext.toolbar.Toolbar", {dock: "top",
      items: [
        {xtype: "button", text: Locale.t("rec.forms.reso.grids.richiesti"), posizione: "R", enableToggle: true, pressed: true, handler: "onClickGridArticoli"},
        {xtype: "button", text: Locale.t("rec.forms.reso.grids.ricevuti"), posizione: "I", enableToggle: true, handler: "onClickGridArticoli"}
      ]
    });
    vm.set("isnew", this.getView().valori.isnew);
    vm.set("id", this.getView().valori.id);
    vm.set("record", Ext.create("rec.model.forms.reso.Model", {
        id: this.getView().valori.id, isnew: this.getView().valori.isnew,
      })
    );
    this.callParent(arguments);
  },
  managerView: function () {
    this.callParent(arguments);
    let me = this, vm = me.getViewModel(), record = vm.get("record"),
      readOnly = true, readOnlyGrid = true, readOnlyAzione = true, readOnlyAttach = true;
    let gridarticoli = vm.getStore("gridArticoli"), gridricevuti = vm.getStore("gridRicevuti");
    //verifico in base allo stato le azioni disponibili
    switch (record.data.step) {
      case 10: //arrivata da sito, in attesa accettazione
        if (this.checkRuoli(["99", "3", "98"])) {
          readOnly = false;
          this.toolBar.add(this.btnInoltra);
          this.toolBar.add(this.btnResoCliente);
          this.toolBar.add(this.btnRespingi);
        }
        break;
      case 20: //in attesa materiale
        if (this.checkRuoli(["99", "3", "98"])) {
          this.toolBar.add(this.btnAnnulla);
        }
        if (this.checkRuoli(["99", "30", "98"])) {
          this.toolBar.add(this.btnIngresso);
        }
        break;
      case 30: //in verifica tecnica
        if (this.checkRuoli(["99", "3", "98"])) {
          this.toolBar.add(this.btnAnnulla);
        }
        if (this.checkRuoli(["99", "30"])) {
          readOnlyGrid = false; //abilitato a gestire le righe
          readOnlyAttach = false; //abilitato ad aggiungere allegati di testata
          vm.set("btn.save", true);
          this.toolBar.add(this.btnInoltratecnico);
        }
        if (this.checkRuoli(["99", "98"])) { //gestori app
          readOnlyAttach = false; //abilitato ad aggiungere allegati di testata
          readOnlyGrid = false; //abilitato a gestire le righe
          vm.set("btn.save", true);
        }
        this.toolBar.add(this.btnEsporta);
        break;
      case 40: //in verifica commerciale
        if (this.checkRuoli(["99", "3", "98"])) {
          this.toolBar.add(this.btnAnnulla);
        }
        if (this.checkRuoli(["5","99"])) {
          readOnlyAzione = false; //può gestire azioni da eseguire
          readOnlyAttach = false; //abilitato ad aggiungere allegati di testata
          vm.set("btn.save", true);
          if (record.data.checkdirezione===0) {
            this.toolBar.add(this.btnCompleta);
          } else {
            this.toolBar.add(this.btnCommerciali)
          }
        }
        if (this.checkRuoli(["99", "98"])) { //gestori app
          readOnlyAzione = false; //abilitato a gestire le righe
          readOnlyAttach = false; //abilitato ad aggiungere allegati di testata
          readOnlyGrid = false; //abilitato a gestire le righe
          vm.set("btn.save", true);
        }
        this.toolBar.add(this.btnEsporta);
        break;
      case 45: //chiusura
        if (this.checkRuoli(["99", "3", "98"])) {
          this.toolBar.add(this.btnAnnulla);
        }
        if (this.checkRuoli(["99", "45"])) {
          readOnlyAzione = false; //abilitato a gestire le righe
          readOnlyAttach = false; //abilitato ad aggiungere allegati di testata
          vm.set("btn.save", true);
          this.toolBar.add(this.btnCompleta);
        }
        if (this.checkRuoli(["99", "98"])) { //gestori app
          readOnlyAzione = false; //abilitato a gestire le righe
          readOnlyAttach = false; //abilitato ad aggiungere allegati di testata
          readOnlyGrid = false; //abilitato a gestire le righe
          vm.set("btn.save", true);
        }
        this.toolBar.add(this.btnEsporta);
        break;
      default:
        this.toolBar.add(this.btnEsporta);
        break;
    }
    //gestione tasti default
    vm.set("btn.close", true);
    vm.set("btn.cronology", true);
    vm.set("readOnly", readOnly);
    vm.set("readOnlyAttach", readOnlyAttach);
    //titolo tab
    let datadoc = Ext.Date.format(record.data["creationdate"], "d/m/Y");
    vm.set("title", record.data["progressivo"] + " del " + datadoc || "n.d.");
    vm.set("label", Locale.t("rec.forms.reso.title"));
    //carico grids articoli
    gridarticoli.loadData(record.data["gridarticoli"]);
    gridricevuti.loadData(record.data["gridricevuti"]);
    if (readOnlyGrid===false) {
      gridricevuti.add(Ext.create('rec.model.forms.reso.GridRicevuti', {
        id: this.randomString(32),idtestata:'',numbolla:'',databolla:'',pscaus:'',psdesc:'',qtaric:1, action: 1, isnew: 1
      }))
    }
    vm.set("readOnlyGrid", readOnlyGrid);
    vm.set("readOnlyAzione", readOnlyAzione);
    this.cardReso = Ext.create("rec.view.forms.reso.cards.Reso");
    //creo panel grids con tasti
    this.cardGrids = Ext.create("rec.view.forms.reso.cards.CardArticoli");
    this.cardGrids.addDocked(this.toolBarGrid, 0);
    //creo le 2 grids
    this.gridArticoli = Ext.create("rec.view.forms.reso.cards.GridArticoli");
    this.gridRicevuti = Ext.create("rec.view.forms.reso.cards.GridRicevuti");
    this.cardGrids.add(this.gridArticoli, this.gridRicevuti);
    //aggiungo azioni multiple x tecnici
    if (record.data.step === 30 && this.checkRuoli(["99", "30"])) {
      this.toolBarRicevuti = Ext.create("Ext.toolbar.Toolbar", {dock: "top", items: []});
      this.tasti = [];
      this.tasti.push({
        ui: "blue", text: Locale.t("rec.forms.reso.btn.azioni.text"), menu: {
          xtype: "menu",
          items: [
              {iconCls: "x-fas fa-briefcase-medical", azione: "C", //causale
              text: Locale.t("rec.forms.reso.btn.azioni.causale"), handler: "onAzioneGrid"},
            {iconCls: "x-fas fa-sticky-note", azione: "N", //note
              text: Locale.t("rec.forms.reso.btn.azioni.note"), handler: "onAzioneGrid"
            },
            {iconCls: "x-fas fa-list-ol", azione: "P", //dossier
              text: Locale.t("rec.forms.reso.btn.azioni.pcdos"), handler: "onAzioneGrid"
            }
          ]
        }
      });
      this.toolBarRicevuti.add(this.tasti);
      this.gridRicevuti.addDocked(this.toolBarRicevuti, 0);
    }
    //aggiungo azioni multiple x il commerciale/direzione
    if (record.data.step === 45 && this.checkRuoli(["45"])  || record.data.step === 40 && this.checkRuoli(["5"] || this.checkRuoli(["99"]))) {
      this.toolBarRicevuti = Ext.create("Ext.toolbar.Toolbar", {dock: "top", items: []});
      this.tasti = [];
      this.tasti.push({
        ui: "blue", text: Locale.t("rec.forms.reso.btn.azioni.text"),
        menu: {
          xtype: "menu",
          items: [
            {iconCls: "x-fas fa-code-branch", azione: "A", //azione da eseguire
              text: Locale.t("rec.forms.reso.btn.azioni.azione"), handler: "onAzioneGrid"
            }
          ]
        }
      });
      this.toolBarRicevuti.add(this.tasti);
      this.gridRicevuti.addDocked(this.toolBarRicevuti, 0);
    }
    //aggiungo grids al panel principale
    this.cardReso.add(this.cardGrids);
    //immagini
    if (record.data.step > 10) {
      this.cardImmagini = Ext.create("rec.view.forms.reso.cards.CardImmagini"); //pannello immagini
      //inserisco sezione upload
      if (readOnlyAttach === false) {
        if (!this.uploadimage) {
          this.uploadimage = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestResoImage");
        }
        this.cardImmagini.down("#updimage").add(this.uploadimage);
        this.uploadimage.fireEvent("updateInfo", {
          url: "", src: "", thumb: false, descrizione: "",
          readOnly: readOnlyAttach, updimage: false, rif: "", type: ['jpg', 'jpeg', 'png', 'gif']
        });
      }
      this.gridImmagini = Ext.create("portal.v1.view.main.global.upload.GridImages"); //grid immagini
      this.cardImmagini.down("#gridimages").add(this.gridImmagini);
      //carico immagini del backend
      let storeImmagini = this.getViewModel().get("storeImmagini");
      storeImmagini.removeAll();
      record.data.immagini.forEach(function (rec) {
        rec["readOnlyAttach"] = readOnlyAttach;
        storeImmagini.add(Ext.create("portal.v1.view.main.global.upload.GridImageModel", rec));
      });
      this.cardReso.add(this.cardImmagini);
    }
    //allegati
    this.cardAllegati = Ext.create("portal.v1.view.main.global.upload.CardAttach");
    if (readOnlyAttach === false) {
      //inserisco tasto allegati
      if (!this.uploadfile) {
        this.uploadfile = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestReso");
      }
      this.cardAllegati.down("#updfile").add(this.uploadfile);
      this.uploadfile.fireEvent("updateInfo", {
        url: "", src: "", thumb: false, descrizione: "",
        readOnly: readOnlyAttach, updimage: false, rif: "", type: []
      });
    }
    this.gridAllegati = Ext.create("portal.v1.view.main.global.upload.GridAttachs");
    this.cardAllegati.down("#updgrid").add(this.gridAllegati);
    //carico allegati presenti
    let storeAllegati = this.getViewModel().get("storeAllegati");
    storeAllegati.removeAll();
    record.data.allegati.forEach(function (rec) {
      rec["readOnlyAttach"] = readOnlyAttach;
      rec["hideDownload"] = "false";
      storeAllegati.add(Ext.create("portal.v1.view.main.global.upload.GridAttachModel", rec));
    });
    this.cardReso.add(this.cardAllegati);
    this.form.add(this.cardReso);
    //se è arrivato materiale visualizzo prima la grid ricevuti
    if (record.data.step > 20) {
      this.cardGrids.setActiveItem(this.gridRicevuti);
      this.toolBarGrid.items.each(function (item) {
        if (item.posizione === "I") {
          item.toggle(true);
        } else {
          item.toggle(false);
        }
      }, this);
    }
    this.getView().setActiveItem(this.form);
  },
  onClickGridArticoli: function (btn) {
    if (btn.posizione === "R") {
      this.cardGrids.setActiveItem(this.gridArticoli);
    } else {
      this.cardGrids.setActiveItem(this.gridRicevuti);
    }
    this.toolBarGrid.items.each(function (item) {
      if (item.posizione === btn.posizione) {
        item.toggle(true);
      } else {
        item.toggle(false);
      }
    }, this);
  },
  onSave: function () {
    let me = this, vm = me.getViewModel(), record = vm.get("record");
    let storeprodotti = vm.getStore("gridRicevuti");
    let storeallegati = vm.getStore("storeAllegati");
    let storeimmagini = vm.getStore("storeImmagini");
    record.data["gridricevuti"] = [];
    storeprodotti.each(function (rec) {
      if (rec.data.codice!=='') {
        record.data['gridricevuti'].push(rec.data)
      }
    });
    //recupero allegati
    record.data["allegati"] = [];
    storeallegati.each(function (rec) {
      record.data["allegati"].push(rec.data);
    });
    //recupero immagini testata
    let totimg=0
    record.data["immagini"] = [];
    storeimmagini.each(function (rec) {
      if (rec.data.isnew!==2) {
        totimg=totimg+1
      }
      record.data["immagini"].push(rec.data);
    });
    record.data.totimg=totimg //gli passo totale immagini x le nuove da rimominare
    this.callParent(arguments);
  },
  //azioni allegati
  onReturnRequestResoImage: function (res) {
    let me = this, vm = me.getViewModel(),
      store = vm.getStore("storeImmagini");
    res.valori.idautore = Ext.global.Vars.infoUser.id; //imposto autore frontend
    res.valori.autore = Ext.global.Vars.infoUser.cognomenome; //imposto autore frontend
    res.valori.hideDownload = "true"; //il nuovo non lo posso scaricare
    res.valori.nomefile = res.valori.file //associo nome file fisico
    store.add(
      Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori)
    );
  },
  onReturnRequestReso: function (res) {
    let me = this, vm = me.getViewModel(),
        store = vm.getStore("storeAllegati");
    res.valori.idautore = Ext.global.Vars.infoUser.id; //imposto autore frontend
    res.valori.autore = Ext.global.Vars.infoUser.cognomenome; //imposto autore frontend
    res.valori.hideDownload = "true"; //il nuovo non lo posso scaricare
    store.add(
        Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori)
    );
  },
  //allegato riga
  onAttachRiga:function(view, rowIndex, colIndex, item, opt, record) {
    let me = this, vm = me.getViewModel()
    if (vm.get('readOnlyAttach')) {
      return false
    }
    if (this.attachriga) {
      this.attachriga.destroy()
    }
    this.attachriga=Ext.create("rec.view.forms.reso.upload.Attach").show();
    this.attachriga.on('returnRequest', this.onReturnRequestRiga, this,record);
  },
  onReturnRequestRiga:function(res,record) {
    let me = this, vm = me.getViewModel(),rec = vm.get("record")
    if (this.attachriga) {
      this.attachriga.destroy()
    }
    let storeimgrighe=vm.get('storeImmaginiRiga')
    me.getView().el.mask(Locale.t("global.actions.incorso"));
    Ext.Ajax.request({
      method: "POST", jsonData: { infofile:res, progressivo:rec.data.progressivo,riga:record.data.rigabolla,totriga:storeimgrighe.data.length}, //passo info file upload, tot immagini riga e progressivo=cartella
      url: Backend.REST_API + "forms/reso/immagineriga", //azione flusso generica passando lo step
      success: function () {
        me.getView().el.unmask();
        storeimgrighe.removeAll() //rimuovo eventuali records
        storeimgrighe.getProxy().extraParams.progriga=record.data.rigabolla //numero riga
        storeimgrighe.getProxy().extraParams.progressivo=rec.data.progressivo //percorso images
        storeimgrighe.load()
        Ext.Msg.show({
          title: Locale.t("global.avviso"),
          msg: Locale.t('rec.forms.reso.gridricevuti.addimageok'),
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.INFO
        });
      },
      failure: function (response) {
        me.getView().el.unmask();
        let resp = Ext.decode(response.responseText);
        Ext.Msg.show({
          title: Locale.t("global.errore"),
          msg: resp["msg"],
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.ERROR
        });
      }
    });
  },
  onRemoveImage:function(view, rowIndex, colIndex, item, opt, record) {
    let me = this, vm = me.getViewModel()
    if (vm.get('readOnlyAttach')) {
      return false
    }
    let storeimgrighe=vm.get('storeImmaginiRiga')
    Ext.Msg.show({
      title: Locale.t('global.avviso'), iconCls: 'x-fas fa-check-circle', msg: Locale.t('rec.forms.reso.gridricevuti.delimage'),
      buttons: Ext.Msg.YESNO, icon: Ext.MessageBox.QUESTION, fn: function (b) {
        if (b === 'yes') {
          Ext.Ajax.request({
            method: "POST", jsonData: {data:record.data},
            url: Backend.REST_API + "forms/reso/delimmagine",
            success: function () {
              Ext.Msg.show({
                title: Locale.t("global.avviso"),
                msg: Locale.t('rec.forms.reso.gridricevuti.delimageok'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
              });
              storeimgrighe.removeAll() //rimuovo eventuali records
              storeimgrighe.getProxy().extraParams.progriga=record.data.rigabolla //numero riga
              storeimgrighe.getProxy().extraParams.progressivo=record.data.progressivo //percorso images
              storeimgrighe.load()
            },
            failure: function (response) {
              me.getView().el.unmask();
              let resp = Ext.decode(response.responseText);
              Ext.Msg.show({
                title: Locale.t("global.errore"),
                msg: resp["msg"],
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
              });
            }
          });
        }
      }
    })
  }
});
