/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('stver.store.forms.anno.Chart', {
    extend: 'Ext.data.Store',
    alias:'store.v1-stver-chartanno',

    requires: [
        'stver.model.forms.anno.Chart'
    ],

    generateData: function (chartStore) {
        if (!chartStore) return;
        let data = [];
        for (let y = 1;y<chartStore.length+1;y++){
            let dataChart = Ext.create('stver.model.forms.anno.Chart',chartStore[y]);
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
