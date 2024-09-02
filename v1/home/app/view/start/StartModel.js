Ext.define('home.view.start.StartModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.Store',
        'Ext.util.Cookies'
    ],
    alias: 'viewmodel.start',
    stores: {
        ll: Ext.create('Ext.data.Store', {
            fields: ['label', 'id'],
            data: listLanguage
        })
    },
    data: {
        azienda: "",
        loginMessage: '',
        hiddenLn: true,  //multilingua
        hiddenChangePsw: true, //abilitazione cambio password
        tr: "it"
    },
    formulas: {
        waiting: {
            get: function (data) {
                let url = new URL(document.location.href);
                let lng = url.searchParams.get('lng')
                if (lng === null) {
                    lng = Ext.util.Cookies.get('i18next')
                    if (!lng) {
                        lng = 'it'
                    }
                    switch (lng) {
                        case 'it': return 'Caricamento applicazione in corso...'
                        case 'en': return 'Loading application...'
                    }
                }
            }
        }
    }
});
