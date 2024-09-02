Ext.define("vms.view.forms.prodotto.component.ComboStabilimento", {
  extend: "Ext.form.field.Tag",
  xtype: "v1-vms-tagstabilimenti",
  filterPickList: true,
  displayField: "nome",
  valueField: "id",
  createNewOnEnter: true,
  allowBlank: false,
  editable:false,
  selectOnFocus: false,
  queryMode: "remote",
  hideTrigger: false,
  fieldLabel: Locale.t("vms.forms.prodotto.fields.idsede"),
  tpl: Ext.create(
    "Ext.XTemplate",
    '<ul class="x-list-plain"><tpl for=".">',
    '<li role="option" class="x-boundlist-item">{nome}</li>',
    "</tpl></ul>"
  )
});
