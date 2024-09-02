
Ext.define("t40.main.Controller", {
  extend: "portal.v1.view.main.ViewController",
  mixins: ["portal.v1.global.Util"],
  alias: "controller.main",
  requires: [
    't40.grids.panotec.Grid',
    't40.main.west.Panotec',
    't40.main.footer.Footer'
  ],
  onAfterRender: function () {
    let me = this,
      vm = me.getViewModel();
    this.panels = {
      panotec: {
        grid: Ext.create("t40.grids.panotec.Grid").on('apriFooter', 'onApriFooter'),
        panel: Ext.create("t40.main.west.Panotec")
      },

    };

    // Disabilito caricamento west di default
    this.noInitWest = true;




    //riporto versione
    if (Ext.global.Vars.infoApp.versione) {
      vm.set('versione', Ext.global.Vars.infoApp.version.num);
      vm.set('dataVersione', Ext.global.Vars.infoApp.version.data);
    }
    this.logUser = Ext.create('portal.v1.view.forms.loguser.Panel')
      .on('closeLogUser', 'onCloseLogUser')

    this.logDev = Ext.create('portal.v1.view.grids.logdev.Panel')
      .on('closeLogDev', 'onCloseLogDev')

    this.west = Ext.create('portal.v1.view.main.West', {
      hidden: true,
      region: 'west',
      listeners: {
        resize: 'onResizeWest',
        collapse: 'onCollapseWest',
        expand: 'onExpandWest'
      }
    });
    this.westClose = Ext.create('portal.v1.view.main.WestClose', {
      region: 'west'
    });
    this.panelCenter = Ext.create('portal.v1.view.main.Center', {
      region: 'center'
    })
    //this.panelCenter.on('apriFooter', 'onApriFooter')
    this.mainFooter = Ext.create("t40.main.footer.Footer");

    if (!this.noInitWest) {
      if (this.ammMenu) {
        this.west.add({
          xtype: 'panel',
          layout: {
            type: 'accordion',
            titleCollapse: false,
            animate: true,
            activeOnTop: true
          },
          itemId: 'topMenu',
          defaults: {
            listeners: {
              expand: 'onExpandMain'
            }
          },
          items: [
            {
              xtype: 'panel',
              layout: 'fit',
              iconCls: 'x-fas fa-home bd-color-green',
              bind: {
                title: '{titleMenuMain}'
              },
              items: [
                this.mainMenu,
              ]
            },
            {
              xtype: 'panel',
              layout: 'fit',
              iconCls: 'x-fas fa-cog bd-color-green',
              bind: {
                title: '{titleMenuAmm}'
              },
              items: [
                this.ammMenu,
              ]
            }
          ]
        });
      } else {
        this.west.add({
          xtype: 'panel',
          layout: 'fit',
          itemId: 'topMenu',
          defaults: {
            listeners: {
              expand: 'onExpandMain' //TODO su accordion cambiare scope
            }
          },
          items: [
            this.mainMenu,
          ]
        });
      }
    }
    this.footer = Ext.create('Ext.panel.Panel', {
      title: Locale.t("t40.grids.footer.titles.dettaglio"),
      collapsed: true,
      collapsible: true,
      items: [
        this.mainFooter
      ],
      region: 'south'
    })
    this.index = Ext.create('portal.v1.view.main.Index', {
      items: [
        {
          layout: 'border',
          region: 'center',
          items: [
            this.panelCenter,
            this.footer
          ]
        },
        this.westClose,
        this.west
      ],
      listeners: {
        afterRender: 'onAfterRenderIndex'
      }
    });
    this.getView().add(this.index);
    this.getView().setActiveItem(this.index);


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

  onApriFooter: function (obj) {
    this.footer.expand();
    const index = obj.data.dati_produzione.dettaglio.length - 1;
    let data_ora = obj.data.dati_produzione.dettaglio[index].data_ora_inizio;
    data_ora = Ext.Date.parse(data_ora, 'Y-m-d\\TH:i:s.u\\Z');
    data_ora = Ext.Date.format(data_ora, "d/m/Y H:i");
    const dettaglio = {
      qta: obj.data.dati_produzione.dettaglio[index].qta,
      durata: obj.data.dati_produzione.dettaglio[index].durata,
      data_ora_inizio: data_ora
    }
    this.getViewModel().set("footerStore", { dettaglio: dettaglio, durata_media: obj.data.dati_produzione.durata_media, durata_max: obj.data.dati_produzione.durata_max, durata_min: obj.data.dati_produzione.durata_min, tempo_totale: obj.data.dati_produzione.tempo_totale })
  },

  // Recupero lista pannelli da visualizzare
  generatePanelWest: function (response) {
    const obj = Ext.decode(response.responseText);
    if (!obj && obj.length === 0) {
      //TODO gestire nessun pannello
      return
    }

    //setto attivo il primo pannello
    const firstApp = this.panels[obj.children[0].tag].grid
    firstApp.west = this.panels[obj.children[0].tag].panel


    let items = [];
    for (let tag of obj.children) {
      items.push(this.panels[tag.tag].panel);
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
    this.panelCenter.insert(0, firstApp);
    firstApp.on('checkForm', 'checkFormMain', this);
    firstApp.on('createTab', 'createTabMain', this);
    this.panelCenter.setActiveTab(firstApp);
  },

  onActivePanelWest: function (pnl) {
    let tab = this.panelCenter.child('#' + pnl.itemId);
    if (!tab) {
      this.panels[pnl.itemId].grid.west = this.panels[pnl.itemId].panel;
      this.panelCenter.insert(0, this.panels[pnl.itemId].grid);
      this.panels[pnl.itemId].grid.on('checkForm', 'checkFormMain', this);
      this.panels[pnl.itemId].grid.on('createTab', 'createTabMain', this);
    }
    this.panelCenter.setActiveTab(this.panels[pnl.itemId].grid);
    this.getViewModel().set('tabActive', pnl.itemId)
    this.panelCenter.hideTab();
  },
  onRunApertura: function (r) {
    if (r) {
      //eventuali azioni
    }
  },

  // Sovrascrico onCloseForm ereditato
  onCloseForm: function (tab, opts) {
    //se arriva da un agrid visibile la aggiorno
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
