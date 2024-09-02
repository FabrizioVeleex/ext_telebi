/**
 * Created by fabrizio on 23/01/21.
 */
Ext.define('portal.v1.view.main.global.upload.Image', {
  extend: 'Ext.Container',
  xtype: "v1-global-image",
  requires: [
    'Ext.button.Button',
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
            },
            {
              xtype: 'button',
              ui: 'red',
              width: 100,
              bind: {
                hidden: '{fl.hideBtnCanc}'
              },
              text: Locale.t('global.upload.btn.cancel.text'),
              handler: 'transferCanceled'
            },
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
              bind: {
                hidden: '{hideDrop}'
              }
            },
            {
              xtype: 'form',
              layout: { type: "vbox", align: "stretch" },
              padding: 0,
              items: [{
                xtype: 'filefield',
                hideLabel: true,
                hidden: true,
                margin: 0,
                buttonConfig: {
                  width: 100,
                  cls: 'utente-img-add'
                },
                bind: {
                  hidden: '{hideDrop}'
                },
                buttonOnly: true,
                buttonText: Locale.t('global.upload.btn.add.text'),
                listeners: {
                  'change': 'onChangeBtnUpload'
                }
              }]
            },
            {
              xtype: 'container',
              layout: { type: "vbox", align: "stretch" },
              bind: {
                hidden: '{!hideDrop}'
              },
              items: [
                {
                  width: 100,
                  height: 100,
                  xtype: 'image',
                  itemId: 'image',
                  alt: '&nbsp',
                  src: '/images/picture-add.png',
                  style: {
                    cursor: 'pointer'
                  },
                  listeners: {
                    el: {
                      click: 'onClickImg'
                    }
                  }

                },
                {
                  xtype: 'button',
                  ui: 'red',
                  width: 100,
                  text: Locale.t('global.upload.btn.del.text'),
                  handler: 'onResetImg',
                  hidden: true,
                  bind: {
                    hidden: '{fl.hideBbtnDel}'
                  }
                },
                {
                  xtype: 'button',
                  ui: 'red',
                  width: 100,
                  text: Locale.t('global.upload.btn.undo.text'),
                  handler: 'onUndoImg',
                  hidden: true,
                  bind: {
                    hidden: '{fl.hideBtnUndo}'
                  }
                },
                {
                  xtype: 'form',
                  layout: { type: "vbox", align: "stretch" },
                  padding: 0,
                  items: [{
                    xtype: 'filefield',
                    hideLabel: true,
                    hidden: true,
                    margin: 0,
                    buttonConfig: {
                      width: 100,
                      cls: 'utente-img-add'
                    },
                    bind: {
                      hidden: '{fl.hideBtnAdd}'
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
    updateInfo: 'updateInfo',
    undoImage: 'onUndoImg'
  }
});