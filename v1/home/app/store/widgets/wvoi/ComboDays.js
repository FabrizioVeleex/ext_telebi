/**
 * Created by fabrizio on 04/12/16.
 */
Ext.define('home.store.widgets.wvoi.ComboDays', {
    extend: 'Ext.data.Store',
    xtype: 'wvoi-comboday',
    fields: [
        {name: 'day', type: 'int'}
    ],

    data : [
        {day: 1},
        {day: 2},
        {day: 3},
        {day: 4},
        {day: 5},
        {day: 6},
        {day: 7}
    ]

});