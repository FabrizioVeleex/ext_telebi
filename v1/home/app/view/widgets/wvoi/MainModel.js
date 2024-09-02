/**
 * Created by luca on 14/10/16.
 */
Ext.define('home.view.widgets.wvoi.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.widgetvoi',
    requires:[
        'home.store.widgets.wvoi.Users',
        'home.store.widgets.wvoi.Chart',
        'home.store.widgets.wvoi.GridStore'
    ],
    stores: {
        users:{type:'widgetwviousers'},
        list:{type:'widgetwviolist'},
        listgrid:{xtype:'wvoi-grid1'}
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