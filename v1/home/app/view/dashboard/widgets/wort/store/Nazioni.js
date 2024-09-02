/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.store.Nazioni', {
    extend: 'Ext.data.Store',
    alias:'store.v1-wort-nazioni',
    fields: ['label', 'id'],
    data: [
        {id: 'T', label: Locale.t('wort.tutti')},
        {id: 'I', label: Locale.t('wort.italia')},
        {id: 'E', label: Locale.t('wort.estero')}
    ],
    proxy:{
        type:'memory'
    }
});
