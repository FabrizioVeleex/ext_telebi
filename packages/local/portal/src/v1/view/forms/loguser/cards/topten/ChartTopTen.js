/**
 * Created by fabrizio on 26/03/21.
 */
Ext.define('portal.v1.view.forms.loguser.cards.topten.ChartTopTen', {
    extend: 'Ext.chart.PolarChart',
    alias: 'widget.v1-global.pie-basic',
    requires: [
        'Ext.chart.PolarChart',
        'Ext.chart.interactions.Rotate',
        'Ext.chart.series.Pie',
        'Ext.chart.interactions.ItemHighlight'
    ],

    bind:{
        store:'{gridtopten}'
    },
    interactions: ['rotate'],
    series: [{
        type: 'pie',
        angleField: 'percentageNum',
        label: {
            field: 'user',
            calloutLine: {
                length: 10,
                width: 3
                // specifying 'color' is also possible here
            }
        },
        radiusFactor:70,
        donut: 10,
        highlight: true,
        tooltip: {
            trackMouse: true,
            renderer: 'onSeriesTooltipRender'
        }
    }]


});

/*
Ext.define('portal.v1.view.forms.loguser.cards.topten.ChartTopTen', {
    extend: 'Ext.Panel',
    alias:'widget.v1-global.pie-basic',
    width: 650,
    height: 300,
    requires: [
        'Ext.chart.PolarChart',
        'Ext.chart.interactions.Rotate',
        'Ext.chart.series.Pie'
    ],

    items: [
        {
            xtype: 'polar',
            store:{
                fields: ['name', 'data1'],
                data: [{
                    name: 'metric one',
                    data1: 14
                }, {
                    name: 'metric two',
                    data1: 16
                }, {
                    name: 'metric three',
                    data1: 14
                }, {
                    name: 'metric four',
                    data1: 6
                }, {
                    name: 'metric five',
                    data1: 36
                }]
            },
            interactions: ['rotate'],
            series: [{
                type: 'pie',
                angleField: 'data1',
                label: {
                    field: 'name',
                    calloutLine: {
                        length: 60,
                        width: 3
                        // specifying 'color' is also possible here
                    }
                },
                highlight: true,
                // tooltip: {
                //     trackMouse: true,
                //     renderer: 'onSeriesTooltipRender'
                // }
            }]
        }
    ]
});

*/