/**
 * Created by luke on 15/04/22.
 */
Ext.define('vda.view.forms.mail.cards.Mail', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.HtmlEditor',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox',
        'vda.view.forms.mail.cards.ComboDestinatari'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('vda.forms.mail.fields.mailfrom'), flex:1, readOnly:true,
                    allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    bind: {value: '{record.mailfrom}'}
                }
            ]
        },
        {xtype: "container",flex:1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {fieldLabel: Locale.t("vda.forms.mail.fields.mailto"),flex: 1,
                    xtype: "v1-vda-mail",
                    bind: {
                        store: "{storeDestinatari}",
                        value: "{record.mailto}",
                        readOnly: '{readOnly}'
                    }
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('vda.forms.mail.fields.subject'), flex:1,
                    maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    bind: {value: '{record.subject}',readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: "container", flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: "htmleditor", flex: 1, autoScroll: true, style: "font-size:14px;",minHeight:200,
                    bind: {readOnly: "{readOnly}", value: "{record.corpo}"}
                }
            ]
        }
    ]
});