Ext.define('dip.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'dip.view.main.Main'
    ],
    startApplication: function (form) {
        this.mainPanel = Ext.create('dip.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    },
});
