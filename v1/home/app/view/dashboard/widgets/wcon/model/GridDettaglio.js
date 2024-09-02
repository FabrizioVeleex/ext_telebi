/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.model.GridDettaglio', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'credito',defaultValue:0},
        { name: 'datadoc'},
        { name: 'insoluto' },
        { name: 'numero' },
        { name: 'scadenza' },
        { name: 'scadere' },
        { name: 'scaduto' },
        { name: 'tipo' }
    ]
});
