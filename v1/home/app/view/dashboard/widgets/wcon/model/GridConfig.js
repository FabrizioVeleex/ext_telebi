/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.model.GridConfig', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'action',defaultValue:0},
        {isnew: 'action',defaultValue:0},
        { name :'codice',defaultValue:''},
        { name :'ragsoc',defaultValue:''}
    ]
})
