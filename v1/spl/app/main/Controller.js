
Ext.define("spl.main.Controller", {
  extend: "portal.v1.view.main.ViewController",
  mixins: ["portal.v1.global.Util"],
  alias: "controller.main",
  requires: [
    "spl.grids.bol.Grid",
    'spl.grids.fat.Grid',
    'spl.grids.ord.Grid',
    'spl.grids.orf.Grid',
    'spl.grids.pak.Grid',
    'spl.grids.processi.Grid',
  ],
  onAfterRender: function () {
    let me = this;
    let objWest = {
      bodyPadding: 0,
      layout: 'fit',
      itemId: '',
      title: "",
      iconCls: "",
      listeners: {
        expand: 'onActivePanelWest'
      }
    }
    this.panels = {
      bol: {
        setCfgPer: true,
        grid: Ext.create("spl.grids.bol.Grid"),
        panel: Ext.create("Ext.form.Panel", {
          ...objWest,
          itemId: 'bol', iconCls: "BOL-16",
          title: Locale.t("spl.grids.documenti.bol.title").toUpperCase(),
        }),
      },
      fat: {
        grid: Ext.create("spl.grids.fat.Grid"),
        panel: Ext.create("Ext.form.Panel", {
          ...objWest,
          itemId: 'fat', iconCls: "FAT-16",
          title: Locale.t("spl.grids.documenti.fat.title").toUpperCase(),
        }),
      },
      orf: {
        grid: Ext.create("spl.grids.orf.Grid"),
        panel: Ext.create("Ext.form.Panel", {
          ...objWest, ...{
            itemId: 'orf', iconCls: "ORF-16",
            title: Locale.t("spl.grids.documenti.orf.title").toUpperCase(),
          }
        }),
      },
      ord: {
        grid: Ext.create("spl.grids.ord.Grid"),
        panel: Ext.create("Ext.form.Panel", {
          ...objWest,
          itemId: 'ord', iconCls: "ORD-16",
          title: Locale.t("spl.grids.documenti.ord.title").toUpperCase(),
        }),
      },
      pak: {
        grid: Ext.create("spl.grids.pak.Grid"),
        panel: Ext.create("Ext.form.Panel", {
          ...objWest,
          itemId: 'pak', iconCls: "PAK-16",
          title: Locale.t("spl.grids.documenti.pak.title").toUpperCase(),
        }),
      },
      processi: {
        grid: Ext.create("spl.grids.processi.Grid"),
        panel: Ext.create("Ext.form.Panel", {
          ...objWest,
          itemId: 'processi', iconCls: "fas fa-sync",
          title: Locale.t("spl.grids.processi.title").toUpperCase(),
          items: [
            {
              xtype: "container",
              html: "Acquisizione spool in attesa di essere processate e/o in errore di aquisizione.<br><br> - <b>imported</b> = <i>in aquisizione</i><br> - <b>error</b> = <i>Errore nella fase di conversione.</i><hr>Nota : Se la vista è vuota, non ci sono spool da processare."
            }
          ]
        }),
      },
    };

    // Disabilito caricamento west di default
    this.noInitWest = true;
    this.callParent(arguments);

    // Genero vista accordion panel West
    Ext.Ajax.request({
      method: "GET",
      url: Backend.REST_API + "main/listapp/",
      success: function (response) {
        me.generatePanelWest(response);
      },
      failure: function () {
        try {
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: record['msg'],
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
  },


  // Recupero lista pannelli da visualizzare
  generatePanelWest: function (response) {
    const obj = Ext.decode(response.responseText);
    if (!obj && obj.length === 0) {
      //TODO gestire nessun pannello
      return
    }

    if (obj.children.length === 0) {
      return;
    }

    //setto attivo il primo pannello
    const firstApp = this.panels[obj.children[0].tag].grid
    firstApp.west = this.panels[obj.children[0].tag].panel

    let items = [];
    for (let tag of obj.children) {
      items.push(this.panels[tag.tag].panel);
    }

    if (this.checkRuoli(["99", "20"])) {
      items.push(this.panels['processi'].panel)
    }

    this.west.add({
      xtype: 'panel',
      bodyPadding: 0,
      layout: {
        type: 'accordion',
        titleCollapse: false,
        animate: true,
      },
      items: items
    });

    // Abilito primo pannello disponibile
    firstApp.on('updateWest', 'onUpdateWest', this);
    firstApp.on('checkForm', 'checkFormMain', this);
    firstApp.on('createTab', 'createTabMain', this);
    this.panelCenter.setActiveTab(firstApp);
    this.panelCenter.insert(0, firstApp);
  },

  onActivePanelWest: function (pnl) {

    let tab = this.panelCenter.child('#' + pnl.itemId);
    if (!tab) {
      this.panels[pnl.itemId].grid.west = this.panels[pnl.itemId].panel;
      this.panels[pnl.itemId].grid.on('checkForm', 'checkFormMain', this);
      this.panels[pnl.itemId].grid.on('createTab', 'createTabMain', this);
      this.panels[pnl.itemId].grid.on('updateWest', 'onUpdateWest', this);
      this.panelCenter.insert(0, this.panels[pnl.itemId].grid);
    }
    this.panelCenter.setActiveTab(this.panels[pnl.itemId].grid);
    this.getViewModel().set('tabActive', pnl.itemId)
    this.panelCenter.hideTab();
  },
  onUpdateWest: function (panel) {
    if (!this.panels[panel.tag].west) {
      this.panels[panel.tag].west = panel;
      this.panels[panel.tag].panel.add(panel)
    }
  },
  onRunApertura: function (r) {
    if (r) {
      //eventuali azioni
    }
  },

  // Sovrascrico onCloseForm ereditato
  onCloseForm: function (tab, opts) {
    //se arriva da una grid visibile la aggiorno
    if (opts && opts.tab && opts.tab.refreshGrid) {
      if (opts && opts.view) {
        opts.view.getStore().load(); //ricarico la vista
      }
    }
    //attivo vista padre
    if (opts && opts.view) {
      let grid = opts.view.up('grid');
      if (!grid) {
        grid = opts.view;
      }
      this.panelCenter.setActiveTab(this.panels[this.getViewModel().get('tabActive')].grid);
      this.panelCenter.hideTab();
    }
  },
  onChangeFilterTipo: function (check, newValue, oldValue) {
    const v = check.inputValue;
    const grid = this.panelCenter.getActiveTab();
    if (grid) {
      grid.getStore().getProxy().extraParams[v] = newValue;
      grid.getStore().load()
    }
  },
  onSelectFilterGrid: function (chk, rec) {
    const grid = this.panelCenter.getActiveTab();
    let records = chk.view.grid.getSelectionModel().getSelection();
    let value = records.map(function (record) {
      return record.data.value;
    })
    if (grid) {
      grid.getStore().getProxy().extraParams.value = JSON.stringify(value);
      grid.getStore().load()
    }
  }
});
