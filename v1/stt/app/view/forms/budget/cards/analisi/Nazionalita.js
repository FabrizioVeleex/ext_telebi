/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.cards.analisi.Nazionalita", {
  extend: 'Ext.panel.Panel',
  requires: [
    'Ext.container.Container',
  ],
  layout: 'fit',
  itemId: 'nazionalita',
  iconCls: 'fas fa-globe',
  title: Locale.t('stt.forms.budget.analisi.cards.nazionalita.title'),
  tabConfig: {
    hidden: true,
    bind: {
      hidden: '{hidecard.nazionalita}'
    },
  },
});
