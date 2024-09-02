Ext.define('prd.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'prd.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('prd.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    },
});
