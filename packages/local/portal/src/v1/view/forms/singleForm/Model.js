Ext.define('portal.v1.view.forms.singleForm.Model', {
    extend: 'Ext.app.ViewModel',
    requires:[
        'portal.util.Locale',
    ],
    stores: {

    },
    data: {
        form:'',
        label:'',
        title:'',
        isnew : 0,
        record:{},
        readOnly:false,
        gestore:false,
        toolbar:{
            hideMain:true,
            hideCronology:true,
            hideCard:true,
        },
        btn:{
            cronology:false,
            close:false,
            save:false,
            saveclose:false,
            delete:false,
        },
        
    },
    formulas: {
        
    }
});