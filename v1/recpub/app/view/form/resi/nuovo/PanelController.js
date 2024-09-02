/**
 * Created by fabrizio on 20/02/17.
 */
Ext.define("recpub.view.form.resi.nuovo.PanelController", {
  extend: "Ext.app.ViewController",
  alias: "controller.resinew",
  requires: [
    "recpub.view.form.resi.nuovo.ModelReso",
    "Ext.panel.Panel",
    "Ext.form.FieldSet",
    "Ext.form.field.ComboBox",
    "Ext.form.field.Display",
    "Ext.button.Button",
    "recpub.view.form.resi.nuovo.StoreComboCausali",
    "recpub.view.form.resi.nuovo.StoreComboProdotti",
    "recpub.view.form.resi.nuovo.StoreComboDdt",
    "Ext.toolbar.Toolbar",
    "Ext.layout.container.VBox",
    "Ext.layout.container.Column",
    "Ext.form.field.Radio",
    "Ext.form.RadioGroup",
    "Ext.form.field.Text",
    "Ext.window.Window",
    "Ext.form.field.Checkbox",
    "recpub.view.form.resi.info",
  ],
  /**
   * Called when the view is created
   */

  init: function () {
    this.indexItems = 0;
    this.trasportatore = 0; //a carico acrolcar
    this.steps = Ext.create("Ext.panel.Panel", {
      cls: "steptable",
      html:
        '<table style="height:59px" class="steptable"><tr  style="height:59px"><td style="height:59px" class="stepimageleftactive"></td>' +
        '<td style="height:59px;padding:0;"><img style="height:59px" alt="1" src="/images/azienda/avanzamento/1_blu_attivo.jpg"></td>' +
        '<td style="height:59px;padding:0;"><img style="height:59px" alt="ln" src="/images/azienda/avanzamento/line.png" class="stepline"></td>' +
        '<td style="height:59px;padding:0;"><img style="height:59px" alt="2" src="/images/azienda/avanzamento/2_grigio.jpg"></td>' +
        '<td style="height:59px;padding:0;"><img style="height:59px" alt="ln" src="/images/azienda/avanzamento/line.png" class="stepline"></td>' +
        '<td style="height:59px;padding:0;"><img style="height:59px" alt="3" src="/images/azienda/avanzamento/3_grigio.jpg"></td>' +
        '<td style="height:59px" class="stepimageright"></td>' +
        "</tr></table>" +
        '<table style="height:59px" class="steptable"><tr  style="height:59px">' +
        '<td class="steplinetext">' +
        Locale.t("recpub.forms.resinew.step.1") +
        "</td>" +
        '<td class="steplinetext">' +
        Locale.t("recpub.forms.resinew.step.2") +
        "</td>" +
        '<td class="steplinetext">' +
        Locale.t("recpub.forms.resinew.step.3") +
        "</td>" +
        "</tr></table>",
    });

    this.steps2 = Ext.create("Ext.panel.Panel", {
      cls: "steptable",
      html:
        '<table style="height:59px" class="steptable"><tr  style="height:59px"><td style="height:59px" class="stepimageleftactive"></td>' +
        '<td style="height:59px;padding:0;"><img style="height:59px" alt="1" src="/images/azienda/avanzamento/1_blu_avanzamento.jpg"></td>' +
        '<td style="height:59px;padding:0;"><img style="height:59px" alt="ln" src="/images/azienda/avanzamento/line-active.png" class="steplineactive"></td>' +
        '<td style="height:59px;padding:0;"><img style="height:59px" alt="2" src="/images/azienda/avanzamento/2_blu_attivo.jpg"></td>' +
        '<td style="height:59px;padding:0;"><img style="height:59px" alt="ln" src="/images/azienda/avanzamento/line.png" class="stepline"></td>' +
        '<td style="height:59px;padding:0;"><img style="height:59px" alt="3" src="/images/azienda/avanzamento/3_grigio.jpg"></td>' +
        '<td style="height:59px" class="stepimageright"></td>' +
        "</tr></table>" +
        '<table style="height:59px" class="steptable"><tr  style="height:59px">' +
        '<td class="steplinetext">' +
        Locale.t("recpub.forms.resinew.step.1") +
        "</td>" +
        '<td class="steplinetext">' +
        Locale.t("recpub.forms.resinew.step.2") +
        "</td>" +
        '<td class="steplinetext">' +
        Locale.t("recpub.forms.resinew.step.3") +
        "</td>" +
        "</tr></table>",
    });

    this.steps3 = Ext.create("Ext.panel.Panel", {
      cls: "steptable",
      html:
        '<table style="height:59px" class="steptable"><tr  style="height:59px"><td style="height:59px" class="stepimageleftactive"></td>' +
        '<td style="height:59px;padding:0;"><img style="height:59px" alt="1" src="/images/azienda/avanzamento/1_blu_avanzamento.jpg"></td>' +
        '<td style="height:59px;padding:0;"><img style="height:59px" alt="ln" src="/images/azienda/avanzamento/line-active.png" class="steplineactive"></td>' +
        '<td style="height:59px;padding:0;"><img style="height:59px" alt="2" src="/images/azienda/avanzamento/2_blu_avanzamento.jpg"></td>' +
        '<td style="height:59px;padding:0;"><img style="height:59px" alt="ln" src="/images/azienda/avanzamento/line-active.png" class="steplineactive"></td>' +
        '<td style="height:59px;padding:0;"><img style="height:59px" alt="3" src="/images/azienda/avanzamento/3_blu_attivo.jpg"></td>' +
        '<td style="height:59px" class="stepimageright"></td>' +
        "</tr></table>" +
        '<table style="height:59px" class="steptable"><tr  style="height:59px">' +
        '<td class="steplinetext">' +
        Locale.t("recpub.forms.resinew.step.1") +
        "</td>" +
        '<td class="steplinetext">' +
        Locale.t("recpub.forms.resinew.step.2") +
        "</td>" +
        '<td class="steplinetext">' +
        Locale.t("recpub.forms.resinew.step.3") +
        "</td>" +
        "</tr></table>",
    });

    this.card1 = Ext.create("Ext.panel.Panel", {
      scrollable: "y",
      layout: {
        type: "vbox",
        align: "center",
      },
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "bottom",
          defaults: {
            scale: "large",
          },
          ui: "footer",
          items: [
            { xtype: "component", flex: 0.5 },
            { xtype: "button", text: Locale.t("global.annulla"), cls: "btnupper", ui: "acblue", handler: "onBtnAnnullaNewReso" },
            {
              xtype: "button",
              text: Locale.t("recpub.forms.resinew.successivo"),
              ui: "sitelogin",
              cls: "btnOnLogin btnupper",
              handler: "onBtnNewResoStep1",
            },
            { xtype: "component", flex: 0.5 },
          ],
        },
      ],
    });

    this.card2 = Ext.create("Ext.panel.Panel", {
      titleAlign: "center",
      scrollable: "y",
      layout: {
        type: "vbox",
        align: "center",
      },
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "bottom",
          ui: "footer",
          defaults: {
            scale: "large",
          },
          items: [
            { xtype: "component", flex: 0.5 },
            { xtype: "button", text: Locale.t("global.annulla"), ui: "acred", cls: "btnAcRed btnupper", handler: "onBtnAnnullaNewReso" },
            {
              xtype: "button",
              ui: "acblue",
              text: Locale.t("recpub.forms.resinew.precedente"),
              cls: "btnAcBlue btnupper",
              handler: "onBtnNewResoStep1back",
            },
            {
              xtype: "button",
              ui: "sitelogin",
              cls: "btnOnLogin btnupper",
              text: Locale.t("recpub.forms.resinew.successivo"),
              handler: "onBtnNewResoStep2",
            },
            { xtype: "component", flex: 0.5 },
          ],
        },
      ],
    });

    this.card3 = Ext.create("Ext.panel.Panel", {
      titleAlign: "center",
      scrollable: "y",
      layout: {
        type: "vbox",
        align: "center",
      },
      dockedItems: [],
    });
  },

  /*
    creo primo container per inserirmento valori
     */
  onAfterRender: function () {
    var me = this;
    this.info = Ext.create("recpub.view.form.resi.info");

    me.getView().add(this.info);
    if (!this.dataForm) {
      this.dataForm = Ext.create("recpub.view.form.resi.nuovo.ModelReso");
    }

    this.dataForm.load({
      success: function (record) {
        me.info.hide();
        me.getViewModel().set("record", record.data);
        me.card1.add(me.createRowSpace());
        me.card1.add(me.steps);
        // me.card1.add(me.stepsText);
        me.card1.add(me.createRowRequiest());
        me.card1.add(me.createRowPlus());

        me.getView().add(me.card1);
        me.getView().setActiveItem(me.card1);
      },
    });
  },

  onBtnNewResoStep1back: function () {
    var me = this;
    me.getView().setActiveItem(me.card1);
  },

  onWindowsClose: function (btn) {
    btn.up("window").close();
  },

  onBtnNewResoStep1: function () {
    var me = this,
      eccezione = "";
    var list = this.getViewModel().get("list");
    this.tot = 0;
    this.trasportatore = 0;
    for (var i = 0; i < list.length; i++) {
      if (list[i].remove === 0) {
        this.tot++;
        if (list[i].codice === "" || list[i].ddt === "" || list[i].causale === "") {
          eccezione = Locale.t("recpub.forms.resinew.step1check.msg02");
        } else {
          if (list[i].causale === "020") {
            this.trasportatore = 1;
          }
        }
        if (list[i].dossier.length > 9) {
          eccezione = list[i].dspcodice + ": " + Locale.t("recpub.forms.resinew.step1check.msg00");
        }
      }
      if (eccezione !== "") {
        Ext.create("Ext.Window", {
          header: false,
          ui: "acallert",
          width: 400,
          modal: true,
          padding: 10,
          bodyCls: "winallert1",
          html: '<div class="titlewinddarkred">' + Locale.t("global.attenzione") + '</div><br><br><div class="">' + eccezione + "</div>",
          dockedItems: [
            {
              xtype: "toolbar",
              dock: "bottom",
              items: [
                { xtype: "component", flex: 0.5 },
                { xtype: "button", text: "OK", ui: "acblue", cls: "btnAcBlue btnupper", handler: "onWindowsClose", scope: this },
                { xtype: "component", flex: 0.5 },
              ],
            },
          ],
        }).show();
        return;
      }
    }
    //verifico se i dati sono corretti, presento resoconto e trasportatore
    if (this.tot === 0) {
      Ext.create("Ext.Window", {
        header: false,
        ui: "acallert",
        width: 400,
        modal: true,
        padding: 10,
        bodyCls: "winallert1",
        html:
          '<div class="titlewinddarkred">' +
          Locale.t("global.attenzione") +
          '</div><br><br><div class="">' +
          Locale.t("recpub.forms.resinew.step1check.msg01") +
          "</div>",
        dockedItems: [
          {
            xtype: "toolbar",
            dock: "bottom",
            items: [
              { xtype: "component", flex: 0.5 },
              { xtype: "button", text: "OK", ui: "acblue", cls: "btnAcBlue btnupper", handler: "onWindowsClose", scope: this },
              { xtype: "component", flex: 0.5 },
            ],
          },
        ],
      }).show();
      return;
    }

    me.card2.removeAll(false);

    me.card2.add(me.createRowSpace());
    me.card2.add(me.steps2);
    var trasportatore;
    var lista = "";

    for (var ii = 0; ii < list.length; ii++) {
      if (list[ii].remove === 0) {
        lista += list[ii]["dspcodice"] + " - " + list[ii]["dspddt"] + " - " + list[ii]["dspcausale"] + "<br>";
      }
    }

    var resoconto = Ext.create("Ext.form.FieldSet", {
      //title:'<span class="fontPT">Resoconto</span>',
      style: "background-color:white",
      items: [
        { xtype: "panel", cls: "inner2", html: '<span class="fontPT" style="font-weight: bold">Resoconto</span>' },
        { xtype: "panel", cls: "inner2", html: '<span class="fontPT">' + lista + "</span>" },
      ],
    });
    me.card2.add(resoconto);
    //verifico se il ciente e nelle regioni limitrofe per presentare possibilità consegna personale
    // PIEMONTE, VALLE D'AOSTA, LIGURIA, LOMBARDIA
    var regione = Ext.global.Vars.region;
    var hiddenTrasCli = true;
    if (regione === "PIEMONTE" || regione === "LIGURIA" || regione === "LOMBARDIA" || regione === "VALLE D'AOSTA") {
      hiddenTrasCli = false;
    }
    if (Ext.global.Vars.naz === "IT") {
      if (this.trasportatore === 1) {
        this.pnlTrasportatore = Ext.create("Ext.form.FieldSet", {
          style: "background-color:white;",
          items: [
            {
              xtype: "panel",
              cls: "inner2",
              html: '<span class="fontPT" style="font-weight: bold">' + Locale.t("recpub.forms.resinew.step2check.trasportatore") + "</span>",
            },
            {
              xtype: "panel",
              cls: "inner2",
              html: '<span class="fontPT"><p>' + Locale.t("recpub.forms.resinew.step2check.testo03") + "</p> </span>",
            },
            { xtype: "panel", html: Locale.t("recpub.forms.resinew.step2check.changeaddress") },
            { xtype: "textfield", cls: "inner2", fieldLabel: '<span class="fontPT">Trasportatore</span>', name: "traspcli", reference: "traspcli" },
          ],
        });
      } else {
        this.pnlTrasportatore = Ext.create("Ext.form.FieldSet", {
          cls: "inner2",
          style: "background-color:white;",
          items: [
            {
              xtype: "panel",
              cls: "inner2",
              html: '<span class="fontPT" style="font-weight: bold">' + Locale.t("recpub.forms.resinew.step2check.trasportatore") + "</span>",
            },
            { xtype: "panel", cls: "inner2", html: '<span class="fontPT">' + Locale.t("recpub.forms.resinew.step2check.testo01") + "</span>" },
            { xtype: "panel", cls: "inner2", html: '<span class="fontPT">' + Locale.t("recpub.forms.resinew.step2check.testo02") + "</span>" },
            { xtype: "panel", cls: "inner2", html: '<span class="fontPT">&nbsp;</span>' },
            { xtype: "panel", html: Locale.t("recpub.forms.resinew.step2check.changeaddress") },
            {
              xtype: "radiofield",
              //cls:'inner2',
              name: "trasp",
              reference: "traspgls",
              inputValue: "gls",
              boxLabel: '<span class="fontPT">' + Locale.t("recpub.forms.resinew.step2check.gls") + '</span>"',
            },
            {
              xtype: "radiofield",
              //cls:'inner2',
              name: "trasp",
              reference: "traspsusa",
              inputValue: "susa",
              boxLabel: '<span class="fontPT">' + Locale.t("recpub.forms.resinew.step2check.susa") + "</span>",
            },
            {
              xtype: "radiofield",
              //cls:'inner2',
              hidden: hiddenTrasCli,
              name: "trasp",
              reference: "traspcliente",
              inputValue: "cliente",
              boxLabel: '<span class="fontPT">' + Locale.t("recpub.forms.resinew.step2check.resome") + "</span>",
            },
            {
              xtype: "panel",
              cls: "inner2",
              html: '<br><i><span class="fontPT">' + Locale.t("recpub.forms.resinew.step2check.gls1") + "</span></i>",
            },
          ],
        });
      }
    } else {
      this.pnlTrasportatore = Ext.create("Ext.form.FieldSet", {
        style: "background-color:white;",
        items: [
          {
            xtype: "panel",
            cls: "inner2",
            html: '<span class="fontPT" style="font-weight: bold">' + Locale.t("recpub.forms.resinew.step2check.trasportatore") + "</span>",
          },
          { xtype: "panel", html: Locale.t("recpub.forms.resinew.step2check.changeaddress") },
          {
            xtype: "panel",
            cls: "inner2",
            html: '<span class="fontPT"><p>' + Locale.t("recpub.forms.resinew.step2check.condizioniestero") + "</p> </span>",
          },
        ],
      });
    }

    me.card2.add(this.pnlTrasportatore);

    me.getView().add(me.card2);
    me.getView().setActiveItem(me.card2);
  },

  onBtnNewResoStep2back: function () {
    var me = this;
    me.getView().setActiveItem(me.card2);
  },
  onBtnNewResoStep2: function () {
    var me = this,
      traspcli = "";
    //verifico trasportatore
    // if (this.tot===1 && this.trasportatore===1){
    if (this.trasportatore === 1) {
      traspcli = this.lookupReference("traspcli").getValue();
      if (traspcli === "") {
        Ext.create("Ext.Window", {
          header: false,
          ui: "acallert",
          width: 400,
          modal: true,
          padding: 10,
          bodyCls: "winallert1",
          html:
            '<div class="titlewinddarkred">' +
            Locale.t("global.attenzione") +
            '</div><br><br><div class="">' +
            Locale.t("recpub.forms.resinew.step1check.msg03") +
            "</div>",
          dockedItems: [
            {
              xtype: "toolbar",
              dock: "bottom",
              items: [
                { xtype: "component", flex: 0.5 },
                { xtype: "button", text: "OK", ui: "acblue btnupper", cls: "btnAcBlue", handler: "onWindowsClose", scope: this },
                { xtype: "component", flex: 0.5 },
              ],
            },
          ],
        }).show();
        return;
      }
    } else {
      var traspsusa = this.lookupReference("traspsusa");
      var traspgls = this.lookupReference("traspgls");
      var traspcliente = this.lookupReference("traspcliente");

      if (!traspsusa.checked && !traspgls.checked && !traspcliente.checked) {
        Ext.create("Ext.Window", {
          header: false,
          ui: "acallert",
          width: 400,
          modal: true,
          padding: 10,
          bodyCls: "winallert1",
          html:
            '<div class="titlewinddarkred">' +
            Locale.t("global.attenzione") +
            '</div><br><br><div class="">' +
            Locale.t("recpub.forms.resinew.step1check.msg04") +
            "</div>",
          dockedItems: [
            {
              xtype: "toolbar",
              dock: "bottom",
              items: [
                { xtype: "component", flex: 0.5 },
                { xtype: "button", text: "OK", ui: "acblue", cls: "btnAcBlue btnupper", handler: "onWindowsClose", scope: this },
                { xtype: "component", flex: 0.5 },
              ],
            },
          ],
        }).show();
        return;
      }
      if (traspsusa.checked) {
        this.traspselect = "susa";
      }
      if (traspgls.checked) {
        this.traspselect = "gls";
      }
      if (traspcliente.checked) {
        this.traspselect = "cliente";
      }
    }

    me.card3.removeAll(false);

    me.card3.add(me.createRowSpace());
    me.card3.add(this.steps3);
    debugger;
    var condizioni = Ext.create("Ext.form.FieldSet", {
      //title:Locale.t('recpub.forms.resinew.step3check.condizioni.title'),
      cls: "inner2",
      style: "background:white;",
      items: [
        {
          xtype: "panel",
          cls: "inner2",
          html: '<span class="fontPT" style="font-weight: bold">' + Locale.t("recpub.forms.resinew.step3check.condizioni.title") + "</span>",
        },
        { xtype: "panel", cls: "inner2", html: '<span class="fontPT">' + Locale.t("recpub.forms.resinew.step3check.condizioni.html") + "</span>" },
        {
          xtype: "checkbox",
          cls: "inner2",
          reference: "condizione1",
          boxLabel: '<span class="fontPT">' + Locale.t("recpub.forms.resinew.step3check.msg01") + "</span>",
        },
      ],
    });
    var condizioni2 = null;
    var condizioni3 = null;
    var note = null;
    var rec = null;
    var recRecl = null;
    var record = this.getViewModel().get("record");
    var ln = Locale.language.toUpperCase();
    var cond2 = false;
    var condRecl2 = false;
    if (record.conds[ln]) {
      rec = record.conds[ln];
      cond2 = true;
    } else {
      if (record.conds["IT"]) {
        rec = record.conds["IT"];
        cond2 = true;
      } else {
      }
    }
    if (cond2) {
      condizioni2 = Ext.create("Ext.form.FieldSet", {
        //title:rec['titolo'],
        //cls:'inner2',
        style: "background:white;",
        items: [
          { xtype: "panel", cls: "inner2", html: '<span class="fontPT" style="font-weight: bold">' + rec["titolo"] + "</span>" },
          { xtype: "panel", cls: "inner2", html: '<span class="fontPT">' + rec["descrizione"] + "</span>" },
          {
            xtype: "checkbox",
            cls: "inner2",
            reference: "condizione2",
            boxLabel: '<span class="fontPT">' + Locale.t("recpub.forms.resinew.step3check.msg01") + "</span>",
          },
        ],
      });
    }
    if (record.condsRecl[ln]) {
      recRecl = record.condsRecl[ln];
      condRecl2 = true;
    } else {
      if (record.condsRecl["IT"]) {
        recRecl = record.condsRecl["IT"];
        condRecl2 = true;
      } else {
      }
    }
    if (condRecl2) {
      condizioni3 = Ext.create("Ext.form.FieldSet", {
        //title:'<span class="fontPT">'+recRecl['titolo']+'</span>',
        cls: "inner2",
        style: "background:white;",
        items: [
          { xtype: "panel", cls: "inner2", html: '<span class="fontPT" style="font-weight:bold;">' + recRecl["titolo"] + "</span>" },
          { xtype: "panel", cls: "inner2", html: '<span class="fontPT">' + recRecl["descrizione"] + "</span>" },
          {
            xtype: "radiogroup",
            columns: 2,
            cls: "inner2",
            reference: "condizione3",
            items: [
              { boxLabel: '<span class="fontPT">' + recRecl["radio1"] + "</span>", name: "radio1", inputValue: 0 },
              { boxLabel: '<span class="fontPT">' + recRecl["radio2"] + "</span>", name: "radio1", inputValue: 1 },
            ],
          },
        ],
      });
    }
    me.textArea = Ext.create("Ext.form.TextArea", {
      width: "100%",
    });
    me.notecli = Ext.create("Ext.form.FieldSet", {
      //title:'<span class="fontPT">'+recRecl['titolo']+'</span>',
      cls: "inner2",
      style: "background:white;",
      items: [
        { xtype: "panel", cls: "inner2", html: '<span class="fontPT" style="font-weight:bold;">Note</span>' },
        {
          flex: 1,
          xtype: "panel",
          cls: "inner2",
          items: [me.textArea],
        },
      ],
    });
    // if (this.tot===1 && this.trasportatore===1) {
    if (this.trasportatore === 1) {
      me.card3.add(condizioni);
    }
    me.card3.add(condizioni2);
    me.card3.add(condizioni3);
    me.card3.add(me.notecli);

    me.card3.add({
      xtype: "toolbar", //dock: 'bottom',
      ui: "footer",
      defaults: {
        scale: "large",
      },
      items: [
        { xtype: "component", flex: 0.5 },
        { xtype: "button", text: Locale.t("global.annulla"), ui: "acred", cls: "btnAcRed btnupper", handler: "onBtnAnnullaNewReso" },
        {
          xtype: "button",
          ui: "acblue",
          text: Locale.t("recpub.forms.resinew.precedente"),
          cls: "btnAcBlue btnupper",
          handler: "onBtnNewResoStep2back",
        },
        { xtype: "button", ui: "sitelogin", text: Locale.t("recpub.forms.resinew.invia"), cls: "btnOnLogin btnupper", handler: "onBtnNewResoStep3" },
        { xtype: "component", flex: 0.5 },
      ],
    });

    me.getView().add(me.card3);
    me.getView().setActiveItem(me.card3);
  },
  createRowPlus: function () {
    return Ext.create("Ext.button.Button", {
      text: Locale.t("recpub.forms.resinew.aggiungi"),
      handler: "onBtnAddRow",
      cls: "btnupper",
      ui: "acblue",
      scale: "large",
    });
  },

  /*
    inserisco riga
     */
  onBtnAddRow: function (btn) {
    var length = this.card1.items.length;
    this.card1.insert(length - 1, this.createRowRequiest());
  },
  onBtnRemoveRow: function (btn) {
    var list = this.getViewModel().get("list");
    list[btn.indexItems].remove = 1;
    btn.up("fieldset").hide();
  },
  onBtnNewResoStep3: function () {
    var me = this,
      list = this.getViewModel().get("list"),
      traspcli = "",
      msgallert = false;

    // if (this.tot===1 && this.trasportatore===1) {
    if (this.trasportatore === 1) {
      var condizione1 = this.lookupReference("condizione1");
      if (condizione1.getValue() === false) {
        msgallert = true;
      }
    }
    var condizione2 = this.lookupReference("condizione2");
    if (condizione2.getValue() === false) {
      msgallert = true;
    }
    var condRot = -1;
    var condizione3 = this.lookupReference("condizione3");
    if (condizione3.getValue()["radio1"] === undefined) {
      msgallert = true;
    } else {
      condRot = condizione3.getValue()["radio1"];
    }
    if (msgallert) {
      Ext.create("Ext.Window", {
        header: false,
        ui: "acallert",
        width: 400,
        modal: true,
        padding: 10,
        bodyCls: "winallert1",
        html:
          '<div class="titlewinddarkred">' +
          Locale.t("global.attenzione") +
          '</div><br><br><div class="">' +
          Locale.t("recpub.forms.resinew.step3check.msg02") +
          "</div>",
        dockedItems: [
          {
            xtype: "toolbar",
            dock: "bottom",
            items: [
              { xtype: "component", flex: 0.5 },
              { xtype: "button", text: "OK", ui: "acblue", cls: "btnAcBlue btnupper", handler: "onWindowsClose", scope: this },
              { xtype: "component", flex: 0.5 },
            ],
          },
        ],
      }).show();
      return;
    }
    if (this.tot === 1 && this.trasportatore === 1) {
      traspcli = this.lookupReference("traspcli").getValue();
    }
    var bt = Ext.create("Ext.Button", {
      text: "OK",
      ui: "acblue",
      cls: "btnAcBlue btnupper",
      handler: "onBtnAnnullaNewReso",
    });
    Ext.Ajax.request({
      params: {
        _fn: "saveNew",
        list: Ext.encode(list),
        note: me.textArea.getValue(),
        traspselect: this.traspselect,
        traspcli: traspcli,
        condRot: condRot,
      },
      url: Backend.API_ADDRESS + "Main.php",
      success: function (response) {
        try {
          var resp = Ext.decode(response.responseText);
          if (resp["success"] === true) {
            Ext.create("Ext.Window", {
              header: false,
              ui: "acallert1",
              width: 400,
              modal: true,
              padding: 10,
              bodyCls: "winallert1",
              html:
                '<div class="titlewingreen">' +
                Locale.t("recpub.main.ottimo") +
                '</div><br><br><div class="">' +
                Locale.t("recpub.main.textfinale") +
                "</div>",
              dockedItems: [
                {
                  xtype: "toolbar",
                  dock: "bottom",
                  items: [
                    { xtype: "component", flex: 0.5 },
                    { xtype: "button", text: "OK", ui: "acblue", cls: "btnAcBlue btnupper", handler: "onBtnFinal", scope: me },
                    { xtype: "component", flex: 0.5 },
                  ],
                },
              ],
            }).show();
          } else {
            Ext.Msg.show({
              title: Locale.t("global.attenzione"),
              msg: resp["msg"],
              buttons: Ext.Msg.OK,
              icon: Ext.MessageBox.ERROR,
            });
          }
        } catch (e) {
          Ext.Msg.show({
            title: Locale.t("global.attenzione"),
            msg: e.message,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR,
          });
        }
      },
      failure: function (response) {
        var me = this;
      },
    });
  },
  onBtnFinal: function (btn) {
    btn.up("window").close();
    this.onBtnAnnullaNewReso();
  },
  onBtnAnnullaNewReso: function () {
    this.getView().fireEvent("onBtnAnnullaNewReso");
  },
  createRowTitle: function () {
    var panel = Ext.create("Ext.panel.Panel", {
      cls: "inner",
      layout: {
        type: "column",
      },
      items: [
        {
          xtype: "displayfield",
          width: 70,
        },
        {
          xtype: "displayfield",
          width: 280,
          value: Locale.t("recpub.forms.resinew.fields.item.text"),
        },
        {
          xtype: "displayfield",
          width: 430,
          value: Locale.t("recpub.forms.resinew.fields.causale.text"),
        },
        {
          xtype: "displayfield",
          width: 230,
          value: Locale.t("recpub.forms.resinew.fields.bolla.text"),
        },
      ],
    });
    return Ext.create("Ext.form.FieldSet", { items: [panel] });
  },

  createRowSpace: function () {
    return Ext.create("Ext.panel.Panel", {
      cls: "inner",
      height: 20,
      items: [
        {
          xtype: "displayfield",
          width: 70,
        },
      ],
    });
  },

  createRowRequiest: function () {
    var me = this;
    var record = this.getViewModel().get("record");
    var list = this.getViewModel().get("list");

    var comboStoreCausali = Ext.create("recpub.view.form.resi.nuovo.StoreComboCausali");
    var comboStoreProdotti = Ext.create("recpub.view.form.resi.nuovo.StoreComboProdotti");
    var comboStoreDdt = Ext.create("recpub.view.form.resi.nuovo.StoreComboDdt");

    list.push({ remove: 0, codice: "", ddt: "", causale: "", dspcodice: "", dspddt: "", dspcausale: "", dossier: "" });
    var comboCausali = Ext.create("Ext.form.ComboBox", {
      xtype: "combobox",
      cls: "cmbcau",
      matchFieldWidth: false,
      blankText: Locale.t("recpub.forms.resinew.fields.causale.blancktext"),
      emptyText: Locale.t("recpub.forms.resinew.fields.causale.emptytext"),
      allowBlank: false,
      indexItems: this.indexItems,
      disabled: true,
      store: comboStoreCausali,
      comboDdt: comboDdt,
      valueField: "pscaus",
      displayField: "psdesc",
      queryMode: "remote",
      forceSelection: true,
      listeners: {
        select: "onSelectCausale",
      },
    });

    var comboDdt = Ext.create("Ext.form.ComboBox", {
      cls: "cmbddt",
      matchFieldWidth: false,
      blankText: Locale.t("recpub.forms.resinew.fields.bolla.blancktext"),
      emptyText: Locale.t("recpub.forms.resinew.fields.bolla.emptytext"),
      allowBlank: false,
      indexItems: this.indexItems,
      disabled: true,
      store: comboStoreDdt,
      comboCausali: comboCausali,
      valueField: "id",
      displayField: "descr",
      queryMode: "remote",
      forceSelection: true,
      listeners: {
        select: "onSelectDdt",
      },
    });

    var comboProdotti = Ext.create("Ext.form.ComboBox", {
      cls: "cmbprd",
      blankText: Locale.t("recpub.forms.resinew.fields.item.blancktext"),
      emptyText: Locale.t("recpub.forms.resinew.fields.item.emptytext"),
      allowBlank: false,
      indexItems: this.indexItems,
      store: comboStoreProdotti,
      comboDdt: comboDdt,
      comboCausali: comboCausali,
      valueField: "cdars",
      displayField: "descrizione",
      queryMode: "local",
      matchFieldWidth: false,
      columnWidth: 600,
      forceSelection: true,
      listeners: {
        select: "onSelectProdotti",
      },
    });

    var textDossier = Ext.create("Ext.form.TextField", {
      cls: "cmbdsr",
      name: "dossier",
      emptyText: Locale.t("recpub.forms.resinew.fields.dossier.emptytext"),
      indexItems: this.indexItems,
      triggers: {
        info: {
          cls: "fa-info bd-color-blue",
          tooltip: Locale.t("recpub.forms.resinew.infodossier"),
          handler: function () {},
        },
      },
      listeners: {
        change: "onBlurProdotti",
      },
    });

    comboStoreProdotti.add(record.items);
    var panel = Ext.create("Ext.panel.Panel", {
      padding: 5,
      layout: {
        type: "column",
      },
      cls: "inner",
      items: [
        {
          xtype: "button",
          cls: "x-fa fa-times",
          scale: "small",
          style: "border-radius:50%;height:32px;color:white;",
          handler: "onBtnRemoveRow",
          indexItems: me.indexItems,
        },
        { xtype: "panel", width: 20, html: "", cls: "filldiv" },
        comboProdotti,
        { xtype: "panel", width: 20, html: "", cls: "filldiv" },
        comboDdt,
        { xtype: "panel", width: 20, html: "", cls: "filldiv" },
        comboCausali,
        { xtype: "panel", width: 20, html: "", cls: "filldiv" },
        textDossier,
      ],
    });
    this.indexItems++;
    return Ext.create("Ext.form.FieldSet", { cls: "fldnew", style: "background:white;", items: [panel] });
  },

  onBlurProdotti: function (fld) {
    var list = this.getViewModel().get("list");
    if (list[fld.indexItems]) {
      list[fld.indexItems].dossier = fld.getValue();
    }
  },
  onSelectProdotti: function (cmb, value) {
    var list = this.getViewModel().get("list");

    list[cmb.indexItems].codice = value.data.cdars;
    list[cmb.indexItems].ddt = "";
    list[cmb.indexItems].causale = "";
    list[cmb.indexItems].dspddt = "";
    list[cmb.indexItems].dspcausale = "";
    list[cmb.indexItems].dossier = "";
    list[cmb.indexItems].dspcodice = value.data.descrizione;
    cmb.comboDdt.enable();
    cmb.comboCausali.disable();
    cmb.comboCausali.setValue("");

    cmb.comboCausali.getStore().getProxy().extraParams.codice = value.data.cdars;
    var storeDdt = cmb.comboDdt.getStore();
    storeDdt.getProxy().extraParams.cdars = value.data.cdars;
    storeDdt.load();
  },

  onSelectDdt: function (cmb, value) {
    var list = this.getViewModel().get("list");
    list[cmb.indexItems].ddt = value.data.id;
    list[cmb.indexItems].dspddt = value.data.descr;
    cmb.comboCausali.getStore().getProxy().extraParams.id = value.data.id;
    cmb.comboCausali.enable();
    var storeCausali = cmb.comboCausali.getStore();
    storeCausali.load();
  },

  onSelectCausale: function (cmb, value) {
    var list = this.getViewModel().get("list");
    list[cmb.indexItems].causale = value.data.pscaus;
    list[cmb.indexItems].dspcausale = value.data.psdesc;
  },

  generateListDsp: function () {
    var list = this.getViewModel().get("list"),
      html = "";
    for (var i = 0; i < list.length; i++) {
      if (list[i].remove === 0 && list[i].codice !== "" && list[i].ddt !== "" && list[i].causale !== "") {
      }
    }
  },
});
