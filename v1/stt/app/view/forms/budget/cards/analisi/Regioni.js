/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.cards.analisi.Regioni", {
  extend: 'Ext.panel.Panel',
  requires: [
    'Ext.container.Container',
  ],
  layout: 'fit',
  itemId: 'regioni',
  iconCls: 'fas fa-map-marker-alt',
  title: Locale.t('stt.forms.budget.analisi.cards.regioni.title'),
  tabConfig: {
    hidden: true,
    bind: {
      hidden: '{hidecard.regioni}'
    },
  },
  items: [

  ]
});
