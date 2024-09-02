/**
 * Created by fabrizio on 09/01/2023.
 */
Ext.define('stt.view.forms.budget.cards.analisi.South', {
  extend: 'Ext.form.Panel',
  region: "south",
  collapsible: false,
  collapsed: false,
  hidden: true,
  iconCls: 'fas fa-list-ul',
  requires: [
  ],
  title: Locale.t('stt.forms.budget.analisi.cards.articoli.dettagliovuoto'),
  minHeight: 200,
  bind: {
    hidden: '{hidecard.south}'
  }
})