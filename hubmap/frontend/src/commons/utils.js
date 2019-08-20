export { addAnimationToStyle };
let dynamicStyles = null;
export default function addAnimationToStyle(animationName, animationSteps) {
  // add style
  if (!dynamicStyles) {
    dynamicStyles = document.createElement('style');
    dynamicStyles.type = 'text/css';
    document.head.appendChild(dynamicStyles);
  }
  for (let i = 0; i < dynamicStyles.sheet.cssRules.length; i++) {
    if (dynamicStyles.sheet.cssRules[i].name === animationName) {
      dynamicStyles.sheet.deleteRule(i);
    }
  }
  dynamicStyles.sheet.insertRule(`@keyframes ${animationName} {
        ${animationSteps}}`, dynamicStyles.length);
}
