/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.model.GridDettaglio', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'CDARR'},
        { name: 'DESC'},
        { name: 'QTORR',defaultValue:0},
        { name: 'VLORR',type:'float',defaultValue:0},
        { name: 'PRUNI',type:'float',defaultValue:0},
        { name: 'UNMSR' }
    ]

});
