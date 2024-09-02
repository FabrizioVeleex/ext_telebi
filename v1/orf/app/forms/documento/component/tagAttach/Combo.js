// noinspection JSUnresolvedVariable
Ext.define("orf.forms.documento.component.tagAttach.Combo", {
  extend: "Ext.form.field.Tag",
  xtype: "v1-orf-tagattach-combo",
  filterPickList: true,
  editable: false,
  disableKeyFilter: false,
  minChars: 3,
  createNewOnEnter: true,
  selectOnFocus: false,
  queryMode: "local",
  hideTrigger: true,
  emptyText: Locale.t("orf.forms.documento.fields.attach.placeholder"),

});
