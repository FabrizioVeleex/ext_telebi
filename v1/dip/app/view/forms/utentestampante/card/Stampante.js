Ext.define('dip.view.forms.utentestampante.card.Stampante', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.TextField',
        'Ext.form.field.ComboBox',
    ],
    scrollable: 'y',
    defaults: {
        msgTarget: 'side'
    },
    items: [
        {
            xtype: 'combo',
            fieldLabel: Locale.t('dip.forms.utentestampante.fields.tipo'),
            width: 300,
            displayField: 'descrizione',
            valueField: 'id',
            forceSelection: true,
            bind: {
                hidden: '{hidetipo}',
                store: '{comboTipo}',
                value: '{record.tipo}',
                readOnly: '{readOnly}'
            },
        },
        {
            xtype: 'combo',
            allowBlank: false,
            fieldLabel: Locale.t('dip.forms.utentestampante.fields.utente'),
            listConfig: {loadingText: Locale.t('global.form.combo.ricerca')+'...', emptyText: Locale.t('global.form.combo.empty')},
            anchor: '100%',
            displayField: 'cognomenome',
            valueField: 'id',
            queryMode: 'remote',
            forceSelection: true,
            autoLoadOnValue:true,
            bind: {
                hidden: '{hide_comboutente}',
                store: '{comboUtente}',
                value: '{record.iduser}',
                readOnly: '{readOnly}'
            }
        }
        , {
            xtype: 'textfield',
            name:'indirizzoip',
            vtype:'IPAddress',
            fieldLabel: Locale.t('dip.forms.utentestampante.fields.indirizzoip'),
            width: 300,
            bind: {
                hidden: '{hide_indirizzoip}',
                value: '{record.indirizzoip}'
            }
        },
        {
            xtype: 'combo',
            fieldLabel: Locale.t('dip.forms.utentestampante.fields.stampante'),
            anchor: '100%',
            allowBlank: false,
            displayField: 'descrizione',
            valueField: 'id',
            queryMode: 'local',
            forceSelection: true,
            listConfig: {loadingText: Locale.t('global.form.combo.ricerca')+'...', emptyText: Locale.t('global.form.combo.empty')},
            bind: {
                store: '{comboStampante}',
                value: '{record.idprinter}',
                readOnly: '{readOnly}'
            }
        }
    ],
});