Ext.define('portal.v1.view.forms.mainCard.Model', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'portal.util.Locale',
    ],
    stores: {

    },
    data: {
        form: '',
        label: '',
        title: '',
        isnew: 0,
        record: {},
        readOnly: false,
        gestore: false,
        toolbar: {
            hideMain: false,
            hideCronology: true,
            hideCard: true,
        },
        cardactive: '',
        btn: {
            cronology: false,
            close: false,
            save: false,
            saveclose: false,
            delete: false,
        },
        panelinfo: {
            consoleInfo: '',
            iconInfoStart: true,
            iconInfoError: false,
            btnInfoErrorLoad: false,
            btnInfoErrorSave: false,
            btnInfoErrorDelete: false,
        }
    },
    formulas: {
        panelTitle: {
            bind: {
                title: '{title}',
                isnew: '{isnew}'
            },
            get: function (data) {
                let titolo = data.title;
                if (titolo.length > 20) {
                    titolo = titolo.substring(0, 19) + '...';
                }
                if (titolo.trim().length === 0) {
                    titolo = Locale.t('global.form.empty');
                }
                return ' <b>' + titolo + '</b>';
            }
        },
        formTitle: {
            bind: {
                title: '{title}',
                label: '{label}',
                isnew: '{isnew}',
                readOnly: '{readOnly}'
            },
            get: function (data) {
                let t = Locale.t('global.form.suffissoread'),
                    titolo = data.title;
                if (data.readOnly === false) {
                    if (data.isnew === 1) {
                        t = Locale.t('global.form.suffissonew');
                    } else {
                        t = Locale.t('global.form.suffissoedit');
                    }
                }

                return '<div class="titleForm">' +
                    '<img class="logo" src="/logos/logo_32.png" alt="&nbsp;">' +
                    '<span class="prefix">' + data.label + ' [' + t + '] :</span><span class="title"> ' + titolo + '</span>' +
                    '</div>';
            }
        }
    }
});