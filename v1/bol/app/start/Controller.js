
Ext.define('bol.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'bol.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('bol.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    },
});
