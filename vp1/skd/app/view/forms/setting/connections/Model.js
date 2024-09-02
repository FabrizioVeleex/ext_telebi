/**
 * Created by fabrizio on 05/08/21.
 */
Ext.define('skd.view.forms.setting.connections.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.connections',
    requires:[
        'skd.model.forms.connections.Connections',
        'skd.store.forms.footer.ComboConnections'
    ],

    stores: {
        storeComboConnections: {type: 'comboconnections'}
    },

    data: {
        record: Ext.create('skd.model.forms.connections.Connections'),
        readOnly:true,
        list:[],
        connection:''
    }
});
