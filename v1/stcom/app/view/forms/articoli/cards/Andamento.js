/**
 * Created by luke on 04/05/21.
 */
Ext.define('stcom.view.forms.articoli.cards.Andamento', {
    extend: "Ext.panel.Panel",
    requires: [
        'Ext.layout.container.Fit'
    ],
    scrollable: "y",
    title:Locale.t("stcom.forms.articoli.dettaglio"),
    layout: "fit",
    items: []
});