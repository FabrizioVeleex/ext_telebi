/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.cards.analisi.ClMer", {
  extend: 'Ext.panel.Panel',
  requires: [
    'Ext.container.Container',
  ],
  layout: 'fit',
  itemId: 'clmer',
  iconCls: 'fas fa-layer-group',
  title: Locale.t('stt.forms.budget.analisi.cards.clmer.title'),
  tabConfig: {
    hidden: true,
    bind: {
      hidden: '{hidecard.clmer}'
    },
  },
  items: [

  ]
});
