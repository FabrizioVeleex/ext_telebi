/**
 * Created by fabrizio on 19/03/21.
 */
Ext.define('portal.v1.view.forms.loguser.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-loguser',
    requires:[
        'portal.v1.store.forms.loguser.ComboUtente',
        'portal.v1.store.forms.loguser.GridDetRequest',
        'portal.v1.store.forms.loguser.GridDetType',
        'portal.v1.store.forms.loguser.GridTopTen'
    ],
    stores: {
        gridtopten:{type:'v1-global-gridtopten',autoLoad: false},
        griddettype:{type:'v1-global-griddettype',autoLoad: false},
        griddetrequest:{type:'v1-global-griddetrequest',autoLoad: false},
        comboUtente:{type:'v1-global-comboutente'},
    },
    data: {
        fromdate: '',
        todate: '',
        iduser:'',
        cardactive:'topten'
    }
});