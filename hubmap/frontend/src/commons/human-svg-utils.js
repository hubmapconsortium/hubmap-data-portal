
export function updateText(textSpanId, tooltipText) {
  const spanEl = document.getElementById(textSpanId);
  while (spanEl.firstChild) {
    spanEl.removeChild(spanEl.firstChild);
  }
  spanEl.appendChild(document.createTextNode(tooltipText));
}

export function setAttributes(el, attrs) {
  Object.keys(attrs).forEach((key) => {
    el.setAttributeNS(null, key, attrs[key]);
  });
}

export function showToolTip(evt) {
  const tooltip = document.getElementById('tooltip');
  const tooltipText = tooltip.getElementsByTagName('text')[0];
  const tooltipBox = tooltip.getElementsByTagName('rect')[0];
  // get Human SVG's current transformation matrix.
  const CTM = document.getElementById('human').getScreenCTM();
  // if element has attributes x,y then screen coordinates are of the form ax+e, dy+f.
  // so find real position of mouse pointer (coordinates) in SVG space i.e. ViewBox
  // by calculating the inverse.
  // adding 6 and 20 are numbers to: maintain sufficient distance between mouse cursor
  // and the tooltip rectangle.
  const mouseX = (evt.clientX - CTM.e + 6) / CTM.a;
  const mouseY = (evt.clientY - CTM.f + 20) / CTM.d;
  tooltip.setAttributeNS(null, 'transform', `translate(${mouseX} ${mouseY})`);
  tooltip.setAttributeNS(null, 'visibility', 'visible');
  const [data, text] = evt.target.getAttributeNS(null, 'data-tooltip-text').split(',');
  tooltipText.firstChild.data = data;
  updateText('tspanid', text);
  const length = tooltipText.getComputedTextLength();
  // Adjust width, length, font-size, and opacity of tooltip textbox.
  setAttributes(tooltipBox,
    {
      width: `${length + 10}`,
      height: 30,
      'font-size': 2,
      opacity: 0.6,
    });
}

export function hideToolTip() {
  const tooltip = document.getElementById('tooltip');
  tooltip.setAttributeNS(null, 'visibility', 'hidden');
  this.setAttribute('opacity', 1);
}
