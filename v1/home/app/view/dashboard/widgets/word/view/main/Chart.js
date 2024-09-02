/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.main.Chart', {
    extend: 'Ext.chart.CartesianChart',
    requires: [
        'Ext.chart.*',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'home.view.dashboard.widgets.word.Model',
        'home.view.dashboard.widgets.word.store.Chart'
    ],
    viewModel:'v1-word',
    height:240,
    legend: {
        docked: 'right'
    },
    store:{
        type:'v1-wattwidgetchart'
    },
    axes: [
        {
            adjustByMajorUnit:true,
            type: 'numeric',
            fields: ['data0', 'data1', 'data2' ],
            position: 'left',
            renderer: 'onAxisLabelRender'
        },
        {
            type: 'category',
            fields: 'month',
            position: 'bottom',
            grid: true
        }
    ],
    series: [{
        type: 'line',
        title: '2014',
        xField: 'month',
        yField: 'data0',
        marker: {
            type: 'square',
            fx: {
                duration: 200,
                easing: 'backOut'
            }
        },
        highlightCfg: {
            scaling: 2
        },
        tooltip: {
            trackMouse: true,
             renderer: 'onSeriesTooltipRender'
        }
    }, {
        type: 'line',
        title: '2015',
        xField: 'month',
        yField: 'data1',
        marker: {
            type: 'triangle',
            fx: {
                duration: 200,
                easing: 'backOut'
            }
        },
        highlightCfg: {
            scaling: 2
        },
        tooltip: {
            trackMouse: true,
            renderer: 'onSeriesTooltipRender'
        }
    }, {
        type: 'line',
        title: '2016',
        xField: 'month',
        yField: 'data2',
        marker: {
            type: 'arrow',
            fx: {
                duration: 200,
                easing: 'backOut'
            }
        },
        highlightCfg: {
            scaling: 2
        },
        tooltip: {
            trackMouse: true,
            renderer: 'onSeriesTooltipRender'
        }
    }]
});
