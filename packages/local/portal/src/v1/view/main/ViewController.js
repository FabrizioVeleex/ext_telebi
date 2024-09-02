Ext.define('portal.v1.view.main.ViewController', {
  extend: 'Ext.app.ViewController',
  requires: [
    'Ext.layout.container.Accordion',
    'Ext.layout.container.Fit',
    'Ext.panel.Panel',
    'Ext.util.DelayedTask',
    'portal.util.Locale',
    'portal.v1.view.forms.loguser.Panel',
    'portal.v1.view.grids.logdev.Panel',
    'portal.v1.view.main.Center',
    'portal.v1.view.main.Index',
    'portal.v1.view.main.West',
    'portal.v1.view.main.WestClose'
  ],

  init: function () {
    this.setConfModRun = 0;
    this.firstOpen = true
  },

  onAfterRender: function () {
    let me = this,
      vm = me.getViewModel();

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
    this.index = Ext.create('portal.v1.view.main.Index', {
      items: [
        this.panelCenter,
        this.westClose,
        this.west
      ],
      listeners: {
        afterRender: 'onAfterRenderIndex'
      }
    });
    this.getView().add(this.index);
    this.getView().setActiveItem(this.index);
  },

  onAfterRenderIndex: function (panel) {
    if (Ext.global.Vars.confMod.main.west.collapse === 1) {
      this.west.show();
      this.westClose.hide();
    }
    if (Ext.global.Vars.confMod.main.west.width) {
      this.west.setWidth(Ext.global.Vars.confMod.main.west.width);
    }
  },

  /* ---------------------------------------------------------------------------------
  * setConfMod:
  * ---------------------------------------------------------------------------------*/
  setConfMod: function () {
    this.setConfModRun++;
    let count = this.setConfModRun,
      task = new Ext.util.DelayedTask(function (count) {
        if (count === this.setConfModRun) {
          Ext.Ajax.request({
            method: 'POST',
            params: {
              'data': Ext.encode(Ext.global.Vars.confMod)
            },
            url: Backend.REST_API + 'setconfmod'
          });
        }
      }, this, [count]);
    task.delay(3000);
  },

  /* ---------------------------------------------------------------------------------
   * onToggleNav:
   * onExpandWest:
   * onCollapseWest:
   * onResizeWest:
   * ---------------------------------------------------------------------------------*/
  isFirstResize: true,
  onToggleNav: function (btn) {
    let nav = this.west,
      navHide = this.westClose,
      collapse = 0;
    if (btn.action === false) {
      nav.show();
      navHide.hide();
      collapse = 1;
    } else {
      nav.hide();
      navHide.show();
    }
    Ext.global.Vars.confMod.main.west.collapse = collapse;
    this.setConfMod();
  },
  onExpandWest: function () {
    Ext.global.Vars.confMod.main.west.collapse = 1;
    this.setConfMod();

  },
  onCollapseWest: function () {
    Ext.global.Vars.confMod.main.west.collapse = 0;
    this.setConfMod();
  },
  onResizeWest: function (panel) {
    if (this.isFirstResize) {
      this.isFirstResize = false;
    } else {
      Ext.global.Vars.confMod.main.west.width = panel.width;
      this.setConfMod();
    }
  },
  onExpandMain: function (pnl) {
    let me = this
    if (pnl.store) {
      pnl.getStore().load({
        scope: this,
        callback: function (records) {
          if (records.length > 0) {
            let treeNode = pnl.getRootNode(),
              node = null,
              child = '';
            if (pnl.posizione === 'MAIN') {
              child = Ext.global.Vars.confMod.main.tabOpen;
            }
            if (pnl.posizione === 'AMM') {
              child = Ext.global.Vars.confMod.main.tabActiveAmm;
            }
            if (child !== '') {
              node = treeNode.findChild('itemId', child, true);
            }

            if (node) {
              pnl.getSelectionModel().select(node, false);
              this.firstOpen = true
              me.onitemclick(pnl.getView(), node, pnl.posizione);
            } else {
              pnl.getSelectionModel().select(treeNode.firstChild, false);
              this.firstOpen = true
              me.onitemclick(pnl.getView(), treeNode.firstChild, pnl.posizione);

            }
          }
        }
      })
    } else {
      //spostamento pannello
      let panello = pnl.items.items[0] //recupero il pannello attivo
      let treeNode = panello.getRootNode(),
        node = null,
        child = ''
      if (panello.posizione === 'MAIN') {
        child = Ext.global.Vars.confMod.main.tabOpen;
      }
      if (panello.posizione === 'AMM') {
        child = Ext.global.Vars.confMod.main.tabActiveAmm;
      }
      if (child !== '') {
        node = treeNode.findChild('itemId', child, true);
      }
      if (node) {
        panello.getSelectionModel().select(node, false);
        me.onitemclick(panello.getView(), node, panello.posizione);
      } else {
        panello.getSelectionModel().select(treeNode.firstChild, false);
        me.onitemclick(panello.getView(), treeNode.firstChild, pnl.posizione);

      }

    }
  },

  /* ---------------------------------------------------------------------------------
   * onitemclick:
   * onitemdblclick:
   * onRenderTreeMain:
   * ---------------------------------------------------------------------------------*/
  onitemclick: function (pnl, node, posizione) {
    let panel = pnl.up('panel')
    let tab = this.panelCenter.child('#' + node.data.itemId);
    if (!tab) {
      this.panelCenter.insert(0, this.panels[node.data.itemId]);
      this.panels[node.data.itemId].on('checkForm', 'checkFormMain', this)
      this.panels[node.data.itemId].on('createTab', 'createTabMain', this)
    }
    if (this.firstOpen === true) {
      if (posizione === 'MAIN') {
        this.panelCenter.setActiveTab(this.panels[node.data.itemId]);
      }
    } else {
      this.panelCenter.setActiveTab(this.panels[node.data.itemId]);
    }
    this.firstOpen = false
    this.panelCenter.hideTab();


    if (panel.posizione === 'MAIN') {
      Ext.global.Vars.confMod.main.tabActive = node.data.itemId;
    }
    if (panel.posizione === 'AMM') {
      Ext.global.Vars.confMod.main.tabActiveAmm = node.data.itemId;
    }
    this.panels[node.data.itemId].infoNode = node.data;
    this.gridActiveOnClose = this.panels[node.data.itemId]
    if (this.panels[node.data.itemId].setCfgPer === true) {
      Ext.global.Vars.confMod.main.tabOpen = node.data.itemId;
      this.setConfMod();
    }
    //verifico prima apertura valori
    this.onCheckDati()

  },
  //gestione apertura form da home
  onCheckDati: function () {
    if (typeof datiApertura !== "undefined" && datiApertura !== null) {
      this.onRunApertura(datiApertura, this.panels[Ext.global.Vars.confMod.main.tabOpen]);
      datiApertura = null;
    }
  },
  checkFormMain: function (itemId) {
    let tab = this.panelCenter.child('#' + itemId);
    if (tab) {
      this.panelCenter.setActiveItem(tab);
      return true
    } else {
      return false
    }

  },
  createTabMain: function (tab, view) {
    this.panelCenter.add(tab);
    this.panelCenter.setActiveItem(tab);
    tab.on('closeForm', this.onCloseForm, this, { view: view, tab: tab });
  },
  onCloseForm: function (tab, opts) {
    //se arriva da un agrid visibile la aggiorno
    if (opts && opts.tab && opts.tab.refreshGrid) {
      let taskR = new Ext.util.DelayedTask(function (view) {
        view.getStore().reload()
      }, this, [opts.view])

      if (opts && opts.view) {
        //se ha più di 5 record faccio il reload
        if (opts.view.getStore().totalCount > 5) {
          taskR.delay(200);
        } else {
          opts.view.getStore().load(); //ricarico la vista
        }
      }
    }
    //attivo vista padre
    if (opts && opts.view) {
      let grid = opts.view.up('grid')
      if (!grid) {
        grid = opts.view
      }
      this.panelCenter.setActiveTab(this.panels[grid.itemId]);
      this.panelCenter.hideTab();
    }
  },

  onitemdblclick: function (grid, record, item, index, e, eOpts) {

  },
  onRenderTreeMain: function (panel) {
    this.onExpandMain(panel);
  },


  onCloseApp: function () {
    if (typeof (myFrame) !== 'undefined') {
      let apptitle = this.getViewModel().get('apptitle')
      if (Ext.global.Vars.developer === false) {
        myFrame.fireEvent('closeMe', myFrame);
        return
      }
      Ext.Msg.show({
        title: Locale.t('global.btn.closeapp.title'),
        iconCls: 'x-fas fa-window-close',
        msg: Locale.t('global.btn.closeapp.msg') + '<hr><b>' + apptitle + '</b>',
        buttons: Ext.Msg.YESNO, icon: Ext.MessageBox.QUESTION, fn: function (b) {
          if (b === 'yes') {
            myFrame.fireEvent('closeMe', myFrame);
          }
        }
      })
    }
  },
  onOpenLogUser: function () {
    let vm = this.getViewModel(),
      tag = vm.get('tag'),
      titleApp = vm.get('titleapp')
    this.logDev.setTitle('Statistiche App: ' + tag)
    this.getView().setActiveItem(this.logUser)
  },
  onOpenLogDev: function () {
    let vm = this.getViewModel(),
      tag = vm.get('tag'),
      titleApp = vm.get('titleapp')
    this.logDev.setTitle('Debug App: ' + tag)
    this.getView().setActiveItem(this.logDev)
  },
  onCloseLogDev: function () {
    this.getView().setActiveItem(this.index)
  },
  onCloseLogUser: function () {
    this.getView().setActiveItem(this.index)
  }

});
