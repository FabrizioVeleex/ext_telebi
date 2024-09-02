/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.cards.analisi.Tipologia", {
  extend: 'Ext.panel.Panel',
  requires: [
    'Ext.container.Container',
  ],
  title: Locale.t('stt.forms.budget.analisi.cards.tipologia.title'),
  tabConfig: {
    hidden: true,
    bind: {
      hidden: '{hidecard.tipologia}'
    },
  },
  items: [

  ]
});
