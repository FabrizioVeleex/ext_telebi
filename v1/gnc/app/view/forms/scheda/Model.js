/**
 * Created by luca on 16/07/2018.
 */
Ext.define('gnc.view.forms.scheda.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-scheda',

    requires: [
        'gnc.store.forms.scheda.ComboFornitori',
        'gnc.store.forms.scheda.ComboProdotti',
        'portal.v1.store.forms.combo.GetStabilimento',
        'portal.v1.store.forms.combo.GetUsers'
    ],
    stores: {
        storeProdotti:{type:'v1-comboprodotti'}, //store x combo articolo
        storeStabilimenti:{type:'v1-getstabilimento'}, //store x combo stabilimento
        storeFornitori:{type:'v1-combofornitori'}, //store fornitore
        comboUtente_lotto:{type:'v1-getusers'}, //responsabile lotto
        comboUtente_blocco:{type:'v1-getusers'}, //responsabile blocco
        comboUtente_stock:{type:'v1-getusers'}, //responsabile stock
        comboUtente_altrocontainment:{type:'v1-getusers'}, //responsabile altro containment
        comboUtente_materiale:{type:'v1-getusers'}, //responsabile materiale
        comboUtente_man:{type:'v1-getusers'}, //responsabile man
        comboUtente_machine:{type:'v1-getusers'}, //responsabile machine
        comboUtente_strumenti:{type:'v1-getusers'}, //responsabile strumenti
        comboUtente_metodo:{type:'v1-getusers'}, //responsabile metodo
        comboUtente_progetto:{type:'v1-getusers'}, //responsabile progetto
        comboUtente_altro:{type:'v1-getusers'} //responsabile altro corrective
    },
    formulas: {
        dwnDfmea: {
            get: function(){
                return '<div><a class="add" about="dfmea" href="javascript:void(0)"><img src="/images/icons/disk_download.png" title="'+Locale.t('gnc.forms.scheda.istituzionalize.dwnattach')+'" alt="Scarica documento"><img></a></div>';
            }
        },
        delDfmea: {
            get: function(){
                return '<div><a class="add" about="dfmea" href="javascript:void(0)"><img src="/images/icons/delete.png" title="'+Locale.t('gnc.forms.scheda.istituzionalize.delattach')+'" alt="Elimina documento"><img></a></div>';
            }
        },
        dwnPfmea: {
            get: function(){
                return '<div><a class="add" about="pfmea" href="javascript:void(0)"><img src="/images/icons/disk_download.png" title="'+Locale.t('gnc.forms.scheda.istituzionalize.dwnattach')+'" alt="Scarica documento"><img></a></div>';
            }
        },
        delPfmea: {
            get: function(){
                return '<div><a class="add" about="pfmea" href="javascript:void(0)"><img src="/images/icons/delete.png" title="'+Locale.t('gnc.forms.scheda.istituzionalize.delattach')+'" alt="Elimina documento"><img></a></div>';
            }
        },
        dwnCplan: {
            get: function(){
                return '<div><a class="add" about="cplan" href="javascript:void(0)"><img src="/images/icons/disk_download.png" title="'+Locale.t('gnc.forms.scheda.istituzionalize.dwnattach')+'" alt="Scarica documento"><img></a></div>';
            }
        },
        delCplan: {
            get: function(){
                return '<div><a class="add" about="cplan" href="javascript:void(0)"><img src="/images/icons/delete.png" title="'+Locale.t('gnc.forms.scheda.istituzionalize.delattach')+'" alt="Elimina documento"><img></a></div>';
            }
        },
        dwnIstruzioni: {
            get: function(){
                return '<div><a class="add" about="istruzioni" href="javascript:void(0)"><img src="/images/icons/disk_download.png" title="'+Locale.t('gnc.forms.scheda.istituzionalize.dwnattach')+'" alt="Scarica documento"><img></a></div>';
            }
        },
        delIstruzioni: {
            get: function(){
                return '<div><a class="add" about="istruzioni" href="javascript:void(0)"><img src="/images/icons/delete.png" title="'+Locale.t('gnc.forms.scheda.istituzionalize.delattach')+'" alt="Elimina documento"><img></a></div>';
            }
        },
        dwnProc: {
            get: function(){
                return '<div><a class="add" about="proc" href="javascript:void(0)"><img src="/images/icons/disk_download.png" title="'+Locale.t('gnc.forms.scheda.istituzionalize.dwnattach')+'" alt="Scarica documento"><img></a></div>';
            }
        },
        delProc: {
            get: function(){
                return '<div><a class="add" about="proc" href="javascript:void(0)"><img src="/images/icons/delete.png" title="'+Locale.t('gnc.forms.scheda.istituzionalize.delattach')+'" alt="Elimina documento"><img></a></div>';
            }
        },
        dwnAltro: {
            get: function(){
                return '<div><a class="add" about="altro" href="javascript:void(0)"><img src="/images/icons/disk_download.png" title="'+Locale.t('gnc.forms.scheda.istituzionalize.dwnattach')+'" alt="Scarica documento"><img></a></div>';
            }
        },
        delAltro: {
            get: function(){
                return '<div><a class="add" about="altro" href="javascript:void(0)"><img src="/images/icons/delete.png" title="'+Locale.t('gnc.forms.scheda.istituzionalize.delattach')+'" alt="Elimina documento"><img></a></div>';
            }
        }
    }
})