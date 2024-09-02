/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wvoi.model.GridStore', {
    extend: 'Ext.data.Model',

    fields: [
        'coduser', //codice utente x aprire il dettaglio
        'datestart', //data inizio x aprire il dettaglio
        'dateend', //data fine x aprire il dettaglio
        'user',
        {name: 'ordini', type: 'int'},
        {name: 'righe', type: 'int'},
        {name: 'pezzi', type: 'int'},
        'totm',
        'mediapzord',
        'mediapzora'
    ]

});

