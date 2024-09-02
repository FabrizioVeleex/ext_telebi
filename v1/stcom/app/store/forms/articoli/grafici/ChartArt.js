/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('stcom.store.forms.articoli.grafici.ChartArt', {
    extend: 'Ext.data.Store',
    alias:'store.v1-stcom-chartart',

    requires: [
        'stcom.model.forms.articoli.grafici.ChartArt'
    ],

    generateData: function (chartStore) {
        if (!chartStore) return;
        let data = [];
        for (let y = 1;y<chartStore.length+1;y++){
            let dataChart = Ext.create('stcom.model.forms.articoli.grafici.ChartArt',chartStore[y]);
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
