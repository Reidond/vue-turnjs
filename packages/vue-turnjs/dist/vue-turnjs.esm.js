import 'vue';
import $ from 'jquery';
import crypto from 'crypto';

// --- Static ---
const isArray = val => Array.isArray(val); // --- Instance ---

const freeze = obj => Object.freeze(obj);
const getOwnPropertyNames = obj => Object.getOwnPropertyNames(obj);
const keys = obj => Object.keys(obj); // --- "Instance" ---

const hasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 * Note object could be a complex type like array, date, etc.
 */

const isObject = obj => obj !== null && typeof obj === "object";
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */

const isPlainObject = obj => Object.prototype.toString.call(obj) === "[object Object]";
/**
 * Deep-freezes and object, making it immutable / read-only.
 * Returns the same object passed-in, but frozen.
 * Freezes inner object/array/values first.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 * Note: this method will not work for property values using Symbol() as a key
 */

const deepFreeze = obj => {
  // Retrieve the property names defined on object/array
  // Note: `keys` will ignore properties that are keyed by a `Symbol()`
  const props = keys(obj); // Iterate over each prop and recursively freeze it

  props.forEach(prop => {
    const value = obj[prop]; // If value is a plain object or array, we deepFreeze it

    obj[prop] = value && (isPlainObject(value) || isArray(value)) ? deepFreeze(value) : value;
  });
  return freeze(obj);
};

/**
 * Utilities to get information about the current environment
 */
// --- Constants ---
const hasWindowSupport = typeof window !== "undefined";
const hasDocumentSupport = typeof document !== "undefined";
const hasNavigatorSupport = typeof navigator !== "undefined";
const isBrowser = hasWindowSupport && hasDocumentSupport && hasNavigatorSupport; // Browser type sniffing

const userAgent = isBrowser ? window.navigator.userAgent.toLowerCase() : "";
const isJSDOM = userAgent.indexOf("jsdom") > 0;
const isIE = /msie|trident/.test(userAgent); // Determine if the browser supports the option passive for events

const hasPassiveEventSupport = (() => {
  let passiveEventSupported = false;

  if (isBrowser) {
    try {
      const options = {
        get passive() {
          // This function will be called when the browser
          // attempts to access the passive property.

          /* istanbul ignore next: will never be called in JSDOM */
          passiveEventSupported = true;
        }

      };
      window.addEventListener("test", options, options);
      window.removeEventListener("test", options, options);
    } catch (err) {
      /* istanbul ignore next: will never be called in JSDOM */
      passiveEventSupported = false;
    }
  }

  return passiveEventSupported;
})();

const getEnv = (key, fallback = null) => {
  const env = typeof process !== "undefined" && process ? process.env || {} : {};

  if (!key) {
    /* istanbul ignore next */
    return env;
  }

  return env[key] || fallback;
};
const getNoWarn = () => getEnv("BOOTSTRAP_VUE_NO_WARN");

const toType = val => typeof val;
const isUndefined = val => val === undefined;
const isNull = val => val === null;
const isUndefinedOrNull = val => isUndefined(val) || isNull(val);
const isString = val => toType(val) === "string";

const cloneDeep = (obj, defaultValue = obj) => {
  if (isArray(obj)) {
    return obj.reduce((result, val) => [...result, cloneDeep(val, val)], []);
  }

  if (isPlainObject(obj)) {
    return keys(obj).reduce((result, key) => ({ ...result,
      [key]: cloneDeep(obj[key], obj[key])
    }), {});
  }

  return defaultValue;
};

const identity = x => x;

const RX_ARRAY_NOTATION = /\[(\d+)]/g;
/**
 * Get property defined by dot/array notation in string, returns undefined if not found
 *
 * @link https://gist.github.com/jeneg/9767afdcca45601ea44930ea03e0febf#gistcomment-1935901
 *
 * @param {Object} obj
 * @param {string|Array} path
 * @return {*}
 */

const getRaw = (obj, path, defaultValue = undefined) => {
  // Handle array of path values
  path = isArray(path) ? path.join(".") : path; // If no path or no object passed

  if (!path || !isObject(obj)) {
    return defaultValue;
  } // Handle edge case where user has dot(s) in top-level item field key
  // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2762
  // Switched to `in` operator vs `hasOwnProperty` to handle obj.prototype getters
  // https://github.com/bootstrap-vue/bootstrap-vue/issues/3463


  if (path in obj) {
    return obj[path];
  } // Handle string array notation (numeric indices only)


  path = String(path).replace(RX_ARRAY_NOTATION, ".$1");
  const steps = path.split(".").filter(identity); // Handle case where someone passes a string of only dots

  if (steps.length === 0) {
    return defaultValue;
  } // Traverse path in object to find result
  // Switched to `in` operator vs `hasOwnProperty` to handle obj.prototype getters
  // https://github.com/bootstrap-vue/bootstrap-vue/issues/3463


  return steps.every(step => isObject(obj) && step in obj && !isUndefinedOrNull(obj = obj[step])) ? obj : isNull(obj) ? null : defaultValue;
};

/**
 * Log a warning message to the console with BootstrapVue formatting
 * @param {string} message
 */

const warn = (message, source = null) =>
/* istanbul ignore next */
{
  if (!getNoWarn()) {
    console.warn(`[BootstrapVue warn]: ${source ? `${source} - ` : ""}${message}`);
  }
};

// NOTES
//
// The global config SHALL NOT be used to set defaults for Boolean props, as the props
// would loose their semantic meaning, and force people writing 3rd party components to
// explicitly set a true or false value using the v-bind syntax on boolean props
//
// Supported config values (depending on the prop's supported type(s)):
// `String`, `Array`, `Object`, `null` or `undefined`
// BREAKPOINT DEFINITIONS
//
// Some components (`<b-col>` and `<b-form-group>`) generate props based on breakpoints,
// and this occurs when the component is first loaded (evaluated), which may happen
// before the config is created/modified
//
// To get around this we make these components' props async (lazy evaluation)
// The component definition is only called/executed when the first access to the
// component is used (and cached on subsequent uses)
// PROP DEFAULTS
//
// For default values on props, we use the default value factory function approach so
// that the default values are pulled in at each component instantiation
//
//  props: {
//    variant: {
//      type: String,
//      default: () => getConfigComponent('BAlert', 'variant')
//    }
//  }
//
// We also provide a cached getter for breakpoints, which are "frozen" on first access
// prettier-ignore

var DEFAULTS = deepFreeze({
  FwBookblock: {},
  FwBookblock2: {},
  FwTurn: {}
});

const NAME = "BvConfig";
const PROP_NAME = "$bvConfig"; // Config manager class

class BvConfig {
  constructor() {
    // TODO: pre-populate with default config values (needs updated tests)
    // this.$_config = cloneDeep(DEFAULTS)
    this.$_config = {};
    this.$_cachedBreakpoints = null;
  }
  /* istanbul ignore next */


  static get Defaults()
  /* istanbul ignore next */
  {
    return DEFAULTS;
  }
  /* istanbul ignore next */


  get defaults()
  /* istanbul ignore next */
  {
    return DEFAULTS;
  } // Returns the defaults

  /* istanbul ignore next */


  getDefaults()
  /* istanbul ignore next */
  {
    return this.defaults;
  } // Method to merge in user config parameters


  setConfig(config = {}) {
    if (!isPlainObject(config)) {
      /* istanbul ignore next */
      return;
    }

    const configKeys = getOwnPropertyNames(config);
    configKeys.forEach(cmpName => {
      /* istanbul ignore next */
      if (!hasOwnProperty(DEFAULTS, cmpName)) {
        warn(`Unknown config property "${cmpName}"`, NAME);
        return;
      }

      const cmpConfig = config[cmpName];

      if (cmpName === "breakpoints") {
        // Special case for breakpoints
        const breakpoints = config.breakpoints;
        /* istanbul ignore if */

        if (!isArray(breakpoints) || breakpoints.length < 2 || breakpoints.some(b => !isString(b) || b.length === 0)) {
          warn('"breakpoints" must be an array of at least 2 breakpoint names', NAME);
        } else {
          this.$_config.breakpoints = cloneDeep(breakpoints);
        }
      } else if (isPlainObject(cmpConfig)) {
        // Component prop defaults
        const props = getOwnPropertyNames(cmpConfig);
        props.forEach(prop => {
          /* istanbul ignore if */
          if (!hasOwnProperty(DEFAULTS[cmpName], prop)) {
            warn(`Unknown config property "${cmpName}.${prop}"`, NAME);
          } else {
            // TODO: If we pre-populate the config with defaults, we can skip this line
            this.$_config[cmpName] = this.$_config[cmpName] || {};

            if (!isUndefined(cmpConfig[prop])) {
              this.$_config[cmpName][prop] = cloneDeep(cmpConfig[prop]);
            }
          }
        });
      }
    });
  } // Clear the config. For testing purposes only


  resetConfig() {
    this.$_config = {};
  } // Returns a deep copy of the user config


  getConfig() {
    return cloneDeep(this.$_config);
  }

  getConfigValue(key) {
    // First we try the user config, and if key not found we fall back to default value
    // NOTE: If we deep clone DEFAULTS into config, then we can skip the fallback for get
    return cloneDeep(getRaw(this.$_config, key, getRaw(DEFAULTS, key)));
  }

} // Method for applying a global config


const setConfig = (config = {}, Vue = Vue) => {
  // Ensure we have a $bvConfig Object on the Vue prototype.
  // We set on Vue and Vue just in case consumer has not set an alias of `vue`.
  Vue.prototype[PROP_NAME] = Vue.prototype[PROP_NAME] = Vue.prototype[PROP_NAME] || Vue.prototype[PROP_NAME] || new BvConfig(); // Apply the config values

  Vue.prototype[PROP_NAME].setConfig(config);
}; // Method for resetting the user config. Exported for testing purposes only.

/**
 * Checks if there are multiple instances of Vue, and warns (once) about possible issues.
 * @param {object} Vue
 */

const checkMultipleVue = (() => {
  let checkMultipleVueWarned = false;
  const MULTIPLE_VUE_WARNING = ["Multiple instances of Vue detected!", "You may need to set up an alias for Vue in your bundler config.", "See: https://bootstrap-vue.org/docs#using-module-bundlers"].join("\n");
  return Vue => {
    /* istanbul ignore next */
    if (!checkMultipleVueWarned && Vue !== Vue && !isJSDOM) {
      warn(MULTIPLE_VUE_WARNING);
    }

    checkMultipleVueWarned = true;
  };
})();
/**
 * Plugin install factory function.
 * @param {object} { components, directives }
 * @returns {function} plugin install function
 */

const installFactory = ({
  components,
  directives,
  plugins
} = {}) => {
  const install = (Vue, config = {}) => {
    if (install.installed) {
      /* istanbul ignore next */
      return;
    }

    install.installed = true;
    checkMultipleVue(Vue);
    setConfig(config, Vue);
    registerComponents(Vue, components);
    registerDirectives(Vue, directives);
    registerPlugins(Vue, plugins);
  };

  install.installed = false;
  return install;
};
/**
 * Plugin install factory function (no plugin config option).
 * @param {object} { components, directives }
 * @returns {function} plugin install function
 */

const installFactoryNoConfig = ({
  components,
  directives,
  plugins
} = {}) => {
  const install = Vue => {
    if (install.installed) {
      /* istanbul ignore next */
      return;
    }

    install.installed = true;
    checkMultipleVue(Vue);
    registerComponents(Vue, components);
    registerDirectives(Vue, directives);
    registerPlugins(Vue, plugins);
  };

  install.installed = false;
  return install;
};
/**
 * Plugin object factory function.
 * @param {object} { components, directives, plugins }
 * @returns {object} plugin install object
 */

const pluginFactory = (options = {}, extend = {}) => ({ ...extend,
  install: installFactory(options)
});
/**
 * Plugin object factory function (no config option).
 * @param {object} { components, directives, plugins }
 * @returns {object} plugin install object
 */

const pluginFactoryNoConfig = (options = {}, extend = {}) => ({ ...extend,
  install: installFactoryNoConfig(options)
});
/**
 * Load a group of plugins.
 * @param {object} Vue
 * @param {object} Plugin definitions
 */

const registerPlugins = (Vue, plugins = {}) => {
  for (const plugin in plugins) {
    if (plugin && plugins[plugin]) {
      Vue.use(plugins[plugin]);
    }
  }
};
/**
 * Load a component.
 * @param {object} Vue
 * @param {string} Component name
 * @param {object} Component definition
 */

const registerComponent = (Vue, name, def) => {
  if (Vue && name && def) {
    Vue.component(name, def);
  }
};
/**
 * Load a group of components.
 * @param {object} Vue
 * @param {object} Object of component definitions
 */

const registerComponents = (Vue, components = {}) => {
  for (const component in components) {
    registerComponent(Vue, component, components[component]);
  }
};
/**
 * Load a directive.
 * @param {object} Vue
 * @param {string} Directive name
 * @param {object} Directive definition
 */

const registerDirective = (Vue, name, def) => {
  if (Vue && name && def) {
    // Ensure that any leading V is removed from the
    // name, as Vue adds it automatically
    Vue.directive(name.replace(/^VB/, "B"), def);
  }
};
/**
 * Load a group of directives.
 * @param {object} Vue
 * @param {object} Object of directive definitions
 */

const registerDirectives = (Vue, directives = {}) => {
  for (const directive in directives) {
    registerDirective(Vue, directive, directives[directive]);
  }
};
/**
 * Install plugin if window.Vue available
 * @param {object} Plugin definition
 */

const vueUse = VuePlugin => {
  /* istanbul ignore next */
  if (hasWindowSupport && window.Vue) {
    window.Vue.use(VuePlugin);
  }
  /* istanbul ignore next */


  if (hasWindowSupport && VuePlugin.NAME) {
    window[VuePlugin.NAME] = VuePlugin;
  }
};

var plugin = /*#__PURE__*/Object.freeze({
  __proto__: null,
  checkMultipleVue: checkMultipleVue,
  installFactory: installFactory,
  installFactoryNoConfig: installFactoryNoConfig,
  pluginFactory: pluginFactory,
  pluginFactoryNoConfig: pluginFactoryNoConfig,
  registerPlugins: registerPlugins,
  registerComponent: registerComponent,
  registerComponents: registerComponents,
  registerDirective: registerDirective,
  registerDirectives: registerDirectives,
  vueUse: vueUse
});

/*!
 * modernizr v3.6.0
 * Build https://modernizr.com/download?-csstransforms3d-csstransitions-preserve3d-addtest-prefixed-teststyles-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in the
 * current UA and makes the results available to you in two ways: as properties on
 * a global `Modernizr` object, and as classes on the `<html>` element. This
 * information allows you to progressively enhance your pages with a granular level
 * of control over the experience.
 */
(function (window, document, undefined$1) {
  var tests = [];
  /**
   *
   * ModernizrProto is the constructor for Modernizr
   *
   * @class
   * @access public
   */

  var ModernizrProto = {
    // The current version, dummy
    _version: "3.6.0",
    // Any settings that don't work as separate modules
    // can go in here as configuration.
    _config: {
      classPrefix: "",
      enableClasses: true,
      enableJSClass: true,
      usePrefixes: true
    },
    // Queue of tests
    _q: [],
    // Stub these for people who are listening
    on: function (test, cb) {
      // I don't really think people should do this, but we can
      // safe guard it a bit.
      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
      // This is in case people listen to synchronous tests. I would leave it out,
      // but the code to *disallow* sync tests in the real version of this
      // function is actually larger than this.
      var self = this;
      setTimeout(function () {
        cb(self[test]);
      }, 0);
    },
    addTest: function (name, fn, options) {
      tests.push({
        name: name,
        fn: fn,
        options: options
      });
    },
    addAsyncTest: function (fn) {
      tests.push({
        name: null,
        fn: fn
      });
    }
  }; // Fake some of Object.create so we can force non test results to be non "own" properties.

  var Modernizr = function () {};

  Modernizr.prototype = ModernizrProto; // Leak modernizr globally when you `require` it rather than force it here.
  // Overwrite name so constructor name is nicer :D

  Modernizr = new Modernizr();
  var classes = [];
  /**
   * is returns a boolean if the typeof an obj is exactly type.
   *
   * @access private
   * @function is
   * @param {*} obj - A thing we want to check the type of
   * @param {string} type - A string to compare the typeof against
   * @returns {boolean}
   */

  function is(obj, type) {
    return typeof obj === type;
  }
  /**
   * Run through all tests and detect their support in the current UA.
   *
   * @access private
   */


  function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    var featureName;
    var featureNameSplit;

    for (var featureIdx in tests) {
      if (tests.hasOwnProperty(featureIdx)) {
        featureNames = [];
        feature = tests[featureIdx]; // run the test, throw the return value into the Modernizr,
        // then based on that boolean, define an appropriate className
        // and push it into an array of classes we'll join later.
        //
        // If there is no name, it's an 'async' test that is run,
        // but not directly added to the object. That should
        // be done with a post-run addTest call.

        if (feature.name) {
          featureNames.push(feature.name.toLowerCase());

          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
            // Add all the aliases into the names list
            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
            }
          }
        } // Run the test, or use the raw value if it's not a function


        result = is(feature.fn, "function") ? feature.fn() : feature.fn; // Set each of the names on the Modernizr object

        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
          featureName = featureNames[nameIdx]; // Support dot properties as sub tests. We don't do checking to make sure
          // that the implied parent tests have been added. You must call them in
          // order (either in the test, or make the parent test a dependency).
          //
          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
          // hashtag famous last words

          featureNameSplit = featureName.split(".");

          if (featureNameSplit.length === 1) {
            Modernizr[featureNameSplit[0]] = result;
          } else {
            // cast to a Boolean, if not one already
            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
            }

            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
          }

          classes.push((result ? "" : "no-") + featureNameSplit.join("-"));
        }
      }
    }
  }
  /**
   * hasOwnProp is a shim for hasOwnProperty that is needed for Safari 2.0 support
   *
   * @author kangax
   * @access private
   * @function hasOwnProp
   * @param {object} object - The object to check for a property
   * @param {string} property - The property to check for
   * @returns {boolean}
   */
  // hasOwnProperty shim by kangax needed for Safari 2.0 support


  var hasOwnProp;

  (function () {
    var _hasOwnProperty = {}.hasOwnProperty;
    /* istanbul ignore else */

    /* we have no way of testing IE 5.5 or safari 2,
     * so just assume the else gets hit */

    if (!is(_hasOwnProperty, "undefined") && !is(_hasOwnProperty.call, "undefined")) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    } else {
      hasOwnProp = function (object, property) {
        /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return property in object && is(object.constructor.prototype[property], "undefined");
      };
    }
  })();
  /**
   * cssToDOM takes a kebab-case string and converts it to camelCase
   * e.g. box-sizing -> boxSizing
   *
   * @access private
   * @function cssToDOM
   * @param {string} name - String name of kebab-case prop we want to convert
   * @returns {string} The camelCase version of the supplied name
   */


  function cssToDOM(name) {
    return name.replace(/([a-z])-([a-z])/g, function (str, m1, m2) {
      return m1 + m2.toUpperCase();
    }).replace(/^-/, "");
  }
  /*!
  {
  "name": "CSS Supports",
  "property": "supports",
  "caniuse": "css-featurequeries",
  "tags": ["css"],
  "builderAliases": ["css_supports"],
  "notes": [{
    "name": "W3 Spec",
    "href": "http://dev.w3.org/csswg/css3-conditional/#at-supports"
  },{
    "name": "Related Github Issue",
    "href": "https://github.com/Modernizr/Modernizr/issues/648"
  },{
    "name": "W3 Info",
    "href": "http://dev.w3.org/csswg/css3-conditional/#the-csssupportsrule-interface"
  }]
  }
  !*/


  var newSyntax = "CSS" in window && "supports" in window.CSS;
  var oldSyntax = ("supportsCSS" in window);
  Modernizr.addTest("supports", newSyntax || oldSyntax);
  /**
   * docElement is a convenience wrapper to grab the root element of the document
   *
   * @access private
   * @returns {HTMLElement|SVGElement} The root element of the document
   */

  var docElement = document.documentElement;
  /**
   * A convenience helper to check if the document we are running in is an SVG document
   *
   * @access private
   * @returns {boolean}
   */

  var isSVG = docElement.nodeName.toLowerCase() === "svg";
  /**
   * setClasses takes an array of class names and adds them to the root element
   *
   * @access private
   * @function setClasses
   * @param {string[]} classes - Array of class names
   */
  // Pass in an and array of class names, e.g.:
  //  ['no-webp', 'borderradius', ...]

  function setClasses(classes) {
    var className = docElement.className;
    var classPrefix = Modernizr._config.classPrefix || "";

    if (isSVG) {
      className = className.baseVal;
    } // Change `no-js` to `js` (independently of the `enableClasses` option)
    // Handle classPrefix on this too


    if (Modernizr._config.enableJSClass) {
      var reJS = new RegExp("(^|\\s)" + classPrefix + "no-js(\\s|$)");
      className = className.replace(reJS, "$1" + classPrefix + "js$2");
    }

    if (Modernizr._config.enableClasses) {
      // Add the new classes
      className += " " + classPrefix + classes.join(" " + classPrefix);

      if (isSVG) {
        docElement.className.baseVal = className;
      } else {
        docElement.className = className;
      }
    }
  } // _l tracks listeners for async tests, as well as tests that execute after the initial run


  ModernizrProto._l = {};
  /**
   * Modernizr.on is a way to listen for the completion of async tests. Being
   * asynchronous, they may not finish before your scripts run. As a result you
   * will get a possibly false negative `undefined` value.
   *
   * @memberof Modernizr
   * @name Modernizr.on
   * @access public
   * @function on
   * @param {string} feature - String name of the feature detect
   * @param {function} cb - Callback function returning a Boolean - true if feature is supported, false if not
   * @example
   *
   * ```js
   * Modernizr.on('flash', function( result ) {
   *   if (result) {
   *    // the browser has flash
   *   } else {
   *     // the browser does not have flash
   *   }
   * });
   * ```
   */

  ModernizrProto.on = function (feature, cb) {
    // Create the list of listeners if it doesn't exist
    if (!this._l[feature]) {
      this._l[feature] = [];
    } // Push this test on to the listener list


    this._l[feature].push(cb); // If it's already been resolved, trigger it on next tick


    if (Modernizr.hasOwnProperty(feature)) {
      // Next Tick
      setTimeout(function () {
        Modernizr._trigger(feature, Modernizr[feature]);
      }, 0);
    }
  };
  /**
   * _trigger is the private function used to signal test completion and run any
   * callbacks registered through [Modernizr.on](#modernizr-on)
   *
   * @memberof Modernizr
   * @name Modernizr._trigger
   * @access private
   * @function _trigger
   * @param {string} feature - string name of the feature detect
   * @param {function|boolean} [res] - A feature detection function, or the boolean =
   * result of a feature detection function
   */


  ModernizrProto._trigger = function (feature, res) {
    if (!this._l[feature]) {
      return;
    }

    var cbs = this._l[feature]; // Force async

    setTimeout(function () {
      var i, cb;

      for (i = 0; i < cbs.length; i++) {
        cb = cbs[i];
        cb(res);
      }
    }, 0); // Don't trigger these again

    delete this._l[feature];
  };
  /**
   * addTest allows you to define your own feature detects that are not currently
   * included in Modernizr (under the covers it's the exact same code Modernizr
   * uses for its own [feature detections](https://github.com/Modernizr/Modernizr/tree/master/feature-detects)). Just like the offical detects, the result
   * will be added onto the Modernizr object, as well as an appropriate className set on
   * the html element when configured to do so
   *
   * @memberof Modernizr
   * @name Modernizr.addTest
   * @optionName Modernizr.addTest()
   * @optionProp addTest
   * @access public
   * @function addTest
   * @param {string|object} feature - The string name of the feature detect, or an
   * object of feature detect names and test
   * @param {function|boolean} test - Function returning true if feature is supported,
   * false if not. Otherwise a boolean representing the results of a feature detection
   * @example
   *
   * The most common way of creating your own feature detects is by calling
   * `Modernizr.addTest` with a string (preferably just lowercase, without any
   * punctuation), and a function you want executed that will return a boolean result
   *
   * ```js
   * Modernizr.addTest('itsTuesday', function() {
   *  var d = new Date();
   *  return d.getDay() === 2;
   * });
   * ```
   *
   * When the above is run, it will set Modernizr.itstuesday to `true` when it is tuesday,
   * and to `false` every other day of the week. One thing to notice is that the names of
   * feature detect functions are always lowercased when added to the Modernizr object. That
   * means that `Modernizr.itsTuesday` will not exist, but `Modernizr.itstuesday` will.
   *
   *
   *  Since we only look at the returned value from any feature detection function,
   *  you do not need to actually use a function. For simple detections, just passing
   *  in a statement that will return a boolean value works just fine.
   *
   * ```js
   * Modernizr.addTest('hasJquery', 'jQuery' in window);
   * ```
   *
   * Just like before, when the above runs `Modernizr.hasjquery` will be true if
   * jQuery has been included on the page. Not using a function saves a small amount
   * of overhead for the browser, as well as making your code much more readable.
   *
   * Finally, you also have the ability to pass in an object of feature names and
   * their tests. This is handy if you want to add multiple detections in one go.
   * The keys should always be a string, and the value can be either a boolean or
   * function that returns a boolean.
   *
   * ```js
   * var detects = {
   *  'hasjquery': 'jQuery' in window,
   *  'itstuesday': function() {
   *    var d = new Date();
   *    return d.getDay() === 2;
   *  }
   * }
   *
   * Modernizr.addTest(detects);
   * ```
   *
   * There is really no difference between the first methods and this one, it is
   * just a convenience to let you write more readable code.
   */


  function addTest(feature, test) {
    if (typeof feature == "object") {
      for (var key in feature) {
        if (hasOwnProp(feature, key)) {
          addTest(key, feature[key]);
        }
      }
    } else {
      feature = feature.toLowerCase();
      var featureNameSplit = feature.split(".");
      var last = Modernizr[featureNameSplit[0]]; // Again, we don't check for parent test existence. Get that right, though.

      if (featureNameSplit.length == 2) {
        last = last[featureNameSplit[1]];
      }

      if (typeof last != "undefined") {
        // we're going to quit if you're trying to overwrite an existing test
        // if we were to allow it, we'd do this:
        //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
        //   docElement.className = docElement.className.replace( re, '' );
        // but, no rly, stuff 'em.
        return Modernizr;
      }

      test = typeof test == "function" ? test() : test; // Set the value (this is the magic, right here).

      if (featureNameSplit.length == 1) {
        Modernizr[featureNameSplit[0]] = test;
      } else {
        // cast to a Boolean, if not one already
        if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
          Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
        }

        Modernizr[featureNameSplit[0]][featureNameSplit[1]] = test;
      } // Set a single class (either `feature` or `no-feature`)


      setClasses([(!!test && test != false ? "" : "no-") + featureNameSplit.join("-")]); // Trigger the event

      Modernizr._trigger(feature, test);
    }

    return Modernizr; // allow chaining.
  } // After all the tests are run, add self to the Modernizr prototype


  Modernizr._q.push(function () {
    ModernizrProto.addTest = addTest;
  });
  /**
   * createElement is a convenience wrapper around document.createElement. Since we
   * use createElement all over the place, this allows for (slightly) smaller code
   * as well as abstracting away issues with creating elements in contexts other than
   * HTML documents (e.g. SVG documents).
   *
   * @access private
   * @function createElement
   * @returns {HTMLElement|SVGElement} An HTML or SVG element
   */


  function createElement() {
    if (typeof document.createElement !== "function") {
      // This is the case in IE7, where the type of createElement is "object".
      // For this reason, we cannot call apply() as Object is not a Function.
      return document.createElement(arguments[0]);
    } else if (isSVG) {
      return document.createElementNS.call(document, "http://www.w3.org/2000/svg", arguments[0]);
    } else {
      return document.createElement.apply(document, arguments);
    }
  }
  /*!
  {
  "name": "CSS Transform Style preserve-3d",
  "property": "preserve3d",
  "authors": ["denyskoch", "aFarkas"],
  "tags": ["css"],
  "notes": [{
    "name": "MDN Docs",
    "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style"
  },{
    "name": "Related Github Issue",
    "href": "https://github.com/Modernizr/Modernizr/issues/1748"
  }]
  }
  !*/

  /* DOC
  Detects support for `transform-style: preserve-3d`, for getting a proper 3D perspective on elements.
  */


  Modernizr.addTest("preserve3d", function () {
    var outerAnchor, innerAnchor;
    var CSS = window.CSS;
    var result = false;

    if (CSS && CSS.supports && CSS.supports("(transform-style: preserve-3d)")) {
      return true;
    }

    outerAnchor = createElement("a");
    innerAnchor = createElement("a");
    outerAnchor.style.cssText = "display: block; transform-style: preserve-3d; transform-origin: right; transform: rotateY(40deg);";
    innerAnchor.style.cssText = "display: block; width: 9px; height: 1px; background: #000; transform-origin: right; transform: rotateY(40deg);";
    outerAnchor.appendChild(innerAnchor);
    docElement.appendChild(outerAnchor);
    result = innerAnchor.getBoundingClientRect();
    docElement.removeChild(outerAnchor);
    result = result.width && result.width < 4;
    return result;
  });
  /**
   * getBody returns the body of a document, or an element that can stand in for
   * the body if a real body does not exist
   *
   * @access private
   * @function getBody
   * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
   * artificially created element that stands in for the body
   */

  function getBody() {
    // After page load injecting a fake body doesn't work so check if body exists
    var body = document.body;

    if (!body) {
      // Can't use the real body create a fake one.
      body = createElement(isSVG ? "svg" : "body");
      body.fake = true;
    }

    return body;
  }
  /**
   * injectElementWithStyles injects an element with style element and some CSS rules
   *
   * @access private
   * @function injectElementWithStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   */


  function injectElementWithStyles(rule, callback, nodes, testnames) {
    var mod = "modernizr";
    var style;
    var ret;
    var node;
    var docOverflow;
    var div = createElement("div");
    var body = getBody();

    if (parseInt(nodes, 10)) {
      // In order not to give false positives we create a node for each test
      // This also allows the method to scale for unspecified uses
      while (nodes--) {
        node = createElement("div");
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
        div.appendChild(node);
      }
    }

    style = createElement("style");
    style.type = "text/css";
    style.id = "s" + mod; // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270

    (!body.fake ? div : body).appendChild(style);
    body.appendChild(div);

    if (style.styleSheet) {
      style.styleSheet.cssText = rule;
    } else {
      style.appendChild(document.createTextNode(rule));
    }

    div.id = mod;

    if (body.fake) {
      //avoid crashing IE8, if background image is used
      body.style.background = ""; //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible

      body.style.overflow = "hidden";
      docOverflow = docElement.style.overflow;
      docElement.style.overflow = "hidden";
      docElement.appendChild(body);
    }

    ret = callback(div, rule); // If this is done after page load we don't want to remove the body so check if body exists

    if (body.fake) {
      body.parentNode.removeChild(body);
      docElement.style.overflow = docOverflow; // Trigger layout so kinetic scrolling isn't disabled in iOS6+
      // eslint-disable-next-line

      docElement.offsetHeight;
    } else {
      div.parentNode.removeChild(div);
    }

    return !!ret;
  }
  /**
   * testStyles injects an element with style element and some CSS rules
   *
   * @memberof Modernizr
   * @name Modernizr.testStyles
   * @optionName Modernizr.testStyles()
   * @optionProp testStyles
   * @access public
   * @function testStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   * @example
   *
   * `Modernizr.testStyles` takes a CSS rule and injects it onto the current page
   * along with (possibly multiple) DOM elements. This lets you check for features
   * that can not be detected by simply checking the [IDL](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Interface_development_guide/IDL_interface_rules).
   *
   * ```js
   * Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function(elem, rule) {
   *   // elem is the first DOM node in the page (by default #modernizr)
   *   // rule is the first argument you supplied - the CSS rule in string form
   *
   *   addTest('widthworks', elem.style.width === '9px')
   * });
   * ```
   *
   * If your test requires multiple nodes, you can include a third argument
   * indicating how many additional div elements to include on the page. The
   * additional nodes are injected as children of the `elem` that is returned as
   * the first argument to the callback.
   *
   * ```js
   * Modernizr.testStyles('#modernizr {width: 1px}; #modernizr2 {width: 2px}', function(elem) {
   *   document.getElementById('modernizr').style.width === '1px'; // true
   *   document.getElementById('modernizr2').style.width === '2px'; // true
   *   elem.firstChild === document.getElementById('modernizr2'); // true
   * }, 1);
   * ```
   *
   * By default, all of the additional elements have an ID of `modernizr[n]`, where
   * `n` is its index (e.g. the first additional, second overall is `#modernizr2`,
   * the second additional is `#modernizr3`, etc.).
   * If you want to have more meaningful IDs for your function, you can provide
   * them as the fourth argument, as an array of strings
   *
   * ```js
   * Modernizr.testStyles('#foo {width: 10px}; #bar {height: 20px}', function(elem) {
   *   elem.firstChild === document.getElementById('foo'); // true
   *   elem.lastChild === document.getElementById('bar'); // true
   * }, 2, ['foo', 'bar']);
   * ```
   *
   */


  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;
  /**
   * If the browsers follow the spec, then they would expose vendor-specific styles as:
   *   elem.style.WebkitBorderRadius
   * instead of something like the following (which is technically incorrect):
   *   elem.style.webkitBorderRadius
    * WebKit ghosts their properties in lowercase but Opera & Moz do not.
   * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
   *   erik.eae.net/archives/2008/03/10/21.48.10/
    * More here: github.com/Modernizr/Modernizr/issues/issue/21
   *
   * @access private
   * @returns {string} The string representing the vendor-specific style properties
   */

  var omPrefixes = "Moz O ms Webkit";
  var cssomPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.split(" ") : [];
  ModernizrProto._cssomPrefixes = cssomPrefixes;
  /**
   * atRule returns a given CSS property at-rule (eg @keyframes), possibly in
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @memberof Modernizr
   * @name Modernizr.atRule
   * @optionName Modernizr.atRule()
   * @optionProp atRule
   * @access public
   * @function atRule
   * @param {string} prop - String name of the @-rule to test for
   * @returns {string|boolean} The string representing the (possibly prefixed)
   * valid version of the @-rule, or `false` when it is unsupported.
   * @example
   * ```js
   *  var keyframes = Modernizr.atRule('@keyframes');
   *
   *  if (keyframes) {
   *    // keyframes are supported
   *    // could be `@-webkit-keyframes` or `@keyframes`
   *  } else {
   *    // keyframes === `false`
   *  }
   * ```
   *
   */

  var atRule = function (prop) {
    var length = prefixes.length;
    var cssrule = window.CSSRule;
    var rule;

    if (typeof cssrule === "undefined") {
      return undefined$1;
    }

    if (!prop) {
      return false;
    } // remove literal @ from beginning of provided property


    prop = prop.replace(/^@/, ""); // CSSRules use underscores instead of dashes

    rule = prop.replace(/-/g, "_").toUpperCase() + "_RULE";

    if (rule in cssrule) {
      return "@" + prop;
    }

    for (var i = 0; i < length; i++) {
      // prefixes gives us something like -o-, and we want O_
      var prefix = prefixes[i];
      var thisRule = prefix.toUpperCase() + "_" + rule;

      if (thisRule in cssrule) {
        return "@-" + prefix.toLowerCase() + "-" + prop;
      }
    }

    return false;
  };

  ModernizrProto.atRule = atRule;
  /**
   * List of JavaScript DOM values used for tests
   *
   * @memberof Modernizr
   * @name Modernizr._domPrefixes
   * @optionName Modernizr._domPrefixes
   * @optionProp domPrefixes
   * @access public
   * @example
   *
   * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
   * than kebab-case properties, all properties are their Capitalized variant
   *
   * ```js
   * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
   * ```
   */

  var domPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(" ") : [];
  ModernizrProto._domPrefixes = domPrefixes;
  /**
   * contains checks to see if a string contains another string
   *
   * @access private
   * @function contains
   * @param {string} str - The string we want to check for substrings
   * @param {string} substr - The substring we want to search the first string for
   * @returns {boolean}
   */

  function contains(str, substr) {
    return !!~("" + str).indexOf(substr);
  }
  /**
   * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
   *
   * @access private
   * @function fnBind
   * @param {function} fn - a function you want to change `this` reference to
   * @param {object} that - the `this` you want to call the function with
   * @returns {function} The wrapped version of the supplied function
   */


  function fnBind(fn, that) {
    return function () {
      return fn.apply(that, arguments);
    };
  }
  /**
   * testDOMProps is a generic DOM property test; if a browser supports
   *   a certain property, it won't return undefined for it.
   *
   * @access private
   * @function testDOMProps
   * @param {array.<string>} props - An array of properties to test for
   * @param {object} obj - An object or Element you want to use to test the parameters again
   * @param {boolean|object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
   * @returns {false|*} returns false if the prop is unsupported, otherwise the value that is supported
   */


  function testDOMProps(props, obj, elem) {
    var item;

    for (var i in props) {
      if (props[i] in obj) {
        // return the property name as a string
        if (elem === false) {
          return props[i];
        }

        item = obj[props[i]]; // let's bind a function

        if (is(item, "function")) {
          // bind to obj unless overriden
          return fnBind(item, elem || obj);
        } // return the unbound function or obj or value


        return item;
      }
    }

    return false;
  }
  /**
   * Create our "modernizr" element that we do most feature tests on.
   *
   * @access private
   */


  var modElem = {
    elem: createElement("modernizr")
  }; // Clean up this element

  Modernizr._q.push(function () {
    delete modElem.elem;
  });

  var mStyle = {
    style: modElem.elem.style
  }; // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
  // the front of the queue.

  Modernizr._q.unshift(function () {
    delete mStyle.style;
  });
  /**
   * domToCSS takes a camelCase string and converts it to kebab-case
   * e.g. boxSizing -> box-sizing
   *
   * @access private
   * @function domToCSS
   * @param {string} name - String name of camelCase prop we want to convert
   * @returns {string} The kebab-case version of the supplied name
   */


  function domToCSS(name) {
    return name.replace(/([A-Z])/g, function (str, m1) {
      return "-" + m1.toLowerCase();
    }).replace(/^ms-/, "-ms-");
  }
  /**
   * wrapper around getComputedStyle, to fix issues with Firefox returning null when
   * called inside of a hidden iframe
   *
   * @access private
   * @function computedStyle
   * @param {HTMLElement|SVGElement} - The element we want to find the computed styles of
   * @param {string|null} [pseudoSelector]- An optional pseudo element selector (e.g. :before), of null if none
   * @returns {CSSStyleDeclaration}
   */


  function computedStyle(elem, pseudo, prop) {
    var result;

    if ("getComputedStyle" in window) {
      result = getComputedStyle.call(window, elem, pseudo);
      var console = window.console;

      if (result !== null) {
        if (prop) {
          result = result.getPropertyValue(prop);
        }
      } else {
        if (console) {
          var method = console.error ? "error" : "log";
          console[method].call(console, "getComputedStyle returning null, its possible modernizr test results are inaccurate");
        }
      }
    } else {
      result = !pseudo && elem.currentStyle && elem.currentStyle[prop];
    }

    return result;
  }
  /**
   * nativeTestProps allows for us to use native feature detection functionality if available.
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @access private
   * @function nativeTestProps
   * @param {array} props - An array of property names
   * @param {string} value - A string representing the value we want to check via @supports
   * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
   */
  // Accepts a list of property names and a single value
  // Returns `undefined` if native detection not available


  function nativeTestProps(props, value) {
    var i = props.length; // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface

    if ("CSS" in window && "supports" in window.CSS) {
      // Try every prefixed variant of the property
      while (i--) {
        if (window.CSS.supports(domToCSS(props[i]), value)) {
          return true;
        }
      }

      return false;
    } // Otherwise fall back to at-rule (for Opera 12.x)
    else if ("CSSSupportsRule" in window) {
        // Build a condition string for every prefixed variant
        var conditionText = [];

        while (i--) {
          conditionText.push("(" + domToCSS(props[i]) + ":" + value + ")");
        }

        conditionText = conditionText.join(" or ");
        return injectElementWithStyles("@supports (" + conditionText + ") { #modernizr { position: absolute; } }", function (node) {
          return computedStyle(node, null, "position") == "absolute";
        });
      }

    return undefined$1;
  } // testProps is a generic CSS / DOM property test.
  // In testing support for a given CSS property, it's legit to test:
  //    `elem.style[styleName] !== undefined`
  // If the property is supported it will return an empty string,
  // if unsupported it will return undefined.
  // We'll take advantage of this quick test and skip setting a style
  // on our modernizr element, but instead just testing undefined vs
  // empty string.
  // Property names can be provided in either camelCase or kebab-case.


  function testProps(props, prefixed, value, skipValueTest) {
    skipValueTest = is(skipValueTest, "undefined") ? false : skipValueTest; // Try native detect first

    if (!is(value, "undefined")) {
      var result = nativeTestProps(props, value);

      if (!is(result, "undefined")) {
        return result;
      }
    } // Otherwise do it properly


    var afterInit, i, propsLength, prop, before; // If we don't have a style element, that means we're running async or after
    // the core tests, so we'll need to create our own elements to use
    // inside of an SVG element, in certain browsers, the `style` element is only
    // defined for valid tags. Therefore, if `modernizr` does not have one, we
    // fall back to a less used element and hope for the best.
    // for strict XHTML browsers the hardly used samp element is used

    var elems = ["modernizr", "tspan", "samp"];

    while (!mStyle.style && elems.length) {
      afterInit = true;
      mStyle.modElem = createElement(elems.shift());
      mStyle.style = mStyle.modElem.style;
    } // Delete the objects if we created them.


    function cleanElems() {
      if (afterInit) {
        delete mStyle.style;
        delete mStyle.modElem;
      }
    }

    propsLength = props.length;

    for (i = 0; i < propsLength; i++) {
      prop = props[i];
      before = mStyle.style[prop];

      if (contains(prop, "-")) {
        prop = cssToDOM(prop);
      }

      if (mStyle.style[prop] !== undefined$1) {
        // If value to test has been passed in, do a set-and-check test.
        // 0 (integer) is a valid property value, so check that `value` isn't
        // undefined, rather than just checking it's truthy.
        if (!skipValueTest && !is(value, "undefined")) {
          // Needs a try catch block because of old IE. This is slow, but will
          // be avoided in most cases because `skipValueTest` will be used.
          try {
            mStyle.style[prop] = value;
          } catch (e) {} // If the property value has changed, we assume the value used is
          // supported. If `value` is empty string, it'll fail here (because
          // it hasn't changed), which matches how browsers have implemented
          // CSS.supports()


          if (mStyle.style[prop] != before) {
            cleanElems();
            return prefixed == "pfx" ? prop : true;
          }
        } // Otherwise just return true, or the property name if this is a
        // `prefixed()` call
        else {
            cleanElems();
            return prefixed == "pfx" ? prop : true;
          }
      }
    }

    cleanElems();
    return false;
  }
  /**
   * testPropsAll tests a list of DOM properties we want to check against.
   * We specify literally ALL possible (known and/or likely) properties on
   * the element including the non-vendor prefixed one, for forward-
   * compatibility.
   *
   * @access private
   * @function testPropsAll
   * @param {string} prop - A string of the property to test for
   * @param {string|object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
   * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
   * @param {string} [value] - A string of a css value
   * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
   * @returns {false|string} returns the string version of the property, or false if it is unsupported
   */


  function testPropsAll(prop, prefixed, elem, value, skipValueTest) {
    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
        props = (prop + " " + cssomPrefixes.join(ucProp + " ") + ucProp).split(" "); // did they call .prefixed('boxSizing') or are we just testing a prop?

    if (is(prefixed, "string") || is(prefixed, "undefined")) {
      return testProps(props, prefixed, value, skipValueTest); // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
    } else {
      props = (prop + " " + domPrefixes.join(ucProp + " ") + ucProp).split(" ");
      return testDOMProps(props, prefixed, elem);
    }
  } // Modernizr.testAllProps() investigates whether a given style property,
  // or any of its vendor-prefixed variants, is recognized
  //
  // Note that the property names must be provided in the camelCase variant.
  // Modernizr.testAllProps('boxSizing')


  ModernizrProto.testAllProps = testPropsAll;
  /**
   * prefixed returns the prefixed or nonprefixed property name variant of your input
   *
   * @memberof Modernizr
   * @name Modernizr.prefixed
   * @optionName Modernizr.prefixed()
   * @optionProp prefixed
   * @access public
   * @function prefixed
   * @param {string} prop - String name of the property to test for
   * @param {object} [obj] - An object to test for the prefixed properties on
   * @param {HTMLElement} [elem] - An element used to test specific properties against
   * @returns {string|false} The string representing the (possibly prefixed) valid
   * version of the property, or `false` when it is unsupported.
   * @example
   *
   * Modernizr.prefixed takes a string css value in the DOM style camelCase (as
   * opposed to the css style kebab-case) form and returns the (possibly prefixed)
   * version of that property that the browser actually supports.
   *
   * For example, in older Firefox...
   * ```js
   * prefixed('boxSizing')
   * ```
   * returns 'MozBoxSizing'
   *
   * In newer Firefox, as well as any other browser that support the unprefixed
   * version would simply return `boxSizing`. Any browser that does not support
   * the property at all, it will return `false`.
   *
   * By default, prefixed is checked against a DOM element. If you want to check
   * for a property on another object, just pass it as a second argument
   *
   * ```js
   * var rAF = prefixed('requestAnimationFrame', window);
   *
   * raf(function() {
   *  renderFunction();
   * })
   * ```
   *
   * Note that this will return _the actual function_ - not the name of the function.
   * If you need the actual name of the property, pass in `false` as a third argument
   *
   * ```js
   * var rAFProp = prefixed('requestAnimationFrame', window, false);
   *
   * rafProp === 'WebkitRequestAnimationFrame' // in older webkit
   * ```
   *
   * One common use case for prefixed is if you're trying to determine which transition
   * end event to bind to, you might do something like...
   * ```js
   * var transEndEventNames = {
   *     'WebkitTransition' : 'webkitTransitionEnd', * Saf 6, Android Browser
   *     'MozTransition'    : 'transitionend',       * only for FF < 15
   *     'transition'       : 'transitionend'        * IE10, Opera, Chrome, FF 15+, Saf 7+
   * };
   *
   * var transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
   * ```
   *
   * If you want a similar lookup, but in kebab-case, you can use [prefixedCSS](#modernizr-prefixedcss).
   */

  var prefixed = ModernizrProto.prefixed = function (prop, obj, elem) {
    if (prop.indexOf("@") === 0) {
      return atRule(prop);
    }

    if (prop.indexOf("-") != -1) {
      // Convert kebab-case to camelCase
      prop = cssToDOM(prop);
    }

    if (!obj) {
      return testPropsAll(prop, "pfx");
    } else {
      // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
      return testPropsAll(prop, obj, elem);
    }
  };
  /**
   * testAllProps determines whether a given CSS property is supported in the browser
   *
   * @memberof Modernizr
   * @name Modernizr.testAllProps
   * @optionName Modernizr.testAllProps()
   * @optionProp testAllProps
   * @access public
   * @function testAllProps
   * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
   * @param {string} [value] - String of the value to test
   * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
   * @example
   *
   * testAllProps determines whether a given CSS property, in some prefixed form,
   * is supported by the browser.
   *
   * ```js
   * testAllProps('boxSizing')  // true
   * ```
   *
   * It can optionally be given a CSS value in string form to test if a property
   * value is valid
   *
   * ```js
   * testAllProps('display', 'block') // true
   * testAllProps('display', 'penguin') // false
   * ```
   *
   * A boolean can be passed as a third parameter to skip the value check when
   * native detection (@supports) isn't available.
   *
   * ```js
   * testAllProps('shapeOutside', 'content-box', true);
   * ```
   */


  function testAllProps(prop, value, skipValueTest) {
    return testPropsAll(prop, undefined$1, undefined$1, value, skipValueTest);
  }

  ModernizrProto.testAllProps = testAllProps;
  /*!
  {
  "name": "CSS Transforms 3D",
  "property": "csstransforms3d",
  "caniuse": "transforms3d",
  "tags": ["css"],
  "warnings": [
    "Chrome may occassionally fail this test on some systems; more info: https://code.google.com/p/chromium/issues/detail?id=129004"
  ]
  }
  !*/

  Modernizr.addTest("csstransforms3d", function () {
    return !!testAllProps("perspective", "1px", true);
  });
  /*!
  {
  "name": "CSS Transitions",
  "property": "csstransitions",
  "caniuse": "css-transitions",
  "tags": ["css"]
  }
  !*/

  Modernizr.addTest("csstransitions", testAllProps("transition", "all", true)); // Run each test

  testRunner();
  delete ModernizrProto.addTest;
  delete ModernizrProto.addAsyncTest; // Run the things that are supposed to run after the tests

  for (var i = 0; i < Modernizr._q.length; i++) {
    Modernizr._q[i]();
  } // Leak Modernizr namespace


  window.Modernizr = Modernizr;
})(window, document);

(function () {
  var event = $.event,
      //helper that finds handlers by type and calls back a function, this is basically handle
  // events - the events object
  // types - an array of event types to look for
  // callback(type, handlerFunc, selector) - a callback
  // selector - an optional selector to filter with, if there, matches by selector
  //     if null, matches anything, otherwise, matches with no selector
  findHelper = function (events, types, callback, selector) {
    var t, type, typeHandlers, all, h, handle, namespaces, namespace, match;

    for (t = 0; t < types.length; t++) {
      type = types[t];
      all = type.indexOf(".") < 0;

      if (!all) {
        namespaces = type.split(".");
        type = namespaces.shift();
        namespace = new RegExp("(^|\\.)" + namespaces.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)");
      }

      typeHandlers = (events[type] || []).slice(0);

      for (h = 0; h < typeHandlers.length; h++) {
        handle = typeHandlers[h];
        match = all || namespace.test(handle.namespace);

        if (match) {
          if (selector) {
            if (handle.selector === selector) {
              callback(type, handle.origHandler || handle.handler);
            }
          } else if (selector === null) {
            callback(type, handle.origHandler || handle.handler, handle.selector);
          } else if (!handle.selector) {
            callback(type, handle.origHandler || handle.handler);
          }
        }
      }
    }
  };
  /**
   * Finds event handlers of a given type on an element.
   * @param {HTMLElement} el
   * @param {Array} types an array of event names
   * @param {String} [selector] optional selector
   * @return {Array} an array of event handlers
   */


  event.find = function (el, types, selector) {
    var events = ($._data(el) || {}).events,
        handlers = [];

    if (!events) {
      return handlers;
    }

    findHelper(events, types, function (type, handler) {
      handlers.push(handler);
    }, selector);
    return handlers;
  };
  /**
   * Finds all events.  Group by selector.
   * @param {HTMLElement} el the element
   * @param {Array} types event types
   */


  event.findBySelector = function (el, types) {
    var events = $._data(el).events,
        selectors = {},
        //adds a handler for a given selector and event
    add = function (selector, event, handler) {
      var select = selectors[selector] || (selectors[selector] = {}),
          events = select[event] || (select[event] = []);
      events.push(handler);
    };

    if (!events) {
      return selectors;
    } //first check live:

    /*$.each(events.live || [], function( i, live ) {
    if ( $.inArray(live.origType, types) !== -1 ) {
    add(live.selector, live.origType, live.origHandler || live.handler);
    }
    });*/
    //then check straight binds


    findHelper(events, types, function (type, handler, selector) {
      add(selector || "", type, handler);
    }, null);
    return selectors;
  };

  event.supportTouch = "ontouchend" in document;

  $.fn.respondsTo = function (events) {
    if (!this.length) {
      return false;
    } else {
      //add default ?
      return event.find(this[0], $.isArray(events) ? events : [events]).length > 0;
    }
  };

  $.fn.triggerHandled = function (event, data) {
    event = typeof event == "string" ? $.Event(event) : event;
    this.trigger(event, data);
    return event.handled;
  };
  /**
   * Only attaches one event handler for all types ...
   * @param {Array} types llist of types that will delegate here
   * @param {Object} startingEvent the first event to start listening to
   * @param {Object} onFirst a function to call
   */


  event.setupHelper = function (types, startingEvent, onFirst) {
    if (!onFirst) {
      onFirst = startingEvent;
      startingEvent = null;
    }

    var add = function (handleObj) {
      var bySelector,
          selector = handleObj.selector || "";

      if (selector) {
        bySelector = event.find(this, types, selector);

        if (!bySelector.length) {
          $(this).delegate(selector, startingEvent, onFirst);
        }
      } else {
        //var bySelector = event.find(this, types, selector);
        if (!event.find(this, types, selector).length) {
          event.add(this, startingEvent, onFirst, {
            selector: selector,
            delegate: this
          });
        }
      }
    },
        remove = function (handleObj) {
      var bySelector,
          selector = handleObj.selector || "";

      if (selector) {
        bySelector = event.find(this, types, selector);

        if (!bySelector.length) {
          $(this).undelegate(selector, startingEvent, onFirst);
        }
      } else {
        if (!event.find(this, types, selector).length) {
          event.remove(this, startingEvent, onFirst, {
            selector: selector,
            delegate: this
          });
        }
      }
    };

    $.each(types, function () {
      event.special[this] = {
        add: add,
        remove: remove,
        setup: function () {},
        teardown: function () {}
      };
    });
  };
})();

(function ($) {
  var isPhantom = /Phantom/.test(navigator.userAgent),
      supportTouch = !isPhantom && "ontouchend" in document,
      // Use touch events or map it to mouse events
  touchStartEvent = supportTouch ? "touchstart" : "mousedown",
      touchStopEvent = supportTouch ? "touchend" : "mouseup",
      touchMoveEvent = supportTouch ? "touchmove" : "mousemove",
      data = function (event) {
    var d = event.originalEvent.touches ? event.originalEvent.touches[0] : event;
    return {
      time: new Date().getTime(),
      coords: [d.pageX, d.pageY],
      origin: $(event.target)
    };
  };
  /**
   * @add jQuery.event.swipe
   */


  var swipe = $.event.swipe = {
    /**
     * @attribute delay
     * Delay is the upper limit of time the swipe motion can take in milliseconds.  This defaults to 500.
     *
     * A user must perform the swipe motion in this much time.
     */
    delay: 500,

    /**
     * @attribute max
     * The maximum distance the pointer must travel in pixels.  The default is 75 pixels.
     */
    max: 75,

    /**
     * @attribute min
     * The minimum distance the pointer must travel in pixels.  The default is 30 pixels.
     */
    min: 30
  };
  $.event.setupHelper([
  /**
   * @hide
   * @attribute swipe
   */
  "swipe",
  /**
   * @hide
   * @attribute swipeleft
   */
  "swipeleft",
  /**
   * @hide
   * @attribute swiperight
   */
  "swiperight",
  /**
   * @hide
   * @attribute swipeup
   */
  "swipeup",
  /**
   * @hide
   * @attribute swipedown
   */
  "swipedown"], touchStartEvent, function (ev) {
    var // update with data when the event was started
    start = data(ev),
        stop,
        delegate = ev.delegateTarget || ev.currentTarget,
        selector = ev.handleObj.selector,
        entered = this;

    function moveHandler(event) {
      if (!start) {
        return;
      } // update stop with the data from the current event


      stop = data(event); // prevent scrolling

      if (Math.abs(start.coords[0] - stop.coords[0]) > 10) {
        event.preventDefault();
      }
    } // Attach to the touch move events


    $(document.documentElement).bind(touchMoveEvent, moveHandler).one(touchStopEvent, function (event) {
      $(this).unbind(touchMoveEvent, moveHandler); // if start and stop contain data figure out if we have a swipe event

      if (start && stop) {
        // calculate the distance between start and stop data
        var deltaX = Math.abs(start.coords[0] - stop.coords[0]),
            deltaY = Math.abs(start.coords[1] - stop.coords[1]),
            distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY); // check if the delay and distance are matched

        if (stop.time - start.time < swipe.delay && distance >= swipe.min) {
          var events = ["swipe"]; // check if we moved horizontally

          if (deltaX >= swipe.min && deltaY < swipe.min) {
            // based on the x coordinate check if we moved left or right
            events.push(start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight");
          } // check if we moved vertically
          else if (deltaY >= swipe.min && deltaX < swipe.min) {
              // based on the y coordinate check if we moved up or down
              events.push(start.coords[1] < stop.coords[1] ? "swipedown" : "swipeup");
            } // trigger swipe events on this guy


          $.each($.event.find(delegate, events, selector), function () {
            this.call(entered, ev, {
              start: start,
              end: stop
            });
          });
        }
      } // reset start and stop


      start = stop = undefined;
    });
  });
})($);

/**
 * jquery.bookblock.js v2.0.1
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

(function ($, window, undefined$1) {

  var $window = $(window),
      Modernizr = window.Modernizr; // https://gist.github.com/edankwan/4389601

  Modernizr.addTest("csstransformspreserve3d", function () {
    var prop = Modernizr.prefixed("transformStyle");
    var val = "preserve-3d";
    var computedStyle;
    if (!prop) return false;
    prop = prop.replace(/([A-Z])/g, function (str, m1) {
      return "-" + m1.toLowerCase();
    }).replace(/^ms-/, "-ms-");
    Modernizr.testStyles("#modernizr{" + prop + ":" + val + ";}", function (el, rule) {
      computedStyle = window.getComputedStyle ? getComputedStyle(el, null).getPropertyValue(prop) : "";
    });
    return computedStyle === val;
  });
  /*
   * debouncedresize: special jQuery event that happens once after a window resize
   *
   * latest version and complete README available on Github:
   * https://github.com/louisremi/jquery-smartresize
   *
   * Copyright 2012 @louis_remi
   * Licensed under the MIT license.
   *
   * This saved you an hour of work?
   * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
   */

  var $event = $.event,
      $special,
      resizeTimeout;
  $special = $event.special.debouncedresize = {
    setup: function () {
      $(this).on("resize", $special.handler);
    },
    teardown: function () {
      $(this).off("resize", $special.handler);
    },
    handler: function (event, execAsap) {
      // Save the context
      var context = this,
          args = arguments,
          dispatch = function () {
        // set correct event type
        event.type = "debouncedresize";
        $event.dispatch.apply(context, args);
      };

      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold);
    },
    threshold: 150
  };

  $.BookBlock = function (options, element) {
    this.$el = $(element);

    this._init(options);
  }; // the options


  $.BookBlock.defaults = {
    // vertical or horizontal flip
    orientation: "vertical",
    // ltr (left to right) or rtl (right to left)
    direction: "ltr",
    // speed for the flip transition in ms
    speed: 1000,
    // easing for the flip transition
    easing: "ease-in-out",
    // if set to true, both the flipping page and the sides will have an overlay to simulate shadows
    shadows: true,
    // opacity value for the "shadow" on both sides (when the flipping page is over it)
    // value : 0.1 - 1
    shadowSides: 0.2,
    // opacity value for the "shadow" on the flipping page (while it is flipping)
    // value : 0.1 - 1
    shadowFlip: 0.1,
    // if we should show the first item after reaching the end
    circular: false,
    // if we want to specify a selector that triggers the next() function. example: ´#bb-nav-next´
    nextEl: "",
    // if we want to specify a selector that triggers the prev() function
    prevEl: "",
    // autoplay. If true it overwrites the circular option to true
    autoplay: false,
    // time (ms) between page switch, if autoplay is true
    interval: 3000,
    // callback after the flip transition
    // old is the index of the previous item
    // page is the current item´s index
    // isLimit is true if the current page is the last one (or the first one)
    onEndFlip: function (old, page, isLimit) {
      return false;
    },
    // callback before the flip transition
    // page is the current item´s index
    onBeforeFlip: function (page) {
      return false;
    }
  };
  $.BookBlock.prototype = {
    _init: function (options) {
      // options
      this.options = $.extend(true, {}, $.BookBlock.defaults, options); // orientation class

      this.$el.addClass("bb-" + this.options.orientation);
      this.jopaUid = this.$el[0].dataset.uid;
      this.pluginName = `bookblock-${this.jopaUid}`; // items

      this.$items = this.$el.children(".bb-item").hide(); // total items

      this.itemsCount = this.$items.length; // current item´s index

      this.current = 0; // previous item´s index

      this.previous = -1; // show first item

      this.$current = this.$items.eq(this.current).show(); // get width of this.$el
      // this will be necessary to create the flipping layout

      this.elWidth = this.$el.width();
      var transEndEventNames = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        msTransition: "MSTransitionEnd",
        transition: "transitionend"
      };
      this.transEndEventName = transEndEventNames[Modernizr.prefixed("transition")] + `.${this.pluginName}`; // support css 3d transforms && css transitions && Modernizr.csstransformspreserve3d

      this.support = Modernizr.csstransitions && Modernizr.csstransforms3d && Modernizr.csstransformspreserve3d; // initialize/bind some events

      this._initEvents(); // start slideshow


      if (this.options.autoplay) {
        this.options.circular = true;

        this._startSlideshow();
      }
    },
    _initEvents: function () {
      var self = this;

      if (this.options.nextEl !== "") {
        $(this.options.nextEl).on(`click.${this.pluginName} touchstart.${this.pluginName}`, function () {
          self._action("next");

          return false;
        });
      }

      if (this.options.prevEl !== "") {
        $(this.options.prevEl).on(`click.${this.pluginName} touchstart.${this.pluginName}`, function () {
          self._action("prev");

          return false;
        });
      }

      $window.on("debouncedresize", function () {
        // update width value
        self.elWidth = self.$el.width();
      });
    },
    _action: function (dir, page) {
      this._stopSlideshow();

      this._navigate(dir, page);
    },
    _navigate: function (dir, page) {
      if (this.isAnimating) {
        return false;
      } // callback trigger


      this.options.onBeforeFlip(this.current);
      this.isAnimating = true; // update current value

      this.$current = this.$items.eq(this.current);

      if (page !== undefined$1) {
        this.current = page;
      } else if (dir === "next" && this.options.direction === "ltr" || dir === "prev" && this.options.direction === "rtl") {
        if (!this.options.circular && this.current === this.itemsCount - 1) {
          this.end = true;
        } else {
          this.previous = this.current;
          this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0;
        }
      } else if (dir === "prev" && this.options.direction === "ltr" || dir === "next" && this.options.direction === "rtl") {
        if (!this.options.circular && this.current === 0) {
          this.end = true;
        } else {
          this.previous = this.current;
          this.current = this.current > 0 ? this.current - 1 : this.itemsCount - 1;
        }
      }

      this.$nextItem = !this.options.circular && this.end ? this.$current : this.$items.eq(this.current);

      if (!this.support) {
        this._layoutNoSupport(dir);
      } else {
        this._layout(dir);
      }
    },
    _layoutNoSupport: function (dir) {
      this.$items.hide();
      this.$nextItem.show();
      this.end = false;
      this.isAnimating = false;
      var isLimit = dir === "next" && this.current === this.itemsCount - 1 || dir === "prev" && this.current === 0; // callback trigger

      this.options.onEndFlip(this.previous, this.current, isLimit);
    },
    // creates the necessary layout for the 3d structure
    _layout: function (dir) {
      var self = this,
          // basic structure: 1 element for the left side.
      $s_left = this._addSide("left", dir),
          // 1 element for the flipping/middle page
      $s_middle = this._addSide("middle", dir),
          // 1 element for the right side
      $s_right = this._addSide("right", dir),
          // overlays
      $o_left = $s_left.find("div.bb-overlay"),
          $o_middle_f = $s_middle.find("div.bb-flipoverlay:first"),
          $o_middle_b = $s_middle.find("div.bb-flipoverlay:last"),
          $o_right = $s_right.find("div.bb-overlay"),
          speed = this.end ? 400 : this.options.speed;

      this.$items.hide();
      this.$el.prepend($s_left, $s_middle, $s_right);
      $s_middle.css({
        transitionDuration: speed + "ms",
        transitionTimingFunction: this.options.easing
      }).on(this.transEndEventName, function (event) {
        if ($(event.target).hasClass("bb-page")) {
          self.$el.children(".bb-page").remove();
          self.$nextItem.show();
          self.end = false;
          self.isAnimating = false;
          var isLimit = dir === "next" && self.current === self.itemsCount - 1 || dir === "prev" && self.current === 0; // callback trigger

          self.options.onEndFlip(self.previous, self.current, isLimit);
        }
      });

      if (dir === "prev") {
        $s_middle.addClass("bb-flip-initial");
      } // overlays


      if (this.options.shadows && !this.end) {
        var o_left_style = dir === "next" ? {
          transition: "opacity " + this.options.speed / 2 + "ms " + "linear" + " " + this.options.speed / 2 + "ms"
        } : {
          transition: "opacity " + this.options.speed / 2 + "ms " + "linear",
          opacity: this.options.shadowSides
        },
            o_middle_f_style = dir === "next" ? {
          transition: "opacity " + this.options.speed / 2 + "ms " + "linear"
        } : {
          transition: "opacity " + this.options.speed / 2 + "ms " + "linear" + " " + this.options.speed / 2 + "ms",
          opacity: this.options.shadowFlip
        },
            o_middle_b_style = dir === "next" ? {
          transition: "opacity " + this.options.speed / 2 + "ms " + "linear" + " " + this.options.speed / 2 + "ms",
          opacity: this.options.shadowFlip
        } : {
          transition: "opacity " + this.options.speed / 2 + "ms " + "linear"
        },
            o_right_style = dir === "next" ? {
          transition: "opacity " + this.options.speed / 2 + "ms " + "linear",
          opacity: this.options.shadowSides
        } : {
          transition: "opacity " + this.options.speed / 2 + "ms " + "linear" + " " + this.options.speed / 2 + "ms"
        };
        $o_middle_f.css(o_middle_f_style);
        $o_middle_b.css(o_middle_b_style);
        $o_left.css(o_left_style);
        $o_right.css(o_right_style);
      }

      setTimeout(function () {
        // first && last pages lift slightly up when we can't go further
        $s_middle.addClass(self.end ? "bb-flip-" + dir + "-end" : "bb-flip-" + dir); // overlays

        if (self.options.shadows && !self.end) {
          $o_middle_f.css({
            opacity: dir === "next" ? self.options.shadowFlip : 0
          });
          $o_middle_b.css({
            opacity: dir === "next" ? 0 : self.options.shadowFlip
          });
          $o_left.css({
            opacity: dir === "next" ? self.options.shadowSides : 0
          });
          $o_right.css({
            opacity: dir === "next" ? 0 : self.options.shadowSides
          });
        }
      }, 25);
    },
    // adds the necessary sides (bb-page) to the layout
    _addSide: function (side, dir) {
      var $side;

      switch (side) {
        case "left":
          /*
          <div class="bb-page" style="z-index:102;">
          <div class="bb-back">
          <div class="bb-outer">
          <div class="bb-content">
          <div class="bb-inner">
          	dir==='next' ? [content of current page] : [content of next page]
          </div>
          </div>
          <div class="bb-overlay"></div>
          </div>
          </div>
          </div>
          */
          $side = $('<div class="bb-page"><div class="bb-back"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">' + (dir === "next" ? this.$current.html() : this.$nextItem.html()) + '</div></div><div class="bb-overlay"></div></div></div></div>').css("z-index", 102);
          break;

        case "middle":
          /*
          <div class="bb-page" style="z-index:103;">
          <div class="bb-front">
          <div class="bb-outer">
          <div class="bb-content">
          <div class="bb-inner">
          	dir==='next' ? [content of current page] : [content of next page]
          </div>
          </div>
          <div class="bb-flipoverlay"></div>
          </div>
          </div>
          <div class="bb-back">
          <div class="bb-outer">
          <div class="bb-content">
          <div class="bb-inner">
          	dir==='next' ? [content of next page] : [content of current page]
          </div>
          </div>
          <div class="bb-flipoverlay"></div>
          </div>
          </div>
          </div>
          */
          $side = $('<div class="bb-page"><div class="bb-front"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">' + (dir === "next" ? this.$current.html() : this.$nextItem.html()) + '</div></div><div class="bb-flipoverlay"></div></div></div><div class="bb-back"><div class="bb-outer"><div class="bb-content" style="width:' + this.elWidth + 'px"><div class="bb-inner">' + (dir === "next" ? this.$nextItem.html() : this.$current.html()) + '</div></div><div class="bb-flipoverlay"></div></div></div></div>').css("z-index", 103);
          break;

        case "right":
          /*
          <div class="bb-page" style="z-index:101;">
          <div class="bb-front">
          <div class="bb-outer">
          <div class="bb-content">
          <div class="bb-inner">
          	dir==='next' ? [content of next page] : [content of current page]
          </div>
          </div>
          <div class="bb-overlay"></div>
          </div>
          </div>
          </div>
          */
          $side = $('<div class="bb-page"><div class="bb-front"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">' + (dir === "next" ? this.$nextItem.html() : this.$current.html()) + '</div></div><div class="bb-overlay"></div></div></div></div>').css("z-index", 101);
          break;
      }

      return $side;
    },
    _startSlideshow: function () {
      var self = this;
      this.slideshow = setTimeout(function () {
        self._navigate("next");

        if (self.options.autoplay) {
          self._startSlideshow();
        }
      }, this.options.interval);
    },
    _stopSlideshow: function () {
      if (this.options.autoplay) {
        clearTimeout(this.slideshow);
        this.options.autoplay = false;
      }
    },
    // public method: flips next
    next: function () {
      this._action(this.options.direction === "ltr" ? "next" : "prev");
    },
    // public method: flips back
    prev: function () {
      this._action(this.options.direction === "ltr" ? "prev" : "next");
    },
    // public method: goes to a specific page
    jump: function (page) {
      page -= 1;

      if (page === this.current || page >= this.itemsCount || page < 0) {
        return false;
      }

      var dir;

      if (this.options.direction === "ltr") {
        dir = page > this.current ? "next" : "prev";
      } else {
        dir = page > this.current ? "prev" : "next";
      }

      this._action(dir, page);
    },
    // public method: goes to the last page
    last: function () {
      this.jump(this.itemsCount);
    },
    // public method: goes to the first page
    first: function () {
      this.jump(1);
    },
    // public method: check if isAnimating is true
    isActive: function () {
      return this.isAnimating;
    },
    // public method: dynamically adds new elements
    // call this method after inserting new "bb-item" elements inside the BookBlock
    update: function () {
      var $currentItem = this.$items.eq(this.current);
      this.$items = this.$el.children(".bb-item");
      this.itemsCount = this.$items.length;
      this.current = $currentItem.index();
    },
    destroy: function () {
      if (this.options.autoplay) {
        this._stopSlideshow();
      }

      this.$el.removeClass("bb-" + this.options.orientation);
      this.$items.show();

      if (this.options.nextEl !== "") {
        $(this.options.nextEl).off(`.${this.pluginName}`);
      }

      if (this.options.prevEl !== "") {
        $(this.options.prevEl).off(`.${this.pluginName}`);
      }

      $window.off("debouncedresize");
    }
  };

  var logError = function (message) {
    if (window.console) {
      window.console.error(message);
    }
  };

  $.fn.bookblock = function (options) {
    if (typeof options === "string") {
      var args = Array.prototype.slice.call(arguments, 1);
      this.each(function () {
        var instance = $.data(this, `bookblock-${this.dataset.uid}`);

        if (!instance) {
          logError("cannot call methods on bookblock prior to initialization; " + "attempted to call method '" + options + "'");
          return;
        }

        if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
          logError("no such method '" + options + "' for bookblock instance");
          return;
        }

        instance[options].apply(instance, args);
      });
    } else {
      this.each(function () {
        var instance = $.data(this, `bookblock-${this.dataset.uid}`);

        if (instance) {
          instance._init(instance.options);
        } else {
          instance = $.data(this, `bookblock-${this.dataset.uid}`, new $.BookBlock(options, this));
        }
      });
    }

    return this;
  };
})($, window);

// This alphabet uses `A-Za-z0-9_-` symbols. The genetic algorithm helped
// optimize the gzip compression for this alphabet.
let urlAlphabet =
  'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW';

// We reuse buffers with the same size to avoid memory fragmentations
// for better performance.
let buffers = {};
let random = bytes => {
  let buffer = buffers[bytes];
  if (!buffer) {
    // `Buffer.allocUnsafe()` is faster because it doesn’t flush the memory.
    // Memory flushing is unnecessary since the buffer allocation itself resets
    // the memory with the new bytes.
    buffer = Buffer.allocUnsafe(bytes);
    if (bytes <= 255) buffers[bytes] = buffer;
  }
  return crypto.randomFillSync(buffer)
};

let nanoid = (size = 21) => {
  let bytes = random(size);
  let id = '';
  // A compact alternative for `for (var i = 0; i < step; i++)`.
  while (size--) {
    // It is incorrect to use bytes exceeding the alphabet size.
    // The following mask reduces the random byte in the 0-255 value
    // range to the 0-63 value range. Therefore, adding hacks, such
    // as empty string fallback or magic numbers, is unneccessary because
    // the bitmask trims bytes down to the alphabet size.
    id += urlAlphabet[bytes[size] & 63];
  }
  return id
};

//
var script = {
  name: "Bookblock",

  // vue component name
  data() {
    return {
      nanoid: nanoid(),
      componentKey: 0
    };
  },

  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    defaultOptions: {
      handler(val) {
        this.forceRerender(val);
      },

      deep: true,
      immediate: true
    }
  },
  computed: {
    uid() {
      return `jopa-${this.nanoid}`;
    },

    selector() {
      return `div[data-uid=${this.uid}]`;
    },

    defaultOptions() {
      return {
        // vertical or horizontal flip
        orientation: "horizontal",
        // ltr (left to right) or rtl (right to left)
        direction: "ltr",
        // speed for the flip transition in ms.
        speed: 1000,
        // easing for the flip transition.
        easing: "ease-in-out",
        // if set to true, both the flipping page and the sides will have an overlay to simulate shadows
        shadows: true,
        // opacity value for the "shadow" on both sides (when the flipping page is over it).
        // value : 0.1 - 1
        shadowSides: 0.2,
        // opacity value for the "shadow" on the flipping page (while it is flipping).
        // value : 0.1 - 1
        shadowFlip: 0.1,
        // if we should show the first item after reaching the end.
        circular: false,
        // if we want to specify a selector that triggers the next() function. example: '#bb-nav-next'.
        nextEl: "",
        // if we want to specify a selector that triggers the prev() function.
        prevEl: "",
        // If true it overwrites the circular option to true!
        autoplay: false,
        // time (ms) between page switch, if autoplay is true.
        interval: 3000,
        // callback after the flip transition.
        // page is the current item's index.
        // isLimit is true if the current page is the last one (or the first one).
        onEndFlip: function (page, isLimit) {
          return false;
        },
        // callback before the flip transition.
        // page is the current item's index.
        onBeforeFlip: function (page) {
          return false;
        },
        ...this.options
      };
    }

  },

  mounted() {
    this.forceRerender(this.defaultOptions);
  },

  methods: {
    next() {
      $(this.selector).bookblock("next");
    },

    prev() {
      $(this.selector).bookblock("prev");
    },

    jump(position) {
      $(this.selector).bookblock("jump", position);
    },

    first() {
      $(this.selector).bookblock("first");
    },

    last() {
      $(this.selector).bookblock("last");
    },

    update() {
      console.log("updated");
      $(this.selector).bookblock("update");
    },

    destroy() {
      $(this.selector).bookblock("destroy");
    },

    forceRerender(val) {
      this.nanoid = nanoid();
      this.componentKey += 1;
      this.$nextTick(() => $(this.selector).bookblock(val));
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}
//# sourceMappingURL=normalize-component.mjs.map

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    key: _vm.componentKey,
    attrs: {
      "data-uid": _vm.uid
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

const BookblockPlugin = pluginFactory({
  components: {
    FwBookblock: __vue_component__
  }
});

//
var script$1 = {
  name: "Bookblock2",

  // vue component name
  data() {
    return {
      nanoid: nanoid(),
      componentKey: 0
    };
  },

  props: {
    options: {
      type: Object,
      default: () => {}
    },
    pages: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    defaultOptions: {
      handler(val) {
        this.forceRerender(val);
      },

      deep: true,
      immediate: true
    },
    pages: {
      handler() {
        this.forceRerender(this.defaultOptions);
      },

      deep: true,
      immediate: true
    }
  },
  computed: {
    uid() {
      return `jopa-${this.nanoid}`;
    },

    selector() {
      return `div[data-uid=${this.uid}]`;
    },

    defaultOptions() {
      return {
        // vertical or horizontal flip
        orientation: "horizontal",
        // ltr (left to right) or rtl (right to left)
        direction: "ltr",
        // speed for the flip transition in ms.
        speed: 1000,
        // easing for the flip transition.
        easing: "ease-in-out",
        // if set to true, both the flipping page and the sides will have an overlay to simulate shadows
        shadows: true,
        // opacity value for the "shadow" on both sides (when the flipping page is over it).
        // value : 0.1 - 1
        shadowSides: 0.2,
        // opacity value for the "shadow" on the flipping page (while it is flipping).
        // value : 0.1 - 1
        shadowFlip: 0.1,
        // if we should show the first item after reaching the end.
        circular: false,
        // if we want to specify a selector that triggers the next() function. example: '#bb-nav-next'.
        nextEl: "",
        // if we want to specify a selector that triggers the prev() function.
        prevEl: "",
        // If true it overwrites the circular option to true!
        autoplay: false,
        // time (ms) between page switch, if autoplay is true.
        interval: 3000,
        // callback after the flip transition.
        // page is the current item's index.
        // isLimit is true if the current page is the last one (or the first one).
        onEndFlip: function (page, isLimit) {
          return false;
        },
        // callback before the flip transition.
        // page is the current item's index.
        onBeforeFlip: function (page) {
          return false;
        },
        ...this.options
      };
    }

  },

  mounted() {
    this.forceRerender(this.defaultOptions);
  },

  methods: {
    next() {
      $(this.selector).bookblock("next");
    },

    prev() {
      $(this.selector).bookblock("prev");
    },

    jump(position) {
      $(this.selector).bookblock("jump", position);
    },

    first() {
      $(this.selector).bookblock("first");
    },

    last() {
      $(this.selector).bookblock("last");
    },

    update() {
      console.log("updated");
      $(this.selector).bookblock("update");
    },

    destroy() {
      $(this.selector).bookblock("destroy");
    },

    forceRerender(val) {
      if (this.pages.length === 1) {
        val.autoplay = false;
      }

      this.componentKey += 1;
      this.$nextTick(() => {
        $(this.selector).bookblock(val);
      });
    }

  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    key: _vm.componentKey,
    attrs: {
      "data-uid": _vm.uid
    }
  }, _vm._l(_vm.pages, function (item, index) {
    return _c('div', {
      key: index + "-" + _vm.nanoid,
      staticClass: "bb-item"
    }, [_vm._t("page", null, null, {
      item: item,
      index: index
    })], 2);
  }), 0);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = undefined;
/* scoped */

const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

const Bookblock2Plugin = pluginFactory({
  components: {
    FwBookblock2: __vue_component__$1
  }
});

/**
 * turn.js 4th release
 * turnjs.com
 * turnjs.com/license.txt
 *
 * Copyright (C) 2012 Emmanuel Garcia
 * All rights reserved
 **/

(function ($) {

  var has3d,
      hasRot,
      vendor = "",
      version = "4.1.0",
      PI = Math.PI,
      A90 = PI / 2,
      isTouch = ("ontouchstart" in window),
      mouseEvents = isTouch ? {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
    over: "touchstart",
    out: "touchend"
  } : {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
    over: "mouseover",
    out: "mouseout"
  },
      // Contansts used for each corner
  //   | tl * tr |
  // l | *     * | r
  //   | bl * br |
  corners = {
    backward: ["bl", "tl"],
    forward: ["br", "tr"],
    all: ["tl", "bl", "tr", "br", "l", "r"]
  },
      // Display values
  displays = ["single", "double"],
      // Direction values
  directions = ["ltr", "rtl"],
      // Default options
  turnOptions = {
    // Enables hardware acceleration
    acceleration: true,
    // Display
    display: "double",
    // Duration of transition in milliseconds
    duration: 600,
    // First page
    page: 1,
    // Enables gradients
    gradients: true,
    // Corners used when turning the page
    turnCorners: "bl,br",
    // Events
    when: null
  },
      flipOptions = {
    // Size of the active zone of each corner
    cornerSize: 100
  },
      // Number of pages in the DOM, minimum value: 6
  pagesInDOM = 6,
      turnMethods = {
    // Singleton constructor
    // $('#selector').turn([options]);
    init: function (options) {
      // Define constants
      has3d = "WebKitCSSMatrix" in window || "MozPerspective" in document.body.style;
      hasRot = rotationAvailable();
      vendor = getPrefix();
      var i,
          pageNum = 0,
          data = this.data(),
          ch = this.children(); // Set initial configuration

      options = $.extend({
        width: this.width(),
        height: this.height(),
        direction: this.attr("dir") || this.css("direction") || "ltr"
      }, turnOptions, options);
      data.opts = options;
      data.pageObjs = {};
      data.pages = {};
      data.pageWrap = {};
      data.pageZoom = {};
      data.pagePlace = {};
      data.pageMv = [];
      data.zoom = 1;
      data.totalPages = options.pages || 0;
      data.eventHandlers = {
        touchStart: $.proxy(turnMethods._touchStart, this),
        touchMove: $.proxy(turnMethods._touchMove, this),
        touchEnd: $.proxy(turnMethods._touchEnd, this),
        start: $.proxy(turnMethods._eventStart, this)
      }; // Add event listeners

      if (options.when) for (i in options.when) if (has(i, options.when)) this.bind(i, options.when[i]); // Set the css

      this.css({
        position: "relative",
        width: options.width,
        height: options.height
      }); // Set the initial display

      this.turn("display", options.display); // Set the direction

      if (options.direction !== "") this.turn("direction", options.direction); // Prevent blue screen problems of switching to hardware acceleration mode
      // By forcing hardware acceleration for ever

      if (has3d && !isTouch && options.acceleration) this.transform(translate(0, 0, true)); // Add pages from the DOM

      for (i = 0; i < ch.length; i++) {
        if ($(ch[i]).attr("ignore") != "1") {
          this.turn("addPage", ch[i], ++pageNum);
        }
      } // Event listeners


      $(this).bind(mouseEvents.down, data.eventHandlers.touchStart).bind("end", turnMethods._eventEnd).bind("pressed", turnMethods._eventPressed).bind("released", turnMethods._eventReleased).bind("flip", turnMethods._flip);
      $(this).parent().bind("start", data.eventHandlers.start);
      $(document).bind(mouseEvents.move, data.eventHandlers.touchMove).bind(mouseEvents.up, data.eventHandlers.touchEnd); // Set the initial page

      this.turn("page", options.page); // This flipbook is ready

      data.done = true;
      return this;
    },
    // Adds a page from external data
    addPage: function (element, page) {
      var currentPage,
          className,
          incPages = false,
          data = this.data(),
          lastPage = data.totalPages + 1;
      if (data.destroying) return false; // Read the page number from the className of `element` - format: p[0-9]+

      if (currentPage = /\bp([0-9]+)\b/.exec($(element).attr("class"))) page = parseInt(currentPage[1], 10);

      if (page) {
        if (page == lastPage) incPages = true;else if (page > lastPage) throw turnError('Page "' + page + '" cannot be inserted');
      } else {
        page = lastPage;
        incPages = true;
      }

      if (page >= 1 && page <= lastPage) {
        if (data.display == "double") className = page % 2 ? " odd" : " even";else className = ""; // Stop animations

        if (data.done) this.turn("stop"); // Move pages if it's necessary

        if (page in data.pageObjs) turnMethods._movePages.call(this, page, 1); // Increase the number of pages

        if (incPages) data.totalPages = lastPage; // Add element

        data.pageObjs[page] = $(element).css({
          float: "left"
        }).addClass("page p" + page + className);

        if (!hasHardPage() && data.pageObjs[page].hasClass("hard")) {
          data.pageObjs[page].removeClass("hard");
        } // Add page


        turnMethods._addPage.call(this, page); // Remove pages out of range


        turnMethods._removeFromDOM.call(this);
      }

      return this;
    },
    // Adds a page
    _addPage: function (page) {
      var data = this.data(),
          element = data.pageObjs[page];
      if (element) if (turnMethods._necessPage.call(this, page)) {
        if (!data.pageWrap[page]) {
          // Wrapper
          data.pageWrap[page] = $("<div/>", {
            class: "page-wrapper",
            page: page,
            css: {
              position: "absolute",
              overflow: "hidden"
            }
          }); // Append to this flipbook

          this.append(data.pageWrap[page]);

          if (!data.pagePlace[page]) {
            data.pagePlace[page] = page; // Move `pageObjs[page]` to wrapper

            data.pageObjs[page].appendTo(data.pageWrap[page]);
          } // Set the size of the page


          var prop = turnMethods._pageSize.call(this, page, true);

          element.css({
            width: prop.width,
            height: prop.height
          });
          data.pageWrap[page].css(prop);
        }

        if (data.pagePlace[page] == page) {
          // If the page isn't in another place, create the flip effect
          turnMethods._makeFlip.call(this, page);
        }
      } else {
        // Place
        data.pagePlace[page] = 0; // Remove element from the DOM

        if (data.pageObjs[page]) data.pageObjs[page].remove();
      }
    },
    // Checks if a page is in memory
    hasPage: function (page) {
      return has(page, this.data().pageObjs);
    },
    // Centers the flipbook
    center: function (page) {
      var data = this.data(),
          size = $(this).turn("size"),
          left = 0;

      if (!data.noCenter) {
        if (data.display == "double") {
          var view = this.turn("view", page || data.tpage || data.page);

          if (data.direction == "ltr") {
            if (!view[0]) left -= size.width / 4;else if (!view[1]) left += size.width / 4;
          } else {
            if (!view[0]) left += size.width / 4;else if (!view[1]) left -= size.width / 4;
          }
        }

        $(this).css({
          marginLeft: left
        });
      }

      return this;
    },
    // Destroys the flipbook
    destroy: function () {
      var flipbook = this,
          data = this.data(),
          events = ["end", "first", "flip", "last", "pressed", "released", "start", "turning", "turned", "zooming", "missing"];
      if (trigger("destroying", this) == "prevented") return;
      data.destroying = true;
      $.each(events, function (index, eventName) {
        flipbook.unbind(eventName);
      });
      this.parent().unbind("start", data.eventHandlers.start);
      $(document).unbind(mouseEvents.move, data.eventHandlers.touchMove).unbind(mouseEvents.up, data.eventHandlers.touchEnd);

      while (data.totalPages !== 0) {
        this.turn("removePage", data.totalPages);
      }

      if (data.fparent) data.fparent.remove();
      if (data.shadow) data.shadow.remove();
      this.removeData();
      data = null;
      return this;
    },
    // Checks if this element is a flipbook
    is: function () {
      return typeof this.data().pages == "object";
    },
    // Sets and gets the zoom value
    zoom: function (newZoom) {
      var data = this.data();

      if (typeof newZoom == "number") {
        if (newZoom < 0.001 || newZoom > 100) throw turnError(newZoom + " is not a value for zoom");
        if (trigger("zooming", this, [newZoom, data.zoom]) == "prevented") return this;
        var size = this.turn("size"),
            currentView = this.turn("view"),
            iz = 1 / data.zoom,
            newWidth = Math.round(size.width * iz * newZoom),
            newHeight = Math.round(size.height * iz * newZoom);
        data.zoom = newZoom;
        $(this).turn("stop").turn("size", newWidth, newHeight);
        /*.
        css({marginTop: size.height * iz / 2 - newHeight / 2});*/

        if (data.opts.autoCenter) this.turn("center");
        /*else
          $(this).css({marginLeft: size.width * iz / 2 - newWidth / 2});*/

        turnMethods._updateShadow.call(this);

        for (var i = 0; i < currentView.length; i++) {
          if (currentView[i] && data.pageZoom[currentView[i]] != data.zoom) {
            this.trigger("zoomed", [currentView[i], currentView, data.pageZoom[currentView[i]], data.zoom]);
            data.pageZoom[currentView[i]] = data.zoom;
          }
        }

        return this;
      } else return data.zoom;
    },
    // Gets the size of a page
    _pageSize: function (page, position) {
      var data = this.data(),
          prop = {};

      if (data.display == "single") {
        prop.width = this.width();
        prop.height = this.height();

        if (position) {
          prop.top = 0;
          prop.left = 0;
          prop.right = "auto";
        }
      } else {
        var pageWidth = this.width() / 2,
            pageHeight = this.height();

        if (data.pageObjs[page].hasClass("own-size")) {
          prop.width = data.pageObjs[page].width();
          prop.height = data.pageObjs[page].height();
        } else {
          prop.width = pageWidth;
          prop.height = pageHeight;
        }

        if (position) {
          var odd = page % 2;
          prop.top = (pageHeight - prop.height) / 2;

          if (data.direction == "ltr") {
            prop[odd ? "right" : "left"] = pageWidth - prop.width;
            prop[odd ? "left" : "right"] = "auto";
          } else {
            prop[odd ? "left" : "right"] = pageWidth - prop.width;
            prop[odd ? "right" : "left"] = "auto";
          }
        }
      }

      return prop;
    },
    // Prepares the flip effect for a page
    _makeFlip: function (page) {
      var data = this.data();

      if (!data.pages[page] && data.pagePlace[page] == page) {
        var single = data.display == "single",
            odd = page % 2;
        data.pages[page] = data.pageObjs[page].css(turnMethods._pageSize.call(this, page)).flip({
          page: page,
          next: odd || single ? page + 1 : page - 1,
          turn: this
        }).flip("disable", data.disabled); // Issue about z-index

        turnMethods._setPageLoc.call(this, page);

        data.pageZoom[page] = data.zoom;
      }

      return data.pages[page];
    },
    // Makes pages within a range
    _makeRange: function () {
      var page,
          range,
          data = this.data();
      if (data.totalPages < 1) return;
      range = this.turn("range");

      for (page = range[0]; page <= range[1]; page++) turnMethods._addPage.call(this, page);
    },
    // Returns a range of pages that should be in the DOM
    // Example:
    // - page in the current view, return true
    // * page is in the range, return true
    // Otherwise, return false
    //
    // 1 2-3 4-5 6-7 8-9 10-11 12-13
    //   **  **  --   **  **
    range: function (page) {
      var remainingPages,
          left,
          right,
          view,
          data = this.data();
      page = page || data.tpage || data.page || 1;
      view = turnMethods._view.call(this, page);
      if (page < 1 || page > data.totalPages) throw turnError('"' + page + '" is not a valid page');
      view[1] = view[1] || view[0];

      if (view[0] >= 1 && view[1] <= data.totalPages) {
        remainingPages = Math.floor((pagesInDOM - 2) / 2);

        if (data.totalPages - view[1] > view[0]) {
          left = Math.min(view[0] - 1, remainingPages);
          right = 2 * remainingPages - left;
        } else {
          right = Math.min(data.totalPages - view[1], remainingPages);
          left = 2 * remainingPages - right;
        }
      } else {
        left = pagesInDOM - 1;
        right = pagesInDOM - 1;
      }

      return [Math.max(1, view[0] - left), Math.min(data.totalPages, view[1] + right)];
    },
    // Detects if a page is within the range of `pagesInDOM` from the current view
    _necessPage: function (page) {
      if (page === 0) return true;
      var range = this.turn("range");
      return this.data().pageObjs[page].hasClass("fixed") || page >= range[0] && page <= range[1];
    },
    // Releases memory by removing pages from the DOM
    _removeFromDOM: function () {
      var page,
          data = this.data();

      for (page in data.pageWrap) if (has(page, data.pageWrap) && !turnMethods._necessPage.call(this, page)) turnMethods._removePageFromDOM.call(this, page);
    },
    // Removes a page from DOM and its internal references
    _removePageFromDOM: function (page) {
      var data = this.data();

      if (data.pages[page]) {
        var dd = data.pages[page].data();

        flipMethods._moveFoldingPage.call(data.pages[page], false);

        if (dd.f && dd.f.fwrapper) dd.f.fwrapper.remove();
        data.pages[page].removeData();
        data.pages[page].remove();
        delete data.pages[page];
      }

      if (data.pageObjs[page]) data.pageObjs[page].remove();

      if (data.pageWrap[page]) {
        data.pageWrap[page].remove();
        delete data.pageWrap[page];
      }

      turnMethods._removeMv.call(this, page);

      delete data.pagePlace[page];
      delete data.pageZoom[page];
    },
    // Removes a page
    removePage: function (page) {
      var data = this.data(); // Delete all the pages

      if (page == "*") {
        while (data.totalPages !== 0) {
          this.turn("removePage", data.totalPages);
        }
      } else {
        if (page < 1 || page > data.totalPages) throw turnError("The page " + page + " doesn't exist");

        if (data.pageObjs[page]) {
          // Stop animations
          this.turn("stop"); // Remove `page`

          turnMethods._removePageFromDOM.call(this, page);

          delete data.pageObjs[page];
        } // Move the pages


        turnMethods._movePages.call(this, page, -1); // Resize the size of this flipbook


        data.totalPages = data.totalPages - 1; // Check the current view

        if (data.page > data.totalPages) {
          data.page = null;

          turnMethods._fitPage.call(this, data.totalPages);
        } else {
          turnMethods._makeRange.call(this);

          this.turn("update");
        }
      }

      return this;
    },
    // Moves pages
    _movePages: function (from, change) {
      var page,
          that = this,
          data = this.data(),
          single = data.display == "single",
          move = function (page) {
        var next = page + change,
            odd = next % 2,
            className = odd ? " odd " : " even ";
        if (data.pageObjs[page]) data.pageObjs[next] = data.pageObjs[page].removeClass("p" + page + " odd even").addClass("p" + next + className);

        if (data.pagePlace[page] && data.pageWrap[page]) {
          data.pagePlace[next] = next;
          if (data.pageObjs[next].hasClass("fixed")) data.pageWrap[next] = data.pageWrap[page].attr("page", next);else data.pageWrap[next] = data.pageWrap[page].css(turnMethods._pageSize.call(that, next, true)).attr("page", next);
          if (data.pages[page]) data.pages[next] = data.pages[page].flip("options", {
            page: next,
            next: single || odd ? next + 1 : next - 1
          });

          if (change) {
            delete data.pages[page];
            delete data.pagePlace[page];
            delete data.pageZoom[page];
            delete data.pageObjs[page];
            delete data.pageWrap[page];
          }
        }
      };

      if (change > 0) for (page = data.totalPages; page >= from; page--) move(page);else for (page = from; page <= data.totalPages; page++) move(page);
    },
    // Sets or Gets the display mode
    display: function (display) {
      var data = this.data(),
          currentDisplay = data.display;

      if (display === undefined) {
        return currentDisplay;
      } else {
        if ($.inArray(display, displays) == -1) throw turnError('"' + display + '" is not a value for display');

        switch (display) {
          case "single":
            // Create a temporal page to use as folded page
            if (!data.pageObjs[0]) {
              this.turn("stop").css({
                overflow: "hidden"
              });
              data.pageObjs[0] = $("<div />", {
                class: "page p-temporal"
              }).css({
                width: this.width(),
                height: this.height()
              }).appendTo(this);
            }

            this.addClass("shadow");
            break;

          case "double":
            // Remove the temporal page
            if (data.pageObjs[0]) {
              this.turn("stop").css({
                overflow: ""
              });
              data.pageObjs[0].remove();
              delete data.pageObjs[0];
            }

            this.removeClass("shadow");
            break;
        }

        data.display = display;

        if (currentDisplay) {
          var size = this.turn("size");

          turnMethods._movePages.call(this, 1, 0);

          this.turn("size", size.width, size.height).turn("update");
        }

        return this;
      }
    },
    // Gets and sets the direction of the flipbook
    direction: function (dir) {
      var data = this.data();

      if (dir === undefined) {
        return data.direction;
      } else {
        dir = dir.toLowerCase();
        if ($.inArray(dir, directions) == -1) throw turnError('"' + dir + '" is not a value for direction');

        if (dir == "rtl") {
          $(this).attr("dir", "ltr").css({
            direction: "ltr"
          });
        }

        data.direction = dir;
        if (data.done) this.turn("size", $(this).width(), $(this).height());
        return this;
      }
    },
    // Detects animation
    animating: function () {
      return this.data().pageMv.length > 0;
    },
    // Gets the current activated corner
    corner: function () {
      var corner,
          page,
          data = this.data();

      for (page in data.pages) {
        if (has(page, data.pages)) if (corner = data.pages[page].flip("corner")) {
          return corner;
        }
      }

      return false;
    },
    // Gets the data stored in the flipbook
    data: function () {
      return this.data();
    },
    // Disables and enables the effect
    disable: function (disable) {
      var page,
          data = this.data(),
          view = this.turn("view");
      data.disabled = disable === undefined || disable === true;

      for (page in data.pages) {
        if (has(page, data.pages)) data.pages[page].flip("disable", data.disabled ? true : $.inArray(parseInt(page, 10), view) == -1);
      }

      return this;
    },
    // Disables and enables the effect
    disabled: function (disable) {
      if (disable === undefined) {
        return this.data().disabled === true;
      } else {
        return this.turn("disable", disable);
      }
    },
    // Gets and sets the size
    size: function (width, height) {
      if (width === undefined || height === undefined) {
        return {
          width: this.width(),
          height: this.height()
        };
      } else {
        this.turn("stop");
        var page,
            prop,
            data = this.data(),
            pageWidth = data.display == "double" ? width / 2 : width;
        this.css({
          width: width,
          height: height
        });
        if (data.pageObjs[0]) data.pageObjs[0].css({
          width: pageWidth,
          height: height
        });

        for (page in data.pageWrap) {
          if (!has(page, data.pageWrap)) continue;
          prop = turnMethods._pageSize.call(this, page, true);
          data.pageObjs[page].css({
            width: prop.width,
            height: prop.height
          });
          data.pageWrap[page].css(prop);
          if (data.pages[page]) data.pages[page].css({
            width: prop.width,
            height: prop.height
          });
        }

        this.turn("resize");
        return this;
      }
    },
    // Resizes each page
    resize: function () {
      var page,
          data = this.data();

      if (data.pages[0]) {
        data.pageWrap[0].css({
          left: -this.width()
        });
        data.pages[0].flip("resize", true);
      }

      for (page = 1; page <= data.totalPages; page++) if (data.pages[page]) data.pages[page].flip("resize", true);

      turnMethods._updateShadow.call(this);

      if (data.opts.autoCenter) this.turn("center");
    },
    // Removes an animation from the cache
    _removeMv: function (page) {
      var i,
          data = this.data();

      for (i = 0; i < data.pageMv.length; i++) if (data.pageMv[i] == page) {
        data.pageMv.splice(i, 1);
        return true;
      }

      return false;
    },
    // Adds an animation to the cache
    _addMv: function (page) {
      var data = this.data();

      turnMethods._removeMv.call(this, page);

      data.pageMv.push(page);
    },
    // Gets indexes for a view
    _view: function (page) {
      var data = this.data();
      page = page || data.page;
      if (data.display == "double") return page % 2 ? [page - 1, page] : [page, page + 1];else return [page];
    },
    // Gets a view
    view: function (page) {
      var data = this.data(),
          view = turnMethods._view.call(this, page);

      if (data.display == "double") return [view[0] > 0 ? view[0] : 0, view[1] <= data.totalPages ? view[1] : 0];else return [view[0] > 0 && view[0] <= data.totalPages ? view[0] : 0];
    },
    // Stops animations
    stop: function (ignore, animate) {
      if (this.turn("animating")) {
        var i,
            opts,
            page,
            data = this.data();

        if (data.tpage) {
          data.page = data.tpage;
          delete data["tpage"];
        }

        for (i = 0; i < data.pageMv.length; i++) {
          if (!data.pageMv[i] || data.pageMv[i] === ignore) continue;
          page = data.pages[data.pageMv[i]];
          opts = page.data().f.opts;
          page.flip("hideFoldedPage", animate);
          if (!animate) flipMethods._moveFoldingPage.call(page, false);

          if (opts.force) {
            opts.next = opts.page % 2 === 0 ? opts.page - 1 : opts.page + 1;
            delete opts["force"];
          }
        }
      }

      this.turn("update");
      return this;
    },
    // Gets and sets the number of pages
    pages: function (pages) {
      var data = this.data();

      if (pages) {
        if (pages < data.totalPages) {
          for (var page = data.totalPages; page > pages; page--) this.turn("removePage", page);
        }

        data.totalPages = pages;

        turnMethods._fitPage.call(this, data.page);

        return this;
      } else return data.totalPages;
    },
    // Checks missing pages
    _missing: function (page) {
      var data = this.data();
      if (data.totalPages < 1) return;
      var p,
          range = this.turn("range", page),
          missing = [];

      for (p = range[0]; p <= range[1]; p++) {
        if (!data.pageObjs[p]) missing.push(p);
      }

      if (missing.length > 0) this.trigger("missing", [missing]);
    },
    // Sets a page without effect
    _fitPage: function (page) {
      var data = this.data(),
          newView = this.turn("view", page);

      turnMethods._missing.call(this, page);

      if (!data.pageObjs[page]) return;
      data.page = page;
      this.turn("stop");

      for (var i = 0; i < newView.length; i++) {
        if (newView[i] && data.pageZoom[newView[i]] != data.zoom) {
          this.trigger("zoomed", [newView[i], newView, data.pageZoom[newView[i]], data.zoom]);
          data.pageZoom[newView[i]] = data.zoom;
        }
      }

      turnMethods._removeFromDOM.call(this);

      turnMethods._makeRange.call(this);

      turnMethods._updateShadow.call(this);

      this.trigger("turned", [page, newView]);
      this.turn("update");
      if (data.opts.autoCenter) this.turn("center");
    },
    // Turns the page
    _turnPage: function (page) {
      var current,
          next,
          data = this.data(),
          place = data.pagePlace[page],
          view = this.turn("view"),
          newView = this.turn("view", page);

      if (data.page != page) {
        var currentPage = data.page;

        if (trigger("turning", this, [page, newView]) == "prevented") {
          if (currentPage == data.page && $.inArray(place, data.pageMv) != -1) data.pages[place].flip("hideFoldedPage", true);
          return;
        }

        if ($.inArray(1, newView) != -1) this.trigger("first");
        if ($.inArray(data.totalPages, newView) != -1) this.trigger("last");
      }

      if (data.display == "single") {
        current = view[0];
        next = newView[0];
      } else if (view[1] && page > view[1]) {
        current = view[1];
        next = newView[0];
      } else if (view[0] && page < view[0]) {
        current = view[0];
        next = newView[1];
      }

      var optsCorners = data.opts.turnCorners.split(","),
          flipData = data.pages[current].data().f,
          opts = flipData.opts,
          actualPoint = flipData.point;

      turnMethods._missing.call(this, page);

      if (!data.pageObjs[page]) return;
      this.turn("stop");
      data.page = page;

      turnMethods._makeRange.call(this);

      data.tpage = next;

      if (opts.next != next) {
        opts.next = next;
        opts.force = true;
      }

      this.turn("update");
      flipData.point = actualPoint;
      if (flipData.effect == "hard") {
        if (data.direction == "ltr") data.pages[current].flip("turnPage", page > current ? "r" : "l");else data.pages[current].flip("turnPage", page > current ? "l" : "r");
      } else {
        if (data.direction == "ltr") data.pages[current].flip("turnPage", optsCorners[page > current ? 1 : 0]);else data.pages[current].flip("turnPage", optsCorners[page > current ? 0 : 1]);
      }
    },
    // Gets and sets a page
    page: function (page) {
      var data = this.data();

      if (page === undefined) {
        return data.page;
      } else {
        if (!data.disabled && !data.destroying) {
          page = parseInt(page, 10);

          if (page > 0 && page <= data.totalPages) {
            if (page != data.page) {
              if (!data.done || $.inArray(page, this.turn("view")) != -1) turnMethods._fitPage.call(this, page);else turnMethods._turnPage.call(this, page);
            }

            return this;
          } else {
            throw turnError("The page " + page + " does not exist");
          }
        }
      }
    },
    // Turns to the next view
    next: function () {
      return this.turn("page", Math.min(this.data().totalPages, turnMethods._view.call(this, this.data().page).pop() + 1));
    },
    // Turns to the previous view
    previous: function () {
      return this.turn("page", Math.max(1, turnMethods._view.call(this, this.data().page).shift() - 1));
    },
    // Shows a peeling corner
    peel: function (corner, animate) {
      var data = this.data(),
          view = this.turn("view");
      animate = animate === undefined ? true : animate === true;

      if (corner === false) {
        this.turn("stop", null, animate);
      } else {
        if (data.display == "single") {
          data.pages[data.page].flip("peel", corner, animate);
        } else {
          var page;

          if (data.direction == "ltr") {
            page = corner.indexOf("l") != -1 ? view[0] : view[1];
          } else {
            page = corner.indexOf("l") != -1 ? view[1] : view[0];
          }

          if (data.pages[page]) data.pages[page].flip("peel", corner, animate);
        }
      }

      return this;
    },
    // Adds a motion to the internal list
    // This event is called in context of flip
    _addMotionPage: function () {
      var opts = $(this).data().f.opts,
          turn = opts.turn,
          dd = turn.data();

      turnMethods._addMv.call(turn, opts.page);
    },
    // This event is called in context of flip
    _eventStart: function (e, opts, corner) {
      var data = opts.turn.data(),
          actualZoom = data.pageZoom[opts.page];

      if (e.isDefaultPrevented()) {
        turnMethods._updateShadow.call(opts.turn);

        return;
      }

      if (actualZoom && actualZoom != data.zoom) {
        opts.turn.trigger("zoomed", [opts.page, opts.turn.turn("view", opts.page), actualZoom, data.zoom]);
        data.pageZoom[opts.page] = data.zoom;
      }

      if (data.display == "single" && corner) {
        if (corner.charAt(1) == "l" && data.direction == "ltr" || corner.charAt(1) == "r" && data.direction == "rtl") {
          opts.next = opts.next < opts.page ? opts.next : opts.page - 1;
          opts.force = true;
        } else {
          opts.next = opts.next > opts.page ? opts.next : opts.page + 1;
        }
      }

      turnMethods._addMotionPage.call(e.target);

      turnMethods._updateShadow.call(opts.turn);
    },
    // This event is called in context of flip
    _eventEnd: function (e, opts, turned) {
      var that = $(e.target),
          data = that.data().f,
          turn = opts.turn,
          dd = turn.data();

      if (turned) {
        var tpage = dd.tpage || dd.page;

        if (tpage == opts.next || tpage == opts.page) {
          delete dd.tpage;

          turnMethods._fitPage.call(turn, tpage || opts.next, true);
        }
      } else {
        turnMethods._removeMv.call(turn, opts.page);

        turnMethods._updateShadow.call(turn);

        turn.turn("update");
      }
    },
    // This event is called in context of flip
    _eventPressed: function (e) {
      var data = $(e.target).data().f,
          turn = data.opts.turn,
          turnData = turn.data(),
          pages = turnData.pages;
      turnData.mouseAction = true;
      turn.turn("update");
      return data.time = new Date().getTime();
    },
    // This event is called in context of flip
    _eventReleased: function (e, point) {
      var outArea,
          page = $(e.target),
          data = page.data().f,
          turn = data.opts.turn,
          turnData = turn.data();

      if (turnData.display == "single") {
        outArea = point.corner == "br" || point.corner == "tr" ? point.x < page.width() / 2 : point.x > page.width() / 2;
      } else {
        outArea = point.x < 0 || point.x > page.width();
      }

      if (new Date().getTime() - data.time < 200 || outArea) {
        e.preventDefault();

        turnMethods._turnPage.call(turn, data.opts.next);
      }

      turnData.mouseAction = false;
    },
    // This event is called in context of flip
    _flip: function (e) {
      e.stopPropagation();
      var opts = $(e.target).data().f.opts;
      opts.turn.trigger("turn", [opts.next]);

      if (opts.turn.data().opts.autoCenter) {
        opts.turn.turn("center", opts.next);
      }
    },
    //
    _touchStart: function () {
      var data = this.data();

      for (var page in data.pages) {
        if (has(page, data.pages) && flipMethods._eventStart.apply(data.pages[page], arguments) === false) {
          return false;
        }
      }
    },
    //
    _touchMove: function () {
      var data = this.data();

      for (var page in data.pages) {
        if (has(page, data.pages)) {
          flipMethods._eventMove.apply(data.pages[page], arguments);
        }
      }
    },
    //
    _touchEnd: function () {
      var data = this.data();

      for (var page in data.pages) {
        if (has(page, data.pages)) {
          flipMethods._eventEnd.apply(data.pages[page], arguments);
        }
      }
    },
    // Calculate the z-index value for pages during the animation
    calculateZ: function (mv) {
      var i,
          page,
          nextPage,
          placePage,
          dpage,
          that = this,
          data = this.data(),
          view = this.turn("view"),
          currentPage = view[0] || view[1],
          total = mv.length - 1,
          r = {
        pageZ: {},
        partZ: {},
        pageV: {}
      },
          addView = function (page) {
        var view = that.turn("view", page);
        if (view[0]) r.pageV[view[0]] = true;
        if (view[1]) r.pageV[view[1]] = true;
      };

      for (i = 0; i <= total; i++) {
        page = mv[i];
        nextPage = data.pages[page].data().f.opts.next;
        placePage = data.pagePlace[page];
        addView(page);
        addView(nextPage);
        dpage = data.pagePlace[nextPage] == nextPage ? nextPage : page;
        r.pageZ[dpage] = data.totalPages - Math.abs(currentPage - dpage);
        r.partZ[placePage] = data.totalPages * 2 - total + i;
      }

      return r;
    },
    // Updates the z-index and display property of every page
    update: function () {
      var page,
          data = this.data();

      if (this.turn("animating") && data.pageMv[0] !== 0) {
        // Update motion
        var p,
            fixed,
            pos = this.turn("calculateZ", data.pageMv),
            corner = this.turn("corner"),
            actualView = this.turn("view"),
            newView = this.turn("view", data.tpage);

        for (page in data.pageWrap) {
          if (!has(page, data.pageWrap)) continue;
          fixed = data.pageObjs[page].hasClass("fixed");
          data.pageWrap[page].css({
            display: pos.pageV[page] || fixed ? "" : "none",
            zIndex: (data.pageObjs[page].hasClass("hard") ? pos.partZ[page] : pos.pageZ[page]) || (fixed ? -1 : 0)
          });

          if (p = data.pages[page]) {
            p.flip("z", pos.partZ[page] || null);
            if (pos.pageV[page]) p.flip("resize");

            if (data.tpage) {
              // Is it turning the page to `tpage`?
              p.flip("hover", false).flip("disable", $.inArray(parseInt(page, 10), data.pageMv) == -1 && page != newView[0] && page != newView[1]);
            } else {
              p.flip("hover", corner === false).flip("disable", page != actualView[0] && page != actualView[1]);
            }
          }
        }
      } else {
        // Update static pages
        for (page in data.pageWrap) {
          if (!has(page, data.pageWrap)) continue;

          var pageLocation = turnMethods._setPageLoc.call(this, page);

          if (data.pages[page]) {
            data.pages[page].flip("disable", data.disabled || pageLocation != 1).flip("hover", true).flip("z", null);
          }
        }
      }

      return this;
    },
    // Updates the position and size of the flipbook's shadow
    _updateShadow: function () {
      var view,
          view2,
          shadow,
          data = this.data(),
          width = this.width(),
          height = this.height(),
          pageWidth = data.display == "single" ? width : width / 2;
      view = this.turn("view");

      if (!data.shadow) {
        data.shadow = $("<div />", {
          class: "shadow",
          css: divAtt(0, 0, 0).css
        }).appendTo(this);
      }

      for (var i = 0; i < data.pageMv.length; i++) {
        if (!view[0] || !view[1]) break;
        view = this.turn("view", data.pages[data.pageMv[i]].data().f.opts.next);
        view2 = this.turn("view", data.pageMv[i]);
        view[0] = view[0] && view2[0];
        view[1] = view[1] && view2[1];
      }

      if (!view[0]) shadow = data.direction == "ltr" ? 1 : 2;else if (!view[1]) shadow = data.direction == "ltr" ? 2 : 1;else shadow = 3;

      switch (shadow) {
        case 1:
          data.shadow.css({
            width: pageWidth,
            height: height,
            top: 0,
            left: pageWidth
          });
          break;

        case 2:
          data.shadow.css({
            width: pageWidth,
            height: height,
            top: 0,
            left: 0
          });
          break;

        case 3:
          data.shadow.css({
            width: width,
            height: height,
            top: 0,
            left: 0
          });
          break;
      }
    },
    // Sets the z-index and display property of a page
    // It depends on the current view
    _setPageLoc: function (page) {
      var data = this.data(),
          view = this.turn("view"),
          loc = 0;
      if (page == view[0] || page == view[1]) loc = 1;else if (data.display == "single" && page == view[0] + 1 || data.display == "double" && page == view[0] - 2 || page == view[1] + 2) loc = 2;
      if (!this.turn("animating")) switch (loc) {
        case 1:
          data.pageWrap[page].css({
            zIndex: data.totalPages,
            display: ""
          });
          break;

        case 2:
          data.pageWrap[page].css({
            zIndex: data.totalPages - 1,
            display: ""
          });
          break;

        case 0:
          data.pageWrap[page].css({
            zIndex: 0,
            display: data.pageObjs[page].hasClass("fixed") ? "" : "none"
          });
          break;
      }
      return loc;
    },
    // Gets and sets the options
    options: function (options) {
      if (options === undefined) {
        return this.data().opts;
      } else {
        var data = this.data(); // Set new values

        $.extend(data.opts, options); // Set pages

        if (options.pages) this.turn("pages", options.pages); // Set page

        if (options.page) this.turn("page", options.page); // Set display

        if (options.display) this.turn("display", options.display); // Set direction

        if (options.direction) this.turn("direction", options.direction); // Set size

        if (options.width && options.height) this.turn("size", options.width, options.height); // Add event listeners

        if (options.when) for (var eventName in options.when) if (has(eventName, options.when)) {
          this.unbind(eventName).bind(eventName, options.when[eventName]);
        }
        return this;
      }
    },
    // Gets the current version
    version: function () {
      return version;
    }
  },
      // Methods and properties for the flip page effect
  flipMethods = {
    // Constructor
    init: function (opts) {
      this.data({
        f: {
          disabled: false,
          hover: false,
          effect: this.hasClass("hard") ? "hard" : "sheet"
        }
      });
      this.flip("options", opts);

      flipMethods._addPageWrapper.call(this);

      return this;
    },
    setData: function (d) {
      var data = this.data();
      data.f = $.extend(data.f, d);
      return this;
    },
    options: function (opts) {
      var data = this.data().f;

      if (opts) {
        flipMethods.setData.call(this, {
          opts: $.extend({}, data.opts || flipOptions, opts)
        });
        return this;
      } else return data.opts;
    },
    z: function (z) {
      var data = this.data().f;
      data.opts["z-index"] = z;
      if (data.fwrapper) data.fwrapper.css({
        zIndex: z || parseInt(data.parent.css("z-index"), 10) || 0
      });
      return this;
    },
    _cAllowed: function () {
      var data = this.data().f,
          page = data.opts.page,
          turnData = data.opts.turn.data(),
          odd = page % 2;

      if (data.effect == "hard") {
        return turnData.direction == "ltr" ? [odd ? "r" : "l"] : [odd ? "l" : "r"];
      } else {
        if (turnData.display == "single") {
          if (page == 1) return turnData.direction == "ltr" ? corners["forward"] : corners["backward"];else if (page == turnData.totalPages) return turnData.direction == "ltr" ? corners["backward"] : corners["forward"];else return corners["all"];
        } else {
          return turnData.direction == "ltr" ? corners[odd ? "forward" : "backward"] : corners[odd ? "backward" : "forward"];
        }
      }
    },
    _cornerActivated: function (p) {
      var data = this.data().f,
          width = this.width(),
          height = this.height(),
          point = {
        x: p.x,
        y: p.y,
        corner: ""
      },
          csz = data.opts.cornerSize;
      if (point.x <= 0 || point.y <= 0 || point.x >= width || point.y >= height) return false;

      var allowedCorners = flipMethods._cAllowed.call(this);

      switch (data.effect) {
        case "hard":
          if (point.x > width - csz) point.corner = "r";else if (point.x < csz) point.corner = "l";else return false;
          break;

        case "sheet":
          if (point.y < csz) point.corner += "t";else if (point.y >= height - csz) point.corner += "b";else return false;
          if (point.x <= csz) point.corner += "l";else if (point.x >= width - csz) point.corner += "r";else return false;
          break;
      }

      return !point.corner || $.inArray(point.corner, allowedCorners) == -1 ? false : point;
    },
    _isIArea: function (e) {
      var pos = this.data().f.parent.offset();
      e = isTouch && e.originalEvent ? e.originalEvent.touches[0] : e;
      return flipMethods._cornerActivated.call(this, {
        x: e.pageX - pos.left,
        y: e.pageY - pos.top
      });
    },
    _c: function (corner, opts) {
      opts = opts || 0;

      switch (corner) {
        case "tl":
          return point2D(opts, opts);

        case "tr":
          return point2D(this.width() - opts, opts);

        case "bl":
          return point2D(opts, this.height() - opts);

        case "br":
          return point2D(this.width() - opts, this.height() - opts);

        case "l":
          return point2D(opts, 0);

        case "r":
          return point2D(this.width() - opts, 0);
      }
    },
    _c2: function (corner) {
      switch (corner) {
        case "tl":
          return point2D(this.width() * 2, 0);

        case "tr":
          return point2D(-this.width(), 0);

        case "bl":
          return point2D(this.width() * 2, this.height());

        case "br":
          return point2D(-this.width(), this.height());

        case "l":
          return point2D(this.width() * 2, 0);

        case "r":
          return point2D(-this.width(), 0);
      }
    },
    _foldingPage: function () {
      var data = this.data().f;
      if (!data) return;
      var opts = data.opts;

      if (opts.turn) {
        data = opts.turn.data();
        if (data.display == "single") return opts.next > 1 || opts.page > 1 ? data.pageObjs[0] : null;else return data.pageObjs[opts.next];
      }
    },
    _backGradient: function () {
      var data = this.data().f,
          turnData = data.opts.turn.data(),
          gradient = turnData.opts.gradients && (turnData.display == "single" || data.opts.page != 2 && data.opts.page != turnData.totalPages - 1);
      if (gradient && !data.bshadow) data.bshadow = $("<div/>", divAtt(0, 0, 1)).css({
        position: "",
        width: this.width(),
        height: this.height()
      }).appendTo(data.parent);
      return gradient;
    },
    type: function () {
      return this.data().f.effect;
    },
    resize: function (full) {
      var data = this.data().f,
          turnData = data.opts.turn.data(),
          width = this.width(),
          height = this.height();

      switch (data.effect) {
        case "hard":
          if (full) {
            data.wrapper.css({
              width: width,
              height: height
            });
            data.fpage.css({
              width: width,
              height: height
            });

            if (turnData.opts.gradients) {
              data.ashadow.css({
                width: width,
                height: height
              });
              data.bshadow.css({
                width: width,
                height: height
              });
            }
          }

          break;

        case "sheet":
          if (full) {
            var size = Math.round(Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)));
            data.wrapper.css({
              width: size,
              height: size
            });
            data.fwrapper.css({
              width: size,
              height: size
            }).children(":first-child").css({
              width: width,
              height: height
            });
            data.fpage.css({
              width: width,
              height: height
            });
            if (turnData.opts.gradients) data.ashadow.css({
              width: width,
              height: height
            });
            if (flipMethods._backGradient.call(this)) data.bshadow.css({
              width: width,
              height: height
            });
          }

          if (data.parent.is(":visible")) {
            var offset = findPos(data.parent[0]);
            data.fwrapper.css({
              top: offset.top,
              left: offset.left
            }); //if (data.opts.turn) {

            offset = findPos(data.opts.turn[0]);
            data.fparent.css({
              top: -offset.top,
              left: -offset.left
            }); //}
          }

          this.flip("z", data.opts["z-index"]);
          break;
      }
    },
    // Prepares the page by adding a general wrapper and another objects
    _addPageWrapper: function () {
      var data = this.data().f,
          turnData = data.opts.turn.data(),
          parent = this.parent();
      data.parent = parent;
      if (!data.wrapper) switch (data.effect) {
        case "hard":
          var cssProperties = {};
          cssProperties[vendor + "transform-style"] = "preserve-3d";
          cssProperties[vendor + "backface-visibility"] = "hidden";
          data.wrapper = $("<div/>", divAtt(0, 0, 2)).css(cssProperties).appendTo(parent).prepend(this);
          data.fpage = $("<div/>", divAtt(0, 0, 1)).css(cssProperties).appendTo(parent);

          if (turnData.opts.gradients) {
            data.ashadow = $("<div/>", divAtt(0, 0, 0)).hide().appendTo(parent);
            data.bshadow = $("<div/>", divAtt(0, 0, 0));
          }

          break;

        case "sheet":
          var width = this.width(),
              height = this.height();
          data.fparent = data.opts.turn.data().fparent;

          if (!data.fparent) {
            var fparent = $("<div/>", {
              css: {
                "pointer-events": "none"
              }
            }).hide();
            fparent.data().flips = 0;
            fparent.css(divAtt(0, 0, "auto", "visible").css).appendTo(data.opts.turn);
            data.opts.turn.data().fparent = fparent;
            data.fparent = fparent;
          }

          this.css({
            position: "absolute",
            top: 0,
            left: 0,
            bottom: "auto",
            right: "auto"
          });
          data.wrapper = $("<div/>", divAtt(0, 0, this.css("z-index"))).appendTo(parent).prepend(this);
          data.fwrapper = $("<div/>", divAtt(parent.offset().top, parent.offset().left)).hide().appendTo(data.fparent);
          data.fpage = $("<div/>", divAtt(0, 0, 0, "visible")).css({
            cursor: "default"
          }).appendTo(data.fwrapper);
          if (turnData.opts.gradients) data.ashadow = $("<div/>", divAtt(0, 0, 1)).appendTo(data.fpage);
          flipMethods.setData.call(this, data);
          break;
      } // Set size

      flipMethods.resize.call(this, true);
    },
    // Takes a 2P point from the screen and applies the transformation
    _fold: function (point) {
      var data = this.data().f,
          turnData = data.opts.turn.data(),
          o = flipMethods._c.call(this, point.corner),
          width = this.width(),
          height = this.height();

      switch (data.effect) {
        case "hard":
          if (point.corner == "l") point.x = Math.min(Math.max(point.x, 0), width * 2);else point.x = Math.max(Math.min(point.x, width), -width);
          var leftPos,
              shadow,
              gradientX,
              fpageOrigin,
              parentOrigin,
              totalPages = turnData.totalPages,
              zIndex = data.opts["z-index"] || totalPages,
              parentCss = {
            overflow: "visible"
          },
              relX = o.x ? (o.x - point.x) / width : point.x / width,
              angle = relX * 90,
              half = angle < 90;

          switch (point.corner) {
            case "l":
              fpageOrigin = "0% 50%";
              parentOrigin = "100% 50%";

              if (half) {
                leftPos = 0;
                shadow = data.opts.next - 1 > 0;
                gradientX = 1;
              } else {
                leftPos = "100%";
                shadow = data.opts.page + 1 < totalPages;
                gradientX = 0;
              }

              break;

            case "r":
              fpageOrigin = "100% 50%";
              parentOrigin = "0% 50%";
              angle = -angle;
              width = -width;

              if (half) {
                leftPos = 0;
                shadow = data.opts.next + 1 < totalPages;
                gradientX = 0;
              } else {
                leftPos = "-100%";
                shadow = data.opts.page != 1;
                gradientX = 1;
              }

              break;
          }

          parentCss[vendor + "perspective-origin"] = parentOrigin;
          data.wrapper.transform("rotateY(" + angle + "deg)" + "translate3d(0px, 0px, " + (this.attr("depth") || 0) + "px)", parentOrigin);
          data.fpage.transform("translateX(" + width + "px) rotateY(" + (180 + angle) + "deg)", fpageOrigin);
          data.parent.css(parentCss);

          if (half) {
            relX = -relX + 1;
            data.wrapper.css({
              zIndex: zIndex + 1
            });
            data.fpage.css({
              zIndex: zIndex
            });
          } else {
            relX = relX - 1;
            data.wrapper.css({
              zIndex: zIndex
            });
            data.fpage.css({
              zIndex: zIndex + 1
            });
          }

          if (turnData.opts.gradients) {
            if (shadow) data.ashadow.css({
              display: "",
              left: leftPos,
              backgroundColor: "rgba(0,0,0," + 0.5 * relX + ")"
            }).transform("rotateY(0deg)");else data.ashadow.hide();
            data.bshadow.css({
              opacity: -relX + 1
            });

            if (half) {
              if (data.bshadow.parent()[0] != data.wrapper[0]) {
                data.bshadow.appendTo(data.wrapper);
              }
            } else {
              if (data.bshadow.parent()[0] != data.fpage[0]) {
                data.bshadow.appendTo(data.fpage);
              }
            }
            /*data.bshadow.css({
              backgroundColor: 'rgba(0,0,0,'+(0.1)+')'
            })*/


            gradient(data.bshadow, point2D(gradientX * 100, 0), point2D((-gradientX + 1) * 100, 0), [[0, "rgba(0,0,0,0.3)"], [1, "rgba(0,0,0,0)"]], 2);
          }

          break;

        case "sheet":
          var that = this,
              a = 0,
              px,
              gradientEndPointA,
              gradientEndPointB,
              gradientStartVal,
              gradientSize,
              gradientOpacity,
              shadowVal,
              mv = point2D(0, 0),
              df = point2D(0, 0),
              tr = point2D(0, 0),
              folding = flipMethods._foldingPage.call(this),
              ac = turnData.opts.acceleration,
              h = data.wrapper.height(),
              top = point.corner.substr(0, 1) == "t",
              left = point.corner.substr(1, 1) == "l",
              compute = function () {
            var rel = point2D(0, 0);
            var middle = point2D(0, 0);
            rel.x = o.x ? o.x - point.x : point.x;

            if (!hasRot) {
              rel.y = 0;
            } else {
              rel.y = o.y ? o.y - point.y : point.y;
            }

            middle.x = left ? width - rel.x / 2 : point.x + rel.x / 2;
            middle.y = rel.y / 2;
            var alpha = A90 - Math.atan2(rel.y, rel.x),
                gamma = alpha - Math.atan2(middle.y, middle.x),
                distance = Math.max(0, Math.sin(gamma) * Math.sqrt(Math.pow(middle.x, 2) + Math.pow(middle.y, 2)));
            a = deg(alpha);
            tr = point2D(distance * Math.sin(alpha), distance * Math.cos(alpha));

            if (alpha > A90) {
              tr.x = tr.x + Math.abs(tr.y * rel.y / rel.x);
              tr.y = 0;

              if (Math.round(tr.x * Math.tan(PI - alpha)) < height) {
                point.y = Math.sqrt(Math.pow(height, 2) + 2 * middle.x * rel.x);
                if (top) point.y = height - point.y;
                return compute();
              }
            }

            if (alpha > A90) {
              var beta = PI - alpha,
                  dd = h - height / Math.sin(beta);
              mv = point2D(Math.round(dd * Math.cos(beta)), Math.round(dd * Math.sin(beta)));
              if (left) mv.x = -mv.x;
              if (top) mv.y = -mv.y;
            }

            px = Math.round(tr.y / Math.tan(alpha) + tr.x);
            var side = width - px,
                sideX = side * Math.cos(alpha * 2),
                sideY = side * Math.sin(alpha * 2);
            df = point2D(Math.round(left ? side - sideX : px + sideX), Math.round(top ? sideY : height - sideY)); // Gradients

            if (turnData.opts.gradients) {
              gradientSize = side * Math.sin(alpha);

              var endingPoint = flipMethods._c2.call(that, point.corner),
                  far = Math.sqrt(Math.pow(endingPoint.x - point.x, 2) + Math.pow(endingPoint.y - point.y, 2)) / width;

              shadowVal = Math.sin(A90 * (far > 1 ? 2 - far : far));
              gradientOpacity = Math.min(far, 1);
              gradientStartVal = gradientSize > 100 ? (gradientSize - 100) / gradientSize : 0;
              gradientEndPointA = point2D(gradientSize * Math.sin(alpha) / width * 100, gradientSize * Math.cos(alpha) / height * 100);

              if (flipMethods._backGradient.call(that)) {
                gradientEndPointB = point2D(gradientSize * 1.2 * Math.sin(alpha) / width * 100, gradientSize * 1.2 * Math.cos(alpha) / height * 100);
                if (!left) gradientEndPointB.x = 100 - gradientEndPointB.x;
                if (!top) gradientEndPointB.y = 100 - gradientEndPointB.y;
              }
            }

            tr.x = Math.round(tr.x);
            tr.y = Math.round(tr.y);
            return true;
          },
              transform = function (tr, c, x, a) {
            var f = ["0", "auto"],
                mvW = (width - h) * x[0] / 100,
                mvH = (height - h) * x[1] / 100,
                cssA = {
              left: f[c[0]],
              top: f[c[1]],
              right: f[c[2]],
              bottom: f[c[3]]
            },
                cssB = {},
                aliasingFk = a != 90 && a != -90 ? left ? -1 : 1 : 0,
                origin = x[0] + "% " + x[1] + "%";
            that.css(cssA).transform(rotate(a) + translate(tr.x + aliasingFk, tr.y, ac), origin);
            data.fpage.css(cssA).transform(rotate(a) + translate(tr.x + df.x - mv.x - width * x[0] / 100, tr.y + df.y - mv.y - height * x[1] / 100, ac) + rotate((180 / a - 2) * a), origin);
            data.wrapper.transform(translate(-tr.x + mvW - aliasingFk, -tr.y + mvH, ac) + rotate(-a), origin);
            data.fwrapper.transform(translate(-tr.x + mv.x + mvW, -tr.y + mv.y + mvH, ac) + rotate(-a), origin);

            if (turnData.opts.gradients) {
              if (x[0]) gradientEndPointA.x = 100 - gradientEndPointA.x;
              if (x[1]) gradientEndPointA.y = 100 - gradientEndPointA.y;
              cssB["box-shadow"] = "0 0 20px rgba(0,0,0," + 0.5 * shadowVal + ")";
              folding.css(cssB);
              gradient(data.ashadow, point2D(left ? 100 : 0, top ? 0 : 100), point2D(gradientEndPointA.x, gradientEndPointA.y), [[gradientStartVal, "rgba(0,0,0,0)"], [(1 - gradientStartVal) * 0.8 + gradientStartVal, "rgba(0,0,0," + 0.2 * gradientOpacity + ")"], [1, "rgba(255,255,255," + 0.2 * gradientOpacity + ")"]], 3);
              if (flipMethods._backGradient.call(that)) gradient(data.bshadow, point2D(left ? 0 : 100, top ? 0 : 100), point2D(gradientEndPointB.x, gradientEndPointB.y), [[0.6, "rgba(0,0,0,0)"], [0.8, "rgba(0,0,0," + 0.3 * gradientOpacity + ")"], [1, "rgba(0,0,0,0)"]], 3);
            }
          };

          switch (point.corner) {
            case "l":
              break;

            case "r":
              break;

            case "tl":
              point.x = Math.max(point.x, 1);
              compute();
              transform(tr, [1, 0, 0, 1], [100, 0], a);
              break;

            case "tr":
              point.x = Math.min(point.x, width - 1);
              compute();
              transform(point2D(-tr.x, tr.y), [0, 0, 0, 1], [0, 0], -a);
              break;

            case "bl":
              point.x = Math.max(point.x, 1);
              compute();
              transform(point2D(tr.x, -tr.y), [1, 1, 0, 0], [100, 100], -a);
              break;

            case "br":
              point.x = Math.min(point.x, width - 1);
              compute();
              transform(point2D(-tr.x, -tr.y), [0, 1, 1, 0], [0, 100], a);
              break;
          }

          break;
      }

      data.point = point;
    },
    _moveFoldingPage: function (move) {
      var data = this.data().f;
      if (!data) return;
      var turn = data.opts.turn,
          turnData = turn.data(),
          place = turnData.pagePlace;

      if (move) {
        var nextPage = data.opts.next;

        if (place[nextPage] != data.opts.page) {
          if (data.folding) flipMethods._moveFoldingPage.call(this, false);

          var folding = flipMethods._foldingPage.call(this);

          folding.appendTo(data.fpage);
          place[nextPage] = data.opts.page;
          data.folding = nextPage;
        }

        turn.turn("update");
      } else {
        if (data.folding) {
          if (turnData.pages[data.folding]) {
            // If we have flip available
            var flipData = turnData.pages[data.folding].data().f;
            turnData.pageObjs[data.folding].appendTo(flipData.wrapper);
          } else if (turnData.pageWrap[data.folding]) {
            // If we have the pageWrapper
            turnData.pageObjs[data.folding].appendTo(turnData.pageWrap[data.folding]);
          }

          if (data.folding in place) {
            place[data.folding] = data.folding;
          }

          delete data.folding;
        }
      }
    },
    _showFoldedPage: function (c, animate) {
      var folding = flipMethods._foldingPage.call(this),
          dd = this.data(),
          data = dd.f,
          visible = data.visible;

      if (folding) {
        if (!visible || !data.point || data.point.corner != c.corner) {
          var corner = data.status == "hover" || data.status == "peel" || data.opts.turn.data().mouseAction ? c.corner : null;
          visible = false;
          if (trigger("start", this, [data.opts, corner]) == "prevented") return false;
        }

        if (animate) {
          var that = this,
              point = data.point && data.point.corner == c.corner ? data.point : flipMethods._c.call(this, c.corner, 1);
          this.animatef({
            from: [point.x, point.y],
            to: [c.x, c.y],
            duration: 500,
            frame: function (v) {
              c.x = Math.round(v[0]);
              c.y = Math.round(v[1]);

              flipMethods._fold.call(that, c);
            }
          });
        } else {
          flipMethods._fold.call(this, c);

          if (dd.effect && !dd.effect.turning) this.animatef(false);
        }

        if (!visible) {
          switch (data.effect) {
            case "hard":
              data.visible = true;

              flipMethods._moveFoldingPage.call(this, true);

              data.fpage.show();
              if (data.opts.shadows) data.bshadow.show();
              break;

            case "sheet":
              data.visible = true;
              data.fparent.show().data().flips++;

              flipMethods._moveFoldingPage.call(this, true);

              data.fwrapper.show();
              if (data.bshadow) data.bshadow.show();
              break;
          }
        }

        return true;
      }

      return false;
    },
    hide: function () {
      var data = this.data().f,
          turnData = data.opts.turn.data(),
          folding = flipMethods._foldingPage.call(this);

      switch (data.effect) {
        case "hard":
          if (turnData.opts.gradients) {
            data.bshadowLoc = 0;
            data.bshadow.remove();
            data.ashadow.hide();
          }

          data.wrapper.transform("");
          data.fpage.hide();
          break;

        case "sheet":
          if (--data.fparent.data().flips === 0) data.fparent.hide();
          this.css({
            left: 0,
            top: 0,
            right: "auto",
            bottom: "auto"
          }).transform("");
          data.wrapper.transform("");
          data.fwrapper.hide();
          if (data.bshadow) data.bshadow.hide();
          folding.transform("");
          break;
      }

      data.visible = false;
      return this;
    },
    hideFoldedPage: function (animate) {
      var data = this.data().f;
      if (!data.point) return;

      var that = this,
          p1 = data.point,
          hide = function () {
        data.point = null;
        data.status = "";
        that.flip("hide");
        that.trigger("end", [data.opts, false]);
      };

      if (animate) {
        var p4 = flipMethods._c.call(this, p1.corner),
            top = p1.corner.substr(0, 1) == "t",
            delta = top ? Math.min(0, p1.y - p4.y) / 2 : Math.max(0, p1.y - p4.y) / 2,
            p2 = point2D(p1.x, p1.y + delta),
            p3 = point2D(p4.x, p4.y - delta);

        this.animatef({
          from: 0,
          to: 1,
          frame: function (v) {
            var np = bezier(p1, p2, p3, p4, v);
            p1.x = np.x;
            p1.y = np.y;

            flipMethods._fold.call(that, p1);
          },
          complete: hide,
          duration: 800,
          hiding: true
        });
      } else {
        this.animatef(false);
        hide();
      }
    },
    turnPage: function (corner) {
      var that = this,
          data = this.data().f,
          turnData = data.opts.turn.data();
      corner = {
        corner: data.corner ? data.corner.corner : corner || flipMethods._cAllowed.call(this)[0]
      };

      var p1 = data.point || flipMethods._c.call(this, corner.corner, data.opts.turn ? turnData.opts.elevation : 0),
          p4 = flipMethods._c2.call(this, corner.corner);

      this.trigger("flip").animatef({
        from: 0,
        to: 1,
        frame: function (v) {
          var np = bezier(p1, p1, p4, p4, v);
          corner.x = np.x;
          corner.y = np.y;

          flipMethods._showFoldedPage.call(that, corner);
        },
        complete: function () {
          that.trigger("end", [data.opts, true]);
        },
        duration: turnData.opts.duration,
        turning: true
      });
      data.corner = null;
    },
    moving: function () {
      return "effect" in this.data();
    },
    isTurning: function () {
      return this.flip("moving") && this.data().effect.turning;
    },
    corner: function () {
      return this.data().f.corner;
    },
    _eventStart: function (e) {
      var data = this.data().f,
          turn = data.opts.turn;

      if (!data.corner && !data.disabled && !this.flip("isTurning") && data.opts.page == turn.data().pagePlace[data.opts.page]) {
        data.corner = flipMethods._isIArea.call(this, e);

        if (data.corner && flipMethods._foldingPage.call(this)) {
          this.trigger("pressed", [data.point]);

          flipMethods._showFoldedPage.call(this, data.corner);

          return false;
        } else data.corner = null;
      }
    },
    _eventMove: function (e) {
      var data = this.data().f;

      if (!data.disabled) {
        e = isTouch ? e.originalEvent.touches : [e];

        if (data.corner) {
          var pos = data.parent.offset();
          data.corner.x = e[0].pageX - pos.left;
          data.corner.y = e[0].pageY - pos.top;

          flipMethods._showFoldedPage.call(this, data.corner);
        } else if (data.hover && !this.data().effect && this.is(":visible")) {
          var point = flipMethods._isIArea.call(this, e[0]);

          if (point) {
            if (data.effect == "sheet" && point.corner.length == 2 || data.effect == "hard") {
              data.status = "hover";

              var origin = flipMethods._c.call(this, point.corner, data.opts.cornerSize / 2);

              point.x = origin.x;
              point.y = origin.y;

              flipMethods._showFoldedPage.call(this, point, true);
            }
          } else {
            if (data.status == "hover") {
              data.status = "";
              flipMethods.hideFoldedPage.call(this, true);
            }
          }
        }
      }
    },
    _eventEnd: function () {
      var data = this.data().f,
          corner = data.corner;

      if (!data.disabled && corner) {
        if (trigger("released", this, [data.point || corner]) != "prevented") {
          flipMethods.hideFoldedPage.call(this, true);
        }
      }

      data.corner = null;
    },
    disable: function (disable) {
      flipMethods.setData.call(this, {
        disabled: disable
      });
      return this;
    },
    hover: function (hover) {
      flipMethods.setData.call(this, {
        hover: hover
      });
      return this;
    },
    peel: function (corner, animate) {
      var data = this.data().f;

      if (corner) {
        if ($.inArray(corner, corners.all) == -1) throw turnError("Corner " + corner + " is not permitted");

        if ($.inArray(corner, flipMethods._cAllowed.call(this)) != -1) {
          var point = flipMethods._c.call(this, corner, data.opts.cornerSize / 2);

          data.status = "peel";

          flipMethods._showFoldedPage.call(this, {
            corner: corner,
            x: point.x,
            y: point.y
          }, animate);
        }
      } else {
        data.status = "";
        flipMethods.hideFoldedPage.call(this, animate);
      }

      return this;
    }
  }; // Processes classes

  function dec(that, methods, args) {
    if (!args[0] || typeof args[0] == "object") return methods.init.apply(that, args);else if (methods[args[0]]) return methods[args[0]].apply(that, Array.prototype.slice.call(args, 1));else throw turnError(args[0] + " is not a method or property");
  } // Attributes for a layer


  function divAtt(top, left, zIndex, overf) {
    return {
      css: {
        position: "absolute",
        top: top,
        left: left,
        overflow: overf || "hidden",
        zIndex: zIndex || "auto"
      }
    };
  } // Gets a 2D point from a bezier curve of four points


  function bezier(p1, p2, p3, p4, t) {
    var a = 1 - t,
        b = a * a * a,
        c = t * t * t;
    return point2D(Math.round(b * p1.x + 3 * t * a * a * p2.x + 3 * t * t * a * p3.x + c * p4.x), Math.round(b * p1.y + 3 * t * a * a * p2.y + 3 * t * t * a * p3.y + c * p4.y));
  } // Converts an angle from degrees to radians


  function deg(radians) {
    return radians / PI * 180;
  } // Gets a 2D point


  function point2D(x, y) {
    return {
      x: x,
      y: y
    };
  } // Webkit 534.3 on Android wrongly repaints elements that use overflow:hidden + rotation


  function rotationAvailable() {
    var parts;

    if (parts = /AppleWebkit\/([0-9\.]+)/i.exec(navigator.userAgent)) {
      var webkitVersion = parseFloat(parts[1]);
      return webkitVersion > 534.3;
    } else {
      return true;
    }
  } // Returns the traslate value


  function translate(x, y, use3d) {
    return has3d && use3d ? " translate3d(" + x + "px," + y + "px, 0px) " : " translate(" + x + "px, " + y + "px) ";
  } // Returns the rotation value


  function rotate(degrees) {
    return " rotate(" + degrees + "deg) ";
  } // Checks if a property belongs to an object


  function has(property, object) {
    return Object.prototype.hasOwnProperty.call(object, property);
  } // Gets the CSS3 vendor prefix


  function getPrefix() {
    var vendorPrefixes = ["Moz", "Webkit", "Khtml", "O", "ms"],
        len = vendorPrefixes.length,
        vendor = "";

    while (len--) if (vendorPrefixes[len] + "Transform" in document.body.style) vendor = "-" + vendorPrefixes[len].toLowerCase() + "-";

    return vendor;
  } // Detects the transitionEnd Event


  function getTransitionEnd() {
    var t,
        el = document.createElement("fakeelement"),
        transitions = {
      transition: "transitionend",
      OTransition: "oTransitionEnd",
      MSTransition: "transitionend",
      MozTransition: "transitionend",
      WebkitTransition: "webkitTransitionEnd"
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  } // Gradients


  function gradient(obj, p0, p1, colors, numColors) {
    var j,
        cols = [];

    if (vendor == "-webkit-") {
      for (j = 0; j < numColors; j++) cols.push("color-stop(" + colors[j][0] + ", " + colors[j][1] + ")");

      obj.css({
        "background-image": "-webkit-gradient(linear, " + p0.x + "% " + p0.y + "%," + p1.x + "% " + p1.y + "%, " + cols.join(",") + " )"
      });
    } else {
      p0 = {
        x: p0.x / 100 * obj.width(),
        y: p0.y / 100 * obj.height()
      };
      p1 = {
        x: p1.x / 100 * obj.width(),
        y: p1.y / 100 * obj.height()
      };
      var dx = p1.x - p0.x,
          dy = p1.y - p0.y,
          angle = Math.atan2(dy, dx),
          angle2 = angle - Math.PI / 2,
          diagonal = Math.abs(obj.width() * Math.sin(angle2)) + Math.abs(obj.height() * Math.cos(angle2)),
          gradientDiagonal = Math.sqrt(dy * dy + dx * dx),
          corner = point2D(p1.x < p0.x ? obj.width() : 0, p1.y < p0.y ? obj.height() : 0),
          slope = Math.tan(angle),
          inverse = -1 / slope,
          x = (inverse * corner.x - corner.y - slope * p0.x + p0.y) / (inverse - slope),
          c = {
        x: x,
        y: inverse * x - inverse * corner.x + corner.y
      },
          segA = Math.sqrt(Math.pow(c.x - p0.x, 2) + Math.pow(c.y - p0.y, 2));

      for (j = 0; j < numColors; j++) cols.push(" " + colors[j][1] + " " + (segA + gradientDiagonal * colors[j][0]) * 100 / diagonal + "%");

      obj.css({
        "background-image": vendor + "linear-gradient(" + -angle + "rad," + cols.join(",") + ")"
      });
    }
  } // Triggers an event


  function trigger(eventName, context, args) {
    var event = $.Event(eventName);
    context.trigger(event, args);
    if (event.isDefaultPrevented()) return "prevented";else if (event.isPropagationStopped()) return "stopped";else return "";
  } // JS Errors


  function turnError(message) {
    function TurnJsError(message) {
      this.name = "TurnJsError";
      this.message = message;
    }

    TurnJsError.prototype = new Error();
    TurnJsError.prototype.constructor = TurnJsError;
    return new TurnJsError(message);
  } // Find the offset of an element ignoring its transformation


  function findPos(obj) {
    var offset = {
      top: 0,
      left: 0
    };

    do {
      offset.left += obj.offsetLeft;
      offset.top += obj.offsetTop;
    } while (obj = obj.offsetParent);

    return offset;
  } // Checks if there's hard page compatibility
  // IE9 is the only browser that does not support hard pages


  function hasHardPage() {
    return navigator.userAgent.indexOf("MSIE 9.0") == -1;
  } // Request an animation


  window.requestAnim = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  }(); // Extend $.fn


  $.extend($.fn, {
    flip: function () {
      return dec($(this[0]), flipMethods, arguments);
    },
    turn: function () {
      return dec($(this[0]), turnMethods, arguments);
    },
    transform: function (transform, origin) {
      var properties = {};
      if (origin) properties[vendor + "transform-origin"] = origin;
      properties[vendor + "transform"] = transform;
      return this.css(properties);
    },
    animatef: function (point) {
      var data = this.data();
      if (data.effect) data.effect.stop();

      if (point) {
        if (!point.to.length) point.to = [point.to];
        if (!point.from.length) point.from = [point.from];

        var diff = [],
            len = point.to.length,
            animating = true,
            that = this,
            time = new Date().getTime(),
            frame = function () {
          if (!data.effect || !animating) return;
          var v = [],
              timeDiff = Math.min(point.duration, new Date().getTime() - time);

          for (var i = 0; i < len; i++) v.push(data.effect.easing(1, timeDiff, point.from[i], diff[i], point.duration));

          point.frame(len == 1 ? v[0] : v);

          if (timeDiff == point.duration) {
            delete data["effect"];
            that.data(data);
            if (point.complete) point.complete();
          } else {
            window.requestAnim(frame);
          }
        };

        for (var i = 0; i < len; i++) diff.push(point.to[i] - point.from[i]);

        data.effect = $.extend({
          stop: function () {
            animating = false;
          },
          easing: function (x, t, b, c, data) {
            return c * Math.sqrt(1 - (t = t / data - 1) * t) + b;
          }
        }, point);
        this.data(data);
        frame();
      } else {
        delete data["effect"];
      }
    }
  }); // Export some globals

  $.isTouch = isTouch;
  $.mouseEvents = mouseEvents;
  $.cssPrefix = getPrefix;
  $.cssTransitionEnd = getTransitionEnd;
  $.findPos = findPos;
})($);

var script$2 = {
  name: "Turn",

  // vue component name
  data() {
    return {
      nanoid: nanoid(),
      componentKey: 0
    };
  },

  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    defaultOptions: {
      handler(val) {
        this.forceRerender(val);
      },

      deep: true
    }
  },
  computed: {
    uid() {
      return `jopa-${this.nanoid}`;
    },

    selector() {
      return `div[data-uid=${this.uid}]`;
    },

    defaultOptions() {
      return {
        when: {
          turning: (event, page, pageObj) => {
            this.currentPage = page;
          },
          // triggered before turned
          first: () => {
            this.first();
          },
          // triggered before turned
          last: () => {
            this.last();
          }
        },
        ...this.options
      };
    }

  },

  mounted() {
    $(this.selector).turn(this.defaultOptions);
  },

  methods: {
    goTo(page) {
      $(this.selector).turn("page", page);
    },

    first() {},

    last() {},

    forceRerender(val) {
      this.nanoid = nanoid();
      this.componentKey += 1;
      this.$nextTick(() => $(this.selector).turn(val));
    }

  }
};

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    key: _vm.componentKey,
    attrs: {
      "data-uid": this.uid
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$2 = undefined;
/* scoped */

const __vue_scope_id__$2 = undefined;
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

const TurnPlugin = pluginFactory({
  components: {
    FwTurn: __vue_component__$2
  }
});

//
//
//
//
//
//
//
//
//
var script$3 = {
  name: "loading-svg"
};

/* script */
const __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    attrs: {
      "viewBox": "0 0 1024 1024",
      "width": "30",
      "height": "30"
    }
  }, [_c('path', {
    attrs: {
      "d": "M858.88 753.408C858.88 756.5824 861.7984 759.4496 864.9216 759.4496 868.096 759.4496 870.9632 756.5824 870.9632 753.408 870.9632 750.2336 868.096 747.3664 864.9216 747.3664 861.7984 747.3664 858.88 750.2336 858.88 753.408L858.88 753.408ZM725.4528 891.0848C725.4528 894.208 726.784 897.3312 728.9856 899.584 731.2384 901.7856 734.3616 903.0656 737.4848 903.0656 740.6592 903.0656 743.7824 901.7856 745.984 899.584 748.2368 897.3312 749.5168 894.208 749.5168 891.0848 749.5168 887.9104 748.2368 884.7872 745.984 882.5856 743.7824 880.3328 740.6592 879.0528 737.4848 879.0528 734.3616 879.0528 731.2384 880.3328 728.9856 882.5856 726.784 884.7872 725.4528 887.9104 725.4528 891.0848L725.4528 891.0848ZM545.6384 961.9456C545.6384 966.656 547.584 971.3664 550.912 974.6944 554.2912 978.0224 558.9504 979.968 563.712 979.968 568.4224 979.968 573.1328 978.0224 576.4608 974.6944 579.84 971.3664 581.7856 966.656 581.7856 961.9456 581.7856 957.184 579.84 952.4736 576.4608 949.1456 573.1328 945.8176 568.4224 943.872 563.712 943.872 558.9504 943.872 554.2912 945.8176 550.912 949.1456 547.584 952.4736 545.6384 957.184 545.6384 961.9456L545.6384 961.9456ZM352.0512 952.4224C352.0512 958.72 354.6624 964.9664 359.0656 969.4208 363.52 973.8752 369.8176 976.4864 376.064 976.4864 382.3616 976.4864 388.6592 973.8752 393.0624 969.4208 397.5168 964.9664 400.128 958.72 400.128 952.4224 400.128 946.1248 397.5168 939.8784 393.0624 935.424 388.6592 930.9696 382.3616 928.4096 376.064 928.4096 369.8176 928.4096 363.52 930.9696 359.0656 935.424 354.6624 939.8784 352.0512 946.1248 352.0512 952.4224L352.0512 952.4224ZM180.3264 864.3072C180.3264 872.192 183.552 880.0256 189.1328 885.5552 194.7136 891.136 202.496 894.3616 210.3808 894.3616 218.2656 894.3616 226.0992 891.136 231.68 885.5552 237.2096 880.0256 240.4864 872.192 240.4864 864.3072 240.4864 856.4224 237.2096 848.5888 231.68 843.008 226.0992 837.4784 218.2656 834.2016 210.3808 834.2016 202.496 834.2016 194.7136 837.4784 189.1328 843.008 183.552 848.5888 180.3264 856.4224 180.3264 864.3072L180.3264 864.3072ZM61.3888 714.496C61.3888 723.9168 65.28 733.3376 71.936 740.0448 78.6432 746.7008 88.064 750.592 97.4848 750.592 106.9568 750.592 116.3776 746.7008 123.0336 740.0448 129.7408 733.3376 133.632 723.9168 133.632 714.496 133.632 705.024 129.7408 695.6032 123.0336 688.9472 116.3776 682.24 106.9568 678.3488 97.4848 678.3488 88.064 678.3488 78.6432 682.24 71.936 688.9472 65.28 695.6032 61.3888 705.024 61.3888 714.496L61.3888 714.496ZM16.7424 530.5344C16.7424 541.5424 21.2992 552.4992 29.0816 560.2816 36.864 568.064 47.8208 572.6208 58.8288 572.6208 69.888 572.6208 80.8448 568.064 88.6272 560.2816 96.4096 552.4992 100.9664 541.5424 100.9664 530.5344 100.9664 519.4752 96.4096 508.5184 88.6272 500.736 80.8448 492.9536 69.888 488.3968 58.8288 488.3968 47.8208 488.3968 36.864 492.9536 29.0816 500.736 21.2992 508.5184 16.7424 519.4752 16.7424 530.5344L16.7424 530.5344ZM53.4528 347.7504C53.4528 360.3456 58.6752 372.8896 67.584 381.7984 76.4928 390.7072 88.9856 395.8784 101.632 395.8784 114.2272 395.8784 126.72 390.7072 135.68 381.7984 144.5888 372.8896 149.76 360.3456 149.76 347.7504 149.76 335.1552 144.5888 322.6112 135.68 313.7024 126.72 304.7936 114.2272 299.6224 101.632 299.6224 88.9856 299.6224 76.4928 304.7936 67.584 313.7024 58.6752 322.6112 53.4528 335.1552 53.4528 347.7504L53.4528 347.7504ZM163.6352 200.3968C163.6352 214.5792 169.472 228.6592 179.5072 238.6944 189.5424 248.7296 203.6224 254.5664 217.856 254.5664 232.0384 254.5664 246.1184 248.7296 256.1536 238.6944 266.1888 228.6592 272.0256 214.5792 272.0256 200.3968 272.0256 186.2144 266.1888 172.0832 256.1536 162.048 246.1184 152.064 232.0384 146.176 217.856 146.176 203.6224 146.176 189.5424 152.064 179.5072 162.048 169.472 172.0832 163.6352 186.2144 163.6352 200.3968L163.6352 200.3968ZM325.4272 115.968C325.4272 131.7376 331.8784 147.4048 343.04 158.5152 354.2016 169.6768 369.8176 176.128 385.5872 176.128 401.3568 176.128 416.9728 169.6768 428.1344 158.5152 439.296 147.4048 445.7472 131.7376 445.7472 115.968 445.7472 100.2496 439.296 84.5824 428.1344 73.4208 416.9728 62.3104 401.3568 55.808 385.5872 55.808 369.8176 55.808 354.2016 62.3104 343.04 73.4208 331.8784 84.5824 325.4272 100.2496 325.4272 115.968L325.4272 115.968ZM507.136 110.7456C507.136 128.0512 514.2528 145.3056 526.4896 157.5424 538.7776 169.8304 555.9808 176.9472 573.3376 176.9472 590.6432 176.9472 607.8976 169.8304 620.1344 157.5424 632.4224 145.3056 639.5392 128.0512 639.5392 110.7456 639.5392 93.3888 632.4224 76.1856 620.1344 63.8976 607.8976 51.6608 590.6432 44.544 573.3376 44.544 555.9808 44.544 538.7776 51.6608 526.4896 63.8976 514.2528 76.1856 507.136 93.3888 507.136 110.7456L507.136 110.7456ZM673.4848 185.6C673.4848 204.4928 681.2672 223.2832 694.6304 236.6464 707.9936 250.0096 726.784 257.792 745.6768 257.792 764.5696 257.792 783.36 250.0096 796.7232 236.6464 810.0864 223.2832 817.8688 204.4928 817.8688 185.6 817.8688 166.7072 810.0864 147.9168 796.7232 134.5536 783.36 121.1904 764.5696 113.408 745.6768 113.408 726.784 113.408 707.9936 121.1904 694.6304 134.5536 681.2672 147.9168 673.4848 166.7072 673.4848 185.6L673.4848 185.6ZM791.7056 326.1952C791.7056 346.6752 800.1024 367.0016 814.592 381.4912 829.0816 395.9808 849.4592 404.4288 869.9392 404.4288 890.4192 404.4288 910.7456 395.9808 925.2352 381.4912 939.7248 367.0016 948.1728 346.6752 948.1728 326.1952 948.1728 305.664 939.7248 285.3376 925.2352 270.848 910.7456 256.3584 890.4192 247.9616 869.9392 247.9616 849.4592 247.9616 829.0816 256.3584 814.592 270.848 800.1024 285.3376 791.7056 305.664 791.7056 326.1952L791.7056 326.1952ZM838.7072 508.2624C838.7072 530.3296 847.7696 552.2432 863.3856 567.8592 879.0016 583.4752 900.9152 592.5376 922.9824 592.5376 945.0496 592.5376 966.9632 583.4752 982.5792 567.8592 998.1952 552.2432 1007.2576 530.3296 1007.2576 508.2624 1007.2576 486.1952 998.1952 464.2816 982.5792 448.6656 966.9632 433.1008 945.0496 423.9872 922.9824 423.9872 900.9152 423.9872 879.0016 433.1008 863.3856 448.6656 847.7696 464.2816 838.7072 486.1952 838.7072 508.2624L838.7072 508.2624Z",
      "fill": "#1296db"
    }
  })]);
};

var __vue_staticRenderFns__$3 = [];
/* style */

const __vue_inject_styles__$3 = undefined;
/* scoped */

const __vue_scope_id__$3 = undefined;
/* module identifier */

const __vue_module_identifier__$3 = undefined;
/* functional template */

const __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

//
const TURNTOLEFT = "left";
const TURNTORIGHT = "right";
const HIDDEN = "hidden";
const VISIBLE = "visible";
var script$4 = {
  name: "fw-book",
  components: {
    loadingSvg: __vue_component__$3
  },
  props: {
    styleForPageMain: {
      type: Object,

      default() {
        return {};
      }

    },
    styleForPageIndex: {
      type: Object,

      default() {
        return {};
      }

    },
    // Page data
    data: {
      type: Array,
      required: true
    },
    // Whether to allow manual page turning
    turnPageByHand: {
      type: Boolean,
      default: true
    },
    // Initial page
    initPage: {
      type: Number,
      default: 1
    },
    // Whether to turn pages automatically
    autoNextPage: {
      type: Boolean,
      default: false
    },
    // Residence time per page
    autoNextPageDelayTime: {
      type: Number,
      default: 3000
    },
    loop: {
      type: Boolean,
      default: false
    },
    // Page turning animation time
    duration: {
      type: Number,
      default: 1000
    },
    // Show page number
    showPageIndex: {
      type: Boolean,
      default: true
    },
    // Page number start index
    startPageIndex: {
      type: Number,
      default: 0
    },
    // End of page index
    endPageIndex: {
      type: Number,
      default: 9999
    }
  },

  data() {
    return {
      pages: [],
      curPage: this.initPage,
      // Current page number, each page is two and a half pages, counting from 1
      direction: TURNTOLEFT,
      // Page turning direction, not button direction
      curHalfPage: 0,
      // Each half page, each page is equal to two half pages, starting from 0
      animating: false,
      // Animation is in progress to prevent clicks to turn pages
      staying: false // Status of stay on each page

    };
  },

  computed: {
    // total pages
    pageCount() {
      return Math.ceil(this.pages.length / 2);
    }

  },
  methods: {
    assign(obj, target) {
      for (let k in target) {
        if (Object.prototype.hasOwnProperty.call(target, k)) {
          obj[k] = target[k];
        }
      }

      return obj;
    },

    $$emit(type) {
      let leftPage = this.curPage * 2 - 1 - 1;
      let rightPage = this.data[leftPage + 1] ? leftPage + 1 : undefined;
      this.$emit(type, this.curPage, [leftPage, rightPage], [this.data[leftPage], this.data[rightPage]]);
    },

    // Process all pages
    getPages() {
      // Initialization data
      const pages = [];
      this.data.forEach((item, index) => {
        let page = this.assign({
          animateClass: "",
          rotate180: false,
          animationDuration: "0s",
          left: false,
          _left: false
        }, item); // The page before the current page is on the left

        if (index <= this.curPage * 2 - 1 - 1) {
          page.left = true;
          page._left = true;
        }

        pages.push(page);
      });
      this.pages = pages;

      if (this.autoNextPage) {
        this.stay(this.curHalfPage);
      }
    },

    // Get current page number through index
    getPageNumByIndex(index) {
      return Math.ceil((index + 1) / 2);
    },

    // When turning the page to the right, add the flip class name [excluding the first page] to the even-numbered pages, and add the turning class name [not to the last page] to the odd page when turning the pages to the left.
    rotate180() {
      this.pages.forEach((page, index) => {
        if (this.direction === TURNTOLEFT) {
          page.rotate180 = index > 1 && index % 2 === 0;
        } else if (this.direction === TURNTORIGHT) {
          page.rotate180 = index < this.pages.length - 1 && index % 2 === 1;
        }
      });
    },

    // Add animation class name, animation will be performed immediately after adding
    animateClass() {
      // The end event will be executed twice on both sides of the book page, here the limit is only allowed to trigger once
      let emitTurnEnd = true;
      this.pages.forEach((page, index) => {
        page.animationDuration = this.duration / 1000;

        if (this.direction === TURNTOLEFT) {
          // The first page does not add
          if (this.curPage === 1) return; // Keep the position after the animation after the animation is completed

          let time = setTimeout(() => {
            page._left = true;
            this.animating = false;

            if (emitTurnEnd) {
              emitTurnEnd = false;
              this.$$emit("turnEnd");
            }
          }, this.duration + 50); // The previous page in the animation turns over and hides

          if (this.curPage * 2 - 3 === index) {
            page.animateClass = `${TURNTOLEFT}-${HIDDEN}`;
          } else if (this.curPage * 2 - 2 === index) {
            // Turn the next page in the animation to display
            page.animateClass = `${TURNTOLEFT}-${VISIBLE}`;
          } else {
            // No execution of animation, clear timer
            clearTimeout(time); // Do not add class name

            page.animateClass = "";
          }
        } else if (this.direction === TURNTORIGHT) {
          // The last page is not added
          if (this.curPage === this.pageCount) return; // Keep the position after the animation after the animation is completed

          let time = setTimeout(() => {
            page._left = false;
            this.animating = false;

            if (emitTurnEnd) {
              emitTurnEnd = false;
              this.$$emit("turnEnd");
            }
          }, this.duration + 50); // The previous page in the animation turns over and hides

          if (this.curPage * 2 - 1 === index) {
            page.animateClass = `${TURNTORIGHT}-${VISIBLE}`;
          } else if (this.curPage * 2 === index) {
            // Turn the next page in the animation to display
            page.animateClass = `${TURNTORIGHT}-${HIDDEN}`;
          } else {
            // No execution of animation, clear timer
            clearTimeout(time); // Do not add class name

            page.animateClass = "";
          }
        }
      });
    },

    // Reset animation class name to empty
    resetAnimateClass() {
      this.pages.forEach(page => {
        page.animateClass = "";
        page.left = page._left;
      });
    },

    // Set the book stack height to the highest current page, other pages decrease
    set_zIndex(index) {
      var pageNum = this.getPageNumByIndex(index);

      if (this.curPage === pageNum) {
        // The stacking height decreases sequentially on both sides of the current page
        return this.pageCount;
      } else {
        // The stacking height decreases sequentially on both sides of the current page
        return Math.abs(this.pageCount - Math.abs(this.curPage - pageNum));
      }
    },

    // Turn page
    turn(index) {
      if (!this.turnPageByHand) return;
      if (this.animating) return;
      this.resetAnimateClass();

      if (index % 2 === 0) {
        this.prev();
      } else {
        this.next();
      }
    },

    // Previous
    prev(num) {
      num = this.roundNum(num);
      if (isNaN(num) || num < 1) return;
      if (this.animating) return;
      if (this.curPage - num < 1) return; // change direction

      this.direction = TURNTORIGHT;
      this.$$emit("turnStart");
      this.curPage -= num;
      this.$$emit("prev");
    },

    // Next page
    next(num) {
      num = this.roundNum(num);
      if (isNaN(num) || num < 1) return;
      if (this.animating) return;

      if (this.curPage + num > this.pageCount) {
        if (this.loop) {
          this.resetToFirst();
        } else {
          return;
        }
      } // change direction


      this.direction = TURNTOLEFT;
      this.$$emit("turnStart");
      this.curPage += num;
      this.$$emit("next");
    },

    resetToFirst() {
      this.curPage = this.initPage;
      this.curHalfPage = 0;
      this.getPages();
    },

    // Rounding numbers
    roundNum(any) {
      return Math.round(any || 1);
    },

    // Stay on current page
    stay(index) {
      this.curHalfPage = index;
      this.staying = true; // Record the current page, if the current page is clicked to change the page before the timer ends, then the end operation in the following state is not performed

      const temp = this.curHalfPage;
      setTimeout(() => {
        if (temp === this.curHalfPage) {
          this.ended();
        }
      }, this.autoNextPageDelayTime);
    },

    // Single page preview finished
    ended() {
      this.staying = false; // right

      if (this.curHalfPage % 2 === 1) {
        if (this.autoNextPage) {
          this.resetAnimateClass();
          this.next();
        }
      } else {
        if (this.autoNextPage) {
          this.curHalfPage += 1;
          console.log(this.curHalfPage);
          this.stay(this.curHalfPage);
        }
      }
    },

    // Calculate after the page changes
    computedData(pageNum) {
      // Every time you turn the page, the index on the left side of the page is subtracted by one unit (because each half-page starts with index 0 and the page starts with 1)
      this.curHalfPage = pageNum * 2 - 1 - 1; // Turn pages to animate

      this.animating = true; // Calculate which pages need to be turned 180 degrees

      this.rotate180(); // Calculate pages that need to be animated

      this.animateClass(); // Stay on current page

      this.stay(this.curHalfPage);
    },

    // Change the status of automatic page turning
    changeAutoNextPage() {
      this.autoNextPage = !this.autoNextPage; // When setting automatic page turning, if it is not staying and is not in the process of turning pages, then turn the next page

      if (this.autoNextPage && !this.staying && !this.animating) {
        this.next();
      }
    }

  },

  mounted() {
    this.getPages();
  },

  watch: {
    loop() {
      this.getPages();
    },

    autoNextPage(val) {
      if (val) {
        this.stay(this.curHalfPage);
      }
    },

    // Listen for changes and re-render
    data() {
      this.getPages();
    },

    // Animation after page number change
    curPage(pageNum) {
      if (pageNum === 1) {
        this.$$emit("atFirstPage");
      } else if (pageNum === this.pageCount) {
        this.$$emit("atEndPage");
      }

      this.computedData(pageNum);
    },

    // Change every half page
    curHalfPage(num) {
      this.$emit("indexPageChange", num);
    }

  }
};

/* script */
const __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "fw-book",
    style: _vm.styleForPageMain
  }, [_vm._l(_vm.pages, function (page, index) {
    return _c('div', {
      key: index,
      ref: "bookItem",
      refInFor: true,
      staticClass: "fw-bookitem",
      class: [{
        rotate180: page.rotate180
      }, page.left ? 'left' : 'right', page.animateClass],
      style: {
        zIndex: _vm.set_zIndex(index),
        animationDuration: page.animationDuration + 's'
      },
      on: {
        "click": function ($event) {
          return _vm.turn(index);
        }
      }
    }, [_vm._t("page", null, null, {
      page: page,
      index: index
    }), _vm._v(" "), _vm.showPageIndex && _vm.startPageIndex <= index && _vm.endPageIndex >= index ? _c('i', {
      staticClass: "index",
      class: index % 2 === 0 ? 'index-left' : 'index-right',
      style: _vm.styleForPageIndex
    }, [_vm._v(_vm._s(index + 1 - _vm.startPageIndex))]) : _vm._e()], 2);
  }), _vm._v(" "), _vm.pages.length === 0 ? [_c('div', {
    staticClass: "fw-bookitem left"
  }, [_c('loading-svg', {
    staticClass: "loading"
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "fw-bookitem right"
  }, [_c('loading-svg', {
    staticClass: "loading"
  })], 1)] : _vm._e()], 2);
};

var __vue_staticRenderFns__$4 = [];
/* style */

const __vue_inject_styles__$4 = undefined;
/* scoped */

const __vue_scope_id__$4 = undefined;
/* module identifier */

const __vue_module_identifier__$4 = undefined;
/* functional template */

const __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

const BookPlugin = pluginFactory({
  components: {
    FwBook: __vue_component__$4
  }
});

const componentsPlugin = /*#__PURE__*/pluginFactory({
  plugins: {
    BookblockPlugin,
    Bookblock2Plugin,
    TurnPlugin,
    BookPlugin
  }
});

const {
  installFactory: installFactory$1
} = plugin;

const install = installFactory$1({
  plugins: {
    componentsPlugin
  }
});
const NAME$1 = "FlippingWidgets";
const FlippingWidgets = {
  install,
  NAME: NAME$1
}; // Installer exported in case the consumer does not import `default`

export default FlippingWidgets;
export { BookPlugin, __vue_component__ as Bookblock, __vue_component__$1 as Bookblock2, Bookblock2Plugin, BookblockPlugin, FlippingWidgets, __vue_component__$4 as FwBook, __vue_component__ as FwBookblock, __vue_component__$1 as FwBookblock2, __vue_component__$2 as FwTurn, NAME$1 as NAME, __vue_component__$2 as Turn, TurnPlugin, install };
//# sourceMappingURL=vue-turnjs.esm.js.map
