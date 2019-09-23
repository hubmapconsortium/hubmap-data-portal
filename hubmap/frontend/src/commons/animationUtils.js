// TODO: Avoid global variables!
let dynamicStyles = null;

// If we anticipate more utils eventually, it shouldn't be a single default export:
// eslint-disable-next-line import/prefer-default-export
export function addAnimationToStyle(animationName, animationSteps) {
  // Add style
  if (!dynamicStyles) {
    dynamicStyles = document.createElement('style');
    dynamicStyles.type = 'text/css';
    document.head.appendChild(dynamicStyles);
  }
  Array.from(dynamicStyles.sheet.cssRules).forEach((rule, i) => {
    if (rule.name === animationName) {
      dynamicStyles.sheet.deleteRule(i);
    }
  });
  dynamicStyles.sheet.insertRule(`@keyframes ${animationName} {
        ${animationSteps}}`, dynamicStyles.length);
}
