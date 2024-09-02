/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.view.giustificativo.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-widgetgiust',

    requires: [
        'home.view.dashboard.widgets.wpre.store.GridGiust'
    ],
    stores: {
        storeGiust:{type:'v1-wpre-gridgiust',autoLoad: false},

    },
    data: {
        nota:[],
        readOnly:true,
        btndelete:true,
    }
});
