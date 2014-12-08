var React = require('react');
var StaticView = require('ui/helpers/StaticView');
var Drawer = require('ui/views/Drawer');
var { Container, Block } = require('ui/components/Grid');
var BackButton = require('ui/components/buttons/BackButton');
var Button = require('ui/components/Button');

module.exports = StaticView({
  statics: {
    title: [<BackButton />, 'Panels']
  },

  title: 'Panels',

  getDefaultState() {
    return {
      bottomClosed: true
    };
  },

  toggleBottomView() {
    this.setState({ bottomClosed: !this.state.bottomClosed });
  },

  render() {
    var title = [<BackButton />, this.title];

    return (
      <div>
        <h3>{this.title}</h3>
        <p>Panels slide out from a side of the screen</p>
        <Container>
          <Button>Top</Button>
          <Button onClick={this.toggleBottomView}>Bottom</Button>
          <Button>Right</Button>
        </Container>

        <Drawer closed={this.state.bottomClosed}>
        </Drawer>
      </div>
    );
  }
});