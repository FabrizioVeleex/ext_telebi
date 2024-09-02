/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("fat.global.component.combostampante.ComboStampante", {
  extend: "Ext.form.ComboBox",
  xtype: "comboStampante",
  fieldLabel: Locale.t("fat.grids.documenti.winfirma.stampante.text"),
  labelWidth: 150,
  displayField: "descrizione",
  emptyText: Locale.t("fat.grids.documenti.winfirma.stampante.emptytext"),
  valueField: "id",
  queryMode: "local",
  forceSelection: true,
});
