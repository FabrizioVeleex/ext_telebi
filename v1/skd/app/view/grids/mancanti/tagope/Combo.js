/**
 * Created by fabrizio on 08/10/2022.
 */
Ext.define("skd.view.grids.mancanti.tagope.Combo", {
  extend: "Ext.form.field.Tag",
  xtype: "v1-skd-forms-mancanti-tagope",
  filterPickList: true,
  displayField: "ope_operatore",
  valueField: "ope_operatore",
  createNewOnEnter: false,
  minChars: 3,
  queryMode: "remote",
  autoLoadOnValue: true,
  emptyText: "Filtro...",
  fieldLabel: Locale.t("spl.forms.documento.fields.mailto"),
  tpl: Ext.create(
    "Ext.XTemplate",
    '<ul class="x-list-plain"><tpl for=".">',
    '<li role="option" class="x-boundlist-item"><i>{ope_operatore}</i></li>',
    "</tpl></ul>"
  ),
});
