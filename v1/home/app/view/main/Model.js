/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('home.view.main.Model', {
    extend: 'Ext.app.ViewModel',
    requires:[
        'Ext.data.Store',
        'Ext.util.Cookies'
    ],
    alias: 'viewmodel.main',
    stores:{
        ll: Ext.create('Ext.data.Store', {
            fields: ['label', 'id'],
            data: listLanguage
        })
    },
    data: {
        azienda:'',
        name: 'portale',
        tr:Ext.util.Cookies.get('i18next')

    },
    formulas:{

    }
});
