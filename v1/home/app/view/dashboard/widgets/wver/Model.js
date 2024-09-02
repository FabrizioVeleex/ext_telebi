/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wver.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-widgetwver',

    requires:[
        'home.view.dashboard.widgets.wver.store.Store'
    ],
    stores: {
        store:{type:'v1-widgetstorewver',autoLoad: false}
    },
    data: {
        data: new Date(),
        dataNow: new Date(),
        datato: new Date(),
        stabilimento:'1',
        q:'',
        hideexcel: true,
        record: []
    }
});
