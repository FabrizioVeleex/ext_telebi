/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.view.dettaglio.Panel', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.Display'
    ],
    flex: 1,
    items: [
        {
            xtype: 'container',
            defaults:{
                labelWidth:150,
                style : {
                    'margin-bottom':0
                },
            },
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: Locale.t('wort.dettaglio.fields.codice'),
                    bind: {
                        value: '{record.CDCFO}',
                    }
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: Locale.t('wort.dettaglio.fields.cliente'),
                    bind: {
                        value: '{record.RAGSOC}',
                    }
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: Locale.t('wort.dettaglio.fields.agente'),
                    bind: {
                        value: '{record.CDAGE}',
                    }
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: Locale.t('wort.dettaglio.fields.numero'),
                    bind: {
                        value: '{record.NRREO}',
                    }
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: Locale.t('wort.dettaglio.fields.importo'),
                    bind: {
                        value: '{recordDettaglio.importo}',
                    }
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: Locale.t('wort.dettaglio.fields.dtconric'),
                    bind: {
                        value: '{recordDettaglio.dtconric}',
                    }
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: Locale.t('wort.dettaglio.fields.dtconconf'),
                    bind: {
                        value: '{recordDettaglio.dtconconf}',
                    }
                }
            ]
        },
    ]
});
