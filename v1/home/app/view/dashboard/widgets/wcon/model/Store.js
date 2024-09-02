/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.model.Store', {
    extend: 'Ext.data.Model',
    fields: [
        'codice',
        'ragsoc',
        {type:'float',name:'importo'},
        {type:'float',name:'scaduto'},
        {type:'float',name:'ascadere'},
        {type:'float',name:'insoluto'},
        {type:'float',name:'fido'},
        {type:'float',name:'totale'},
        {type:'string',name:'nota'},
        'esecuzione'
    ]
});