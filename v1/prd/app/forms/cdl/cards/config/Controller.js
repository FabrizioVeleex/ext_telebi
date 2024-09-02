Ext.define("prd.forms.cdl.cards.config.Controller", {
  extend: 'prd.global.cdl.cards.config.Controller',
  requires: [
    'prd.global.cdl.cards.config.component.Info',
    'prd.global.cdl.cards.config.component.Agent',
    'prd.global.cdl.cards.config.component.Cdl',
    "prd.global.cdl.cards.config.component.Programs",
    "prd.global.cdl.cards.config.component.LocalOrders",
    "prd.global.cdl.cards.config.component.SyncSql",
  ],
  onConfigAfterRender: function (panel) {
    if (this.customPanel === "haas") {
      panel.add(
        { xtype: 'global-cdl-cards-config-component-info' },
        { xtype: 'global-cdl-cards-config-component-agent' },
        { xtype: 'global-cdl-cards-config-component-cdl' },
        { xtype: 'global-cdl-cards-config-component-localorders' },
        { xtype: 'global-cdl-cards-config-component-programs' },
        { xtype: 'global-cdl-cards-config-component-syncsql' },
      );
      return
    }
    panel.add(
      { xtype: 'global-cdl-cards-config-component-info' },
      { xtype: 'global-cdl-cards-config-component-agent' },
      { xtype: 'global-cdl-cards-config-component-cdl' },
    );
  }
})