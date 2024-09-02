/**
 * Created by luke on 04/05/21.
 */
Ext.define('stver.view.forms.mese.cards.GraficoProg', {
    extend: "Ext.panel.Panel",
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.layout.container.Fit',
        'stver.store.forms.mese.ChartProg'
    ],
    scrollable: "y",
    title:Locale.t("stver.forms.andamento.graficoprog"),
    layout: 'fit',
    items: [
        {xtype: 'cartesian',
            insetPadding: { top: 60, bottom: 20, left: 20, right: 40 },
            store:{ type:'v1-stver-chartmeseprog'},
            axes: [
                {
                    adjustByMajorUnit:true,
                    type: 'numeric',
                    fields: ['data0'],
                    position: 'left',
                    renderer: 'onAxisLabelRenderProg',
                    label: {
                        fontSize: '11px'
                    }
                },
                {
                    type: 'category',
                    fields: 'day',
                    position: 'bottom',
                    grid: true,
                    title: '',
                    label: {
                        fontSize: '11px'
                    }
                }
            ],
            series: [
                {type: 'line', title: Locale.t("stver.forms.grafico.progressivo"),
                    xField: 'day', yField: 'data0',
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
                        trackMouse: true, renderer: 'onSeriesTooltipRenderProg'
                    }
                }
            ]
        }
    ]
});