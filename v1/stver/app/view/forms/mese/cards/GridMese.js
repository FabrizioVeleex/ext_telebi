/**
 * Created by luke on 27/09/21.
 */
Ext.define('stver.view.forms.mese.cards.GridMese', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.feature.Summary'
    ],
    multiSelect: false,
    autoLoad: true,
    bind: {
        store: "{storeMese}",
    },
    features: [{ftype: 'summary', dock: 'top'}],
    columns: []
});