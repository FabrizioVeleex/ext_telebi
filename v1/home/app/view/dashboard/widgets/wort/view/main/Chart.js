/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.view.main.Chart', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Bar',
    ],
    border: true,
    collapsible: true,
    collapsed:true,
    collapseDirection:'right',
    resizable:true,
    items: {
        height:300,
        xtype: 'cartesian',
        reference: 'chart',
        captions: {
            title: {
                text: Locale.t('wort.chart.title'),
                align: 'left'
            }
        },
        bind:{
            store:'{storeChart}'
        },

        axes: [{
            type: 'numeric',
            position: 'left',
            minimum: 1,
            titleMargin: 20,
            title: {
                text: Locale.t('wort.chart.left')
            },
        },
            {
            type: 'category',
            position: 'none'
        }
        ],
        animation: !Ext.isIE8,
        series: {
            type: 'bar',
            xField: 'CDARR',
            yField: 'TOT',
            style: {
                minGapWidth: 1
            },
            highlight: {
                strokeStyle: 'black',
                fillStyle: 'gold'
            },
            label: {
                field: 'CDARR',
                display: 'insideEnd',
            },
            tooltip: {
                trackMouse: true,
                renderer: function (tooltip, record) {
                    tooltip.setHtml(`Codice articolo: <b>${record.get('CDARR')}</b><br/>totale venduto: <b>${record.get('TOT')}</b><br/>totale pezzi: <b>${record.get('TOTP')}</b>`);
                }
            }
        },
    },
    listeners:{
        expand:'onExpand'
    }
});
