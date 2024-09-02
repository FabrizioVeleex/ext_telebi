/**
 * Created by fabrizio on 20/12/23.
 */
Ext.define("spl.grids.bol.mixin.FiltroController", {
  extend: "portal.v1.view.filtri.DefaultController",
  requires: [
    "portal.v1.view.filtri.Fitro",
    "portal.v1.view.filtri.text.Fieldset",
    "portal.v1.view.filtri.datarange.Fieldset",
    "spl.global.filtri.descr_trasp.Fieldset"
  ],
  initFiltri: function () {
    try {
      this.modelFiltri = "bol";
      this.filtri_checkconfig();
      this.filtri_popolateData();
      //-------------------------------------------------
      // Genero oggetto per il controller
      this.filtriPanel = {
        btn: { text: "Filtri", handler: "filtri_onTogglePannel", bind: { iconCls: "{filtri.btn.icon}" }, enableToggle: true },
        panel: Ext.create("portal.v1.view.filtri.Fitro"),
        filtri: {
          data_doc: {
            fs: Ext.create("portal.v1.view.filtri.datarange.Fieldset", { myTag: "bol", myName: "data_doc", title: Locale.t('spl.grids.documenti.column.data_doc') }),
          },
          causale: {
            fs: Ext.create("portal.v1.view.filtri.text.Fieldset", { myTag: "bol", myName: "causale", title: "Causale" }),
          },
          descr_trasp: {
            fs: Ext.create("spl.global.filtri.descr_trasp.Fieldset", { myTag: "bol", myName: "descr_trasp", title: Locale.t('spl.grids.documenti.column.descr_trasp') }),
          }
        }
      }


      // debugger;
      // this.filtri.desc_trasp.getstore().getProxy().setUrl(Backend.REST_API + 'functions/getstoretrasp/')

      this.filtriPanel.panel.add(
        this.filtriPanel.filtri.data_doc.fs,
        this.filtriPanel.filtri.causale.fs,
        this.filtriPanel.filtri.descr_trasp.fs,
      )

      this.toolbar.add(['->', this.filtriPanel.btn]);
      this.getView().addDocked(this.filtriPanel.panel);

    } catch (error) {
      console.log(arguments.callee.name, error)
    }
  },

  filtri_checkconfig: function () {
    // Verifico se ho gia gli oggetti per il salvataggio delle configurazioni
    try {
      if (Ext.global.Vars.confMod.grids[this.modelFiltri] === undefined) {
        Ext.global.Vars.confMod.grids[this.modelFiltri] = {}
      }
      let filtri = Ext.global.Vars.confMod.grids[this.modelFiltri].filtri;
      if (filtri === undefined) {
        filtri = { pressed: false }
      }

      if (filtri.status_mail === undefined) {
        filtri.status_mail = {}
      }

      if (filtri.status_doc === undefined) {
        filtri.status_doc = {}
      }

      if (filtri.causale === undefined) {
        filtri.causale = { type: 'string', like: "", notlike: "", list: [] }
      }
      filtri.causale.type = filtri.causale.type || "string";
      if (filtri.descr_trasp === undefined) {
        filtri.descr_trasp = { type: 'string', like: "", notlike: "", list: [] }
      }
      filtri.causale.descr_trasp = filtri.causale.descr_trasp || "string";

      if (filtri.data_doc === undefined) {
        filtri.data_doc = { type: 'date', start: "", end: "" }
      }
      Ext.global.Vars.confMod.grids[this.modelFiltri].filtri = filtri
    } catch (error) {
      console.log(arguments.callee.name, error);
    }
  },
  filtri_popolateData: function () {
    try {
      let me = this,
        vm = me.getViewModel(),
        getFiltri = Ext.global.Vars.confMod.grids[this.modelFiltri].filtri;

      if (getFiltri.data_doc.start) {
        let dd = new Date(getFiltri.data_doc.start);
        if (!isNaN(dd)) getFiltri.data_doc.start = dd;

      }
      if (getFiltri.data_doc.end) {
        let dd = new Date(getFiltri.data_doc.end);
        if (!isNaN(dd)) getFiltri.data_doc.end = dd;
      }

      vm.set("filtri", {
        btn: {
          icon: "fas fa-caret-square-down",
        },
        params: Ext.global.Vars.confMod.grids[this.modelFiltri].filtri
      })

    } catch (error) {
      console.log(arguments.callee.name, error)
    }
  },
  filtri_beforeRender_descr_trasp: function (pnl) {
    let me = this,
      vm = me.getViewModel();

    let storeCombo = "filtri_" + pnl.myName + "_storeCombo";
    let storeGrid = "filtri_" + pnl.myName + "_storeGrid";
    let grid = "filtri_" + pnl.myName + "_Grid";

    this[storeGrid] = Ext.create("spl.global.filtri.descr_trasp.StoreGrid")
    this[grid] = Ext.create("spl.global.filtri.descr_trasp.Grid", {
      store: this[storeGrid]
    })

    this[storeCombo] = Ext.create('Ext.data.Store', {
      requires: [
        'Ext.data.proxy.Rest'
      ],
      fields: [
        // { name: 'codice', type: 'string' },
        { name: 'descrizione', type: 'string' },
      ],
      data: [],
      proxy: {
        type: 'ajax',
        simpleSortMode: true,
        url: Backend.REST_API + 'grids/' + pnl.myTag + '/getstore' + pnl.myName + '/',
        reader: { type: 'json', rootProperty: 'data' }
      }
    });


    // popolo dati nello store
    this[storeGrid].loadData(Ext.global.Vars.confMod.grids[this.modelFiltri].filtri[pnl.myName].list)
    pnl.add([
      {
        xtype: 'panel',
        userCls: 'y-filtri-panel-field-transparent',
        layout: {
          type: 'vbox'
        },
        items: [
          {
            xtype: 'combobox',
            queryMode: 'remote',
            width: 180,
            minChars: 2,
            userCls: 'y-filtri-panel-field-transparent',
            store: this[storeCombo],
            displayField: 'descr_trasp',
            tpl: Ext.create('Ext.XTemplate',
              '<ul class="x-list-plain"><tpl for=".">',
              '<li role="option" class="x-boundlist-item">{descr_trasp}</li>', //TODO
              '</tpl></ul>'
            ),
            valueField: 'codice',
            typeAhead: true,
            value: '',
            forceSelection: true,
            matchFieldWidth: false,
            emptyText: Locale.t('spl.filtri.seleziona'), //TODO
            listConfig: {
              emptyText: Locale.t('spl.filtri.emptyText') //TODO
            },
            listeners: {
              select: 'filtri_onSelectFilter'
            }
          },
          {
            width: 180,
            xtype: 'textfield',
            fieldLabel: Locale.t('spl.filtri.like'),
            labelWidth: 60,
            userCls: 'y-filtri-panel-field-transparent',
            bind: {
              value: '{filtri.params.' + pnl.myName + '.like}'
            },
          },
          {
            width: 180,
            xtype: 'textfield',
            fieldLabel: Locale.t('spl.filtri.notlike'), //TODO
            labelWidth: 60,
            userCls: 'y-filtri-panel-field-transparent',
            bind: {
              value: '{filtri.params.' + pnl.myName + '.notlike}'
            },
          }
        ]
      },
      {
        xtype: 'component',
        width: 10
      },
      this[grid],
    ])
  },
  afterRenderStatusDoc: function (pnl) {
    let me = this,
      vm = me.getViewModel(),
      filtri = vm.get("filtri");

    if (filtri.params.status_doc.status_doc_0) {
      pnl.items.items[0].items.items[0].setValue(true)
    }
    if (filtri.params.status_doc.status_doc_1) {
      pnl.items.items[0].items.items[1].setValue(true)
    }
  },
  afterRenderStatusMail: function (pnl) {
    let me = this,
      vm = me.getViewModel(),
      filtri = vm.get("filtri");

    if (filtri.params.status_mail.status_mail_N1) {
      pnl.items.items[0].items.items[0].setValue(true)
    }
    if (filtri.params.status_mail.status_mail_0) {
      pnl.items.items[0].items.items[1].setValue(true)
    }
    if (filtri.params.status_mail.status_mail_1) {
      pnl.items.items[0].items.items[2].setValue(true)
    }
    if (filtri.params.status_mail.status_mail_3) {
      pnl.items.items[0].items.items[3].setValue(true)
    }
    if (filtri.params.status_mail.status_mail_4) {
      pnl.items.items[0].items.items[4].setValue(true)
    }
  }
})