/**
 * Created by luke on 04/05/21.
 */
Ext.define('stver.view.forms.anno.cards.Grafico', {
    extend: "Ext.panel.Panel",
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.layout.container.Fit',
        'stver.store.forms.anno.Chart'
    ],
    scrollable: "y",
    title:Locale.t("stver.forms.andamento.grafico"),
    layout: 'fit',
    items: [
        {xtype: 'cartesian',
            insetPadding: { top: 60, bottom: 20, left: 20, right: 40 },
            store:{ type:'v1-stver-chartanno'},
            axes: [
                {
                    adjustByMajorUnit:true,
                    type: 'numeric',
                    fields: ['data0', 'data1', 'data2'],
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
                {type: 'line', title: Locale.t("stver.forms.grafico.andamento"),
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
                {type: 'line', title: Locale.t("stver.forms.grafico.target"),
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
                },
                {type: 'line', title: Locale.t("stver.forms.grafico.trend"),
                    xField: 'month', yField: 'data2',
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