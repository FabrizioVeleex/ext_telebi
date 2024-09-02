/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("bol.global.component.combostampante.ComboStampante", {
  extend: "Ext.form.ComboBox",
  xtype: "comboStampante",
  fieldLabel: Locale.t("bol.grids.documenti.winfirma.stampante.text"),
  labelWidth: 150,
  displayField: Locale.t("bol.grids.documenti.winfirma.stampante.descrizione"),
  emptyText: Locale.t("bol.grids.documenti.winfirma.stampante.emptytext"),
  valueField: "id",
  queryMode: "local",
  forceSelection: true,
});
