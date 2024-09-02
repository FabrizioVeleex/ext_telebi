/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.view.forms.footer.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.console',
    requires:[
        'skd.store.forms.footer.ComboConnections'
    ],

    stores: {
        storeComboConnections: {type: 'comboconnections'}
    },

    data: {
        record:{},
        connection:'',
        disabledUser:true,
        statusApp: {
            syncAll: 0,
            syncAllData:''
        }
    },
    formulas:{
        checkConnection:{
            bind:{
                statusApp:'{statusApp}'
            },
            get:function (data) {
                if(data.statusApp['syncAll']===2){
                    return 'fas fa-circle bd-color-red';
                }
                if(data['syncAll']===1){
                    return 'fas fa-circle bd-color-orange';
                }
                return 'fas fa-circle bd-color-green';
            }
        },
        msgConnection:{
            bind:{
                statusApp:'{statusApp}'
            },
            get:function (data) {
                if(data.statusApp['syncAll']===1){
                    return '<span style="color:orange;">'+Locale.t('skd.forms.footer.statustrue')+'</span>';
                }
                if(data.statusApp['syncAll']===2){
                    return '<span style="color:red;">'+Locale.t('skd.forms.footer.statusfalse')+'</span>';
                }
                return '<span style="color:green;">'+Locale.t('skd.forms.footer.statustrue')+'</span>';
            }
        }
    }
});
