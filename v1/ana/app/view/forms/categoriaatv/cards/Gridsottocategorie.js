/**
 * Created by luca on 27/06/2017.
 */
Ext.define('ana.view.forms.categoriaatv.cards.Gridsottocategorie', {
    extend:'portal.v1.view.grids.DefaultGrid',
    minHeight: 120,
    bind: {
        store: '{storeSottocategorie}'
    },
    columns: [
        {text: Locale.t('ana.forms.categoriaatv.gridsottocategorie.column.nome'), dataIndex: 'nome', flex:1, filter: {type: 'string'}},
        {text: Locale.t('ana.forms.categoriaatv.gridsottocategorie.column.riservata'), dataIndex: 'riservata', width: 100, filter: {type: 'string'}}
    ],
    items: [
        /* include child components here */
    ]
});