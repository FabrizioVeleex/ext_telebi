/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */


Ext.define('itm.main.Controller', {
  extend: 'portal.v1.view.main.ViewController',
  mixins: [
    'renaudo_itm.main.acrolcar.Controller',
    'portal.v1.global.Util'
  ],
  alias: 'controller.main',

  requires: [
    'portal.v1.view.main.TreeMenu',
    'portal.v1.view.main.TreeMenuAmm',
    'itm.grids.articoli.ArticoliGrid',
    'itm.grids.classi.Grid',
    'itm.grids.famiglie.Grid',
    'itm.grids.articolimedia.ArticoliGrid',
    'itm.grids.articolisito.ArticoliGrid',
    'itm.grids.articolierror.ArticoliErrorGrid',
    'itm.grids.articolilength.articoliLengthGrid',
    'itm.grids.articolinew.articoliNewGrid',
    'itm.grids.attributi.Grid',
    'itm.grids.gruppi.Grid',
    'itm.grids.sottogruppi.Grid',
    'itm.grids.gomma.GommaGrid',
    'itm.grids.kit.KitGrid',
  ],
  onAfterRender: function () {
    this.firstOpenSub = true;
    let vm = this.getViewModel()
    //costruisco array viste
    // Ext.global.Vars.confMod.grids = {}
    this.panels = {
      "articoli": Ext.create('itm.grids.articoli.ArticoliGrid', { itemId: 'articoli', setCfgPer: true }),
      "articoli_media": Ext.create('itm.grids.articolimedia.ArticoliGrid', { itemId: 'articoli_media', setCfgPer: true }),
      "articoli_sito": Ext.create('itm.grids.articolisito.ArticoliGrid', { itemId: 'articoli_sito', setCfgPer: true }),
      "articoli_error": Ext.create('itm.grids.articolierror.ArticoliErrorGrid', { itemId: 'articoli_error', setCfgPer: true }),
      "articoli_length": Ext.create('itm.grids.articolilength.articoliLengthGrid', { itemId: 'articoli_length', setCfgPer: true }),
      "articoli_new": Ext.create('itm.grids.articolinew.articoliNewGrid', { itemId: 'articoli_new', setCfgPer: true }),
      "attributi": Ext.create('itm.grids.attributi.Grid', { itemId: 'attributi', setCfgPer: true }),
      "classi": Ext.create('itm.grids.classi.Grid', { itemId: 'classi', setCfgPer: false }),
      "famiglie": Ext.create('itm.grids.famiglie.Grid', { itemId: 'famiglie', setCfgPer: false }),
      "gruppi": Ext.create('itm.grids.gruppi.Grid', { itemId: 'gruppi', setCfgPer: false }),
      "sottogruppi": Ext.create('itm.grids.sottogruppi.Grid', { itemId: 'sottogruppi', setCfgPer: false }),
      "gomma": Ext.create('itm.grids.gomma.GommaGrid', { itemId: 'gomma', setCfgPer: false }),
      "kit": Ext.create('itm.grids.kit.KitGrid', { itemId: 'kit', setCfgPer: false }),
      "distinte": Ext.create('itm.grids.distinte.Grid', { itemId: 'distinte', setCfgPer: false }),
    }
    if (this.checkRuoli(['99', '10'])) {
      vm.set('titleMenuMain', Locale.t('itm.main.treemenu'))
      this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
      vm.set('titleMenuAmm', Locale.t('itm.main.treemenuamm'))
      this.ammMenu = Ext.create('portal.v1.view.main.TreeMenuAmm')
    } else {
      this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
    }

    // gestione passaggio dato su menu attributi
    this.mainMenu.getStore().on('beforeload', 'onBeforeLoadTreeMenu', this)

    this.callParent(arguments);

    this.rnd_onAfterRenderNext()

  },

  onBeforeLoadTreeMenu: function (store, operation) {
    if (operation.node && operation.node.get('itemId') && operation.node.get('itemId') === 'attributi') {
      operation.getProxy().extraParams.id_clm = operation.node.get('id_clm');
      operation.getProxy().extraParams.id_fam = operation.node.get('id_fam');
      operation.getProxy().extraParams.id_gruppo = operation.node.get('id_gruppo');
      operation.getProxy().extraParams.id_sottogruppo = operation.node.get('id_sottogruppo');
    }
  },
  onRunApertura: function (r) {
    if (r.tabella && r.idrecord) {
      //apertura da notifica
    }
  },
  onInfoUserApp: function (record) {

  },
  onBeforeLoadMenuNode: function (store, operation) {
    if (!operation.node.get("root")) {

    }
  },
  onLoadStoreGrid: function (s) {

  },
  onitemclick: function (pnl, node) {
    this.callParent(arguments);

    if (Ext.global.Vars.infoCli.cli === 'renaudo') {
      this.rnd_onitemclick(pnl, node)
      return;
    }
    if (node.data.itemId === 'articoli' || node.data.itemId === 'articoli_sito' || node.data.itemId === 'articoli_media') {
      this.onItemClickArticoli(pnl, node)
    }
    if (node.data.itemId === 'attributi') {
      this.onItemClickAttributi(pnl, node)
    }
    // this.previewImg.setSrc('')
  },
  onItemClickArticoli: function (pnl, node) {
    // Gestione apertura sub menu
    let me = this;
    let tab = me.panelCenter.child('#' + node.data.itemId);
    if (node.data.id_stato) {
      tab.fireEvent('addFilterStato', node);
    }
    if (node.data.id_media) {
      tab.fireEvent('addFilterMedia', node);
    }
    if (this.firstOpenSub) {
      if (!Ext.global.Vars.confMod.main.subMenu || Ext.global.Vars.confMod.main.subMenu === '') {
        Ext.global.Vars.confMod.main.subMenu = 'ALL';
      }

      let rootNode = pnl.node.findChild(node.data.itemId);
      if (rootNode && rootNode.data && rootNode.data.children) {

        let item = rootNode.childNodes.filter(el => el.data.id_stato === Ext.global.Vars.confMod.main.subMenu)
        if (item.length === 1) {
          if (item[0].data.id_stato !== node.data.id_stato) {
            let title = Locale.t('itm.grids.articoli.title');
            if (item[0].data.id_stato !== 'ALL') {
              title += ` [<i>${item[0].data.text}</i>]`
            }
            pnl.getSelectionModel().select(item[0], false);
            tab.fireEvent('alterTitle', title);
          }
        }

        let itemMedia = rootNode.childNodes.filter(el => el.data.id_media === Ext.global.Vars.confMod.main.subMenu)
        if (itemMedia.length === 1) {
          if (itemMedia[0].data.id_media !== node.data.id_media) {
            let title = Locale.t('itm.grids.articoli_media.title');
            if (itemMedia[0].data.id_media !== 'ALL') {
              title += ` [<i>${itemMedia[0].data.text}</i>]`
            }
            pnl.getSelectionModel().select(item[0], false);
            tab.fireEvent('alterTitle', title);
          }
        }
      }

    } else {
      if (Ext.global.Vars.confMod.main.subMenu !== node.data.id_stato) {
        let title = Locale.t('itm.grids.articoli.title');
        if (node.data.id_stato !== 'ALL') {
          title += ` [<i>${node.data.text}</i>]`
        }
        tab.fireEvent('alterTitle', title);
        Ext.global.Vars.confMod.main.subMenu = node.data.id_stato
        this.setConfMod();
      }
    }
    me.firstOpenSub = false;
  },
  onItemClickAttributi: function (pnl, node) {
    // Gestione apertura sub menu
    let me = this;
    let tab = me.panelCenter.child('#' + node.data.itemId);
    tab.fireEvent('addFilter', node);

  },

});
