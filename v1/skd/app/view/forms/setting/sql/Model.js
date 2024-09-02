/**
 * Created by fabrizio on 05/08/21.
 */
Ext.define('skd.view.forms.setting.sql.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sql',
    requires:[
        'skd.model.forms.sql.Sql'
    ],
    stores: {

        },
    data: {
        record: Ext.create('skd.model.forms.sql.Sql'),
        readOnly:true,
        list:[]
    }
});
