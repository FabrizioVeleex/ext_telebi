/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.cards.analisi.Dashboard", {
  extend: 'Ext.panel.Panel',
  layout: 'fit',
  scrollable: 'y',
  requires: [
    'Ext.container.Container',
  ],
  itemId: 'dashboard',
  iconCls: 'fas fa-home',
  title: Locale.t('stt.forms.budget.analisi.cards.dashboard.title'),
  items: [

  ],
  listeners: {
    afterrender: 'onAfterRenderDashboard'
  }
});
