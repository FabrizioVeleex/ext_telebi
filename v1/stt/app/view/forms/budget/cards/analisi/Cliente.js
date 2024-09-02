/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.cards.analisi.Cliente", {
  extend: 'Ext.panel.Panel',
  requires: [
    'Ext.container.Container',
  ],
  layout: 'fit',
  itemId: 'clienti',
  iconCls: 'fas fa-industry',
  title: Locale.t('stt.forms.budget.analisi.cards.clienti.title'),
  tabConfig: {
    hidden: true,
    bind: {
      hidden: '{hidecard.clienti}'
    },
  },
  items: [

  ]
});
