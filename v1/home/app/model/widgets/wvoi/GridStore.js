/**
 * Created by luca on 14/10/16.
 */
Ext.define('home.model.widgets.wvoi.GridStore', {
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

