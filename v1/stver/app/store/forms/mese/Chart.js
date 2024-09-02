/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('stver.store.forms.mese.Chart', {
    extend: 'Ext.data.Store',
    alias:'store.v1-stver-chartmese',

    requires: [
        'stver.model.forms.mese.Chart'
    ],

    generateData: function (chartStore) {
        if (!chartStore) return;
        let data = [];
        let oggi = new Date()
        for (let y = 1;y<chartStore.length+1;y++){
            oggi.setDate(y)
            //escludo sabato e domenica
            if (oggi.getDay()!==6 && oggi.getDay()!==0) {
                let dataChart = Ext.create('stver.model.forms.mese.Chart',chartStore[y]);
                data.push(dataChart.data);
            }
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
