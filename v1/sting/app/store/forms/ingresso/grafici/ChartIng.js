/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('sting.store.forms.ingresso.grafici.ChartIng', {
    extend: 'Ext.data.Store',
    alias:'store.v1-sting-charting',

    requires: [
        'sting.model.forms.ingresso.grafici.ChartIng'
    ],

    generateData: function (chartStore) {
        if (!chartStore) return;
        let data = [];
        for (let y = 1;y<chartStore.length+1;y++){
            let dataChart = Ext.create('sting.model.forms.ingresso.grafici.ChartIng',chartStore[y]);
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
