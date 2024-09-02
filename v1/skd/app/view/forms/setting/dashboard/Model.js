/**
 * Created by fabrizio on 05/08/21.
 */
Ext.define('skd.view.forms.setting.dashboard.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dashboard',
    requires: [
        'skd.model.forms.dashboard.Dashboard'
    ],
    stores: {

    },
    data: {
        record: Ext.create('skd.model.forms.dashboard.Dashboard'),
        readOnly: true,
        syncDbAll: 0,
        syncDb: 2,
        statusApp:false,
        textSyncDbAll:'Forzatura sincronizzazione dati da IFS'
    },
    formulas: {
        formSyncDbAll:{
            bind: {
                textSyncDbAll: '{textSyncDbAll}'

            },
            get: function (data) {
                let stato = Locale.t('skd.forms.cards.dashboard.sync.stato.stato'),
                    html ='';

                return '<div style="border: 1px solid #1f2833;padding: 15px;text-align: left;">' + data.textSyncDbAll + '</div>';
            }
        },
        formSyncDb: {
            bind: {
                syncDb: '{syncDb}'

            },
            get: function (data) {
                let stato = Locale.t('skd.forms.cards.dashboard.sync.stato.stato'),
                    html ;


               if (data.syncDb===2){
                   html = stato+'<br><div style="color:#1f2833;font-size: large;padding: 5px;">'+Locale.t('skd.forms.cards.dashboard.sync.stato.attesa')+'</div>';
               }else if (data.syncDb===1){
                   html=  stato+'<br><div style="color:green;font-size: large;padding: 5px;">'+Locale.t('skd.forms.cards.dashboard.sync.stato.run')+'</div>';
                }else{
                   html=  stato+'<br><div style="color:red;font-size: large;padding: 5px;">'+Locale.t('skd.forms.cards.dashboard.sync.stato.stop')+'</div>';
               }
                return '<div style="border: 1px solid #1f2833;padding: 15px;text-align: center;">' + html + '</div>';
            }
        }
    }
});
