/**
 * Created by luke on 04/05/21.
 */
Ext.define('sting.view.forms.ingresso.grafici.GraficoIng', {
    extend: "Ext.panel.Panel",
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.layout.container.Fit',
        'sting.store.forms.ingresso.grafici.ChartIng'
    ],
    scrollable: "y",
    title:Locale.t("sting.forms.grafico.ingresso.title"),
    layout: 'fit',
    items: [
        {xtype: 'cartesian',
            insetPadding: { top: 60, bottom: 20, left: 20, right: 40 },
            store:{ type:'v1-sting-charting'},
            axes: [
                {
                    adjustByMajorUnit:true,
                    type: 'numeric',
                    fields: ['data0', 'data1'],
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
            series: [
                {type: 'line', title: '',
                    xField: 'month', yField: 'data0',
                    marker: {
                        type: 'square',
                        fx: {
                            duration: 200, easing: 'backOut'
                        }
                    },
                    highlightCfg: {
                        scaling: 2
                    },
                    tooltip: {
                        trackMouse: true, renderer: 'onSeriesTooltipRender'
                    }
                },
                {type: 'line', title: '',
                    xField: 'month', yField: 'data1',
                    marker: {
                        type: 'square',
                        fx: {
                            duration: 200, easing: 'backOut'
                        }
                    },
                    highlightCfg: {
                        scaling: 2
                    },
                    tooltip: {
                        trackMouse: true, renderer: 'onSeriesTooltipRender'
                    }
                }
            ]
        }
    ]
});