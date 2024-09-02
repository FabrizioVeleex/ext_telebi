/**
 * Created by luke on 15/07/21.
 */
Ext.define('amm.view.forms.ruolo.cards.Componenti', {
    extend: 'Ext.grid.Panel',
    bind: {
        store: '{storeComponenti}'
    },
    columns: [
        {text: Locale.t('amm.forms.ruolo.gridcomponenti.nominativo'), flex:1, dataIndex: 'nominativo'}
    ],
    items: []
});