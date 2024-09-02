// noinspection JSUnresolvedVariable
Ext.define("fat.forms.documento.component.tagAttach.Combo", {
  extend: "Ext.form.field.Tag",
  xtype: "v1-fat-tagattach-combo",
  filterPickList: true,
  editable: false,
  disableKeyFilter: false,
  minChars: 3,
  createNewOnEnter: true,
  selectOnFocus: false,
  queryMode: "local",
  hideTrigger: true,
  emptyText: Locale.t("fat.forms.documento.btn.tagattach.nessunallegato")
});
