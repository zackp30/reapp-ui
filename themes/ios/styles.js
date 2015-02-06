var { makeStyles } = require('../../index');
var requirer = (name) => require('./styles/' + name);

module.exports = makeStyles(requirer, [
  'Badge',
  'Bar',
  'BarItem',
  'Block',
  'Button',
  'ButtonGroup',
  'Card',
  'CardList',
  'Checkbox',
  'Container',
  'DottedViewList',
  'Dots',
  'Drawer',
  'Input',
  'Label',
  'LayoutLeftNav',
  'List',
  'ListItem',
  'Menu',
  'ModalButton',
  'ModalPortal',
  'NestedViewList',
  'Pad',
  'PopoverPortal',
  'Radio',
  'SearchBar',
  'Title',
  'TitleBar',
  'View'
]);