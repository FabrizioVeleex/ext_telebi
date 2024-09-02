/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.word.store.Chart', {
    extend: 'Ext.data.Store',
    alias:'store.v1-wattwidgetchart',

    requires: [
        'home.view.dashboard.widgets.word.model.Chart'
    ],

    generateData: function (chartStore) {
        if (!chartStore) return;
        let data = [];
        for (let y = 1;y<chartStore.length+1;y++){
            let dataChart = Ext.create('home.view.dashboard.widgets.word.model.Chart',chartStore[y]);
            data.push(dataChart.data);
        }
        return data;
    },

    refreshData: function() {
        this.setData(this.generateData());
    },
    constructor: function (config) {
        this.callParent([config]);
    }

});
