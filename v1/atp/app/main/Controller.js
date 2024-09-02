/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('atp.main.Controller', {
  extend: 'portal.v1.view.main.ViewController',
  mixins: ['portal.v1.global.Util'],
  alias: 'controller.v1-atp-main',
  requires: [
    'portal.v1.view.main.TreeMenu',
    // 'portal.v1.view.main.TreeMenuAmm',
    'atp.grids.progetti.Grid'
  ],
  onAfterRender: function () {
    let vm = this.getViewModel();

    this.panels = {
      "attivita": Ext.create('atp.grids.progetti.Grid', { itemId: 'progetti', setCfgPer: true }),
    }

    if (this.checkRuoli(['99', '10'])) {
      vm.set('titleMenuMain', Locale.t('atp.main.treemenu'))
      this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu');
      // vm.set('titleMenuAmm', Locale.t('atp.main.treemenuamm'))
      // this.ammMenu = Ext.create('portal.v1.view.main.TreeMenuAmm');
    } else {
      this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu');
    }

    this.callParent(arguments);
  },
  onRunApertura: function (r, view) {

  },
  onInfoUserApp: function (record) {
    // SpcUser = Ext.decode(record.responseText);
    // this.infoUserApp = Ext.decode(record.responseText);
  },
  onBeforeLoadMenuNode: function (store, operation) {
    if (!operation.node.get("root")) {

    }
  },
  onLoadStoreGrid: function (s) {

  }
});

