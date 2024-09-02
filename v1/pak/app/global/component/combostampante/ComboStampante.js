/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("pak.global.component.combostampante.ComboStampante", {
  extend: "Ext.form.ComboBox",
  xtype: "comboStampante",
  fieldLabel: Locale.t("pak.grids.documenti.winfirma.stampante.text"),
  labelWidth: 150,
  displayField: Locale.t("pak.grids.documenti.winfirma.stampante.descrizione"),
  emptyText: Locale.t("pak.grids.documenti.winfirma.stampante.emptytext"),
  valueField: "id",
  queryMode: "local",
  forceSelection: true,
});
