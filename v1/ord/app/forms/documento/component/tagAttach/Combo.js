// noinspection JSUnresolvedVariable
Ext.define("ord.forms.documento.component.tagAttach.Combo", {
  extend: "Ext.form.field.Tag",
  xtype: "v1-ord-tagattach-combo",
  filterPickList: true,
  editable: false,
  disableKeyFilter: false,
  minChars: 3,
  createNewOnEnter: true,
  selectOnFocus: false,
  queryMode: "local",
  hideTrigger: true,
  emptyText: Locale.t("ord.forms.documento.fields.attach.placeholder"),

});
