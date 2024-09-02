/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wvoi.store.ComboDays', {
    extend: 'Ext.data.Store',
    xtype: 'v1-wvoi-comboday',
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
