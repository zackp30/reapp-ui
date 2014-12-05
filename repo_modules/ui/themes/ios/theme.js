var { makeTheme } = require('../../index');
var requirer = (name) => require('./styles/' + name);

module.exports = makeTheme(requirer, [
  'Badge',
  'Block',
  'Button',
  'ButtonRow',
  'Card',
  'CardList',
  'Container',
  'DottedViewList',
  'Dots',
  'Drawer',
  'Input',
  'LayoutLeftNav',
  'List',
  'ListItem',
  'Menu',
  'Modal',
  'Pad',
  'Popover',
  'TabItem',
  'Tabs',
  'Title',
  'TitleBar',
  'View',
  'ViewLeft',
  'ViewList',
  'ViewMain'
]);