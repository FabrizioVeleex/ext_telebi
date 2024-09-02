/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('stcom.store.forms.vendite.grafici.ChartFat', {
    extend: 'Ext.data.Store',
    alias:'store.v1-stcom-chartfat',

    requires: [
        'stcom.model.forms.vendite.grafici.ChartFat'
    ],

    generateData: function (chartStore) {
        if (!chartStore) return;
        let data = [];
        for (let y = 1;y<chartStore.length+1;y++){
            let dataChart = Ext.create('stcom.model.forms.vendite.grafici.ChartFat',chartStore[y]);
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
