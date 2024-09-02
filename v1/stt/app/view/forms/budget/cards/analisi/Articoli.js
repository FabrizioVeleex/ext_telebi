/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.cards.analisi.Articoli", {
  extend: 'Ext.panel.Panel',
  requires: [
    'Ext.container.Container',
  ],
  layout: 'fit',
  itemId: 'articoli',
  iconCls: 'fas fa-box',
  title: Locale.t('stt.forms.budget.analisi.cards.articoli.title'),
  tabConfig: {
    hidden: true,
    bind: {
      hidden: '{hidecard.articoli}'
    },
  },
  items: [

  ]
});
