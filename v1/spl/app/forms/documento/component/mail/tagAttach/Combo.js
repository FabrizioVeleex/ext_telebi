/**
 * Created by fabrizio on 08/10/2022.
 */
Ext.define("spl.forms.documento.component.mail.tagAttach.Combo", {
  extend: "Ext.form.field.Tag",
  xtype: "v1-spl-tagattach-combo",
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
