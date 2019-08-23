/* eslint-disable no-plusplus */

export function updateText(tspanId, txt) {
  const spanEl = document.getElementById(tspanId);
  while (spanEl.firstChild) {
    spanEl.removeChild(spanEl.firstChild);
  }
  spanEl.appendChild(document.createTextNode(txt));
}

export function showToolTip(evt) {
  const humanSvg = document.getElementById('human');
  const tooltip = humanSvg.getElementById('tooltip');
  const tooltipText = tooltip.getElementsByTagName('text')[0];
  const tooltipRects = tooltip.getElementsByTagName('rect');
  const CTM = humanSvg.getScreenCTM();
  const mousex = (evt.clientX - CTM.e + 6) / CTM.a;
  const mousey = (evt.clientY - CTM.f + 20) / CTM.d;
  tooltip.setAttributeNS(null, 'transform', `translate(${mousex} ${mousey})`);
  tooltip.setAttributeNS(null, 'visibility', 'visible');
  const lines = evt.target.getAttributeNS(null, 'data-tooltip-text').split(',');
  // eslint-disable-next-line prefer-destructuring
  tooltipText.firstChild.data = lines[0];
  updateText('tspanid', lines[1]);
  const length = tooltipText.getComputedTextLength();
  for (let i = 0; i < tooltipRects.length; i++) {
    tooltipRects[i].setAttributeNS(null, 'width', length + 10);
    tooltipRects[i].setAttributeNS(null, 'height', 30);
    tooltipRects[i].setAttributeNS(null, 'font-size', 2);
  }
  this.setAttribute('opacity', 0.6);
}

export function hideToolTip() {
  const humanSvg = document.getElementById('human');
  const tooltip = humanSvg.getElementById('tooltip');
  tooltip.setAttributeNS(null, 'visibility', 'hidden');
  this.setAttribute('opacity', 1);
}
