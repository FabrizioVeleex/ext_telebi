/**
 * Created by luke on 23/06/21.
 */
Ext.define('bolpas.view.forms.bolla.cards.Gridresi', {
    extend: 'Ext.grid.Panel',
    bind: {
        store: '{storeResi}'
    },
    minHeight: 120,
    selType: 'cellmodel',
    columns: [
        {text: Locale.t('bolpas.forms.bolla.gridresi.nreso'), width:400, dataIndex: 'nreso'},
        {text: Locale.t('bolpas.forms.bolla.gridresi.dreso'), width:120, dataIndex: 'dreso'}
    ],
    items: []
});