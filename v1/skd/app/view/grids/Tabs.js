/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.view.grids.Tabs', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.Fit'
    ],

    layout:'fit',
    listeners:{
        afterRender:'onAfterRender',
        activate:'onActivate',
        generateGrid:'onGenerateGridStore',
        reloadGrid:'onReloadGridStore',
        prepareStoreData:'onPrepareStoreData',
        selectActiveCell:'onSelectActiveCell',
        statusApp:'onStatusApp'
    }
});
