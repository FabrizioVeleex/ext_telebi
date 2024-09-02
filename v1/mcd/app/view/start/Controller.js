Ext.define('mcd.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'mcd.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('mcd.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    },
});
