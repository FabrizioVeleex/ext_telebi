Ext.define('dip.view.forms.utentestampante.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-stampante',
    requires:[
        'dip.store.forms.utentestampante.ComboStampante',
        'dip.store.forms.utentestampante.ComboUtente',
        'dip.store.forms.utentestampante.ComboTipo',
    ],
    stores:{
        comboStampante:{type:'combostampante'}, //store stampanti
        comboUtente:{type:'comboutente'}, //store utenti
        comboTipo:{type:'combotipo'} //store utenti
    },
    data:{

    },
    formulas: {
        hide_comboutente:{
            bind: {
                combo: {
                    selection: '{combotipo.selection}',
                    deep: true
                },
                record: '{record}',
            },
            get: function(r){
                if (r.combo.selection){
                    if (r.combo.selection.data['id']!=='U'){
                        r.record.set('iduser', '')
                        return true
                    }
                }
                return false;
            }
        },
        hide_indirizzoip:{
            bind: {
                combo: {
                    selection: '{combotipo.selection}',
                    deep: true
                },
                 record: '{record}',
            },
            get: function(r){
                if (r.combo.selection){
                    if (r.combo.selection.data['id']!=='I'){
                        r.record.set('indirizzoip', '')
                        return true
                    }
                }
                return false;
            },
        }
    }
});

