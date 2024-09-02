/**
 * Created by luke on 04/05/21.
 */
Ext.define('stres.view.forms.globale.grafici.GraficoGlo', {
    extend: "Ext.panel.Panel",
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.layout.container.Fit',
        'stres.store.forms.globale.grafici.ChartGlo'
    ],
    scrollable: "y",
    title:Locale.t("stres.forms.globale.grafico"),
    layout: 'fit',
    items: [
        {xtype: 'cartesian',
            insetPadding: { top: 60, bottom: 20, left: 20, right: 40 },
            store:{ type:'v1-stres-chartglo'},
            axes: [
                {
                    adjustByMajorUnit:true,
                    type: 'numeric',
                    fields: ['data0'],
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
                }
            ]
        }
    ]
});