/**
 * Created by luca on 05/06/2018.
 */
Ext.define('rec.store.forms.reso.ComboValido', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-combovalido',
    fields:[
        'id','descrizione'
    ],
    data:[
        {id:1,descrizione:Locale.t('rec.forms.reso.radio.si')},
        {id:0,descrizione:Locale.t('rec.forms.reso.radio.no')}
    ]
})