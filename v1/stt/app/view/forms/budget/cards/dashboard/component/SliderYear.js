/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.cards.dettaglio.component.SliderYear", {
  extend: "Ext.slider.Multi",
  width: 600,
  values: [2018, 2022],
  increment: 1,
  minValue: 2011,
  maxValue: 2022,
  listeners: {
    changecomplete: 'onChangeSliderYear'
  }
})
