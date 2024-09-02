// noinspection JSUnresolvedVariable
Ext.define("pak.forms.documento.component.tagAttach.Combo", {
  extend: "Ext.form.field.Tag",
  xtype: "v1-pak-tagattach-combo",
  filterPickList: true,
  editable: false,
  disableKeyFilter: false,
  minChars: 3,
  createNewOnEnter: true,
  selectOnFocus: false,
  queryMode: "local",
  hideTrigger: true,
  emptyText: Locale.t("pak.forms.documento.btn.tagattach.nessunallegato")
});
