/**
 * Created by luke on 04/05/21.
 */
Ext.define('stres.view.forms.articolo.cards.Andamento', {
    extend: "Ext.panel.Panel",
    requires: [
        'Ext.layout.container.Fit'
    ],
    scrollable: "y",
    title:Locale.t("stres.forms.articolo.dettaglio"),
    layout: "fit",
    items: []
});