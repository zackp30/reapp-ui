var React = require('react/addons');
var Component = require('ui/component');
var { Scroller } = require('scroller');
var TitleBar = require('../components/TitleBar');
var TouchableArea = require('../helpers/TouchableArea');
var Transforms = require('../lib/Transforms');
var View = require('./View');

module.exports = Component('ViewList', {
  mixins: [Transforms.TransformerMixin],

  propTypes: {
    onTouchStart: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onViewEnter: React.PropTypes.func,
    onViewLeave: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      initialStep: 0,
      transform: 'VIEW_PARALLAX',
      touchStartBounds: {
        x: [
          { from: 0, to: 10 } // draggable only from left edge
        ]
      }
    };
  },

  getInitialState() {
    return {
      width: 0,
      step: this.props.initialStep
    };
  },

  componentDidMount() {
    window.addEventListener('resize', this.setupDimensions);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.setupDimensions);
  },

  // only update on even steps
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.step % 1 === 0;
  },

  componentWillReceiveProps(nextProps) {
    this.setup(nextProps);

    if (nextProps.initialStep !== this.props.initialStep)
      this.scrollToView(nextProps.initialStep);
  },

  componentWillMount() {
    this.setup(this.props);
  },

  setup(props) {
    this.countViews(props);
    this.setupViewEnterStates(props);
    this.setupDimensions(props);
    this.setupScroller(props);
  },

  countViews(props) {
    this.numViews = props.children.filter(view => !!view).length;
  },

  setupDimensions(props) {
    var width = props.width || window.innerWidth;
    var height = props.height || window.innerHeight;
    this.setState({ width, height });
  },

  setupScroller(props) {
    var { width, height } = this.state;

    this.scroller = new Scroller(this.handleScroll, {
      paging: true,
      bouncing: false,
      scrollingY: false
    });

    this.scroller.setSnapSize(width, height);
    this.scroller.setDimensions(
      width,
      height,
      width * props.children.length,
      height
    );

    this.scrollToView(props.initialStep);
  },

  setupViewEnterStates(props) {
    this.visibleViews = this.filterEmpty(props.children).map(v => false);
    this.visibleViews[0] = true;
  },

  filterEmpty(children) {
    return children.filter(c => !!c);
  },

  handleScroll(left) {
    var step = this.state.width ? left / this.state.width : 0;
    this.setState({ step: step });
    this._doTransforms(step);
    this.visibleViewCallbacks(step);
  },

  visibleViewCallbacks(step) {
    if (step % 1 !== 0) {
      var newVisibleIndex = [ Math.floor(step), Math.ceil(step) ]
        .filter(i => !this.visibleViews[i])[0];

      if (newVisibleIndex >= 0) {
        this.visibleViews[newVisibleIndex] = true;
        this.callProperty('onViewEntering', newVisibleIndex);
      }
    }
    else {
      this.callProperty('onViewEntered', step);

      var prev = step-1;
      var next = step+1;

      if (this.visibleViews[prev]) {
        this.callProperty('onViewLeft', prev);
        this.visibleViews[prev] = false;
      }
      else if (this.visibleViews[next]) {
        this.callProperty('onViewLeft', next);
        this.visibleViews[next] = false;
      }
    }
  },

  callProperty(name) {
    if (this.props[name])
      this.props[name].apply(this, Array.prototype.slice.call(arguments, 1));
  },

  isOnStage(index) {
    return (
      (index >= this.state.step - 1) &&
      (index <= this.state.step + 1)
    );
  },

  handleTouchStart(e) {
    if (this.props.onTouchStart)
      this.props.onTouchStart(e);
  },

  handleTouchEnd(e) {
    if (this.props.onTouchEnd)
      this.props.onTouchEnd(e);
  },

  handleClick(e) {
    var hash = e.target.hash;
    if (!hash) return;

    var viewIndex = this.props.children.map(v => v.id).indexOf(hash.slice(1));

    if (viewIndex >= 0) {
      this.scrollToView(viewIndex);
      e.preventDefault();
    }
  },

  scrollToView(index) {
    this.scroller.scrollTo(this.state.width * index, 0, true);
  },

  render() {
    window.ViewList = this;
    var { after, before, touchStartBounds, children, transform, ...props } = this.props;
    var viewListProps = Object.assign({
      ignoreY: true,
      scroller: this.scroller,
      touchStartBounds: touchStartBounds,
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
      onClick: this.handleClick
    }, props);

    clonedChildren = React.Children.map(this.filterEmpty(children), (view, i) => {
      return view && React.addons.cloneWithProps(view, {
        index: i,
        transform: transform,
        width: this.state.width
      });
    });

    if (this.state.step === 0)
      this.addStyles(this.styles.underTouchable);

    return (
      <TouchableArea {...this.componentProps()} {...viewListProps}>
        {before}
        {clonedChildren}
        {after}
      </TouchableArea>
    );
  }
});