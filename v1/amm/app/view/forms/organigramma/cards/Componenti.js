/**
 * Created by luke on 15/07/21.
 */
Ext.define('amm.view.forms.organigramma.cards.Componenti', {
    extend: 'Ext.grid.Panel',
    bind: {
        store: '{storeComponenti}'
    },
    columns: [
        {text: Locale.t('amm.forms.organigramma.gridcomponenti.nominativo'), flex:1, dataIndex: 'nominativo'},
        {text: Locale.t('amm.forms.organigramma.gridcomponenti.ruolo'), flex:1, dataIndex: 'ruolo'}
    ],
    items: []
});