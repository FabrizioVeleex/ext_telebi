Ext.define('skd.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'skd.view.main.Main'
    ],
    startApplication: function (form) {
        this.mainPanel = Ext.create('skd.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    },
});
