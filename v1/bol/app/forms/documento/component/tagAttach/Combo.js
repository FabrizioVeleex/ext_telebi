// noinspection JSUnresolvedVariable
Ext.define("bol.forms.documento.component.tagAttach.Combo", {
  extend: "Ext.form.field.Tag",
  xtype: "v1-bol-tagattach-combo",
  filterPickList: true,
  editable: false,
  disableKeyFilter: false,
  minChars: 3,
  createNewOnEnter: true,
  selectOnFocus: false,
  queryMode: "local",
  hideTrigger: true,
  emptyText: Locale.t("bol.forms.documento.btn.tagattach.nessunallegato")
});
