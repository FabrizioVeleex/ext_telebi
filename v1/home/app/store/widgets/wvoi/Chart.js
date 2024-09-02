/**
 * Created by fabrizio on 29/09/16.
 */
Ext.define('home.store.widgets.wvoi.Chart', {
    extend: 'Ext.data.Store',
    alias:'store.widgetwviolist',
    requires:[
        'home.model.widgets.wvoi.Chart'
    ],
    model:'home.model.widgets.wvoi.Chart'
    // data:[
    //     {"GJ":"9","nominativo":"Walter Allasia","RC":"","WM":"","time":"1333699439"},
    //     {"GJ":"40","nominativo":"Walter Allasia","RC":"","WM":"","time":"1333799439"},
    //     {"GJ":"","nominativo":"Walter Allasia","RC":"4","WM":"","time":"1333699439"},
    //     {"GJ":"","nominativo":"Walter Allasia","RC":"3","WM":"","time":"1333719439"}
    // ]
});

// Ext.define('home.store.widgets.wvoi.Chart', {
//     extend: 'Ext.data.Store',
//     alias:'store.wvoiwidgetchart',
//     requires:[
//         'home.model.widgets.wvoi.Chart'
//     ],
//     generateData: function (chartStore) {
//         return [
//             {"time": 1136073600000, op:"PT","value": 0.8446},
//             {"time": 1136160000000, op:"FF","value": 0.8445},
//             {"time": 1136246400000, op:"FF","value": 0.8444},
//             {"time": 1136332800000, op:"PT","value": 0.8451},
//             {"time": 1136419200000, op:"PT","value": 0.8418},
//             {"time": 1136505600000, op:"PT","value": 0.8264},
//             {"time": 1136592000000, op:"FF","value": 0.8258},
//             {"time": 1136678400000, op:"PT","value": 0.8232},
//             {"time": 1136764800000, op:"PT","value": 0.8233},
//             {"time": 1136851200000, op:"PT","value": 0.8258}
//         ];
//
//         if (!chartStore) return;
//         var data = [];
//         for (var y = 1;y<chartStore.length+1;y++){
//             var dataChart = Ext.create('home.model.widgets.wvoi.Chart',chartStore[y]);
//             data.push(dataChart.data);
//         }
//         return data;
//     },
//
//     refreshData: function() {
//         this.setData(this.generateData());
//     },
//     constructor: function (config) {
//         // config = Ext.apply({
//         //     data: this.generateData(null,null)
//         // }, config);
//         this.callParent([config]);
//     }
//
// });