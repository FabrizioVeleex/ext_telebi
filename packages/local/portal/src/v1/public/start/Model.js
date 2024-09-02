Ext.define('portal.v1.public.start.Model', {
    extend: 'Ext.app.ViewModel',
    data: {
        azienda:'',
        tr:LOCALE.default
    },
    formulas:{
        waiting:{
            get:function (data) {
                let url = new URL(document.location.href);
                let lng = url.searchParams.get('lng')
                if (lng === null) {
                    lng = LOCALE.default
                    if (!lng) {
                        lng='it'
                    }
                }
                switch (lng){
                    case 'it': return 'Caricamento applicazione in corso...'
                    case 'en': return 'Loading application...'
                }

            }
        },
    }
});
