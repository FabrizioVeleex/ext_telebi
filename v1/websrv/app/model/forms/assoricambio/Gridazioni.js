/**
 * Created by luke on 03/02/21.
 */
Ext.define('websrv.model.forms.assoricambio.Gridazioni', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.gridazioni',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'utente', type: 'string'},
        {name: 'cliente', type: 'string'},
        {name: 'log', type: 'string'},
        {name: 'datelog',type: 'date',dateFormat: 'Y-m-d H:i:s'},
        {name: 'azione', type: 'string'},
        {name: 'iderror', type: 'int'},
        {name: 'code', type: 'string'}
    ]
});