/**
 * Created by fabrizio on 31/12/23.
 */
Ext.define('spl.global.filtri.stato_invio.Fieldset', {
  extend: 'Ext.form.FieldSet',
  requires: [],
  layout: {
    type: 'hbox'
  },
  title: Locale.t('spl.grids.documenti.column.status_mail.title'),
  userCls: "y-filtri-panel-default y-filtri-panel-date",
  defaults: {
    width: 180,
  },
  items: [
    {
      xtype: 'checkboxgroup',
      columns: 1,
      vertical: true,
      items: [
        { boxLabel: Locale.t('spl.grids.documenti.column.status_mail.noemail_1'), name: 'status_mail_N1', inputValue: -1 },
        { boxLabel: Locale.t('spl.grids.documenti.column.status_mail.attesainvio'), name: 'status_mail_0', inputValue: 0 },
        { boxLabel: Locale.t('spl.grids.documenti.column.status_mail.inviato'), name: 'status_mail_1', inputValue: 1 },
        { boxLabel: Locale.t('spl.grids.documenti.column.status_mail.letto'), name: 'status_mail_3', inputValue: 3 },
        { boxLabel: Locale.t('spl.grids.documenti.column.status_mail.scaricato'), name: 'status_mail_4', inputValue: 4 },
      ]
    }
  ],
  listeners: {

  }
});