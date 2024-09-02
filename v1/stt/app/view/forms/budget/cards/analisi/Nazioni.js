/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.cards.analisi.Nazioni", {
  extend: 'Ext.panel.Panel',
  requires: [
    'Ext.container.Container',
  ],
  layout: 'fit',
  itemId: 'nazioni',
  iconCls: 'fas fa-globe-europe',
  title: Locale.t('stt.forms.budget.analisi.cards.nazioni.title'),
  tabConfig: {
    hidden: true,
    bind: {
      hidden: '{hidecard.nazioni}'
    },
  },
  html: 'testo nazioni'
});
