'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _adaptivecards = require('adaptivecards');

var AdaptiveCards = _interopRequireWildcard(_adaptivecards);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _compare = require('./compare');

var _compare2 = _interopRequireDefault(_compare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ACTION_OPEN_URL = 'Action.OpenUrl';
var ACTION_SHOW_CARD = 'Action.ShowCard';
var ACTION_SUBMIT = 'Action.Submit';

var AdaptiveCard = function (_React$Component) {
  _inherits(AdaptiveCard, _React$Component);

  function AdaptiveCard(props) {
    _classCallCheck(this, AdaptiveCard);

    // Create this in the constructor so we don't create it every render
    var _this = _possibleConstructorReturn(this, (AdaptiveCard.__proto__ || Object.getPrototypeOf(AdaptiveCard)).call(this, props));

    _this.adaptiveCard = new AdaptiveCards.AdaptiveCard();
    return _this;
  }

  _createClass(AdaptiveCard, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Remove all references
      delete this.adaptiveCard;
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if ((0, _compare2.default)(nextProps.hostConfig, this.props.hostConfig)) {
        return true;
      }
      if ((0, _compare2.default)(nextProps.payload, this.props.payload)) {
        return true;
      }
      if ((0, _compare2.default)(nextProps.onExecuteAction, this.props.onExecuteAction)) {
        return true;
      }
      return false;
    }
  }, {
    key: 'executeAction',
    value: function executeAction(a) {
      var type = a.getJsonTypeName();
      switch (type) {
        case ACTION_OPEN_URL:
          {
            if (this.props.onActionOpenUrl) {
              this.props.onActionOpenUrl(a);
            } else {
              this.defaultOpenUrlHandler(a);
            }

            break;
          }
        case ACTION_SHOW_CARD:
          {
            if (this.props.onActionShowCard) {
              this.props.onActionShowCard(a);
            }
            break;
          }
        case ACTION_SUBMIT:
          {
            if (this.props.onActionSubmit) {
              this.props.onActionSubmit(a);
            }
            break;
          }
      }
      if (this.props.onExecuteAction) {
        this.props.onExecuteAction(a);
      }
    }
  }, {
    key: 'defaultOpenUrlHandler',
    value: function defaultOpenUrlHandler(action) {
      window.open(action.url, action.title || '_blank');
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.hostConfig) {
        this.adaptiveCard.hostConfig = new AdaptiveCards.HostConfig(this.props.hostConfig);
      }
      this.adaptiveCard.onExecuteAction = this.executeAction.bind(this);

      try {
        this.adaptiveCard.parse(this.props.payload);
        var result = this.adaptiveCard.render();
        return _react2.default.createElement('div', { style: this.props.style, ref: function ref(n) {
            n && n.firstChild && n.removeChild(n.firstChild);
            n && n.appendChild(result);
          } });
      } catch (err) {
        console.error(err);
        if (this.props.onError) {
          return this.props.onError(err);
        } else {
          return _jsx('div', {
            style: { color: 'red' }
          }, void 0, err.message);
        }
      }
    }
  }]);

  return AdaptiveCard;
}(_react2.default.Component);

AdaptiveCard.propTypes = {
  /** The hostConfig object that is passed along to the native AdaptiveCards. [More Info](https://docs.microsoft.com/en-us/adaptive-cards/display/hostconfig) */
  hostConfig: _propTypes2.default.object,
  /** The card schema.  It must comply with the card schema. [More Info](https://docs.microsoft.com/en-us/adaptive-cards/create/cardschema) */
  payload: _propTypes2.default.object.isRequired,
  /** Method that will be invoked anytime a card action is executed. [More Info](https://docs.microsoft.com/en-us/adaptive-cards/display/implementingrenderer#actions) */
  onExecuteAction: _propTypes2.default.func,
  /** Method that will be invoked when a Submit action is executed. [More Info](https://docs.microsoft.com/en-us/adaptive-cards/display/implementingrenderer#actionsubmit) */
  onActionSubmit: _propTypes2.default.func,
  /** Method that will be invoked when an Open Url action is executed. [More Info](https://docs.microsoft.com/en-us/adaptive-cards/display/implementingrenderer#actionopenurl) */
  onActionOpenUrl: _propTypes2.default.func,
  /** Method that will be invoked when a Show Card action is executed. [More Info](https://docs.microsoft.com/en-us/adaptive-cards/display/implementingrenderer#actionshowcard) */
  onActionShowCard: _propTypes2.default.func,
  /** Method that will be invoked if an error is thrown while trying to render a card. */
  onError: _propTypes2.default.func,
  /** JSX styles that will be applied to the card conatiner */
  style: _propTypes2.default.object
};
exports.default = AdaptiveCard;