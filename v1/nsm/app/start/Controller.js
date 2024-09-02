/**
 * Created by fabrizio on 11/02/21.
 */
Ext.define('nsm.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'nsm.view.main.Main'
    ],
    startApplication: function (form) {
        this.mainPanel = Ext.create('nsm.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    },
});
