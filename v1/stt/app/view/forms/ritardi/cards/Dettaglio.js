/**
 * Created by fabrizio on 22/07/22.
 */
Ext.define("stt.view.forms.ritardi.cards.Dettaglio", {
  extend: "Ext.form.Panel",
  requires: [
    "Ext.container.Container",
    "Ext.layout.container.HBox",
  ],
  scrollable: "y",
  title: Locale.t("stt.forms.ritardi.dettaglio.title"),
  posizione: "gridandamento",
  layout: "border",
  items: [],
});
