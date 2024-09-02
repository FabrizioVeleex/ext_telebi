/**
 * Created by luca on 17/07/2018.
 */
Ext.define('amm.store.forms.voce.Tipovoci', {
    extend: 'Ext.data.Store',
    alias:'store.v1-tipovoci',
    fields:[
        'id','descrizione'
    ],
    data:[
        {id:'APPL',descrizione: Locale.t('amm.forms.voce.fields.tipo1')},
        {id:'LINK',descrizione: Locale.t('amm.forms.voce.fields.tipo2')}
    ]
});