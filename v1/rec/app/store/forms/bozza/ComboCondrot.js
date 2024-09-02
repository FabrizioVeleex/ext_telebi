/**
 * Created by luca on 05/06/2018.
 */
Ext.define('rec.store.forms.bozza.ComboCondrot', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-combocondrot',
    fields:[
        'id','descrizione'
    ],
    data:[
        {id:0,descrizione:Locale.t('rec.forms.bozza.fields.restituire')},
        {id:1,descrizione:Locale.t('rec.forms.bozza.fields.rottamare')}
    ]
})