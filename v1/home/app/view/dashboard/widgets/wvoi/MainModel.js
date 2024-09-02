/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wvoi.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-widgetvoi',
    requires:[
        'home.view.dashboard.widgets.wvoi.store.Users',
        'home.view.dashboard.widgets.wvoi.store.Chart',
        'home.view.dashboard.widgets.wvoi.store.GridStore'
    ],
    stores: {
        users:{type:'v1-widgetwviousers'},
        list:{type:'v1-widgetwviolist'},
        listgrid:{xtype:'v1-wvoi-grid1'}
    },
    data: {
        listdata : [],
        dinizio: new Date(),
        dayscombo: 1
    },
    formulas: {
        dfineMax:{
            bind: {
                dinizio: '{dinizio}',
                dfine: '{dfine}'
            },
            get: function (data) {
                let dt = new Date(data.dinizio);
                dt.setDate(dt.getDate() + 6);
                return dt;
            }
        }
    }
});
