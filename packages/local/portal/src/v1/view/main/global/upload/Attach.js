/**
 * Created by fabrizio on 23/01/21.
 */
Ext.define('portal.v1.view.main.global.upload.Attach', {
  extend: 'Ext.Container',
  requires: [
    'Ext.container.Container',
    'Ext.form.Panel',
    'Ext.form.field.File',
    'Ext.layout.container.VBox',
    'portal.util.Locale',
    'portal.v1.view.main.global.upload.Controller',
    'portal.v1.view.main.global.upload.Model',
    'portal.v1.view.main.global.upload.dragFile.DragFile'
  ],
  controller: 'v1-uploadfile',
  viewModel: 'v1-uploadfile',
  layout: { type: "vbox", align: "stretch" },
  bodyStyle: 'background-color:trasparent;',
  margin: '8px,0,0',
  height: 130,
  width: 100,
  items: [
    {
      xtype: 'container',
      items: [
        {
          xtype: 'container',
          hidden: true,
          bind: {
            hidden: '{hideProgress}'
          },
          items: [
            {
              xtype: 'progress',
              shadow: true,
              height: 100,
              bind: {
                text: '{textProgress}',
                value: '{progress}'
              }
            }
          ]
        },
        {
          xtype: 'container',
          hidden: true,
          bind: {
            hidden: '{!hideProgress}'
          },
          items: [
            {
              xtype: 'v1-dragfile',
              bodyCls: 'panel-drag',
              width: 100,
              height: 100,
            },
            {
              xtype: 'container',
              layout: { type: "vbox", align: "stretch" },
              items: [
                {
                  xtype: 'form',
                  layout: { type: "vbox", align: "stretch" },
                  padding: 0,
                  items: [{
                    xtype: 'filefield',
                    hideLabel: true,
                    margin: 0,
                    buttonConfig: {
                      width: 100,
                      cls: 'utente-img-add'
                    },
                    buttonOnly: true,
                    buttonText: Locale.t('global.upload.btn.add.text'),
                    listeners: {
                      'change': 'onChangeBtnUpload'
                    }
                  }]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  listeners: {
    updateInfo: 'updateInfo'
  }
});