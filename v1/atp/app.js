Ext.onReady(function () {
    const timer = ms => new Promise(res => setTimeout(res, ms))
    async function appLocale() {
        for (let i = 0; i < 10; i++) {
            let locale_app = window.localStorage.getItem('i18next_gec') //aggiunto tag dell'app
            if (locale_app.trim() !== '') {
                await timer(100);
                Ext.application({
                    extend: 'atp.Application',
                    name: 'atp',
                    requires: [
                        'atp.start.Panel',
                        'portal.v1.global.Vars',
                        'portal.util.Locale'
                    ],
                    mainView: 'atp.start.Panel'
                });
                i = 11;
            } else {
                await timer(500);
            }
        }
        if (!LOCALE.json) {
            alert('errore caricameto dati riprovare più tardi')
        }
    }
    appLocale().then(r => '');
});
