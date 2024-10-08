Ext.define("ord.global.firma.PickerDateTime", {
  extend: "Ext.picker.Date",
  alias: "widget.datetimepicker",

  requires: ["Ext.form.field.Number", "Ext.picker.Date"],
  okText: "OK",
  nowText: "Adesso",

  focusable: true,
  editable: true,

  renderTpl: [
    '<div id="{id}-innerEl" data-ref="innerEl" role="presentation" class="sys-datetime-picker">',
    '<div class="{baseCls}-header">',
    '<div id="{id}-prevEl" data-ref="prevEl" class="{baseCls}-prev {baseCls}-arrow" role="presentation" title="{prevText}"></div>',
    '<div id="{id}-middleBtnEl" data-ref="middleBtnEl" class="{baseCls}-month" role="heading">{%this.renderMonthBtn(values, out)%}</div>',
    '<div id="{id}-nextEl" data-ref="nextEl" class="{baseCls}-next {baseCls}-arrow" role="presentation" title="{nextText}"></div>',
    "</div>",
    '<table role="grid" id="{id}-eventEl" data-ref="eventEl" class="{baseCls}-inner" cellspacing="0" tabindex="0">',
    "<thead>",
    '<tr role="row">',
    '<tpl for="dayNames">',
    '<th role="columnheader" class="{parent.baseCls}-column-header" aria-label="{.}">',
    '<div role="presentation" class="{parent.baseCls}-column-header-inner">{.:this.firstInitial}</div>',
    "</th>",
    "</tpl>",
    "</tr>",
    "</thead>",
    "<tbody>",
    '<tr role="row">',
    '<tpl for="days">',
    "{#:this.isEndOfWeek}",
    '<td role="gridcell">',
    '<div hidefocus="on" class="{parent.baseCls}-date"></div>',
    "</td>",
    "</tpl>",
    "</tr>",
    "</tbody>",
    "</table>",

    "<center>",
    '<table id="{id}-timeEl" data-ref="timeEl" style="width: auto; margin-left: 15px; margin-right: 15px; margin-top: 4px; margin-bottom: 4px;" class="x-datepicker-inner sys-timepicker-inner" cellspacing="0">',
    "<tbody>",
    "<tr>",
    '<td style="width: 16px; text-align: center; font-weight: bold;">H:</td>',
    "<td>{%this.renderHourBtn(values,out)%}</td>",
    '<td style="width: 16px; text-align: center; font-weight: bold;">M:</td>',
    "<td>{%this.renderMinuteBtn(values,out)%}</td>",
    '<td style="width: 16px;display: none; text-align: center; font-weight: bold;">:</td>',
    '<td style="display: none;">{%this.renderSecondBtn(values,out)%}</td>',
    "</tr>",
    "</tbody>",
    "</table>",
    "</center>",

    '<tpl if="showToday">',
    '<div id="{id}-footerEl" data-ref="footerEl" role="presentation" class="{baseCls}-footer">{%this.renderOkBtn(values, out)%}{%this.renderTodayBtn(values, out)%}{%this.renderNowBtn(values, out)%}</div>',
    "</tpl>",
    // These elements are used with Assistive Technologies such as screen readers
    '<div id="{id}-todayText" class="' +
    Ext.baseCSSPrefix +
    'hidden-clip">{todayText}.</div>',
    '<div id="{id}-nowText" class="' +
    Ext.baseCSSPrefix +
    'hidden-clip">{nowText}.</div>',
    '<div id="{id}-ariaMinText" class="' +
    Ext.baseCSSPrefix +
    'hidden-clip">{ariaMinText}.</div>',
    '<div id="{id}-ariaMaxText" class="' +
    Ext.baseCSSPrefix +
    'hidden-clip">{ariaMaxText}.</div>',
    '<div id="{id}-ariaDisabledDaysText" class="' +
    Ext.baseCSSPrefix +
    'hidden-clip">{ariaDisabledDaysText}.</div>',
    '<div id="{id}-ariaDisabledDatesText" class="' +
    Ext.baseCSSPrefix +
    'hidden-clip">{ariaDisabledDatesText}.</div>',
    "</div>",
    {
      firstInitial: function (value) {
        return Ext.picker.Date.prototype.getDayInitial(value);
      },

      isEndOfWeek: function (value) {
        // convert from 1 based index to 0 based
        // by decrementing value once.
        value--;
        let end = value % 7 === 0 && value !== 0;
        return end ? '</tr><tr role="row">' : "";
      },

      renderTodayBtn: function (values, out) {
        Ext.DomHelper.generateMarkup(
          values.$comp.todayBtn.getRenderTree(),
          out
        );
      },

      renderNowBtn: function (values, out) {
        Ext.DomHelper.generateMarkup(values.$comp.nowBtn.getRenderTree(), out);
      },

      renderMonthBtn: function (values, out) {
        Ext.DomHelper.generateMarkup(
          values.$comp.monthBtn.getRenderTree(),
          out
        );
      },

      renderHourBtn: function (values, out) {
        Ext.DomHelper.generateMarkup(values.$comp.hourBtn.getRenderTree(), out);
      },

      renderMinuteBtn: function (values, out) {
        Ext.DomHelper.generateMarkup(
          values.$comp.minuteBtn.getRenderTree(),
          out
        );
      },

      renderSecondBtn: function (values, out) {
        Ext.DomHelper.generateMarkup(
          values.$comp.secondBtn.getRenderTree(),
          out
        );
      },

      renderOkBtn: function (values, out) {
        Ext.DomHelper.generateMarkup(values.$comp.okBtn.getRenderTree(), out);
      },
    },
  ],

  onMouseDown: function (e) {
    let targetId = e.target.id;

    if (
      targetId.indexOf("sysnumberfield") === 0 ||
      targetId.indexOf("numberfield") === 0
    ) {
      // do nothing
    } else {
      e.preventDefault();
    }
  },

  beforeRender: function () {
    let me = this,
      _$Number = Ext.form.field.Number;

    me.hourBtn = new _$Number({
      ownerCt: me,
      ownerLayout: me.getComponentLayout(),
      minValue: 0,
      maxValue: 23,
      step: 1,
      width: 74,
      focusable: true,
      editable: true,
    });

    me.minuteBtn = new _$Number({
      ownerCt: me,
      ownerLayout: me.getComponentLayout(),
      minValue: 0,
      maxValue: 59,
      step: 1,
      width: 74,
    });

    me.secondBtn = new _$Number({
      ownerCt: me,
      ownerLayout: me.getComponentLayout(),
      minValue: 0,
      maxValue: 59,
      step: 1,
      width: 68,
    });

    me.okBtn = new Ext.button.Button({
      ownerCt: me,
      ownerLayout: me.getComponentLayout(),
      ui: me.footerButtonUI,
      text: me.okText,
      tooltipType: "title",
      tabIndex: -1,
      ariaRole: "presentation",
      handler: me.okHandler,
      scope: me,
    });

    me.nowBtn = new Ext.button.Button({
      ownerCt: me,
      ownerLayout: me.getComponentLayout(),
      ui: me.footerButtonUI,
      text: me.nowText,
      tooltipType: "title",
      tabIndex: -1,
      ariaRole: "presentation",
      handler: me.nowHandler,
      scope: me,
    });

    me.callParent();
  },

  privates: {
    finishRenderChildren: function () {
      let me = this;
      me.callParent();

      me.hourBtn.finishRender();
      me.minuteBtn.finishRender();
      me.secondBtn.finishRender();
      me.okBtn.finishRender();
      me.nowBtn.finishRender();
    },
  },

  okHandler: function () {
    let me = this,
      btn = me.okBtn;

    if (btn && !btn.disabled) {
      me.setValue(this.getValue());
      me.fireEvent("select", me, me.value);
      me.onSelect();
    }

    return me;
  },

  nowHandler: function () {
    let me = this,
      btn = me.nowBtn;

    if (btn && !btn.disabled) {
      me.setValue(new Date(), true);
      me.fireEvent("select", me, me.value);
      me.onSelect();
    }

    return me;
  },

  selectedUpdate: function (date) {
    this.callParent([Ext.Date.clearTime(date, true)]);
  },

  update: function (date) {
    let me = this;

    me.hourBtn.setValue(String(date.getHours()));
    me.minuteBtn.setValue(String(date.getMinutes()));
    me.secondBtn.setValue(String(date.getSeconds()));

    return this.callParent(arguments);
  },

  setValue: function (date, isFixed) {
    let me = this;

    if (isFixed !== true) {
      date.setHours(me.hourBtn.getValue());
      date.setMinutes(me.minuteBtn.getValue());
      date.setSeconds(me.secondBtn.getValue());
    }

    me.value = date;
    me.update(me.value);

    return me;
  },

  // @private
  // @inheritdoc
  beforeDestroy: function () {
    let me = this;

    if (me.rendered) {
      Ext.destroy(
        me.hourBtn,
        me.minuteBtn,
        //me.secondBtn,
        me.okBtn
      );
    }

    me.callParent();
  },

  handleDateClick: function (e, t) {
    let me = this;

    e.stopEvent();

    if (
      !me.disabled &&
      t.dateValue &&
      !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)
    ) {
      me.doCancelFocus = me.focusOnSelect === false;
      me.setValue(new Date(t.dateValue));
      delete me.doCancelFocus;
    }
  },
});
