/**
 * Created by fabrizio on 08/10/2022.
 */
Ext.define("atp.global.mail.tagAttach.Combo", {
  extend: "Ext.form.field.Tag",
  xtype: "v1-atp-tagattach-combo",
  filterPickList: true,
  editable: false,
  disableKeyFilter: false,
  minChars: 3,
  createNewOnEnter: true,
  selectOnFocus: false,
  queryMode: "local",
  hideTrigger: true,
  emptyText: "Nessun allegato..."
});
