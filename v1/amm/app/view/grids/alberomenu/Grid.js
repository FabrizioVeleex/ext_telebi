/**
 * Created by luke on 21/07/21.
 */
Ext.define('amm.view.grids.alberomenu.Grid', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.tree.plugin.TreeViewDragDrop',
        'amm.store.grids.alberomenu.Store',
        'amm.view.grids.alberomenu.Controller',
        'amm.view.grids.alberomenu.Model'
    ],
    controller: 'alberomenu',
    viewModel: 'alberomenu',
    rootVisible: false,
    hideHeaders:true,
    bind: {
        title: '{titolo}'
    },
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
            dragText: 'Drag and drop to reorganize'
        }
    },
    dockedItems:[
        {xtype:'toolbar', reference:'toolbarTop',
            dock: 'top',
            items: [
                {handler: 'reloadGrid', iconCls: 'pictos pictos-refresh'},
                {tooltip: Locale.t('amm.grids.alberomenu.btn.new.tooltip'), text: Locale.t('amm.grids.alberomenu.btn.new.text'), iconCls: 'x-fas fa-plus',
                    ui:'green', handler: 'onAddMenuTop'},
                {tooltip: Locale.t('amm.grids.alberomenu.btn.help.tooltip'), text: Locale.t('amm.grids.alberomenu.btn.help.text'),
                    iconCls: 'x-fas fa-question-circle', ui:'ocra', handler: 'onHelp'}
            ]
        }
    ],
    listeners:{
        afterrender: 'onAfterRender',
        itemcontextmenu:'onItemContext',
        beforedrop: 'onBeforeDrop'
    },
    initComponent: function () {
        let me = this;
        me.store = Ext.create('amm.store.grids.alberomenu.Store');
        this.callParent(arguments);
    }
});