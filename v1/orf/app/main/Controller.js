
/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class
 */
let SpcUser = [];
Ext.define('orf.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    alias: 'controller.main',
    requires: [
        'orf.grids.orf.Grid',
        'orf.main.west.Orf',
    ],
    onAfterRender: function () {
        //costruisco array viste
        this.panels = {
            grid: Ext.create("orf.grids.orf.Grid"),
            panel: Ext.create("orf.main.west.Orf"),
        }

        // Disabilito caricamento west di default
        this.noInitWest = true;
        this.callParent(arguments);

        this.west.add({
            xtype: 'panel',
            layout: 'fit',
            bodyPadding: 0,
            items: [this.panels.panel]
        });

        const firstApp = this.panels.grid
        firstApp.west = this.panels.panel

        // Abilito primo pannello disponibile
        this.panelCenter.insert(0, firstApp);
        firstApp.on('checkForm', 'checkFormMain', this);
        firstApp.on('createTab', 'createTabMain', this);
        this.panelCenter.setActiveTab(firstApp);

    },
    onRunApertura: function (r) {
        //apertura da notifica
    },
    onChangeFilterTipo: function (check, newValue, oldValue) {
        const v = check.inputValue;
        const grid = this.panels.grid;
        grid.getStore().getProxy().extraParams[v] = newValue;
        grid.getStore().load()
    },
    onChangeFilterStatus: function (check, newValue, oldValue) {
        const grid = this.panels.grid;
        grid.getStore().getProxy().extraParams["status"] = newValue;
        grid.getStore().load()
    },
    onSelectFilterGrid: function (chk, rec) {
        const grid = this.panels.grid;
        let records = chk.view.grid.getSelectionModel().getSelection();
        let value = records.map(function (record) {
            return record.data.value;
        })
        grid.getStore().getProxy().extraParams.value = JSON.stringify(value);
        grid.getStore().load()
    },
    // Sovrascrico onCloseForm ereditato
    onCloseForm: function (tab, opts) {
        //se arriva da un agrid visibile la aggiorno
        if (opts && opts.tab && opts.tab.refreshGrid) {
            if (opts && opts.view) {
                opts.view.getStore().load(); //ricarico la vista
            }
        }
        //attivo vista padre
        if (opts && opts.view) {
            let grid = opts.view.up('grid');
            if (!grid) {
                grid = opts.view;
            }
            //TODO gestire array (vedi come fatto in SPL) this.panelCenter.setActiveTab(this.panels[grid.itemId].grid);
            this.panelCenter.setActiveTab(this.panels.grid);
            this.panelCenter.hideTab();
        }
    },
});
