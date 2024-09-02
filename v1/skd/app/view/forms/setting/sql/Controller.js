/**
 * Created by fabrizio on 05/08/21.
 */
Ext.define('skd.view.forms.setting.sql.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.sql',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.field.Number',
        'Ext.form.field.TextArea',
        'Ext.toolbar.Fill',
        'skd.model.forms.sql.Sql'
    ],
    mixins: ['portal.v1.global.Util'],
    /**
     * Called when the view is created
     */
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', false);
        vm.set('id', '');
        vm.set('record', Ext.create('skd.model.forms.sql.Sql'))
        this.callParent(arguments);
        this.job_log = '';
        this.isLoaded = false;
    },
    onActivate: function () {
        if (this.isLoaded === false) {
            this.getView().fireEvent('firstRender', this.getView());
            this.isLoaded = true;
        }
    },

    managerView: function () {
        let me = this,
            vm = me.getViewModel(),
            record = vm.get('record'),
            readOnly = true,
            btnCon = [];


        if (this.checkRuoli(['99', '31'])) {
            readOnly = false;
        }
        vm.set('list', record.data.list);
        vm.set('readOnly', readOnly);

        let connections = record.data.connections;

        this.cardSql = Ext.create('Ext.Container', {
            scrollable: 'y'
        });
        let list = record.data.list;
        let listObj = [];
        for (let i = 0; i < list.length; i++) {
            for (let ii = 0; ii < connections.length; ii++) {
                btnCon.push({
                    text: connections[ii].name,
                    idConnection: connections[ii].id,
                    code: i,
                    handler: 'onTestCode'
                })
            }
            let codeModel = 'code_' + i;
            vm.set(codeModel, list[i]);
            listObj[i] = Ext.create('Ext.form.FieldSet', {
                bind: {
                    title: '{list.' + i + '.name}'
                },
                userCls: 'sql-fieldSet',
                collapsible: true,
                collapsed: true,
                items: [
                    {
                        xtype: 'container',
                        bind: {
                            html: '{list.' + i + '.descrizione}'
                        }
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: Locale.t('skd.forms.cards.sql.fields.sequenza'),
                        width: 150,
                        maxValue: 99,
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        bind: {
                            value: '{list.' + i + '.sequenza}'
                        }
                    },
                    {
                        msgTarget: 'under',
                        labelAlign: 'top',
                        margin: 5,
                        xtype: 'textareafield',
                        grow: true,
                        fieldLabel: Locale.t('skd.forms.cards.sql.fields.sql'),
                        anchor: '100%',
                        bind: {
                            value: '{list.' + i + '.codesql}'
                            // readOnly: '{readOnly}'
                        }
                    },
                    {
                        xtype: 'toolbar',
                        items: [
                            '->',
                            {
                                text: Locale.t('skd.forms.cards.sql.btn.save.text'),
                                ui: 'green',
                                iconCls: 'fas fa-pencil-alt',
                                code: i,
                                handler: 'onSaveCode'
                            },
                            {
                                text: Locale.t('skd.forms.cards.sql.btn.test.text'),
                                iconCls: 'fas fa-lira-sign',
                                menu: btnCon
                            }
                        ]
                    }
                ]
            });
        }
        this.cardSql.add(listObj);
        this.form.add(this.cardSql);
    },


    /* ----------------------------------------------------------------
     * salvataggio singolo record sql
     * ----------------------------------------------------------------*/
    onSaveCode: function (btn) {
        this.onBeforeSave();
        let me = this,
            vm = this.getViewModel(),
            record = this.getViewModel().get('record'),
            code = vm.get('list')[btn.code];

        record.data.code = code;
        record.save({
            success: function (dati, esito) {
                me.tipsHome.msg(code.name, Locale.t('global.form.salvataggiook'));
                me.onAfterSave();
            },
            failure: function (a, o) {
                let consoleInfo;
                try {
                    let rest = Ext.decode(o._response.responseText);
                    consoleInfo = '<h3><span style="color:red">' + rest['msg'] + '</span></h3>';
                } catch (e) {
                    consoleInfo = '<h3><span style="color:red">' + Locale.t('global.error.generic') + '</span></h3>';
                }
                me.onAfterSaveFailure(consoleInfo);
            }
        });
    },
    /* ----------------------------------------------------------------
     * verifica funzionamento sql
     * ----------------------------------------------------------------*/
    onTestCode: function (btn) {
        //TODO da implementare
        return
    }
});
