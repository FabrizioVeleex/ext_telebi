/**
 * Created by luke on 2018-12-24.
 */
Ext.define('websrv.model.forms.webprodotto.GridAccessi', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.gridaccessi',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'utente', type: 'string'},
        {name: 'log', type: 'string'},
        {name: 'ipaddress', type: 'string'},
        {name: 'datelog',type: 'date',dateFormat: 'Y-m-d H:i:s'},
        {name: 'iderror', type: 'int'}
    ]
});