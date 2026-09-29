var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// package-external:@wordpress/api-fetch
var require_api_fetch = __commonJS({
  "package-external:@wordpress/api-fetch"(exports, module) {
    module.exports = window.wp.apiFetch;
  }
});

// package-external:@wordpress/block-editor
var require_block_editor = __commonJS({
  "package-external:@wordpress/block-editor"(exports, module) {
    module.exports = window.wp.blockEditor;
  }
});

// package-external:@wordpress/block-library
var require_block_library = __commonJS({
  "package-external:@wordpress/block-library"(exports, module) {
    module.exports = window.wp.blockLibrary;
  }
});

// package-external:@wordpress/blocks
var require_blocks = __commonJS({
  "package-external:@wordpress/blocks"(exports, module) {
    module.exports = window.wp.blocks;
  }
});

// package-external:@wordpress/components
var require_components = __commonJS({
  "package-external:@wordpress/components"(exports, module) {
    module.exports = window.wp.components;
  }
});

// package-external:@wordpress/element
var require_element = __commonJS({
  "package-external:@wordpress/element"(exports, module) {
    module.exports = window.wp.element;
  }
});

// package-external:@wordpress/i18n
var require_i18n = __commonJS({
  "package-external:@wordpress/i18n"(exports, module) {
    module.exports = window.wp.i18n;
  }
});

// vendor-external:react
var require_react = __commonJS({
  "vendor-external:react"(exports, module) {
    module.exports = window.React;
  }
});

// vendor-external:react/jsx-runtime
var require_jsx_runtime = __commonJS({
  "vendor-external:react/jsx-runtime"(exports, module) {
    module.exports = window.ReactJSXRuntime;
  }
});

// vendor-external:react-dom
var require_react_dom = __commonJS({
  "vendor-external:react-dom"(exports, module) {
    module.exports = window.ReactDOM;
  }
});

// routes/staged-content-edit/stage.jsx
var import_api_fetch = __toESM(require_api_fetch());
var import_block_editor = __toESM(require_block_editor());
var import_block_library = __toESM(require_block_library());
var import_blocks = __toESM(require_blocks());
var import_components = __toESM(require_components());
var import_element20 = __toESM(require_element());
var import_i18n2 = __toESM(require_i18n());
import { Link, useParams } from "@wordpress/route";

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

// node_modules/@base-ui/utils/useControlled.mjs
var React2 = __toESM(require_react(), 1);

// node_modules/@base-ui/utils/createLogOnce.mjs
var loggedMessages;
if (true) {
  loggedMessages = /* @__PURE__ */ new Set();
}
function createLogOnce(severity, prefix) {
  return function logOnce(...messages) {
    if (true) {
      const message = messages.join(" ");
      const output = prefix ? `${prefix}: ${message}` : message;
      const key = `${severity}:${output}`;
      if (!loggedMessages.has(key)) {
        loggedMessages.add(key);
        if (severity === "warn") {
          console.warn(output);
        } else {
          console.error(output);
        }
      }
    }
  };
}

// node_modules/@base-ui/utils/error.mjs
var error = createLogOnce("error", "Base UI");

// node_modules/@base-ui/utils/useControlled.mjs
function useControlled({
  controlled,
  default: defaultProp,
  name,
  state = "value"
}) {
  const {
    current: isControlled
  } = React2.useRef(controlled !== void 0);
  const [valueState, setValue] = React2.useState(defaultProp);
  const value = isControlled && controlled !== void 0 ? controlled : valueState;
  if (true) {
    React2.useEffect(() => {
      if (isControlled !== (controlled !== void 0)) {
        error([`A component is changing the ${isControlled ? "" : "un"}controlled ${state} state of ${name} to be ${isControlled ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${name} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join("\n"));
      }
    }, [state, name, controlled]);
    const {
      current: defaultValue
    } = React2.useRef(defaultProp);
    React2.useEffect(() => {
      if (!isControlled && serializeToDevModeString(defaultValue) !== serializeToDevModeString(defaultProp)) {
        error([`A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. To suppress this warning opt to use a controlled ${name}.`].join("\n"));
      }
    }, [defaultProp]);
  }
  const setValueIfUncontrolled = React2.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);
  return [value, setValueIfUncontrolled];
}
function serializeToDevModeString(input) {
  let nextId = 0;
  const seen = /* @__PURE__ */ new WeakMap();
  try {
    const result = JSON.stringify(input, function replacer(key, value) {
      if (key === "_owner" && this != null && typeof this === "object" && "$$typeof" in this) {
        return void 0;
      }
      if (typeof value === "bigint") {
        return `__bigint__:${value}`;
      }
      if (value !== null && typeof value === "object") {
        const id = seen.get(value);
        if (id !== void 0) {
          return `__object__:${id}`;
        }
        seen.set(value, nextId);
        nextId += 1;
      }
      return value;
    });
    return result ?? `__top__:${typeof input}`;
  } catch {
    return "__unserializable__";
  }
}

// node_modules/@base-ui/utils/safeReact.mjs
var React3 = __toESM(require_react(), 1);
var SafeReact = {
  ...React3
};

// node_modules/@base-ui/utils/useRefWithInit.mjs
var React4 = __toESM(require_react(), 1);
var UNINITIALIZED = {};
function useRefWithInit(init, initArg) {
  const ref = React4.useRef(UNINITIALIZED);
  if (ref.current === UNINITIALIZED) {
    ref.current = init(initArg);
  }
  return ref;
}

// node_modules/@base-ui/utils/useStableCallback.mjs
var useInsertionEffect = SafeReact.useInsertionEffect;
var useSafeInsertionEffect = (
  // React 17 doesn't have useInsertionEffect.
  useInsertionEffect && // Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
  useInsertionEffect !== SafeReact.useLayoutEffect ? useInsertionEffect : (fn) => fn()
);
function useStableCallback(callback) {
  const stable = useRefWithInit(createStableCallback).current;
  stable.next = callback;
  useSafeInsertionEffect(stable.effect);
  return stable.trampoline;
}
function createStableCallback() {
  const stable = {
    next: void 0,
    callback: assertNotCalled,
    trampoline: (...args) => stable.callback?.(...args),
    effect: () => {
      stable.callback = stable.next;
    }
  };
  return stable;
}
function assertNotCalled() {
  if (true) {
    throw (
      /* minify-error-disabled */
      new Error("Base UI: Cannot call an event handler while rendering.")
    );
  }
}

// node_modules/@base-ui/utils/warn.mjs
var warn = createLogOnce("warn", "Base UI");

// node_modules/@base-ui/utils/empty.mjs
function NOOP() {
}
var EMPTY_ARRAY = Object.freeze([]);
var EMPTY_OBJECT = Object.freeze({});

// node_modules/@base-ui/utils/useIsoLayoutEffect.mjs
var React5 = __toESM(require_react(), 1);
var noop = () => {
};
var useIsoLayoutEffect = typeof document !== "undefined" ? React5.useLayoutEffect : noop;

// node_modules/@base-ui/react/internals/useRenderElement.mjs
var React8 = __toESM(require_react(), 1);

// node_modules/@base-ui/utils/useMergedRefs.mjs
function useMergedRefs(a, b, c, d) {
  const forkRef = useRefWithInit(createForkRef).current;
  if (didChange(forkRef, a, b, c, d)) {
    update(forkRef, [a, b, c, d]);
  }
  return forkRef.callback;
}
function useMergedRefsN(refs) {
  const forkRef = useRefWithInit(createForkRef).current;
  if (didChangeN(forkRef, refs)) {
    update(forkRef, refs);
  }
  return forkRef.callback;
}
function createForkRef() {
  return {
    callback: null,
    cleanup: null,
    refs: []
  };
}
function didChange(forkRef, a, b, c, d) {
  return forkRef.refs[0] !== a || forkRef.refs[1] !== b || forkRef.refs[2] !== c || forkRef.refs[3] !== d;
}
function didChangeN(forkRef, newRefs) {
  return forkRef.refs.length !== newRefs.length || forkRef.refs.some((ref, index) => ref !== newRefs[index]);
}
function update(forkRef, refs) {
  forkRef.refs = refs;
  if (refs.every((ref) => ref == null)) {
    forkRef.callback = null;
    return;
  }
  forkRef.callback = (instance) => {
    if (forkRef.cleanup) {
      forkRef.cleanup();
      forkRef.cleanup = null;
    }
    if (instance != null) {
      const cleanupCallbacks = Array(refs.length).fill(null);
      for (let i = 0; i < refs.length; i += 1) {
        const ref = refs[i];
        if (ref == null) {
          continue;
        }
        switch (typeof ref) {
          case "function": {
            const refCleanup = ref(instance);
            if (typeof refCleanup === "function") {
              cleanupCallbacks[i] = refCleanup;
            }
            break;
          }
          case "object": {
            ref.current = instance;
            break;
          }
          default:
        }
      }
      forkRef.cleanup = () => {
        for (let i = 0; i < refs.length; i += 1) {
          const ref = refs[i];
          if (ref == null) {
            continue;
          }
          switch (typeof ref) {
            case "function": {
              const cleanupCallback = cleanupCallbacks[i];
              if (typeof cleanupCallback === "function") {
                cleanupCallback();
              } else {
                void ref(null);
              }
              break;
            }
            case "object": {
              ref.current = null;
              break;
            }
            default:
          }
        }
      };
    }
  };
}

// node_modules/@base-ui/utils/getReactElementRef.mjs
var React7 = __toESM(require_react(), 1);

// node_modules/@base-ui/utils/reactVersion.mjs
var React6 = __toESM(require_react(), 1);
var majorVersion = parseInt(React6.version, 10);
function isReactVersionAtLeast(reactVersionToCheck) {
  return majorVersion >= reactVersionToCheck;
}

// node_modules/@base-ui/utils/getReactElementRef.mjs
function getReactElementRef(element) {
  if (!/* @__PURE__ */ React7.isValidElement(element)) {
    return null;
  }
  const reactElement = element;
  const propsWithRef = reactElement.props;
  return (isReactVersionAtLeast(19) ? propsWithRef?.ref : reactElement.ref) ?? null;
}

// node_modules/@base-ui/utils/mergeObjects.mjs
function mergeObjects(a, b) {
  if (a && !b) {
    return a;
  }
  if (!a && b) {
    return b;
  }
  if (a || b) {
    return {
      ...a,
      ...b
    };
  }
  return void 0;
}

// node_modules/@base-ui/react/internals/getStateAttributesProps.mjs
function getStateAttributesProps(state, customMapping) {
  const props = {};
  for (const key in state) {
    const value = state[key];
    if (customMapping?.hasOwnProperty(key)) {
      const customProps = customMapping[key](value);
      if (customProps != null) {
        Object.assign(props, customProps);
      }
      continue;
    }
    if (value === true) {
      props[`data-${key.toLowerCase()}`] = "";
    } else if (value) {
      props[`data-${key.toLowerCase()}`] = value.toString();
    }
  }
  return props;
}

// node_modules/@base-ui/react/utils/resolveClassName.mjs
function resolveClassName(className, state) {
  return typeof className === "function" ? className(state) : className;
}

// node_modules/@base-ui/react/utils/resolveStyle.mjs
function resolveStyle(style, state) {
  return typeof style === "function" ? style(state) : style;
}

// node_modules/@base-ui/react/merge-props/mergeProps.mjs
var EMPTY_PROPS = {};
function mergeProps(a, b, c, d, e) {
  if (!c && !d && !e && !a) {
    return createInitialMergedProps(b);
  }
  let merged = createInitialMergedProps(a);
  if (b) {
    merged = mergeInto(merged, b);
  }
  if (c) {
    merged = mergeInto(merged, c);
  }
  if (d) {
    merged = mergeInto(merged, d);
  }
  if (e) {
    merged = mergeInto(merged, e);
  }
  return merged;
}
function mergePropsN(props) {
  if (props.length === 0) {
    return EMPTY_PROPS;
  }
  if (props.length === 1) {
    return createInitialMergedProps(props[0]);
  }
  let merged = createInitialMergedProps(props[0]);
  for (let i = 1; i < props.length; i += 1) {
    merged = mergeInto(merged, props[i]);
  }
  return merged;
}
function createInitialMergedProps(inputProps) {
  if (isPropsGetter(inputProps)) {
    return {
      ...resolvePropsGetter(inputProps, EMPTY_PROPS)
    };
  }
  return copyInitialProps(inputProps);
}
function mergeInto(merged, inputProps) {
  if (isPropsGetter(inputProps)) {
    return resolvePropsGetter(inputProps, merged);
  }
  return mutablyMergeInto(merged, inputProps);
}
function copyInitialProps(inputProps) {
  const copiedProps = {
    ...inputProps
  };
  for (const propName in copiedProps) {
    const propValue = copiedProps[propName];
    if (isEventHandler(propName, propValue)) {
      copiedProps[propName] = wrapEventHandler(propValue);
    }
  }
  return copiedProps;
}
function mutablyMergeInto(mergedProps, externalProps) {
  if (!externalProps) {
    return mergedProps;
  }
  for (const propName in externalProps) {
    const externalPropValue = externalProps[propName];
    switch (propName) {
      case "style": {
        mergedProps[propName] = mergeObjects(mergedProps.style, externalPropValue);
        break;
      }
      case "className": {
        mergedProps[propName] = mergeClassNames(mergedProps.className, externalPropValue);
        break;
      }
      default: {
        if (isEventHandler(propName, externalPropValue)) {
          mergedProps[propName] = mergeEventHandlers(mergedProps[propName], externalPropValue);
        } else {
          mergedProps[propName] = externalPropValue;
        }
      }
    }
  }
  return mergedProps;
}
function isEventHandler(key, value) {
  const code0 = key.charCodeAt(0);
  const code1 = key.charCodeAt(1);
  const code2 = key.charCodeAt(2);
  return code0 === 111 && code1 === 110 && code2 >= 65 && code2 <= 90 && (typeof value === "function" || typeof value === "undefined");
}
function isPropsGetter(inputProps) {
  return typeof inputProps === "function";
}
function resolvePropsGetter(inputProps, previousProps) {
  if (isPropsGetter(inputProps)) {
    return inputProps(previousProps);
  }
  return inputProps ?? EMPTY_PROPS;
}
function mergeEventHandlers(ourHandler, theirHandler) {
  if (!theirHandler) {
    return ourHandler;
  }
  if (!ourHandler) {
    return wrapEventHandler(theirHandler);
  }
  return (...args) => {
    const event = args[0];
    if (isSyntheticEvent(event)) {
      const baseUIEvent = event;
      makeEventPreventable(baseUIEvent);
      const result2 = theirHandler(...args);
      if (!baseUIEvent.baseUIHandlerPrevented) {
        ourHandler?.(...args);
      }
      return result2;
    }
    const result = theirHandler(...args);
    ourHandler?.(...args);
    return result;
  };
}
function wrapEventHandler(handler) {
  if (!handler) {
    return handler;
  }
  return (...args) => {
    const event = args[0];
    if (isSyntheticEvent(event)) {
      makeEventPreventable(event);
    }
    return handler(...args);
  };
}
function makeEventPreventable(event) {
  event.preventBaseUIHandler = () => {
    event.baseUIHandlerPrevented = true;
  };
  return event;
}
function mergeClassNames(ourClassName, theirClassName) {
  if (theirClassName) {
    if (ourClassName) {
      return theirClassName + " " + ourClassName;
    }
    return theirClassName;
  }
  return ourClassName;
}
function isSyntheticEvent(event) {
  return event != null && typeof event === "object" && "nativeEvent" in event;
}

// node_modules/@base-ui/react/internals/useRenderElement.mjs
var import_react = __toESM(require_react(), 1);
function useRenderElement(element, componentProps, params = {}) {
  let renderProp = componentProps.render;
  if (params.enabled !== false) {
    renderProp = unwrapLazyRenderProp(renderProp);
  }
  const outProps = useRenderElementProps(componentProps, params, renderProp);
  if (params.enabled === false) {
    return null;
  }
  const state = params.state ?? EMPTY_OBJECT;
  return evaluateRenderProp(element, renderProp, outProps, state);
}
function useRenderElementProps(componentProps, params, renderProp) {
  const {
    className: classNameProp,
    style: styleProp
  } = componentProps;
  const {
    state = EMPTY_OBJECT,
    ref,
    props,
    stateAttributesMapping: stateAttributesMapping2,
    enabled = true
  } = params;
  const className = enabled ? resolveClassName(classNameProp, state) : void 0;
  const style = enabled ? resolveStyle(styleProp, state) : void 0;
  const stateProps = enabled ? getStateAttributesProps(state, stateAttributesMapping2) : EMPTY_OBJECT;
  const resolvedProps = enabled && props ? resolveRenderFunctionProps(props) : void 0;
  const outProps = enabled ? mergeObjects(stateProps, resolvedProps) ?? {} : EMPTY_OBJECT;
  if (typeof document !== "undefined") {
    if (!enabled) {
      void useMergedRefs(null, null);
    } else if (Array.isArray(ref)) {
      outProps.ref = useMergedRefsN([outProps.ref, getReactElementRef(renderProp), ...ref]);
    } else {
      outProps.ref = useMergedRefs(outProps.ref, getReactElementRef(renderProp), ref);
    }
  }
  if (!enabled) {
    return EMPTY_OBJECT;
  }
  if (className !== void 0) {
    outProps.className = mergeClassNames(outProps.className, className);
  }
  if (style !== void 0) {
    outProps.style = mergeObjects(outProps.style, style);
  }
  return outProps;
}
function resolveRenderFunctionProps(props) {
  if (Array.isArray(props)) {
    return mergePropsN(props);
  }
  return mergeProps(void 0, props);
}
var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
var COMPONENT_IDENTIFIER_PATTERN = /^[A-Z][A-Za-z0-9$]*$/;
var LOWERCASE_CHARACTER_PATTERN = /[a-z]/;
function unwrapLazyRenderProp(render) {
  if (render?.$$typeof !== REACT_LAZY_TYPE) {
    return render;
  }
  const unwrapped = React8.Children.toArray(render)[0];
  return /* @__PURE__ */ React8.isValidElement(unwrapped) ? unwrapped : render;
}
function evaluateRenderProp(element, render, props, state) {
  if (render) {
    if (typeof render === "function") {
      if (true) {
        warnIfRenderPropLooksLikeComponent(render);
      }
      return render(props, state);
    }
    const mergedProps = mergeProps(props, render.props);
    mergedProps.ref = props.ref;
    if (true) {
      if (!/* @__PURE__ */ React8.isValidElement(render)) {
        throw new Error(["Base UI: The `render` prop was provided an invalid React element as `React.isValidElement(render)` is `false`.", "A valid React element must be provided to the `render` prop because it is cloned with props to replace the default element.", "https://base-ui.com/r/invalid-render-prop"].join("\n"));
      }
    }
    return /* @__PURE__ */ React8.cloneElement(render, mergedProps);
  }
  if (element) {
    if (typeof element === "string") {
      return renderTag(element, props);
    }
  }
  throw new Error(true ? "Base UI: Render element or function are not defined." : formatErrorMessage_default(8));
}
function warnIfRenderPropLooksLikeComponent(renderFn) {
  const functionName = renderFn.name;
  if (functionName.length === 0) {
    return;
  }
  if (!COMPONENT_IDENTIFIER_PATTERN.test(functionName)) {
    return;
  }
  if (!LOWERCASE_CHARACTER_PATTERN.test(functionName)) {
    return;
  }
  warn(`The \`render\` prop received a function named \`${functionName}\` that starts with an uppercase letter.`, "This usually means a React component was passed directly as `render={Component}`.", "Base UI calls `render` as a plain function, which can break the Rules of Hooks during reconciliation.", "If this is an intentional render callback, rename it to start with a lowercase letter.", "Use `render={<Component />}` or `render={(props) => <Component {...props} />}` instead.", "https://base-ui.com/r/invalid-render-prop");
}
function renderTag(Tag, props) {
  if (Tag === "button") {
    return /* @__PURE__ */ (0, import_react.createElement)("button", {
      type: "button",
      ...props,
      key: props.key
    });
  }
  if (Tag === "img") {
    return /* @__PURE__ */ (0, import_react.createElement)("img", {
      alt: "",
      ...props,
      key: props.key
    });
  }
  return /* @__PURE__ */ React8.createElement(Tag, props);
}

// node_modules/@base-ui/utils/useId.mjs
var React9 = __toESM(require_react(), 1);
var globalId = 0;
function useGlobalId(idOverride, prefix = "mui") {
  const [defaultId, setDefaultId] = React9.useState(idOverride);
  const id = idOverride || defaultId;
  React9.useEffect(() => {
    if (defaultId == null) {
      globalId += 1;
      setDefaultId(`${prefix}-${globalId}`);
    }
  }, [defaultId, prefix]);
  return id;
}
var maybeReactUseId = SafeReact.useId;
function useId(idOverride, prefix) {
  if (maybeReactUseId !== void 0) {
    const reactId = maybeReactUseId();
    return idOverride ?? (prefix ? `${prefix}-${reactId}` : reactId);
  }
  return useGlobalId(idOverride, prefix);
}

// node_modules/@base-ui/react/internals/useBaseUiId.mjs
function useBaseUiId(idOverride) {
  return useId(idOverride, "base-ui");
}

// node_modules/@base-ui/react/internals/reason-parts.mjs
var reason_parts_exports = {};
__export(reason_parts_exports, {
  cancelOpen: () => cancelOpen,
  chipRemovePress: () => chipRemovePress,
  clearPress: () => clearPress,
  closePress: () => closePress,
  closeWatcher: () => closeWatcher,
  decrementPress: () => decrementPress,
  disabled: () => disabled,
  drag: () => drag,
  escapeKey: () => escapeKey,
  focusOut: () => focusOut,
  imperativeAction: () => imperativeAction,
  incrementPress: () => incrementPress,
  initial: () => initial,
  inputBlur: () => inputBlur,
  inputChange: () => inputChange,
  inputClear: () => inputClear,
  inputPaste: () => inputPaste,
  inputPress: () => inputPress,
  itemPress: () => itemPress,
  keyboard: () => keyboard,
  linkPress: () => linkPress,
  listNavigation: () => listNavigation,
  missing: () => missing,
  none: () => none,
  outsidePress: () => outsidePress,
  pointer: () => pointer,
  scrub: () => scrub,
  siblingOpen: () => siblingOpen,
  swipe: () => swipe,
  trackPress: () => trackPress,
  triggerFocus: () => triggerFocus,
  triggerHover: () => triggerHover,
  triggerPress: () => triggerPress,
  wheel: () => wheel,
  windowResize: () => windowResize
});
var none = "none";
var triggerPress = "trigger-press";
var triggerHover = "trigger-hover";
var triggerFocus = "trigger-focus";
var outsidePress = "outside-press";
var itemPress = "item-press";
var closePress = "close-press";
var linkPress = "link-press";
var clearPress = "clear-press";
var chipRemovePress = "chip-remove-press";
var trackPress = "track-press";
var incrementPress = "increment-press";
var decrementPress = "decrement-press";
var inputChange = "input-change";
var inputClear = "input-clear";
var inputBlur = "input-blur";
var inputPaste = "input-paste";
var inputPress = "input-press";
var focusOut = "focus-out";
var escapeKey = "escape-key";
var closeWatcher = "close-watcher";
var listNavigation = "list-navigation";
var keyboard = "keyboard";
var pointer = "pointer";
var drag = "drag";
var wheel = "wheel";
var scrub = "scrub";
var cancelOpen = "cancel-open";
var siblingOpen = "sibling-open";
var disabled = "disabled";
var missing = "missing";
var initial = "initial";
var imperativeAction = "imperative-action";
var swipe = "swipe";
var windowResize = "window-resize";

// node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs
function createChangeEventDetails(reason, event, trigger, customProperties) {
  let canceled = false;
  let allowPropagation = false;
  const custom = customProperties ?? EMPTY_OBJECT;
  const details = {
    reason,
    event: event ?? new Event("base-ui"),
    cancel() {
      canceled = true;
    },
    allowPropagation() {
      allowPropagation = true;
    },
    get isCanceled() {
      return canceled;
    },
    get isPropagationAllowed() {
      return allowPropagation;
    },
    trigger,
    ...custom
  };
  return details;
}

// node_modules/@base-ui/react/internals/useTransitionStatus.mjs
var React11 = __toESM(require_react(), 1);

// node_modules/@base-ui/utils/useOnMount.mjs
var React10 = __toESM(require_react(), 1);
function useOnMount(fn) {
  React10.useEffect(fn, EMPTY_ARRAY);
}

// node_modules/@base-ui/utils/useAnimationFrame.mjs
var EMPTY = null;
var LAST_RAF = globalThis.requestAnimationFrame;
var Scheduler = class {
  /* This implementation uses an array as a backing data-structure for frame callbacks.
   * It allows `O(1)` callback cancelling by inserting a `null` in the array, though it
   * never calls the native `cancelAnimationFrame` if there are no frames left. This can
   * be much more efficient if there is a call pattern that alterns as
   * "request-cancel-request-cancel-…".
   * But in the case of "request-request-…-cancel-cancel-…", it leaves the final animation
   * frame to run anyway. We turn that frame into a `O(1)` no-op via `callbacksCount`. */
  callbacks = [];
  callbacksCount = 0;
  nextId = 1;
  startId = 1;
  isScheduled = false;
  tick = (timestamp) => {
    this.isScheduled = false;
    const currentCallbacks = this.callbacks;
    const currentCallbacksCount = this.callbacksCount;
    this.callbacks = [];
    this.callbacksCount = 0;
    this.startId = this.nextId;
    if (currentCallbacksCount > 0) {
      for (let i = 0; i < currentCallbacks.length; i += 1) {
        currentCallbacks[i]?.(timestamp);
      }
    }
  };
  request(fn) {
    const id = this.nextId;
    this.nextId += 1;
    this.callbacks.push(fn);
    this.callbacksCount += 1;
    const didRAFChange = LAST_RAF !== requestAnimationFrame && (LAST_RAF = requestAnimationFrame, true);
    if (!this.isScheduled || didRAFChange) {
      requestAnimationFrame(this.tick);
      this.isScheduled = true;
    }
    return id;
  }
  cancel(id) {
    const index = id - this.startId;
    if (index < 0 || index >= this.callbacks.length) {
      return;
    }
    if (this.callbacks[index] === null) {
      return;
    }
    this.callbacks[index] = null;
    this.callbacksCount -= 1;
  }
};
var scheduler = new Scheduler();
var AnimationFrame = class _AnimationFrame {
  static create() {
    return new _AnimationFrame();
  }
  static request(fn) {
    return scheduler.request(fn);
  }
  static cancel(id) {
    return scheduler.cancel(id);
  }
  currentId = EMPTY;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  request(fn) {
    this.cancel();
    this.currentId = scheduler.request(() => {
      this.currentId = EMPTY;
      fn();
    });
  }
  cancel = () => {
    if (this.currentId !== EMPTY) {
      scheduler.cancel(this.currentId);
      this.currentId = EMPTY;
    }
  };
  disposeEffect = () => {
    return this.cancel;
  };
};
function useAnimationFrame() {
  const timeout = useRefWithInit(AnimationFrame.create).current;
  useOnMount(timeout.disposeEffect);
  return timeout;
}

// node_modules/@base-ui/react/internals/useTransitionStatus.mjs
function useTransitionStatus(open, enableIdleState = false, deferEndingState = false, animateInitialOpen = false) {
  const [transitionStatus, setTransitionStatus] = React11.useState(open && enableIdleState ? "idle" : void 0);
  const [mounted, setMounted] = React11.useState(open && !animateInitialOpen);
  if (open && !mounted) {
    setMounted(true);
    setTransitionStatus("starting");
  }
  if (!open && mounted && transitionStatus !== "ending" && !deferEndingState) {
    setTransitionStatus("ending");
  }
  if (!open && !mounted && transitionStatus === "ending") {
    setTransitionStatus(void 0);
  }
  useIsoLayoutEffect(() => {
    if (!open && mounted && transitionStatus !== "ending" && deferEndingState) {
      const frame = AnimationFrame.request(() => {
        setTransitionStatus("ending");
      });
      return () => {
        AnimationFrame.cancel(frame);
      };
    }
    return void 0;
  }, [open, mounted, transitionStatus, deferEndingState]);
  useIsoLayoutEffect(() => {
    if (!open || enableIdleState) {
      return void 0;
    }
    const frame = AnimationFrame.request(() => {
      setTransitionStatus(void 0);
    });
    return () => {
      AnimationFrame.cancel(frame);
    };
  }, [enableIdleState, open]);
  useIsoLayoutEffect(() => {
    if (!open || !enableIdleState) {
      return void 0;
    }
    if (open && mounted && transitionStatus !== "idle") {
      setTransitionStatus("starting");
    }
    const frame = AnimationFrame.request(() => {
      setTransitionStatus("idle");
    });
    return () => {
      AnimationFrame.cancel(frame);
    };
  }, [enableIdleState, open, mounted, transitionStatus]);
  return {
    mounted,
    setMounted,
    transitionStatus
  };
}

// node_modules/@base-ui/react/internals/TransitionStatusDataAttributes.mjs
var startingStyle = "data-starting-style";
var endingStyle = "data-ending-style";

// node_modules/@base-ui/react/internals/stateAttributesMapping.mjs
var STARTING_HOOK = {
  [startingStyle]: ""
};
var ENDING_HOOK = {
  [endingStyle]: ""
};
var transitionStatusMapping = {
  transitionStatus(value) {
    if (value === "starting") {
      return STARTING_HOOK;
    }
    if (value === "ending") {
      return ENDING_HOOK;
    }
    return null;
  }
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}

// node_modules/@base-ui/utils/owner.mjs
function ownerDocument(node) {
  return node?.ownerDocument || document;
}

// node_modules/@base-ui/react/internals/useOpenChangeComplete.mjs
var React12 = __toESM(require_react(), 1);

// node_modules/@base-ui/react/internals/useAnimationsFinished.mjs
var ReactDOM = __toESM(require_react_dom(), 1);

// node_modules/@base-ui/react/utils/resolveRef.mjs
function resolveRef(maybeRef) {
  if (maybeRef == null) {
    return maybeRef;
  }
  return "current" in maybeRef ? maybeRef.current : maybeRef;
}

// node_modules/@base-ui/react/internals/useAnimationsFinished.mjs
var pendingCallbacks = null;
function flushBeforePaint(fn) {
  if (!pendingCallbacks) {
    const callbacks = [];
    pendingCallbacks = callbacks;
    queueMicrotask(() => {
      pendingCallbacks = null;
      ReactDOM.flushSync(() => {
        for (const callback of callbacks) {
          callback();
        }
      });
    });
  }
  pendingCallbacks.push(fn);
}
function useAnimationsFinished(elementOrRef, waitForStartingStyleRemoved = false, batch = false) {
  const frame = useAnimationFrame();
  return useStableCallback((fnToExecute, signal = null) => {
    frame.cancel();
    const element = resolveRef(elementOrRef);
    if (element == null) {
      return;
    }
    const resolvedElement = element;
    const done = () => {
      if (!batch) {
        ReactDOM.flushSync(fnToExecute);
        return;
      }
      flushBeforePaint(() => {
        if (!signal?.aborted) {
          fnToExecute();
        }
      });
    };
    if (typeof resolvedElement.getAnimations !== "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
      fnToExecute();
      return;
    }
    function exec() {
      Promise.all(resolvedElement.getAnimations().map((animation) => animation.finished)).then(() => {
        if (!signal?.aborted) {
          done();
        }
      }, () => {
        if (signal?.aborted) {
          return;
        }
        const currentAnimations = resolvedElement.getAnimations();
        if (currentAnimations.some((animation) => animation.pending || animation.playState !== "finished")) {
          exec();
          return;
        }
        done();
      });
    }
    if (waitForStartingStyleRemoved) {
      const startingStyleAttribute = startingStyle;
      if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
        frame.request(exec);
        return;
      }
      const attributeObserver = new MutationObserver(() => {
        if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
          attributeObserver.disconnect();
          exec();
        }
      });
      attributeObserver.observe(resolvedElement, {
        attributes: true,
        attributeFilter: [startingStyleAttribute]
      });
      signal?.addEventListener("abort", () => attributeObserver.disconnect(), {
        once: true
      });
      return;
    }
    frame.request(exec);
  });
}

// node_modules/@base-ui/react/internals/useOpenChangeComplete.mjs
function useOpenChangeComplete(parameters) {
  const {
    enabled = true,
    open,
    ref,
    batch = false,
    onComplete: onCompleteParam
  } = parameters;
  const onComplete = useStableCallback(onCompleteParam);
  const runOnceAnimationsFinish = useAnimationsFinished(ref, open, batch);
  React12.useEffect(() => {
    if (!enabled) {
      return void 0;
    }
    const abortController = new AbortController();
    runOnceAnimationsFinish(onComplete, abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [enabled, open, onComplete, runOnceAnimationsFinish]);
}

// node_modules/@base-ui/utils/useTimeout.mjs
var EMPTY2 = 0;
var Timeout = class _Timeout {
  static create() {
    return new _Timeout();
  }
  currentId = EMPTY2;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(delay, fn) {
    this.clear();
    this.currentId = setTimeout(() => {
      this.currentId = EMPTY2;
      fn();
    }, delay);
  }
  isStarted() {
    return this.currentId !== EMPTY2;
  }
  clear = () => {
    if (this.currentId !== EMPTY2) {
      clearTimeout(this.currentId);
      this.currentId = EMPTY2;
    }
  };
  disposeEffect = () => {
    return this.clear;
  };
};
function useTimeout() {
  const timeout = useRefWithInit(Timeout.create).current;
  useOnMount(timeout.disposeEffect);
  return timeout;
}

// node_modules/@base-ui/utils/shadowDom.mjs
function activeElement(doc) {
  let element = doc.activeElement;
  while (element?.shadowRoot?.activeElement != null) {
    element = element.shadowRoot.activeElement;
  }
  return element;
}
function getTarget(event) {
  if ("composedPath" in event) {
    return event.composedPath()[0] ?? event.target;
  }
  return event.target;
}

// node_modules/@base-ui/react/internals/useValueChanged.mjs
var React13 = __toESM(require_react(), 1);
function useValueChanged(value, onChange) {
  const valueRef = React13.useRef(value);
  const onChangeCallback = useStableCallback(onChange);
  useIsoLayoutEffect(() => {
    if (valueRef.current !== value) {
      onChangeCallback(valueRef.current);
    }
    valueRef.current = value;
  }, [value, onChangeCallback]);
}

// node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs
var React14 = __toESM(require_react(), 1);

// node_modules/@base-ui/react/field/control/FieldControlDataAttributes.mjs
var valid = "data-valid";
var invalid = "data-invalid";

// node_modules/@base-ui/react/internals/field-constants/constants.mjs
var DEFAULT_VALIDITY_STATE = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: null,
  valueMissing: false
};
var DEFAULT_FIELD_STATE_ATTRIBUTES = {
  valid: null,
  touched: false,
  dirty: false,
  filled: false,
  focused: false
};
var DEFAULT_FIELD_ROOT_STATE = {
  disabled: false,
  ...DEFAULT_FIELD_STATE_ATTRIBUTES
};
var fieldValidityMapping = {
  valid(value) {
    if (value === null) {
      return null;
    }
    if (value) {
      return {
        [valid]: ""
      };
    }
    return {
      [invalid]: ""
    };
  }
};

// node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs
var DEFAULT_FIELD_ROOT_CONTEXT = {
  invalid: void 0,
  name: void 0,
  validityData: {
    state: DEFAULT_VALIDITY_STATE,
    errors: [],
    error: "",
    value: "",
    initialValue: null
  },
  setValidityData: NOOP,
  disabled: void 0,
  setTouched: NOOP,
  setDirty: NOOP,
  setFilled: NOOP,
  setFocused: NOOP,
  validationMode: "onSubmit",
  shouldValidateOnChange: () => false,
  state: DEFAULT_FIELD_ROOT_STATE,
  registerFieldControl: NOOP,
  validation: {
    getValidationProps: (_disabled, props = EMPTY_OBJECT) => props,
    inputRef: {
      current: null
    },
    registeredInputs: /* @__PURE__ */ new Map(),
    registerInput: NOOP,
    getInputControl: () => null,
    commit: async () => {
    },
    change: NOOP
  }
};
var FieldRootContext = /* @__PURE__ */ React14.createContext(DEFAULT_FIELD_ROOT_CONTEXT);
if (true) FieldRootContext.displayName = "FieldRootContext";
function useFieldRootContext(optional = true) {
  const context = React14.useContext(FieldRootContext);
  if (context.setValidityData === NOOP && !optional) {
    throw new Error(true ? "Base UI: FieldRootContext is missing. Field parts must be placed within <Field.Root>." : formatErrorMessage_default(28));
  }
  return context;
}

// node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs
function useRegisterFieldControl(controlRef, id, value, getFormValueOverride, enabled = true, name) {
  const {
    registerFieldControl
  } = useFieldRootContext();
  const sourceRef = useRefWithInit(() => /* @__PURE__ */ Symbol());
  useIsoLayoutEffect(() => {
    const source = sourceRef.current;
    if (!enabled) {
      registerFieldControl(source, void 0);
      return;
    }
    const registration = {
      controlRef,
      getValue: getFormValueOverride,
      id,
      name,
      value
    };
    registerFieldControl(source, registration);
  }, [controlRef, enabled, getFormValueOverride, id, name, registerFieldControl, sourceRef, value]);
  useIsoLayoutEffect(() => {
    const source = sourceRef.current;
    return () => {
      registerFieldControl(source, void 0);
    };
  }, [registerFieldControl, sourceRef]);
}

// node_modules/@base-ui/react/internals/form-context/FormContext.mjs
var React15 = __toESM(require_react(), 1);
var FormContext = /* @__PURE__ */ React15.createContext({
  elementRef: {
    current: null
  },
  formRef: {
    current: {
      fields: /* @__PURE__ */ new Map()
    }
  },
  errors: {},
  clearErrors: NOOP,
  validationMode: "onSubmit",
  submitCountRef: {
    current: 0
  }
});
if (true) FormContext.displayName = "FormContext";
function useFormContext() {
  return React15.useContext(FormContext);
}

// node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs
var React17 = __toESM(require_react(), 1);

// node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs
var React16 = __toESM(require_react(), 1);
var LabelableContext = /* @__PURE__ */ React16.createContext({
  controlId: void 0,
  registerControlId: NOOP,
  resetControlId: NOOP,
  labelId: void 0,
  setLabelId: NOOP,
  messageIds: [],
  setMessageIds: NOOP,
  getDescriptionProps: (externalProps) => externalProps
});
if (true) LabelableContext.displayName = "LabelableContext";
function useLabelableContext() {
  return React16.useContext(LabelableContext);
}

// node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs
function useLabelableId(params = {}) {
  const {
    id,
    enabled = true
  } = params;
  const {
    controlId,
    registerControlId,
    resetControlId
  } = useLabelableContext();
  const defaultId = useBaseUiId();
  const controlSourceRef = useRefWithInit(() => /* @__PURE__ */ Symbol());
  const hasRegisteredRef = React17.useRef(false);
  const hadExplicitIdRef = React17.useRef(false);
  const unregisterControlId = useStableCallback(() => {
    if (!hasRegisteredRef.current || registerControlId === NOOP) {
      return;
    }
    hasRegisteredRef.current = false;
    registerControlId(controlSourceRef.current, void 0);
  });
  useIsoLayoutEffect(() => {
    if (!enabled || registerControlId === NOOP) {
      unregisterControlId();
      return void 0;
    }
    let nextId;
    if (id !== void 0) {
      hadExplicitIdRef.current = true;
      nextId = id;
    } else if (hadExplicitIdRef.current) {
      nextId = defaultId;
    } else {
      resetControlId();
      return void 0;
    }
    if (nextId === void 0) {
      unregisterControlId();
      return void 0;
    }
    hasRegisteredRef.current = true;
    registerControlId(controlSourceRef.current, nextId);
    return void 0;
  }, [id, enabled, registerControlId, resetControlId, defaultId, controlSourceRef, unregisterControlId]);
  useIsoLayoutEffect(() => {
    return unregisterControlId;
  }, [unregisterControlId]);
  return (enabled ? controlId : void 0) ?? id ?? defaultId;
}

// node_modules/@base-ui/react/field/item/FieldItemContext.mjs
var React18 = __toESM(require_react(), 1);
var FieldItemContext = /* @__PURE__ */ React18.createContext({
  disabled: false
});
if (true) FieldItemContext.displayName = "FieldItemContext";
function useFieldItemContext() {
  const context = React18.useContext(FieldItemContext);
  return context;
}

// node_modules/@base-ui/react/field/root/useFieldValidation.mjs
var React19 = __toESM(require_react(), 1);

// node_modules/@base-ui/react/field/utils/getCombinedFieldValidityData.mjs
function getCombinedFieldValidityData(validityData, invalid2) {
  return {
    ...validityData,
    state: {
      ...validityData.state,
      valid: !invalid2 && validityData.state.valid
    }
  };
}

// node_modules/@base-ui/react/field/root/useFieldValidation.mjs
var validityKeys = Object.keys(DEFAULT_VALIDITY_STATE);
function isEligibleInput(input, formElement) {
  if (input.matches(":disabled")) {
    return false;
  }
  if (!formElement || input.form === formElement) {
    return true;
  }
  return input.form === null && !input.hasAttribute("form");
}
function findRepresentativeInput(inputs, formElement) {
  let fallback = null;
  for (const input of inputs.keys()) {
    if (!isEligibleInput(input, formElement)) {
      continue;
    }
    if (!input.validity.valid) {
      return input;
    }
    fallback ??= input;
  }
  return fallback;
}
function makeState(customError) {
  return {
    ...DEFAULT_VALIDITY_STATE,
    valid: !customError,
    customError
  };
}
function getNativeErrors(element) {
  return element && element.validationMessage ? [element.validationMessage] : [];
}
function useFieldValidation(params) {
  const {
    elementRef,
    formRef
  } = useFormContext();
  const {
    setValidityData,
    validate,
    validityData,
    validationDebounceTime,
    invalid: invalid2,
    markedDirtyRef,
    state,
    shouldValidateOnChange,
    validationMode,
    registeredFieldIdRef
  } = params;
  const {
    controlId,
    getDescriptionProps
  } = useLabelableContext();
  const timeout = useTimeout();
  const inputRef = React19.useRef(null);
  const registeredInputs = useRefWithInit(() => /* @__PURE__ */ new Map()).current;
  const validationCommitIdRef = React19.useRef(0);
  const customValidityRef = React19.useRef(null);
  const registerInput = React19.useCallback((element, registration) => {
    registeredInputs.set(element, registration);
    return () => {
      registeredInputs.delete(element);
    };
  }, [registeredInputs]);
  const getInputControl = useStableCallback(() => {
    const element = findRepresentativeInput(registeredInputs, elementRef.current);
    return element && registeredInputs.get(element)?.controlRef.current || null;
  });
  const commit = useStableCallback(async (value, revalidate = false) => {
    validationCommitIdRef.current += 1;
    const validationCommitId = validationCommitIdRef.current;
    function updateRegisteredFieldValidity(nextValidityData, externalInvalid = invalid2) {
      const fieldId = registeredFieldIdRef.current ?? controlId;
      if (fieldId == null) {
        return;
      }
      const currentFieldData = formRef.current.fields.get(fieldId);
      if (!currentFieldData) {
        return;
      }
      const validityDataWithFormErrors = getCombinedFieldValidityData(nextValidityData, externalInvalid);
      formRef.current.fields.set(fieldId, {
        ...currentFieldData,
        validityData: validityDataWithFormErrors
      });
    }
    function makeValidityData(validityState, errorMessages) {
      const errors = validityState.valid === false ? errorMessages : [];
      return {
        value,
        state: validityState,
        error: errors[0] ?? "",
        errors,
        initialValue: validityData.initialValue
      };
    }
    function setCustomValidity(element2, message) {
      const displaced = element2.validity.customError ? element2.validationMessage : "";
      const ownedMessage = message.replace(/\r\n?/g, "\n");
      element2.setCustomValidity(ownedMessage);
      customValidityRef.current = [element2, ownedMessage, displaced];
    }
    function clearCustomValidity() {
      const record = customValidityRef.current;
      customValidityRef.current = null;
      if (record && (!record[0].willValidate || record[0].validationMessage === record[1])) {
        record[0].setCustomValidity(record[2]);
      }
    }
    function publish(validityState, errorMessages, externalInvalid) {
      const nextValidityData = makeValidityData(validityState, errorMessages);
      updateRegisteredFieldValidity(nextValidityData, externalInvalid);
      setValidityData(nextValidityData);
    }
    function getState(el) {
      const computedState = validityKeys.reduce((acc, key) => {
        acc[key] = el.validity[key];
        return acc;
      }, {});
      let hasOnlyValueMissingError = false;
      for (const key of validityKeys) {
        if (key === "valid") {
          continue;
        }
        if (key === "valueMissing" && computedState[key]) {
          hasOnlyValueMissingError = true;
        } else if (computedState[key]) {
          return computedState;
        }
      }
      if (hasOnlyValueMissingError && !markedDirtyRef.current) {
        computedState.valid = true;
        computedState.valueMissing = false;
      }
      return computedState;
    }
    function resolveRepresentativeInput() {
      return registeredInputs.size > 0 ? findRepresentativeInput(registeredInputs, elementRef.current) : inputRef.current;
    }
    let element = resolveRepresentativeInput();
    function refreshState() {
      element = resolveRepresentativeInput();
      return element?.willValidate ? getState(element) : makeState(false);
    }
    if (revalidate) {
      if (state.valid !== false || !element) {
        return;
      }
      if (!element.validity.valueMissing) {
        clearCustomValidity();
        const currentElement = resolveRepresentativeInput();
        const foreign = currentElement?.validity.customError ? getNativeErrors(currentElement) : [];
        publish(makeState(foreign.length > 0), foreign, false);
        return;
      }
      for (const key of validityKeys) {
        if (key !== "valid" && key !== "valueMissing" && key !== "customError" && element.validity[key]) {
          return;
        }
      }
    }
    timeout.clear();
    clearCustomValidity();
    let nextState = refreshState();
    let validationErrors = getNativeErrors(element);
    const isValidatingOnChange = shouldValidateOnChange();
    if (validationErrors.length === 0 || isValidatingOnChange) {
      const formValues = Array.from(formRef.current.fields.values()).reduce((acc, field) => {
        if (field.name) {
          acc[field.name] = field.getValue();
        }
        return acc;
      }, {});
      const resultOrPromise = validate(value, formValues);
      let result;
      if (typeof resultOrPromise === "object" && resultOrPromise !== null && "then" in resultOrPromise) {
        if (nextState.valid === false) {
          publish(nextState, validationErrors);
        } else if (validationMode === "onSubmit" || !validityData.state.customError) {
          nextState.valid = null;
          publish(nextState, validationErrors);
        }
        result = await resultOrPromise;
        if (validationCommitId !== validationCommitIdRef.current) {
          return;
        }
        nextState = refreshState();
      } else {
        result = resultOrPromise;
      }
      validationErrors = result ? [].concat(result).filter(Boolean) : [];
      if (validationErrors.length > 0) {
        nextState.valid = false;
        nextState.customError = true;
        if (element?.willValidate) {
          setCustomValidity(element, validationErrors.join("\n"));
        }
      } else {
        validationErrors = getNativeErrors(element);
      }
    }
    publish(nextState, validationErrors);
  });
  const change = useStableCallback((value, cancelPending = false) => {
    timeout.clear();
    validationCommitIdRef.current += 1;
    if (cancelPending) {
      return;
    }
    const validateOnChange = shouldValidateOnChange();
    if (validateOnChange && value !== "" && validationDebounceTime) {
      timeout.start(validationDebounceTime, () => {
        commit(value);
      });
    } else {
      commit(value, !validateOnChange);
    }
  });
  const getValidationProps = React19.useCallback((disabled2, externalProps = {}) => mergeProps(getDescriptionProps(externalProps), state.valid === false && !state.disabled && !disabled2 ? {
    "aria-invalid": true
  } : EMPTY_OBJECT), [getDescriptionProps, state.disabled, state.valid]);
  return React19.useMemo(() => ({
    getValidationProps,
    inputRef,
    registeredInputs,
    registerInput,
    getInputControl,
    commit,
    change
  }), [getValidationProps, registeredInputs, registerInput, getInputControl, commit, change]);
}

// node_modules/@base-ui/react/utils/useRegisteredLabelId.mjs
function useRegisteredLabelId(idProp, setLabelId) {
  const id = useBaseUiId(idProp);
  useIsoLayoutEffect(() => {
    setLabelId(id);
    return () => {
      setLabelId((currentId) => currentId === id ? void 0 : currentId);
    };
  }, [id, setLabelId]);
  return id;
}

// node_modules/@base-ui/react/internals/labelable-provider/useLabel.mjs
function useLabel(params = {}) {
  const {
    id: idProp,
    fallbackControlId,
    native = false,
    setLabelId: setLabelIdProp,
    focusControl: focusControlProp
  } = params;
  const {
    controlId: contextControlId,
    setLabelId: setContextLabelId
  } = useLabelableContext();
  const syncLabelId = useStableCallback((nextLabelId) => {
    setContextLabelId(nextLabelId);
    setLabelIdProp?.(nextLabelId);
  });
  const id = useRegisteredLabelId(idProp, syncLabelId);
  const resolvedControlId = contextControlId ?? fallbackControlId;
  function focusControl(event) {
    if (focusControlProp) {
      focusControlProp(event, resolvedControlId);
      return;
    }
    if (!resolvedControlId) {
      return;
    }
    const controlElement = ownerDocument(event.currentTarget).getElementById(resolvedControlId);
    if (isHTMLElement(controlElement)) {
      focusElementWithVisible(controlElement);
    }
  }
  function handleInteraction(event) {
    const target = getTarget(event.nativeEvent);
    if (target?.closest("button,input,select,textarea")) {
      return;
    }
    if (!event.defaultPrevented && event.detail > 1) {
      event.preventDefault();
    }
    if (native) {
      return;
    }
    focusControl(event);
  }
  return native ? {
    id,
    htmlFor: resolvedControlId,
    onMouseDown: handleInteraction
  } : {
    id,
    onClick: handleInteraction,
    onPointerDown(event) {
      event.preventDefault();
    }
  };
}
function focusElementWithVisible(element) {
  element.focus({
    // Available from Chrome 144+ (January 2026).
    // Safari and Firefox already support it.
    focusVisible: true
  });
}

// node_modules/@base-ui/react/field/index.parts.mjs
var index_parts_exports = {};
__export(index_parts_exports, {
  Control: () => FieldControl,
  Description: () => FieldDescription,
  Error: () => FieldError,
  Item: () => FieldItem,
  Label: () => FieldLabel,
  Root: () => FieldRoot,
  Validity: () => FieldValidity
});

// node_modules/@base-ui/react/field/root/FieldRoot.mjs
var React23 = __toESM(require_react(), 1);

// node_modules/@base-ui/react/fieldset/root/FieldsetRootContext.mjs
var React20 = __toESM(require_react(), 1);
var FieldsetRootContext = /* @__PURE__ */ React20.createContext(void 0);
if (true) FieldsetRootContext.displayName = "FieldsetRootContext";
function useFieldsetRootContext(optional = false) {
  const context = React20.useContext(FieldsetRootContext);
  if (!context && !optional) {
    throw new Error(true ? "Base UI: FieldsetRootContext is missing. Fieldset parts must be placed within <Fieldset.Root>." : formatErrorMessage_default(86));
  }
  return context;
}

// node_modules/@base-ui/react/internals/labelable-provider/LabelableProvider.mjs
var React21 = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var LabelableProvider = function LabelableProvider2(props) {
  const defaultId = useBaseUiId();
  const [controlIdState, setControlIdState] = React21.useState(defaultId);
  const [labelId, setLabelId] = React21.useState();
  const [messageIds, setMessageIds] = React21.useState([]);
  const controlId = controlIdState === void 0 ? defaultId : controlIdState;
  const registrationsRef = useRefWithInit(() => /* @__PURE__ */ new Map());
  const {
    messageIds: parentMessageIds
  } = useLabelableContext();
  const registerControlId = useStableCallback((source, nextId) => {
    const registrations = registrationsRef.current;
    if (nextId === void 0) {
      registrations.delete(source);
    } else {
      registrations.set(source, nextId);
    }
    setControlIdState((prev) => {
      if (registrations.size === 0) {
        return prev;
      }
      let nextControlId;
      for (const id of registrations.values()) {
        if (id === prev) {
          return prev;
        }
        if (nextControlId === void 0) {
          nextControlId = id;
        }
      }
      return nextControlId;
    });
  });
  const resetControlId = useStableCallback(() => {
    if (registrationsRef.current.size === 0) {
      setControlIdState(defaultId);
    }
  });
  const getDescriptionProps = React21.useCallback((externalProps) => {
    const ids = externalProps["aria-describedby"] ? externalProps["aria-describedby"].split(" ") : [];
    ids.push(...parentMessageIds, ...messageIds);
    return {
      ...externalProps,
      "aria-describedby": Array.from(new Set(ids)).join(" ") || void 0
    };
  }, [parentMessageIds, messageIds]);
  const contextValue = React21.useMemo(() => ({
    controlId,
    registerControlId,
    resetControlId,
    labelId,
    setLabelId,
    messageIds,
    setMessageIds,
    getDescriptionProps
  }), [controlId, registerControlId, resetControlId, labelId, setLabelId, messageIds, setMessageIds, getDescriptionProps]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelableContext.Provider, {
    value: contextValue,
    children: props.children
  });
};
if (true) LabelableProvider.displayName = "LabelableProvider";

// node_modules/@base-ui/react/internals/field-register-control/useFieldControlRegistration.mjs
var React22 = __toESM(require_react(), 1);
function useFieldControlRegistration(params) {
  const {
    change,
    commit,
    invalid: invalid2,
    markedDirtyRef,
    name,
    setRegisteredFieldName,
    registeredFieldIdRef,
    setValidityData,
    validityData
  } = params;
  const {
    formRef
  } = useFormContext();
  const activeFieldControlSourceRef = React22.useRef(null);
  const registrationRef = React22.useRef(null);
  const initialValueCapturedRef = React22.useRef(false);
  const getValueForForm = useStableCallback(() => {
    const registration = registrationRef.current;
    if (!registration) {
      return void 0;
    }
    if (registration.getValue) {
      return registration.getValue();
    }
    return registration.value;
  });
  function getRegistrationValue(registration) {
    return registration.value === void 0 ? getValueForForm() : registration.value;
  }
  const validate = useStableCallback(() => {
    const registration = registrationRef.current;
    markedDirtyRef.current = true;
    if (!registration) {
      commit(validityData.value);
      return;
    }
    commit(getRegistrationValue(registration));
  });
  function refreshRegistration() {
    const registration = registrationRef.current;
    if (!registration || !registration.id) {
      return;
    }
    formRef.current.fields.set(registration.id, {
      getValue: getValueForForm,
      name: name ?? registration.name,
      controlRef: registration.controlRef,
      validityData: getCombinedFieldValidityData(validityData, invalid2),
      validate
    });
  }
  function deleteRegistration(id = registrationRef.current?.id) {
    if (id) {
      formRef.current.fields.delete(id);
    }
  }
  function captureInitialValue(registration) {
    if (initialValueCapturedRef.current) {
      return;
    }
    initialValueCapturedRef.current = true;
    const initialValue = getRegistrationValue(registration);
    setValidityData((prev) => prev.initialValue === initialValue ? prev : {
      ...prev,
      initialValue
    });
  }
  useIsoLayoutEffect(() => {
    const registration = registrationRef.current;
    if (!registration || !registration.id) {
      return;
    }
    setRegisteredFieldName(name ? void 0 : registration.name);
    formRef.current.fields.set(registration.id, {
      getValue: getValueForForm,
      name: name ?? registration.name,
      controlRef: registration.controlRef,
      validityData: getCombinedFieldValidityData(validityData, invalid2),
      validate
    });
  }, [formRef, getValueForForm, invalid2, name, setRegisteredFieldName, validate, validityData]);
  useIsoLayoutEffect(() => {
    const fields = formRef.current.fields;
    return () => {
      const id = registrationRef.current?.id;
      if (id) {
        fields.delete(id);
      }
    };
  }, [formRef]);
  const register = useStableCallback((source, registration) => {
    if (!registration) {
      if (activeFieldControlSourceRef.current === source) {
        activeFieldControlSourceRef.current = null;
        change(void 0, true);
        deleteRegistration();
        registrationRef.current = null;
        setRegisteredFieldName(void 0);
        registeredFieldIdRef.current = void 0;
      }
      return;
    }
    const previousId = registrationRef.current?.id;
    const previousSource = activeFieldControlSourceRef.current;
    if (previousSource && previousSource !== source) {
      change(void 0, true);
    }
    activeFieldControlSourceRef.current = source;
    registrationRef.current = registration;
    if (!name) {
      setRegisteredFieldName(registration.name);
    }
    registeredFieldIdRef.current = registration.id;
    if (previousId && previousId !== registration.id) {
      deleteRegistration(previousId);
    }
    captureInitialValue(registration);
    refreshRegistration();
  });
  return [validate, register];
}

// node_modules/@base-ui/react/field/root/FieldRoot.mjs
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var FieldRootInner = /* @__PURE__ */ React23.forwardRef(function FieldRootInner2(componentProps, forwardedRef) {
  const {
    errors,
    validationMode: formValidationMode,
    submitCountRef
  } = useFormContext();
  const {
    render,
    className,
    validate: validateProp,
    validationDebounceTime = 0,
    validationMode = formValidationMode,
    name,
    disabled: disabledProp = false,
    invalid: invalidProp,
    dirty: dirtyProp,
    touched: touchedProp,
    actionsRef,
    style,
    ...elementProps
  } = componentProps;
  const disabledFieldset = useFieldsetRootContext(true)?.disabled;
  const validate = useStableCallback(validateProp || (() => null));
  const disabled2 = disabledFieldset || disabledProp;
  const [touchedState, setTouchedUnwrapped] = React23.useState(false);
  const [dirtyState, setDirtyUnwrapped] = React23.useState(false);
  const [filled, setFilled] = React23.useState(false);
  const [focused, setFocused] = React23.useState(false);
  const dirty = dirtyProp ?? dirtyState;
  const touched = touchedProp ?? touchedState;
  const markedDirtyRef = React23.useRef(dirty);
  const registeredFieldIdRef = React23.useRef(void 0);
  const [registeredFieldName, setRegisteredFieldName] = React23.useState();
  const effectiveName = name ?? registeredFieldName;
  useIsoLayoutEffect(() => {
    if (dirtyProp !== void 0) {
      markedDirtyRef.current = dirtyProp;
    }
  }, [dirtyProp]);
  const setDirty = useStableCallback((value) => {
    if (dirtyProp !== void 0) {
      return;
    }
    if (value) {
      markedDirtyRef.current = true;
    }
    setDirtyUnwrapped(value);
  });
  const setTouched = useStableCallback((value) => {
    if (touchedProp !== void 0) {
      return;
    }
    setTouchedUnwrapped(value);
  });
  const shouldValidateOnChange = useStableCallback(() => validationMode === "onChange" || validationMode === "onSubmit" && submitCountRef.current > 0);
  const formError = effectiveName && Object.hasOwn(errors, effectiveName) ? errors[effectiveName] : null;
  const hasFormError = !!(Array.isArray(formError) ? formError.length : formError);
  const invalid2 = invalidProp === true || hasFormError;
  const [validityData, setValidityData] = React23.useState({
    state: DEFAULT_VALIDITY_STATE,
    error: "",
    errors: [],
    value: null,
    initialValue: null
  });
  const valid2 = !invalid2 && (disabled2 ? null : validityData.state.valid);
  const state = React23.useMemo(() => ({
    disabled: disabled2,
    touched,
    dirty,
    valid: valid2,
    filled,
    focused
  }), [disabled2, touched, dirty, valid2, filled, focused]);
  const validation = useFieldValidation({
    setValidityData,
    validate,
    validityData,
    validationDebounceTime,
    invalid: invalid2,
    markedDirtyRef,
    state,
    shouldValidateOnChange,
    validationMode,
    registeredFieldIdRef
  });
  const [validateFieldControl, registerFieldControl] = useFieldControlRegistration({
    change: validation.change,
    commit: validation.commit,
    invalid: invalid2,
    markedDirtyRef,
    name,
    setRegisteredFieldName,
    registeredFieldIdRef,
    setValidityData,
    validityData
  });
  React23.useImperativeHandle(actionsRef, () => ({
    validate: validateFieldControl
  }), [validateFieldControl]);
  const contextValue = React23.useMemo(() => ({
    invalid: invalid2,
    name: effectiveName,
    validityData,
    setValidityData,
    disabled: disabled2,
    setTouched,
    setDirty,
    setFilled,
    setFocused,
    validationMode,
    shouldValidateOnChange,
    state,
    registerFieldControl,
    validation
  }), [invalid2, effectiveName, validityData, disabled2, setTouched, setDirty, setFilled, setFocused, validationMode, shouldValidateOnChange, state, registerFieldControl, validation]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    state,
    props: elementProps,
    stateAttributesMapping: fieldValidityMapping
  });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FieldRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (true) FieldRootInner.displayName = "FieldRootInner";
var FieldRoot = /* @__PURE__ */ React23.forwardRef(function FieldRoot2(componentProps, forwardedRef) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LabelableProvider, {
    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FieldRootInner, {
      ...componentProps,
      ref: forwardedRef
    })
  });
});
if (true) FieldRoot.displayName = "FieldRoot";

// node_modules/@base-ui/react/field/label/FieldLabel.mjs
var React24 = __toESM(require_react(), 1);
var FieldLabel = /* @__PURE__ */ React24.forwardRef(function FieldLabel2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    id: idProp,
    nativeLabel = true,
    ...elementProps
  } = componentProps;
  const fieldRootContext = useFieldRootContext(false);
  const fieldItemContext = useFieldItemContext();
  const {
    labelId
  } = useLabelableContext();
  const state = {
    ...fieldRootContext.state,
    disabled: fieldRootContext.disabled || fieldItemContext.disabled
  };
  const labelRef = React24.useRef(null);
  const labelProps = useLabel({
    id: labelId ?? idProp,
    native: nativeLabel
  });
  if (true) {
    React24.useEffect(() => {
      if (!labelRef.current) {
        return;
      }
      const isLabelTag = labelRef.current.tagName === "LABEL";
      if (nativeLabel) {
        if (!isLabelTag) {
          const ownerStackMessage = SafeReact.captureOwnerStack?.() || "";
          const message = "<Field.Label> expected a <label> element because the `nativeLabel` prop is true. Rendering a non-<label> disables native label association, so `htmlFor` will not work. Use a real <label> in the `render` prop, or set `nativeLabel` to `false`.";
          error(`${message}${ownerStackMessage}`);
        }
      } else if (isLabelTag) {
        const ownerStackMessage = SafeReact.captureOwnerStack?.() || "";
        const message = "<Field.Label> expected a non-<label> element because the `nativeLabel` prop is false. Rendering a <label> assumes native label behavior while Base UI treats it as non-native, which can cause unexpected pointer behavior. Use a non-<label> in the `render` prop, or set `nativeLabel` to `true`.";
        error(`${message}${ownerStackMessage}`);
      }
    }, [nativeLabel]);
  }
  const element = useRenderElement("label", componentProps, {
    ref: [forwardedRef, labelRef],
    state,
    props: [labelProps, elementProps],
    stateAttributesMapping: fieldValidityMapping
  });
  return element;
});
if (true) FieldLabel.displayName = "FieldLabel";

// node_modules/@base-ui/react/field/error/FieldError.mjs
var React25 = __toESM(require_react(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var stateAttributesMapping = {
  ...fieldValidityMapping,
  ...transitionStatusMapping
};
var FieldError = /* @__PURE__ */ React25.forwardRef(function FieldError2(componentProps, forwardedRef) {
  const {
    render,
    id: idProp,
    className,
    match,
    style,
    ...elementProps
  } = componentProps;
  const id = useBaseUiId(idProp);
  const {
    validityData,
    state: fieldState,
    name
  } = useFieldRootContext(false);
  const {
    setMessageIds
  } = useLabelableContext();
  const {
    errors
  } = useFormContext();
  const formError = name && Object.hasOwn(errors, name) ? errors[name] : null;
  const hasFormError = !!(Array.isArray(formError) ? formError.length : formError);
  const hasSpecificMatch = typeof match === "string";
  let rendered = false;
  if (match === true) {
    rendered = true;
  } else if (fieldState.disabled) {
    rendered = false;
  } else if (hasSpecificMatch) {
    rendered = Boolean(validityData.state[match]);
  } else {
    rendered = hasFormError || validityData.state.valid === false;
  }
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(rendered);
  useIsoLayoutEffect(() => {
    if (!rendered || !id) {
      return void 0;
    }
    setMessageIds((v) => v.concat(id));
    return () => {
      setMessageIds((v) => v.filter((item) => item !== id));
    };
  }, [rendered, id, setMessageIds]);
  const errorRef = React25.useRef(null);
  const [lastRenderedMessage, setLastRenderedMessage] = React25.useState(null);
  const [lastRenderedMessageKey, setLastRenderedMessageKey] = React25.useState(null);
  let error2 = validityData.error;
  if (!hasSpecificMatch && hasFormError) {
    error2 = formError;
  } else if (validityData.errors.length > 1) {
    error2 = validityData.errors;
  }
  let errorMessage = error2;
  if (Array.isArray(error2)) {
    errorMessage = error2.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("ul", {
      children: error2.map((message) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", {
        children: message
      }, message))
    }) : error2[0];
  }
  const errorKey = Array.isArray(error2) ? JSON.stringify(error2) : error2;
  if (rendered && errorKey !== lastRenderedMessageKey) {
    setLastRenderedMessageKey(errorKey);
    setLastRenderedMessage(errorMessage);
  }
  useOpenChangeComplete({
    open: rendered,
    ref: errorRef,
    onComplete() {
      if (!rendered) {
        setMounted(false);
      }
    }
  });
  const state = {
    ...fieldState,
    transitionStatus
  };
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, errorRef],
    state,
    props: [{
      id,
      children: rendered ? errorMessage : lastRenderedMessage
    }, elementProps],
    stateAttributesMapping,
    enabled: mounted
  });
  if (!mounted) {
    return null;
  }
  return element;
});
if (true) FieldError.displayName = "FieldError";

// node_modules/@base-ui/react/field/description/FieldDescription.mjs
var React26 = __toESM(require_react(), 1);
var FieldDescription = /* @__PURE__ */ React26.forwardRef(function FieldDescription2(componentProps, forwardedRef) {
  const {
    render,
    id: idProp,
    className,
    style,
    ...elementProps
  } = componentProps;
  const id = useBaseUiId(idProp);
  const fieldRootContext = useFieldRootContext(false);
  const fieldItemContext = useFieldItemContext();
  const {
    setMessageIds
  } = useLabelableContext();
  const state = {
    ...fieldRootContext.state,
    disabled: fieldRootContext.disabled || fieldItemContext.disabled
  };
  useIsoLayoutEffect(() => {
    if (!id) {
      return void 0;
    }
    setMessageIds((v) => v.concat(id));
    return () => {
      setMessageIds((v) => v.filter((item) => item !== id));
    };
  }, [id, setMessageIds]);
  const element = useRenderElement("p", componentProps, {
    ref: forwardedRef,
    state,
    props: [{
      id
    }, elementProps],
    stateAttributesMapping: fieldValidityMapping
  });
  return element;
});
if (true) FieldDescription.displayName = "FieldDescription";

// node_modules/@base-ui/react/field/control/FieldControl.mjs
var React27 = __toESM(require_react(), 1);
var FieldControl = /* @__PURE__ */ React27.forwardRef(function FieldControl2(componentProps, forwardedRef) {
  const {
    render,
    className,
    id: idProp,
    name: nameProp,
    value: valueProp,
    disabled: disabledProp = false,
    onValueChange,
    defaultValue,
    autoFocus = false,
    style,
    ...elementProps
  } = componentProps;
  const {
    state: fieldState,
    name: fieldName,
    disabled: fieldDisabled,
    setTouched,
    setDirty,
    validityData,
    setFocused,
    setFilled,
    validationMode,
    validation
  } = useFieldRootContext();
  const {
    clearErrors,
    elementRef: formElementRef,
    submitCountRef
  } = useFormContext();
  const disabled2 = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const state = {
    ...fieldState,
    disabled: disabled2
  };
  const {
    labelId
  } = useLabelableContext();
  const id = useLabelableId({
    id: idProp
  });
  const [valueUnwrapped] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "FieldControl",
    state: "value"
  });
  const isControlled = valueProp !== void 0;
  const value = isControlled ? valueUnwrapped : void 0;
  const serializedValue = value == null ? void 0 : String(value);
  const getValueFromInput = useStableCallback(() => validation.inputRef.current?.value);
  useRegisterFieldControl(validation.inputRef, id, serializedValue, getValueFromInput, !disabled2, nameProp);
  useIsoLayoutEffect(() => {
    const currentValue = serializedValue ?? validation.inputRef.current?.value;
    if (currentValue !== void 0) {
      setFilled(currentValue !== "");
    }
  }, [serializedValue, validation.inputRef, setFilled]);
  useValueChanged(serializedValue, () => {
    if (serializedValue === void 0) {
      return;
    }
    clearErrors(name);
    setDirty(serializedValue !== (validityData.initialValue ?? ""));
    validation.change(serializedValue);
  });
  const inputRef = React27.useRef(null);
  const enterValidationTimeout = useTimeout();
  useIsoLayoutEffect(() => {
    if (autoFocus && inputRef.current === activeElement(ownerDocument(inputRef.current))) {
      setFocused(true);
    }
  }, [autoFocus, setFocused]);
  const element = useRenderElement("input", componentProps, {
    ref: [forwardedRef, inputRef],
    state,
    props: [{
      id,
      disabled: disabled2,
      name,
      ref: validation.inputRef,
      "aria-labelledby": labelId,
      autoFocus,
      ...isControlled ? {
        value
      } : {
        defaultValue
      },
      onChange(event) {
        const inputValue = event.currentTarget.value;
        const details = createChangeEventDetails(reason_parts_exports.none, event.nativeEvent);
        onValueChange?.(inputValue, details);
        if (isControlled) {
          return;
        }
        setDirty(inputValue !== (validityData.initialValue ?? ""));
        setFilled(inputValue !== "");
        if (!event.nativeEvent.defaultPrevented && !details.isCanceled) {
          clearErrors(name);
          validation.change(inputValue);
        }
      },
      onFocus() {
        setFocused(true);
      },
      onBlur(event) {
        setTouched(true);
        setFocused(false);
        if (validationMode === "onBlur") {
          const inputValue = event.currentTarget.value;
          validation.commit(inputValue);
          if (isControlled) {
            queueMicrotask(() => {
              const nextValue = validation.inputRef.current?.value;
              if (nextValue !== void 0 && nextValue !== inputValue && nextValue !== (validityData.initialValue ?? "")) {
                validation.commit(nextValue);
              }
            });
          }
        }
      },
      onKeyDown(event) {
        if (event.currentTarget.tagName === "INPUT" && event.key === "Enter") {
          setTouched(true);
          const value2 = event.currentTarget.value;
          const form = event.currentTarget.form;
          if (form && form === formElementRef.current && !event.defaultPrevented) {
            const input = event.currentTarget;
            const submitCount = submitCountRef.current;
            enterValidationTimeout.start(0, () => {
              if (submitCountRef.current === submitCount) {
                validation.commit(input.value);
              }
            });
          } else {
            validation.commit(value2);
          }
        }
      }
    }, elementProps, (props) => validation.getValidationProps(disabled2, props)],
    stateAttributesMapping: fieldValidityMapping
  });
  return element;
});
if (true) FieldControl.displayName = "FieldControl";

// node_modules/@base-ui/react/field/validity/FieldValidity.mjs
var React28 = __toESM(require_react(), 1);
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var FieldValidity = function FieldValidity2(props) {
  const {
    children
  } = props;
  const {
    validityData,
    invalid: invalid2
  } = useFieldRootContext(false);
  const combinedFieldValidityData = React28.useMemo(() => getCombinedFieldValidityData(validityData, invalid2), [validityData, invalid2]);
  const isInvalid = combinedFieldValidityData.state.valid === false;
  const {
    transitionStatus
  } = useTransitionStatus(isInvalid);
  const fieldValidityState = React28.useMemo(() => {
    return {
      ...combinedFieldValidityData,
      validity: combinedFieldValidityData.state,
      transitionStatus
    };
  }, [combinedFieldValidityData, transitionStatus]);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(React28.Fragment, {
    children: children(fieldValidityState)
  });
};
if (true) FieldValidity.displayName = "FieldValidity";

// node_modules/@base-ui/react/field/item/FieldItem.mjs
var React29 = __toESM(require_react(), 1);
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var FieldItem = /* @__PURE__ */ React29.forwardRef(function FieldItem2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    disabled: disabledProp = false,
    ...elementProps
  } = componentProps;
  const {
    state: fieldState,
    disabled: rootDisabled
  } = useFieldRootContext(false);
  const disabled2 = rootDisabled || disabledProp;
  const state = {
    ...fieldState,
    disabled: disabled2
  };
  const fieldItemContext = React29.useMemo(() => ({
    disabled: disabled2
  }), [disabled2]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    state,
    props: elementProps,
    stateAttributesMapping: fieldValidityMapping
  });
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(LabelableProvider, {
    children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(FieldItemContext.Provider, {
      value: fieldItemContext,
      children: element
    })
  });
});
if (true) FieldItem.displayName = "FieldItem";

// node_modules/@base-ui/react/input/Input.mjs
var React30 = __toESM(require_react(), 1);
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var Input = /* @__PURE__ */ React30.forwardRef(function Input2(props, forwardedRef) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(index_parts_exports.Control, {
    ref: forwardedRef,
    ...props
  });
});
if (true) Input.displayName = "Input";

// node_modules/@base-ui/react/use-render/useRender.mjs
function useRender(params) {
  return useRenderElement(params.defaultTagName ?? "div", params, params);
}

// node_modules/@wordpress/ui/build-module/text/text.mjs
var import_element = __toESM(require_element(), 1);
var STYLE_HASH_ATTRIBUTE = "data-wp-hash";
function getRuntime() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument(targetDocument) {
  const runtime = getRuntime();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle(hash, css) {
  const runtime = getRuntime();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle("3167e7d116", '@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._83ed8a8da5dd50ea__text{text-wrap:pretty;margin:0}._14437cfb77831647__heading-2xl{--_gcd-heading-font-size:var(--wpds-typography-font-size-2xl,32px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-emphasis,600);--_gcd-p-font-size:var(--wpds-typography-font-size-2xl,32px);--_gcd-p-line-height:var(--wpds-typography-line-height-2xl,40px);font-size:var(--wpds-typography-font-size-2xl,32px);line-height:var(--wpds-typography-line-height-2xl,40px)}._14437cfb77831647__heading-2xl,._3c78b7fa9b4072dd__heading-xl{font-family:var(--wpds-typography-font-family-heading,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-weight:var(--wpds-typography-font-weight-emphasis,600)}._3c78b7fa9b4072dd__heading-xl{--_gcd-heading-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-emphasis,600);--_gcd-p-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-p-line-height:var(--wpds-typography-line-height-md,24px);font-size:var(--wpds-typography-font-size-xl,20px);line-height:var(--wpds-typography-line-height-md,24px)}.aa58f227716bcde2__heading-lg{--_gcd-heading-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-emphasis,600);--_gcd-p-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-p-line-height:var(--wpds-typography-line-height-sm,20px);font-size:var(--wpds-typography-font-size-lg,15px)}.aa58f227716bcde2__heading-lg,.fc4da56d8dfe52c4__heading-md{font-family:var(--wpds-typography-font-family-heading,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-weight:var(--wpds-typography-font-weight-emphasis,600);line-height:var(--wpds-typography-line-height-sm,20px)}.fc4da56d8dfe52c4__heading-md{--_gcd-heading-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-emphasis,600);--_gcd-p-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-p-line-height:var(--wpds-typography-line-height-sm,20px);font-size:var(--wpds-typography-font-size-md,13px)}.a9b78c7c82e8dff7__heading-sm{--_gcd-heading-font-size:var(--wpds-typography-font-size-xs,11px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-emphasis,600);--_gcd-p-font-size:var(--wpds-typography-font-size-xs,11px);--_gcd-p-line-height:var(--wpds-typography-line-height-xs,16px);font-family:var(--wpds-typography-font-family-heading,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wpds-typography-font-size-xs,11px);font-weight:var(--wpds-typography-font-weight-emphasis,600);line-height:var(--wpds-typography-line-height-xs,16px);text-transform:uppercase}._305ff559e52180d5__body-xl{--_gcd-heading-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-default,400);--_gcd-p-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-p-line-height:var(--wpds-typography-line-height-xl,32px);font-size:var(--wpds-typography-font-size-xl,20px);line-height:var(--wpds-typography-line-height-xl,32px)}._305ff559e52180d5__body-xl,.ca1aa3fc2029e958__body-lg{font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-weight:var(--wpds-typography-font-weight-default,400)}.ca1aa3fc2029e958__body-lg{--_gcd-heading-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-default,400);--_gcd-p-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-p-line-height:var(--wpds-typography-line-height-md,24px);font-size:var(--wpds-typography-font-size-lg,15px);line-height:var(--wpds-typography-line-height-md,24px)}._131101940be12424__body-md{--_gcd-heading-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-default,400);--_gcd-p-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-p-line-height:var(--wpds-typography-line-height-sm,20px);font-size:var(--wpds-typography-font-size-md,13px);line-height:var(--wpds-typography-line-height-sm,20px)}._0e8d87a42c1f75fa__body-sm,._131101940be12424__body-md{font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-weight:var(--wpds-typography-font-weight-default,400)}._0e8d87a42c1f75fa__body-sm{--_gcd-heading-font-size:var(--wpds-typography-font-size-sm,12px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-default,400);--_gcd-p-font-size:var(--wpds-typography-font-size-sm,12px);--_gcd-p-line-height:var(--wpds-typography-line-height-xs,16px);font-size:var(--wpds-typography-font-size-sm,12px);line-height:var(--wpds-typography-line-height-xs,16px)}}}');
}
var style_default = { "text": "_83ed8a8da5dd50ea__text", "heading-2xl": "_14437cfb77831647__heading-2xl", "heading-xl": "_3c78b7fa9b4072dd__heading-xl", "heading-lg": "aa58f227716bcde2__heading-lg", "heading-md": "fc4da56d8dfe52c4__heading-md", "heading-sm": "a9b78c7c82e8dff7__heading-sm", "body-xl": "_305ff559e52180d5__body-xl", "body-lg": "ca1aa3fc2029e958__body-lg", "body-md": "_131101940be12424__body-md", "body-sm": "_0e8d87a42c1f75fa__body-sm" };
if (typeof process === "undefined" || true) {
  registerStyle("e8e31009f5", "._6defc79820e382c6__button{box-sizing:var(--_gcd-button-box-sizing,border-box);font-family:var(--_gcd-button-font-family,inherit);font-size:var(--_gcd-button-font-size,inherit);font-weight:var(--_gcd-button-font-weight,inherit)}.d2cff2e5dea83bd1__input{box-sizing:var(--_gcd-input-box-sizing,border-box);font-family:var(--_gcd-input-font-family,inherit);font-size:var(--_gcd-input-font-size,inherit);font-weight:var(--_gcd-input-font-weight,inherit);margin:var(--_gcd-input-margin,0);&::placeholder{color:var(--_gcd-input-placeholder-color,var(--wpds-color-foreground-interactive-neutral-weak,#707070))}&:is(textarea,[type=text],[type=password],[type=color],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){background-color:var(--_gcd-input-background-color,transparent);border:var(--_gcd-input-border,none);border-radius:var(--_gcd-input-border-radius,0);box-shadow:var(--_gcd-input-box-shadow,0 0 0 transparent);color:var(--_gcd-input-color,var(--wpds-color-foreground-interactive-neutral,#1e1e1e));&:focus{border-color:var(--_gcd-input-border-color-focus,var(--wp-admin-theme-color));box-shadow:var(--_gcd-input-box-shadow-focus,none);outline:var(--_gcd-input-outline-focus,none)}&:disabled{background:var(--_gcd-input-background-disabled,transparent);border-color:var(--_gcd-input-border-color-disabled,transparent);box-shadow:var(--_gcd-input-box-shadow-disabled,none);color:var(--_gcd-input-color-disabled,var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d))}}&:is(textarea,[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){line-height:var(--_gcd-input-line-height,inherit);min-height:var(--_gcd-input-min-height,auto);padding:var(--_gcd-input-padding,0)}}._547d86373d02e108__textarea{box-sizing:var(--_gcd-textarea-box-sizing,border-box);overflow:var(--_gcd-textarea-overflow,auto);resize:var(--_gcd-textarea-resize,block)}._8c15fd0ed9f28ba4__div{outline:var(--_gcd-div-outline,0 solid transparent)}p._43cec3e1eec1066d__p{font-size:var(--_gcd-p-font-size,13px);line-height:var(--_gcd-p-line-height,1.5);margin:var(--_gcd-p-margin,0)}:is(h1,h2,h3,h4,h5,h6).e97669c6d9a38497__heading{color:var(--_gcd-heading-color,var(--wpds-color-foreground-content-neutral,#1e1e1e));font-size:var(--_gcd-heading-font-size,inherit);font-weight:var(--_gcd-heading-font-weight,var(--wpds-typography-font-weight-emphasis,600));margin:var(--_gcd-heading-margin,0)}._2c0831b0499dbd6e__a,._2c0831b0499dbd6e__a:is(:hover,:focus,:active){border-radius:var(--_gcd-a-border-radius,0);box-shadow:var(--_gcd-a-box-shadow,none);color:var(--_gcd-a-color,inherit);outline:var(--_gcd-a-outline,0 solid transparent);transition:var(--_gcd-a-transition,none)}.c59a0ebebd71fa4a__ol{list-style:var(--_gcd-ol-list-style,none);margin:var(--_gcd-ol-margin,0);padding-block:var(--_gcd-ol-padding-block,0);padding-inline:var(--_gcd-ol-padding-inline,0)}._46b5cb0c8e24e8c9__li{margin:var(--_gcd-li-margin,0)}");
}
var global_css_defense_default = { "button": "_6defc79820e382c6__button", "input": "d2cff2e5dea83bd1__input", "textarea": "_547d86373d02e108__textarea", "div": "_8c15fd0ed9f28ba4__div", "p": "_43cec3e1eec1066d__p", "heading": "e97669c6d9a38497__heading", "a": "_2c0831b0499dbd6e__a", "ol": "c59a0ebebd71fa4a__ol", "li": "_46b5cb0c8e24e8c9__li" };
var Text = (0, import_element.forwardRef)(function Text2({ variant = "body-md", render, className, ...props }, ref) {
  const element = useRender({
    render,
    defaultTagName: "span",
    ref,
    props: mergeProps(props, {
      className: clsx_default(
        style_default.text,
        global_css_defense_default.heading,
        global_css_defense_default.p,
        style_default[variant],
        className
      )
    })
  });
  return element;
});

// node_modules/@wordpress/ui/build-module/visually-hidden/visually-hidden.mjs
var import_element2 = __toESM(require_element(), 1);
var STYLE_HASH_ATTRIBUTE2 = "data-wp-hash";
function getRuntime2() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument2(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash2(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE2}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE2) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle2(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime2();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash2(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE2, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument2(targetDocument) {
  const runtime = getRuntime2();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle2(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle2(hash, css) {
  const runtime = getRuntime2();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle2(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle2("f4df7461e9", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{.f37b9e2e191ebd66__visually-hidden{border:0;clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;overflow-wrap:normal;padding:0;position:absolute;width:1px;word-break:normal}}}");
}
var style_default2 = { "visually-hidden": "f37b9e2e191ebd66__visually-hidden" };
var VisuallyHidden = (0, import_element2.forwardRef)(
  function VisuallyHidden2({ render, ...restProps }, ref) {
    const element = useRender({
      render,
      ref,
      props: mergeProps(
        { className: style_default2["visually-hidden"] },
        restProps,
        {
          // @ts-expect-error Arbitrary data-* attributes aren't indexable on the typed div props. Kept hardcoded so consumers can't change or remove it.
          "data-visually-hidden": ""
        }
      )
    });
    return element;
  }
);

// node_modules/@wordpress/ui/build-module/card/index.mjs
var card_exports = {};
__export(card_exports, {
  Content: () => Content,
  FullBleed: () => FullBleed,
  Header: () => Header,
  Root: () => Root,
  Title: () => Title
});

// node_modules/@wordpress/ui/build-module/card/root.mjs
var import_element3 = __toESM(require_element(), 1);
var STYLE_HASH_ATTRIBUTE3 = "data-wp-hash";
function getRuntime3() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument3(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash3(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE3}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE3) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle3(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime3();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash3(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE3, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument3(targetDocument) {
  const runtime = getRuntime3();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle3(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle3(hash, css) {
  const runtime = getRuntime3();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle3(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle3("10f3806643", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer utilities{._336cd3e4e743482f__box-sizing{box-sizing:border-box;*,:after,:before{box-sizing:inherit}}}}");
}
var resets_default = { "box-sizing": "_336cd3e4e743482f__box-sizing" };
if (typeof process === "undefined" || true) {
  registerStyle3("cb866dcef6", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._02872bf298eadc43__root{--wp-ui-card-padding:var(--wpds-dimension-padding-2xl,24px);--wp-ui-card-header-content-gap:var(--wpds-dimension-gap-xl,24px);--wp-ui-card-header-content-margin:calc(var(--wp-ui-card-header-content-gap) - var(--wp-ui-card-padding));background-color:var(--wpds-color-background-surface-neutral-strong,#fff);border:1px solid var(--wpds-color-stroke-surface-neutral,#dbdbdb);border-radius:var(--wpds-border-radius-lg,8px);color:var(--wpds-color-foreground-content-neutral,#1e1e1e);display:flex;flex-direction:column;overflow:clip}._5dffdaf2a6e669ac__content,.bbccc92e6ba5662d__header{padding:var(--wp-ui-card-padding);&:not(:first-child):not(:last-child){padding-block-end:0}}.bbccc92e6ba5662d__header+._5dffdaf2a6e669ac__content{margin-block-start:var(--wp-ui-card-header-content-margin);padding-block-start:0}.c1fa192587e1b4a6__fullbleed{margin-inline:calc(var(--wp-ui-card-padding)*-1);width:calc(100% + var(--wp-ui-card-padding)*2)}._02872bf298eadc43__root>:is(.bbccc92e6ba5662d__header,._5dffdaf2a6e669ac__content):first-child>.c1fa192587e1b4a6__fullbleed:first-child{margin-block-start:calc(var(--wp-ui-card-padding)*-1)}:is(.bbccc92e6ba5662d__header,._5dffdaf2a6e669ac__content):last-child>.c1fa192587e1b4a6__fullbleed:last-child{margin-block-end:calc(var(--wp-ui-card-padding)*-1)}}}");
}
var style_default3 = { "root": "_02872bf298eadc43__root", "header": "bbccc92e6ba5662d__header", "content": "_5dffdaf2a6e669ac__content", "fullbleed": "c1fa192587e1b4a6__fullbleed" };
var Root = (0, import_element3.forwardRef)(function Card({ render, ...restProps }, ref) {
  const mergedClassName = clsx_default(style_default3.root, resets_default["box-sizing"]);
  const element = useRender({
    defaultTagName: "div",
    render,
    ref,
    props: mergeProps({ className: mergedClassName }, restProps)
  });
  return element;
});

// node_modules/@wordpress/ui/build-module/card/header.mjs
var import_element4 = __toESM(require_element(), 1);
var STYLE_HASH_ATTRIBUTE4 = "data-wp-hash";
function getRuntime4() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument4(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash4(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE4}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE4) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle4(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime4();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash4(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE4, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument4(targetDocument) {
  const runtime = getRuntime4();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle4(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle4(hash, css) {
  const runtime = getRuntime4();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle4(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle4("cb866dcef6", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._02872bf298eadc43__root{--wp-ui-card-padding:var(--wpds-dimension-padding-2xl,24px);--wp-ui-card-header-content-gap:var(--wpds-dimension-gap-xl,24px);--wp-ui-card-header-content-margin:calc(var(--wp-ui-card-header-content-gap) - var(--wp-ui-card-padding));background-color:var(--wpds-color-background-surface-neutral-strong,#fff);border:1px solid var(--wpds-color-stroke-surface-neutral,#dbdbdb);border-radius:var(--wpds-border-radius-lg,8px);color:var(--wpds-color-foreground-content-neutral,#1e1e1e);display:flex;flex-direction:column;overflow:clip}._5dffdaf2a6e669ac__content,.bbccc92e6ba5662d__header{padding:var(--wp-ui-card-padding);&:not(:first-child):not(:last-child){padding-block-end:0}}.bbccc92e6ba5662d__header+._5dffdaf2a6e669ac__content{margin-block-start:var(--wp-ui-card-header-content-margin);padding-block-start:0}.c1fa192587e1b4a6__fullbleed{margin-inline:calc(var(--wp-ui-card-padding)*-1);width:calc(100% + var(--wp-ui-card-padding)*2)}._02872bf298eadc43__root>:is(.bbccc92e6ba5662d__header,._5dffdaf2a6e669ac__content):first-child>.c1fa192587e1b4a6__fullbleed:first-child{margin-block-start:calc(var(--wp-ui-card-padding)*-1)}:is(.bbccc92e6ba5662d__header,._5dffdaf2a6e669ac__content):last-child>.c1fa192587e1b4a6__fullbleed:last-child{margin-block-end:calc(var(--wp-ui-card-padding)*-1)}}}");
}
var style_default4 = { "root": "_02872bf298eadc43__root", "header": "bbccc92e6ba5662d__header", "content": "_5dffdaf2a6e669ac__content", "fullbleed": "c1fa192587e1b4a6__fullbleed" };
var Header = (0, import_element4.forwardRef)(
  function CardHeader({ render, ...props }, ref) {
    const element = useRender({
      defaultTagName: "div",
      render,
      ref,
      props: mergeProps({ className: style_default4.header }, props)
    });
    return element;
  }
);

// node_modules/@wordpress/ui/build-module/card/content.mjs
var import_element5 = __toESM(require_element(), 1);
var STYLE_HASH_ATTRIBUTE5 = "data-wp-hash";
function getRuntime5() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument5(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash5(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE5}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE5) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle5(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime5();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash5(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE5, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument5(targetDocument) {
  const runtime = getRuntime5();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle5(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle5(hash, css) {
  const runtime = getRuntime5();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle5(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle5("cb866dcef6", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._02872bf298eadc43__root{--wp-ui-card-padding:var(--wpds-dimension-padding-2xl,24px);--wp-ui-card-header-content-gap:var(--wpds-dimension-gap-xl,24px);--wp-ui-card-header-content-margin:calc(var(--wp-ui-card-header-content-gap) - var(--wp-ui-card-padding));background-color:var(--wpds-color-background-surface-neutral-strong,#fff);border:1px solid var(--wpds-color-stroke-surface-neutral,#dbdbdb);border-radius:var(--wpds-border-radius-lg,8px);color:var(--wpds-color-foreground-content-neutral,#1e1e1e);display:flex;flex-direction:column;overflow:clip}._5dffdaf2a6e669ac__content,.bbccc92e6ba5662d__header{padding:var(--wp-ui-card-padding);&:not(:first-child):not(:last-child){padding-block-end:0}}.bbccc92e6ba5662d__header+._5dffdaf2a6e669ac__content{margin-block-start:var(--wp-ui-card-header-content-margin);padding-block-start:0}.c1fa192587e1b4a6__fullbleed{margin-inline:calc(var(--wp-ui-card-padding)*-1);width:calc(100% + var(--wp-ui-card-padding)*2)}._02872bf298eadc43__root>:is(.bbccc92e6ba5662d__header,._5dffdaf2a6e669ac__content):first-child>.c1fa192587e1b4a6__fullbleed:first-child{margin-block-start:calc(var(--wp-ui-card-padding)*-1)}:is(.bbccc92e6ba5662d__header,._5dffdaf2a6e669ac__content):last-child>.c1fa192587e1b4a6__fullbleed:last-child{margin-block-end:calc(var(--wp-ui-card-padding)*-1)}}}");
}
var style_default5 = { "root": "_02872bf298eadc43__root", "header": "bbccc92e6ba5662d__header", "content": "_5dffdaf2a6e669ac__content", "fullbleed": "c1fa192587e1b4a6__fullbleed" };
var Content = (0, import_element5.forwardRef)(
  function CardContent({ render, ...props }, ref) {
    const element = useRender({
      defaultTagName: "div",
      render,
      ref,
      props: mergeProps({ className: style_default5.content }, props)
    });
    return element;
  }
);

// node_modules/@wordpress/ui/build-module/card/full-bleed.mjs
var import_element6 = __toESM(require_element(), 1);
var STYLE_HASH_ATTRIBUTE6 = "data-wp-hash";
function getRuntime6() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument6(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash6(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE6}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE6) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle6(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime6();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash6(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE6, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument6(targetDocument) {
  const runtime = getRuntime6();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle6(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle6(hash, css) {
  const runtime = getRuntime6();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle6(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle6("cb866dcef6", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._02872bf298eadc43__root{--wp-ui-card-padding:var(--wpds-dimension-padding-2xl,24px);--wp-ui-card-header-content-gap:var(--wpds-dimension-gap-xl,24px);--wp-ui-card-header-content-margin:calc(var(--wp-ui-card-header-content-gap) - var(--wp-ui-card-padding));background-color:var(--wpds-color-background-surface-neutral-strong,#fff);border:1px solid var(--wpds-color-stroke-surface-neutral,#dbdbdb);border-radius:var(--wpds-border-radius-lg,8px);color:var(--wpds-color-foreground-content-neutral,#1e1e1e);display:flex;flex-direction:column;overflow:clip}._5dffdaf2a6e669ac__content,.bbccc92e6ba5662d__header{padding:var(--wp-ui-card-padding);&:not(:first-child):not(:last-child){padding-block-end:0}}.bbccc92e6ba5662d__header+._5dffdaf2a6e669ac__content{margin-block-start:var(--wp-ui-card-header-content-margin);padding-block-start:0}.c1fa192587e1b4a6__fullbleed{margin-inline:calc(var(--wp-ui-card-padding)*-1);width:calc(100% + var(--wp-ui-card-padding)*2)}._02872bf298eadc43__root>:is(.bbccc92e6ba5662d__header,._5dffdaf2a6e669ac__content):first-child>.c1fa192587e1b4a6__fullbleed:first-child{margin-block-start:calc(var(--wp-ui-card-padding)*-1)}:is(.bbccc92e6ba5662d__header,._5dffdaf2a6e669ac__content):last-child>.c1fa192587e1b4a6__fullbleed:last-child{margin-block-end:calc(var(--wp-ui-card-padding)*-1)}}}");
}
var style_default6 = { "root": "_02872bf298eadc43__root", "header": "bbccc92e6ba5662d__header", "content": "_5dffdaf2a6e669ac__content", "fullbleed": "c1fa192587e1b4a6__fullbleed" };
var FullBleed = (0, import_element6.forwardRef)(
  function CardFullBleed({ render, ...props }, ref) {
    const element = useRender({
      defaultTagName: "div",
      render,
      ref,
      props: mergeProps(
        { className: style_default6.fullbleed },
        props
      )
    });
    return element;
  }
);

// node_modules/@wordpress/ui/build-module/card/title.mjs
var import_element7 = __toESM(require_element(), 1);
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var DEFAULT_TAG = /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", {});
var Title = (0, import_element7.forwardRef)(
  function CardTitle({ render = DEFAULT_TAG, children, ...props }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      Text,
      {
        ref,
        variant: "heading-lg",
        render,
        ...props,
        children
      }
    );
  }
);

// node_modules/@wordpress/ui/build-module/stack/stack.mjs
var import_element8 = __toESM(require_element(), 1);
var STYLE_HASH_ATTRIBUTE7 = "data-wp-hash";
function getRuntime7() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument7(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash7(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE7}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE7) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle7(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime7();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash7(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE7, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument7(targetDocument) {
  const runtime = getRuntime7();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle7(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle7(hash, css) {
  const runtime = getRuntime7();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle7(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle7("32aba35fe1", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._19ce0419607e1896__stack{display:flex}}}");
}
var style_default7 = { "stack": "_19ce0419607e1896__stack" };
var gapTokens = {
  xs: "var(--wpds-dimension-gap-xs, 4px)",
  sm: "var(--wpds-dimension-gap-sm, 8px)",
  md: "var(--wpds-dimension-gap-md, 12px)",
  lg: "var(--wpds-dimension-gap-lg, 16px)",
  xl: "var(--wpds-dimension-gap-xl, 24px)",
  "2xl": "var(--wpds-dimension-gap-2xl, 32px)",
  "3xl": "var(--wpds-dimension-gap-3xl, 40px)"
};
var Stack = (0, import_element8.forwardRef)(function Stack2({ direction, gap, align, justify, wrap, render, ...props }, ref) {
  const style = {
    gap: gap && gapTokens[gap],
    alignItems: align,
    justifyContent: justify,
    flexDirection: direction,
    flexWrap: wrap
  };
  const element = useRender({
    render,
    ref,
    props: mergeProps(props, { style, className: style_default7.stack })
  });
  return element;
});

// node_modules/@wordpress/ui/build-module/form/primitives/input/input.mjs
var import_element11 = __toESM(require_element(), 1);

// node_modules/@wordpress/ui/build-module/form/primitives/input-layout/input-layout.mjs
var import_element9 = __toESM(require_element(), 1);
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var STYLE_HASH_ATTRIBUTE8 = "data-wp-hash";
function getRuntime8() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument8(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash8(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE8}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE8) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle8(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime8();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash8(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE8, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument8(targetDocument) {
  const runtime = getRuntime8();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle8(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle8(hash, css) {
  const runtime = getRuntime8();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle8(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle8("e8e31009f5", "._6defc79820e382c6__button{box-sizing:var(--_gcd-button-box-sizing,border-box);font-family:var(--_gcd-button-font-family,inherit);font-size:var(--_gcd-button-font-size,inherit);font-weight:var(--_gcd-button-font-weight,inherit)}.d2cff2e5dea83bd1__input{box-sizing:var(--_gcd-input-box-sizing,border-box);font-family:var(--_gcd-input-font-family,inherit);font-size:var(--_gcd-input-font-size,inherit);font-weight:var(--_gcd-input-font-weight,inherit);margin:var(--_gcd-input-margin,0);&::placeholder{color:var(--_gcd-input-placeholder-color,var(--wpds-color-foreground-interactive-neutral-weak,#707070))}&:is(textarea,[type=text],[type=password],[type=color],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){background-color:var(--_gcd-input-background-color,transparent);border:var(--_gcd-input-border,none);border-radius:var(--_gcd-input-border-radius,0);box-shadow:var(--_gcd-input-box-shadow,0 0 0 transparent);color:var(--_gcd-input-color,var(--wpds-color-foreground-interactive-neutral,#1e1e1e));&:focus{border-color:var(--_gcd-input-border-color-focus,var(--wp-admin-theme-color));box-shadow:var(--_gcd-input-box-shadow-focus,none);outline:var(--_gcd-input-outline-focus,none)}&:disabled{background:var(--_gcd-input-background-disabled,transparent);border-color:var(--_gcd-input-border-color-disabled,transparent);box-shadow:var(--_gcd-input-box-shadow-disabled,none);color:var(--_gcd-input-color-disabled,var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d))}}&:is(textarea,[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){line-height:var(--_gcd-input-line-height,inherit);min-height:var(--_gcd-input-min-height,auto);padding:var(--_gcd-input-padding,0)}}._547d86373d02e108__textarea{box-sizing:var(--_gcd-textarea-box-sizing,border-box);overflow:var(--_gcd-textarea-overflow,auto);resize:var(--_gcd-textarea-resize,block)}._8c15fd0ed9f28ba4__div{outline:var(--_gcd-div-outline,0 solid transparent)}p._43cec3e1eec1066d__p{font-size:var(--_gcd-p-font-size,13px);line-height:var(--_gcd-p-line-height,1.5);margin:var(--_gcd-p-margin,0)}:is(h1,h2,h3,h4,h5,h6).e97669c6d9a38497__heading{color:var(--_gcd-heading-color,var(--wpds-color-foreground-content-neutral,#1e1e1e));font-size:var(--_gcd-heading-font-size,inherit);font-weight:var(--_gcd-heading-font-weight,var(--wpds-typography-font-weight-emphasis,600));margin:var(--_gcd-heading-margin,0)}._2c0831b0499dbd6e__a,._2c0831b0499dbd6e__a:is(:hover,:focus,:active){border-radius:var(--_gcd-a-border-radius,0);box-shadow:var(--_gcd-a-box-shadow,none);color:var(--_gcd-a-color,inherit);outline:var(--_gcd-a-outline,0 solid transparent);transition:var(--_gcd-a-transition,none)}.c59a0ebebd71fa4a__ol{list-style:var(--_gcd-ol-list-style,none);margin:var(--_gcd-ol-margin,0);padding-block:var(--_gcd-ol-padding-block,0);padding-inline:var(--_gcd-ol-padding-inline,0)}._46b5cb0c8e24e8c9__li{margin:var(--_gcd-li-margin,0)}");
}
var global_css_defense_default2 = { "button": "_6defc79820e382c6__button", "input": "d2cff2e5dea83bd1__input", "textarea": "_547d86373d02e108__textarea", "div": "_8c15fd0ed9f28ba4__div", "p": "_43cec3e1eec1066d__p", "heading": "e97669c6d9a38497__heading", "a": "_2c0831b0499dbd6e__a", "ol": "c59a0ebebd71fa4a__ol", "li": "_46b5cb0c8e24e8c9__li" };
if (typeof process === "undefined" || true) {
  registerStyle8("10f3806643", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer utilities{._336cd3e4e743482f__box-sizing{box-sizing:border-box;*,:after,:before{box-sizing:inherit}}}}");
}
var resets_default2 = { "box-sizing": "_336cd3e4e743482f__box-sizing" };
if (typeof process === "undefined" || true) {
  registerStyle8("e4f4f9600b", '@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{.cb2baafdc08746bb__input-layout{--wp-ui-input-layout-padding-inline:var(--wpds-dimension-padding-md,12px);background-color:var(--wpds-color-background-interactive-neutral,var(--wpds-color-background-surface-neutral-strong,#fff));border-color:var(--wpds-color-stroke-interactive-neutral,#8d8d8d);border-radius:var(--wpds-border-radius-sm,2px);border-style:solid;border-width:var(--wpds-border-width-xs,1px);color:var(--wpds-color-foreground-interactive-neutral,#1e1e1e);display:flex;font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:max(var(--wpds-typography-font-size-md,13px),16px);height:var(--wpds-dimension-size-lg,40px);line-height:1;@media (min-width:600px){font-size:var(--wpds-typography-font-size-md,13px)}&._0c807a84cbb94e0c__is-size-compact{height:var(--wpds-dimension-size-md,32px)}&._0c807a84cbb94e0c__is-size-compact,&.ed67cda122dc1e7b__is-size-small{--wp-ui-input-layout-padding-inline:var(--wpds-dimension-padding-sm,8px)}&.ed67cda122dc1e7b__is-size-small{height:var(--wpds-dimension-size-sm,24px)}&._6fb7104732387680__is-disabled,&:has([data-can-disable-input-layout][data-disabled]){color:var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d);@media (forced-colors:active){color:GrayText}&:not(._8097270636ca6100__is-borderless){background-color:var(--wpds-color-background-interactive-neutral-disabled,var(--wpds-color-background-surface-neutral-strong,#fff));border-color:var(--wpds-color-stroke-interactive-neutral-disabled,#dbdbdb);@media (forced-colors:active){border-bottom-color:GrayText;border-left-color:GrayText;border-right-color:GrayText;border-top-color:GrayText}}}&._8097270636ca6100__is-borderless{background-color:var(--wpds-color-background-interactive-neutral-weak,#0000);border-color:transparent}&:has(._0d7afad74a057888__input-layout-slot:focus-within){--_gcd-div-outline:none;outline:none}&:hover:not(._6fb7104732387680__is-disabled,:has([data-can-disable-input-layout][data-disabled]),._8097270636ca6100__is-borderless){background-color:var(--wpds-color-background-interactive-neutral-active,var(--wpds-color-background-surface-neutral-strong,#fff));border-color:var(--wpds-color-stroke-interactive-neutral-active,#6e6e6e)}&:has(:invalid[data-validity-visible]){--focus-color:var(--wpds-color-stroke-interactive-error,#cc1818);border-color:var(--wpds-color-stroke-interactive-error,#cc1818);&:hover{border-color:var(--wpds-color-stroke-interactive-error-active,#9d0000)}}}.c192b41a12b4387b__slot-wrapper{display:contents}._0d7afad74a057888__input-layout-slot{align-items:center;display:flex;&._0c952682762ca288__is-padding-minimal{--wp-ui-input-layout-prefix-padding-start:calc(var(--wp-ui-input-layout-padding-inline) - var(--wpds-dimension-padding-xs, 4px));--wp-ui-input-layout-suffix-padding-end:calc(var(--wp-ui-input-layout-padding-inline) - var(--wpds-dimension-padding-xs, 4px))}[data-slot-type=prefix] &{padding-inline-start:var(--wp-ui-input-layout-prefix-padding-start,var(--wp-ui-input-layout-padding-inline))}[data-slot-type=suffix] &{padding-inline-end:var(--wp-ui-input-layout-suffix-padding-end,var(--wp-ui-input-layout-padding-inline))}}}}');
}
var style_default8 = { "input-layout": "cb2baafdc08746bb__input-layout", "is-size-compact": "_0c807a84cbb94e0c__is-size-compact", "is-size-small": "ed67cda122dc1e7b__is-size-small", "is-disabled": "_6fb7104732387680__is-disabled", "is-borderless": "_8097270636ca6100__is-borderless", "input-layout-slot": "_0d7afad74a057888__input-layout-slot", "slot-wrapper": "c192b41a12b4387b__slot-wrapper", "is-padding-minimal": "_0c952682762ca288__is-padding-minimal" };
var InputLayout = (0, import_element9.forwardRef)(
  function InputLayout2({
    className,
    children,
    visuallyDisabled,
    size = "default",
    isBorderless,
    prefix,
    suffix,
    ...restProps
  }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
      "div",
      {
        ref,
        className: clsx_default(
          global_css_defense_default2.div,
          resets_default2["box-sizing"],
          style_default8["input-layout"],
          style_default8[`is-size-${size}`],
          visuallyDisabled && style_default8["is-disabled"],
          isBorderless && style_default8["is-borderless"],
          className
        ),
        ...restProps,
        children: [
          import_element9.Children.count(prefix) > 0 && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "div",
            {
              className: style_default8["slot-wrapper"],
              "data-slot-type": "prefix",
              children: prefix
            }
          ),
          children,
          import_element9.Children.count(suffix) > 0 && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "div",
            {
              className: style_default8["slot-wrapper"],
              "data-slot-type": "suffix",
              children: suffix
            }
          )
        ]
      }
    );
  }
);

// node_modules/@wordpress/ui/build-module/form/primitives/input-layout/slot.mjs
var import_element10 = __toESM(require_element(), 1);
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
var STYLE_HASH_ATTRIBUTE9 = "data-wp-hash";
function getRuntime9() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument9(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash9(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE9}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE9) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle9(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime9();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash9(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE9, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument9(targetDocument) {
  const runtime = getRuntime9();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle9(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle9(hash, css) {
  const runtime = getRuntime9();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle9(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle9("e4f4f9600b", '@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{.cb2baafdc08746bb__input-layout{--wp-ui-input-layout-padding-inline:var(--wpds-dimension-padding-md,12px);background-color:var(--wpds-color-background-interactive-neutral,var(--wpds-color-background-surface-neutral-strong,#fff));border-color:var(--wpds-color-stroke-interactive-neutral,#8d8d8d);border-radius:var(--wpds-border-radius-sm,2px);border-style:solid;border-width:var(--wpds-border-width-xs,1px);color:var(--wpds-color-foreground-interactive-neutral,#1e1e1e);display:flex;font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:max(var(--wpds-typography-font-size-md,13px),16px);height:var(--wpds-dimension-size-lg,40px);line-height:1;@media (min-width:600px){font-size:var(--wpds-typography-font-size-md,13px)}&._0c807a84cbb94e0c__is-size-compact{height:var(--wpds-dimension-size-md,32px)}&._0c807a84cbb94e0c__is-size-compact,&.ed67cda122dc1e7b__is-size-small{--wp-ui-input-layout-padding-inline:var(--wpds-dimension-padding-sm,8px)}&.ed67cda122dc1e7b__is-size-small{height:var(--wpds-dimension-size-sm,24px)}&._6fb7104732387680__is-disabled,&:has([data-can-disable-input-layout][data-disabled]){color:var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d);@media (forced-colors:active){color:GrayText}&:not(._8097270636ca6100__is-borderless){background-color:var(--wpds-color-background-interactive-neutral-disabled,var(--wpds-color-background-surface-neutral-strong,#fff));border-color:var(--wpds-color-stroke-interactive-neutral-disabled,#dbdbdb);@media (forced-colors:active){border-bottom-color:GrayText;border-left-color:GrayText;border-right-color:GrayText;border-top-color:GrayText}}}&._8097270636ca6100__is-borderless{background-color:var(--wpds-color-background-interactive-neutral-weak,#0000);border-color:transparent}&:has(._0d7afad74a057888__input-layout-slot:focus-within){--_gcd-div-outline:none;outline:none}&:hover:not(._6fb7104732387680__is-disabled,:has([data-can-disable-input-layout][data-disabled]),._8097270636ca6100__is-borderless){background-color:var(--wpds-color-background-interactive-neutral-active,var(--wpds-color-background-surface-neutral-strong,#fff));border-color:var(--wpds-color-stroke-interactive-neutral-active,#6e6e6e)}&:has(:invalid[data-validity-visible]){--focus-color:var(--wpds-color-stroke-interactive-error,#cc1818);border-color:var(--wpds-color-stroke-interactive-error,#cc1818);&:hover{border-color:var(--wpds-color-stroke-interactive-error-active,#9d0000)}}}.c192b41a12b4387b__slot-wrapper{display:contents}._0d7afad74a057888__input-layout-slot{align-items:center;display:flex;&._0c952682762ca288__is-padding-minimal{--wp-ui-input-layout-prefix-padding-start:calc(var(--wp-ui-input-layout-padding-inline) - var(--wpds-dimension-padding-xs, 4px));--wp-ui-input-layout-suffix-padding-end:calc(var(--wp-ui-input-layout-padding-inline) - var(--wpds-dimension-padding-xs, 4px))}[data-slot-type=prefix] &{padding-inline-start:var(--wp-ui-input-layout-prefix-padding-start,var(--wp-ui-input-layout-padding-inline))}[data-slot-type=suffix] &{padding-inline-end:var(--wp-ui-input-layout-suffix-padding-end,var(--wp-ui-input-layout-padding-inline))}}}}');
}
var style_default9 = { "input-layout": "cb2baafdc08746bb__input-layout", "is-size-compact": "_0c807a84cbb94e0c__is-size-compact", "is-size-small": "ed67cda122dc1e7b__is-size-small", "is-disabled": "_6fb7104732387680__is-disabled", "is-borderless": "_8097270636ca6100__is-borderless", "input-layout-slot": "_0d7afad74a057888__input-layout-slot", "slot-wrapper": "c192b41a12b4387b__slot-wrapper", "is-padding-minimal": "_0c952682762ca288__is-padding-minimal" };
var InputLayoutSlot = (0, import_element10.forwardRef)(function InputLayoutSlot2({ padding = "default", className, ...restProps }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "div",
    {
      ref,
      className: clsx_default(
        style_default9["input-layout-slot"],
        style_default9[`is-padding-${padding}`],
        className
      ),
      ...restProps
    }
  );
});
InputLayoutSlot.displayName = "InputLayout.Slot";

// node_modules/@wordpress/ui/build-module/form/primitives/input-layout/index.mjs
var InputLayout3 = Object.assign(InputLayout, {
  Slot: InputLayoutSlot
});

// node_modules/@wordpress/ui/build-module/form/primitives/input/input.mjs
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
var STYLE_HASH_ATTRIBUTE10 = "data-wp-hash";
function getRuntime10() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument10(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash10(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE10}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE10) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle10(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime10();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash10(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE10, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument10(targetDocument) {
  const runtime = getRuntime10();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle10(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle10(hash, css) {
  const runtime = getRuntime10();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle10(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle10("e8e31009f5", "._6defc79820e382c6__button{box-sizing:var(--_gcd-button-box-sizing,border-box);font-family:var(--_gcd-button-font-family,inherit);font-size:var(--_gcd-button-font-size,inherit);font-weight:var(--_gcd-button-font-weight,inherit)}.d2cff2e5dea83bd1__input{box-sizing:var(--_gcd-input-box-sizing,border-box);font-family:var(--_gcd-input-font-family,inherit);font-size:var(--_gcd-input-font-size,inherit);font-weight:var(--_gcd-input-font-weight,inherit);margin:var(--_gcd-input-margin,0);&::placeholder{color:var(--_gcd-input-placeholder-color,var(--wpds-color-foreground-interactive-neutral-weak,#707070))}&:is(textarea,[type=text],[type=password],[type=color],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){background-color:var(--_gcd-input-background-color,transparent);border:var(--_gcd-input-border,none);border-radius:var(--_gcd-input-border-radius,0);box-shadow:var(--_gcd-input-box-shadow,0 0 0 transparent);color:var(--_gcd-input-color,var(--wpds-color-foreground-interactive-neutral,#1e1e1e));&:focus{border-color:var(--_gcd-input-border-color-focus,var(--wp-admin-theme-color));box-shadow:var(--_gcd-input-box-shadow-focus,none);outline:var(--_gcd-input-outline-focus,none)}&:disabled{background:var(--_gcd-input-background-disabled,transparent);border-color:var(--_gcd-input-border-color-disabled,transparent);box-shadow:var(--_gcd-input-box-shadow-disabled,none);color:var(--_gcd-input-color-disabled,var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d))}}&:is(textarea,[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){line-height:var(--_gcd-input-line-height,inherit);min-height:var(--_gcd-input-min-height,auto);padding:var(--_gcd-input-padding,0)}}._547d86373d02e108__textarea{box-sizing:var(--_gcd-textarea-box-sizing,border-box);overflow:var(--_gcd-textarea-overflow,auto);resize:var(--_gcd-textarea-resize,block)}._8c15fd0ed9f28ba4__div{outline:var(--_gcd-div-outline,0 solid transparent)}p._43cec3e1eec1066d__p{font-size:var(--_gcd-p-font-size,13px);line-height:var(--_gcd-p-line-height,1.5);margin:var(--_gcd-p-margin,0)}:is(h1,h2,h3,h4,h5,h6).e97669c6d9a38497__heading{color:var(--_gcd-heading-color,var(--wpds-color-foreground-content-neutral,#1e1e1e));font-size:var(--_gcd-heading-font-size,inherit);font-weight:var(--_gcd-heading-font-weight,var(--wpds-typography-font-weight-emphasis,600));margin:var(--_gcd-heading-margin,0)}._2c0831b0499dbd6e__a,._2c0831b0499dbd6e__a:is(:hover,:focus,:active){border-radius:var(--_gcd-a-border-radius,0);box-shadow:var(--_gcd-a-box-shadow,none);color:var(--_gcd-a-color,inherit);outline:var(--_gcd-a-outline,0 solid transparent);transition:var(--_gcd-a-transition,none)}.c59a0ebebd71fa4a__ol{list-style:var(--_gcd-ol-list-style,none);margin:var(--_gcd-ol-margin,0);padding-block:var(--_gcd-ol-padding-block,0);padding-inline:var(--_gcd-ol-padding-inline,0)}._46b5cb0c8e24e8c9__li{margin:var(--_gcd-li-margin,0)}");
}
var global_css_defense_default3 = { "button": "_6defc79820e382c6__button", "input": "d2cff2e5dea83bd1__input", "textarea": "_547d86373d02e108__textarea", "div": "_8c15fd0ed9f28ba4__div", "p": "_43cec3e1eec1066d__p", "heading": "e97669c6d9a38497__heading", "a": "_2c0831b0499dbd6e__a", "ol": "c59a0ebebd71fa4a__ol", "li": "_46b5cb0c8e24e8c9__li" };
if (typeof process === "undefined" || true) {
  registerStyle10("08122b3d53", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer utilities{.af79fb116edb0dd7__outset-ring--focus:focus,.dfcfdc28396e5d98__outset-ring--focus-visible:focus-visible,.e5cd9ee879f6403a__outset-ring--focus-within:focus-within,:focus-visible ._81935a08e952f267__outset-ring--focus-parent-visible{--_gcd-a-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--focus-color,var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9)));--_gcd-div-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--focus-color,var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9)));outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--focus-color,var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9)));outline-offset:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px))}._3c9f5ee9fc9c136d__outset-ring--focus-within-except-active:focus-within,.abc777e9713fa711__outset-ring--focus-except-active:focus{outline:none}._3c9f5ee9fc9c136d__outset-ring--focus-within-except-active:focus-within:not(:has(:active)),.abc777e9713fa711__outset-ring--focus-except-active:focus:not(:active){--_gcd-a-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--focus-color,var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9)));--_gcd-div-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--focus-color,var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9)));outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--focus-color,var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9)));outline-offset:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px))}}}");
}
var focus_module_default = { "outset-ring--focus": "af79fb116edb0dd7__outset-ring--focus", "outset-ring--focus-visible": "dfcfdc28396e5d98__outset-ring--focus-visible", "outset-ring--focus-within": "e5cd9ee879f6403a__outset-ring--focus-within", "outset-ring--focus-parent-visible": "_81935a08e952f267__outset-ring--focus-parent-visible", "outset-ring--focus-except-active": "abc777e9713fa711__outset-ring--focus-except-active", "outset-ring--focus-within-except-active": "_3c9f5ee9fc9c136d__outset-ring--focus-within-except-active" };
if (typeof process === "undefined" || true) {
  registerStyle10("1a25f6a232", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._2ae7be2fc1bb17a3__input{--_gcd-input-padding:var(--wp-ui-input-padding-block,0px) var(--wp-ui-input-layout-padding-inline,0px);background:transparent;border:none;color:var(--wpds-color-foreground-interactive-neutral,#1e1e1e);font-family:inherit;font-size:inherit;line-height:inherit;outline:none;padding-block:var(--wp-ui-input-padding-block,0);padding-inline:var(--wp-ui-input-layout-padding-inline,0);width:100%;&::placeholder{color:var(--wpds-color-foreground-interactive-neutral-weak,#707070)}&:disabled,&[aria-disabled=true]{--_gcd-input-placeholder-color:var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d);color:var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d);&::placeholder{color:var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d)}@media (forced-colors:active){color:GrayText}}&[type=email],&[type=url]{direction:ltr}&[type=number]{appearance:textfield;&::-webkit-inner-spin-button,&::-webkit-outer-spin-button{appearance:none;margin:0}}}}}");
}
var style_default10 = { "input": "_2ae7be2fc1bb17a3__input" };
var Input3 = (0, import_element11.forwardRef)(function Input22({ className, size = "default", prefix, suffix, style, ...restProps }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    InputLayout3,
    {
      className: clsx_default(
        focus_module_default["outset-ring--focus-within"],
        className
      ),
      style,
      size,
      visuallyDisabled: restProps.disabled,
      prefix,
      suffix,
      children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        Input,
        {
          ref,
          className: clsx_default(global_css_defense_default3.input, style_default10.input),
          ...restProps
        }
      )
    }
  );
});

// node_modules/@wordpress/ui/build-module/form/primitives/field/index.mjs
var field_exports = {};
__export(field_exports, {
  Control: () => Control,
  Description: () => Description,
  Details: () => Details,
  Item: () => Item,
  Label: () => Label,
  Root: () => Root2,
  VisualLabel: () => VisualLabel
});

// node_modules/@wordpress/ui/build-module/form/primitives/field/root.mjs
var import_element12 = __toESM(require_element(), 1);
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
var STYLE_HASH_ATTRIBUTE11 = "data-wp-hash";
function getRuntime11() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument11(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash11(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE11}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE11) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle11(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime11();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash11(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE11, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument11(targetDocument) {
  const runtime = getRuntime11();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle11(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle11(hash, css) {
  const runtime = getRuntime11();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle11(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle11("10f3806643", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer utilities{._336cd3e4e743482f__box-sizing{box-sizing:border-box;*,:after,:before{box-sizing:inherit}}}}");
}
var resets_default3 = { "box-sizing": "_336cd3e4e743482f__box-sizing" };
var DEFAULT_RENDER = (props) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Stack, { ...props, direction: "column", gap: "sm" });
var Root2 = (0, import_element12.forwardRef)(function Root22({ className, render = DEFAULT_RENDER, ...restProps }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    index_parts_exports.Root,
    {
      ref,
      className: clsx_default(resets_default3["box-sizing"], className),
      render,
      ...restProps
    }
  );
});

// node_modules/@wordpress/ui/build-module/form/primitives/field/item.mjs
var import_element13 = __toESM(require_element(), 1);
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
var Item = (0, import_element13.forwardRef)(function Item2(props, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(index_parts_exports.Item, { ref, ...props });
});

// node_modules/@wordpress/ui/build-module/form/primitives/field/label.mjs
var import_element14 = __toESM(require_element(), 1);
var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
var STYLE_HASH_ATTRIBUTE12 = "data-wp-hash";
function getRuntime12() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument12(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash12(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE12}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE12) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle12(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime12();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash12(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE12, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument12(targetDocument) {
  const runtime = getRuntime12();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle12(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle12(hash, css) {
  const runtime = getRuntime12();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle12(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle12("df33c48b2d", '@layer wp-ui{@layer utilities, components, compositions, overrides;@layer utilities{._2d5ad850b2f90964__label{--wp-ui-field-label-line-height:var(--wpds-typography-line-height-xs,16px);color:var(--wpds-color-foreground-content-neutral,#1e1e1e);font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wpds-typography-font-size-xs,11px);font-weight:var(--wpds-typography-font-weight-emphasis,600);line-height:var(--wp-ui-field-label-line-height);text-transform:uppercase;&._17c4214649230bea__is-plain{font-size:var(--wpds-typography-font-size-md,13px);font-weight:var(--wpds-typography-font-weight-default,400);text-transform:none}}._08a3750500e0233f__description{--_gcd-p-font-size:var(--wpds-typography-font-size-sm,12px);--_gcd-p-line-height:var(--wpds-typography-line-height-xs,16px);--_gcd-p-margin:0;text-wrap:pretty;color:var(--wpds-color-foreground-content-neutral-weak,#707070);font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wpds-typography-font-size-sm,12px);line-height:var(--wpds-typography-line-height-xs,16px)}}}');
}
var field_default = { "label": "_2d5ad850b2f90964__label", "is-plain": "_17c4214649230bea__is-plain", "description": "_08a3750500e0233f__description" };
var Label = (0, import_element14.forwardRef)(
  function Label2({ className, hideFromVision, variant, ...restProps }, ref) {
    const label = /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      index_parts_exports.Label,
      {
        ref,
        className: clsx_default(
          field_default.label,
          variant && field_default[`is-${variant}`],
          className
        ),
        ...restProps
      }
    );
    if (hideFromVision) {
      return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(VisuallyHidden, { render: label });
    }
    return label;
  }
);

// node_modules/@wordpress/ui/build-module/form/primitives/field/description.mjs
var import_element15 = __toESM(require_element(), 1);
var import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);
var STYLE_HASH_ATTRIBUTE13 = "data-wp-hash";
function getRuntime13() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument13(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash13(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE13}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE13) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle13(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime13();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash13(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE13, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument13(targetDocument) {
  const runtime = getRuntime13();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle13(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle13(hash, css) {
  const runtime = getRuntime13();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle13(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle13("e8e31009f5", "._6defc79820e382c6__button{box-sizing:var(--_gcd-button-box-sizing,border-box);font-family:var(--_gcd-button-font-family,inherit);font-size:var(--_gcd-button-font-size,inherit);font-weight:var(--_gcd-button-font-weight,inherit)}.d2cff2e5dea83bd1__input{box-sizing:var(--_gcd-input-box-sizing,border-box);font-family:var(--_gcd-input-font-family,inherit);font-size:var(--_gcd-input-font-size,inherit);font-weight:var(--_gcd-input-font-weight,inherit);margin:var(--_gcd-input-margin,0);&::placeholder{color:var(--_gcd-input-placeholder-color,var(--wpds-color-foreground-interactive-neutral-weak,#707070))}&:is(textarea,[type=text],[type=password],[type=color],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){background-color:var(--_gcd-input-background-color,transparent);border:var(--_gcd-input-border,none);border-radius:var(--_gcd-input-border-radius,0);box-shadow:var(--_gcd-input-box-shadow,0 0 0 transparent);color:var(--_gcd-input-color,var(--wpds-color-foreground-interactive-neutral,#1e1e1e));&:focus{border-color:var(--_gcd-input-border-color-focus,var(--wp-admin-theme-color));box-shadow:var(--_gcd-input-box-shadow-focus,none);outline:var(--_gcd-input-outline-focus,none)}&:disabled{background:var(--_gcd-input-background-disabled,transparent);border-color:var(--_gcd-input-border-color-disabled,transparent);box-shadow:var(--_gcd-input-box-shadow-disabled,none);color:var(--_gcd-input-color-disabled,var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d))}}&:is(textarea,[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){line-height:var(--_gcd-input-line-height,inherit);min-height:var(--_gcd-input-min-height,auto);padding:var(--_gcd-input-padding,0)}}._547d86373d02e108__textarea{box-sizing:var(--_gcd-textarea-box-sizing,border-box);overflow:var(--_gcd-textarea-overflow,auto);resize:var(--_gcd-textarea-resize,block)}._8c15fd0ed9f28ba4__div{outline:var(--_gcd-div-outline,0 solid transparent)}p._43cec3e1eec1066d__p{font-size:var(--_gcd-p-font-size,13px);line-height:var(--_gcd-p-line-height,1.5);margin:var(--_gcd-p-margin,0)}:is(h1,h2,h3,h4,h5,h6).e97669c6d9a38497__heading{color:var(--_gcd-heading-color,var(--wpds-color-foreground-content-neutral,#1e1e1e));font-size:var(--_gcd-heading-font-size,inherit);font-weight:var(--_gcd-heading-font-weight,var(--wpds-typography-font-weight-emphasis,600));margin:var(--_gcd-heading-margin,0)}._2c0831b0499dbd6e__a,._2c0831b0499dbd6e__a:is(:hover,:focus,:active){border-radius:var(--_gcd-a-border-radius,0);box-shadow:var(--_gcd-a-box-shadow,none);color:var(--_gcd-a-color,inherit);outline:var(--_gcd-a-outline,0 solid transparent);transition:var(--_gcd-a-transition,none)}.c59a0ebebd71fa4a__ol{list-style:var(--_gcd-ol-list-style,none);margin:var(--_gcd-ol-margin,0);padding-block:var(--_gcd-ol-padding-block,0);padding-inline:var(--_gcd-ol-padding-inline,0)}._46b5cb0c8e24e8c9__li{margin:var(--_gcd-li-margin,0)}");
}
var global_css_defense_default4 = { "button": "_6defc79820e382c6__button", "input": "d2cff2e5dea83bd1__input", "textarea": "_547d86373d02e108__textarea", "div": "_8c15fd0ed9f28ba4__div", "p": "_43cec3e1eec1066d__p", "heading": "e97669c6d9a38497__heading", "a": "_2c0831b0499dbd6e__a", "ol": "c59a0ebebd71fa4a__ol", "li": "_46b5cb0c8e24e8c9__li" };
if (typeof process === "undefined" || true) {
  registerStyle13("df33c48b2d", '@layer wp-ui{@layer utilities, components, compositions, overrides;@layer utilities{._2d5ad850b2f90964__label{--wp-ui-field-label-line-height:var(--wpds-typography-line-height-xs,16px);color:var(--wpds-color-foreground-content-neutral,#1e1e1e);font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wpds-typography-font-size-xs,11px);font-weight:var(--wpds-typography-font-weight-emphasis,600);line-height:var(--wp-ui-field-label-line-height);text-transform:uppercase;&._17c4214649230bea__is-plain{font-size:var(--wpds-typography-font-size-md,13px);font-weight:var(--wpds-typography-font-weight-default,400);text-transform:none}}._08a3750500e0233f__description{--_gcd-p-font-size:var(--wpds-typography-font-size-sm,12px);--_gcd-p-line-height:var(--wpds-typography-line-height-xs,16px);--_gcd-p-margin:0;text-wrap:pretty;color:var(--wpds-color-foreground-content-neutral-weak,#707070);font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wpds-typography-font-size-sm,12px);line-height:var(--wpds-typography-line-height-xs,16px)}}}');
}
var field_default2 = { "label": "_2d5ad850b2f90964__label", "is-plain": "_17c4214649230bea__is-plain", "description": "_08a3750500e0233f__description" };
var Description = (0, import_element15.forwardRef)(function Description2({ className, ...restProps }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    index_parts_exports.Description,
    {
      ref,
      className: clsx_default(
        global_css_defense_default4.p,
        field_default2.description,
        className
      ),
      ...restProps
    }
  );
});

// node_modules/@wordpress/ui/build-module/form/primitives/field/details.mjs
var import_element16 = __toESM(require_element(), 1);
var import_i18n = __toESM(require_i18n(), 1);
var import_jsx_runtime15 = __toESM(require_jsx_runtime(), 1);
var STYLE_HASH_ATTRIBUTE14 = "data-wp-hash";
function getRuntime14() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument14(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash14(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE14}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE14) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle14(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime14();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash14(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE14, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument14(targetDocument) {
  const runtime = getRuntime14();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle14(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle14(hash, css) {
  const runtime = getRuntime14();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle14(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle14("df33c48b2d", '@layer wp-ui{@layer utilities, components, compositions, overrides;@layer utilities{._2d5ad850b2f90964__label{--wp-ui-field-label-line-height:var(--wpds-typography-line-height-xs,16px);color:var(--wpds-color-foreground-content-neutral,#1e1e1e);font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wpds-typography-font-size-xs,11px);font-weight:var(--wpds-typography-font-weight-emphasis,600);line-height:var(--wp-ui-field-label-line-height);text-transform:uppercase;&._17c4214649230bea__is-plain{font-size:var(--wpds-typography-font-size-md,13px);font-weight:var(--wpds-typography-font-weight-default,400);text-transform:none}}._08a3750500e0233f__description{--_gcd-p-font-size:var(--wpds-typography-font-size-sm,12px);--_gcd-p-line-height:var(--wpds-typography-line-height-xs,16px);--_gcd-p-margin:0;text-wrap:pretty;color:var(--wpds-color-foreground-content-neutral-weak,#707070);font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wpds-typography-font-size-sm,12px);line-height:var(--wpds-typography-line-height-xs,16px)}}}');
}
var field_default3 = { "label": "_2d5ad850b2f90964__label", "is-plain": "_17c4214649230bea__is-plain", "description": "_08a3750500e0233f__description" };
var Details = (0, import_element16.forwardRef)(
  function Details2({ className, ...restProps }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_jsx_runtime15.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(VisuallyHidden, { render: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(index_parts_exports.Description, {}), children: (0, import_i18n.__)("More details follow the field.") }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        "div",
        {
          ref,
          className: clsx_default(field_default3.description, className),
          ...restProps
        }
      )
    ] });
  }
);

// node_modules/@wordpress/ui/build-module/form/primitives/field/control.mjs
var import_element17 = __toESM(require_element(), 1);
var import_jsx_runtime16 = __toESM(require_jsx_runtime(), 1);
var Control = (0, import_element17.forwardRef)(
  function Control2(props, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(index_parts_exports.Control, { ref, ...props });
  }
);

// node_modules/@wordpress/ui/build-module/form/primitives/field/visual-label.mjs
var import_element18 = __toESM(require_element(), 1);
var STYLE_HASH_ATTRIBUTE15 = "data-wp-hash";
function getRuntime15() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument15(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash15(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE15}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE15) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle15(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime15();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash15(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE15, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument15(targetDocument) {
  const runtime = getRuntime15();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle15(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle15(hash, css) {
  const runtime = getRuntime15();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle15(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle15("df33c48b2d", '@layer wp-ui{@layer utilities, components, compositions, overrides;@layer utilities{._2d5ad850b2f90964__label{--wp-ui-field-label-line-height:var(--wpds-typography-line-height-xs,16px);color:var(--wpds-color-foreground-content-neutral,#1e1e1e);font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wpds-typography-font-size-xs,11px);font-weight:var(--wpds-typography-font-weight-emphasis,600);line-height:var(--wp-ui-field-label-line-height);text-transform:uppercase;&._17c4214649230bea__is-plain{font-size:var(--wpds-typography-font-size-md,13px);font-weight:var(--wpds-typography-font-weight-default,400);text-transform:none}}._08a3750500e0233f__description{--_gcd-p-font-size:var(--wpds-typography-font-size-sm,12px);--_gcd-p-line-height:var(--wpds-typography-line-height-xs,16px);--_gcd-p-margin:0;text-wrap:pretty;color:var(--wpds-color-foreground-content-neutral-weak,#707070);font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wpds-typography-font-size-sm,12px);line-height:var(--wpds-typography-line-height-xs,16px)}}}');
}
var field_default4 = { "label": "_2d5ad850b2f90964__label", "is-plain": "_17c4214649230bea__is-plain", "description": "_08a3750500e0233f__description" };
var VisualLabel = (0, import_element18.forwardRef)(
  function VisualLabel2({ className, render, variant, ...restProps }, ref) {
    return useRender({
      defaultTagName: "span",
      render,
      ref,
      props: mergeProps(restProps, {
        className: clsx_default(
          field_default4.label,
          variant && field_default4[`is-${variant}`],
          className
        )
      })
    });
  }
);
VisualLabel.displayName = "Field.VisualLabel";

// node_modules/@wordpress/ui/build-module/form/input-control/input-control.mjs
var import_element19 = __toESM(require_element(), 1);
var import_jsx_runtime17 = __toESM(require_jsx_runtime(), 1);
var STYLE_HASH_ATTRIBUTE16 = "data-wp-hash";
function getRuntime16() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument16(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash16(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE16}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE16) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle16(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime16();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash16(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE16, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument16(targetDocument) {
  const runtime = getRuntime16();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle16(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle16(hash, css) {
  const runtime = getRuntime16();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle16(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle16("0c752c3d08", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer compositions{@supports (-webkit-hyphens:none) and (not (-moz-appearance:none)){.a9211a7e6af24bed__root input[type=date]:not([data-filled]):not(:focus),.a9211a7e6af24bed__root input[type=datetime-local]:not([data-filled]):not(:focus),.a9211a7e6af24bed__root input[type=time]:not([data-filled]):not(:focus){--_gcd-input-color:transparent;--_gcd-input-color-disabled:transparent;color:transparent;&:disabled::-webkit-datetime-edit-text{color:transparent}}}}}");
}
var style_default11 = { "root": "a9211a7e6af24bed__root" };
var InputControl = (0, import_element19.forwardRef)(
  function InputControl2({
    className,
    label,
    description,
    details,
    hideLabelFromVision,
    ...restProps
  }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(field_exports.Root, { className: clsx_default(style_default11.root, className), children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(field_exports.Label, { hideFromVision: hideLabelFromVision, children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Input3, { ref, ...restProps }),
      description && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(field_exports.Description, { children: description }),
      details && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(field_exports.Details, { children: details })
    ] });
  }
);

// routes/changesets-home/style.scss
if (typeof document !== "undefined" && (typeof process === "undefined" || true) && !document.head.querySelector("style[data-wp-hash='248f4e3dff']")) {
  const style = document.createElement("style");
  style.setAttribute("data-wp-hash", "248f4e3dff");
  style.appendChild(document.createTextNode(".cs-workspace{box-sizing:border-box;color:var(--wpds-color-foreground-content-neutral,#1e1e1e);margin:0 auto;max-width:1200px;padding:var(--wpds-dimension-padding-3xl,32px) var(--wpds-dimension-padding-2xl,24px)}.cs-workspace__header{margin-bottom:var(--wpds-dimension-gap-2xl,32px)}.cs-workspace__header h1{font-size:var(--wpds-typography-font-size-2xl,32px);margin:0 0 var(--wpds-dimension-gap-sm,8px)}.cs-workspace__header p{color:var(--wpds-color-foreground-content-neutral-weak,#707070);margin:0}.cs-workspace__loading{padding:var(--wpds-dimension-padding-2xl,24px)}.cs-workspace__back{display:inline-block;margin-bottom:var(--wpds-dimension-gap-xl,24px);text-decoration:none}.cs-workspace__review-layout{display:grid;gap:var(--wpds-dimension-gap-xl,24px);grid-template-columns:minmax(0,1fr) 290px}.cs-workspace__panel h3{margin:var(--wpds-dimension-gap-xl,24px) 0 var(--wpds-dimension-gap-sm,8px)}.cs-workspace__theme-json{min-width:0}.cs-workspace__theme-json-source{margin-top:var(--wpds-dimension-gap-xl,24px)}.cs-workspace__theme-json-source pre{font-size:12px;margin:0;max-height:28rem;overflow:auto}.cs-workspace__styles-card{margin-top:var(--wpds-dimension-gap-xl,24px)}.cs-workspace__style-editor .components-button{margin-top:var(--wpds-dimension-gap-lg,16px)}.cs-workspace__palette-value{align-items:center;display:inline-flex;gap:var(--wpds-dimension-gap-sm,8px)}.cs-workspace__palette-swatches{align-items:center;display:inline-flex;gap:var(--wpds-dimension-gap-xs,4px)}.cs-workspace__actions{align-items:flex-start;display:flex;flex-direction:column;gap:var(--wpds-dimension-gap-md,12px)}.cs-workspace__actions .components-button{justify-content:center;width:100%}@media (max-width:850px){.cs-workspace__review-layout{grid-template-columns:1fr}}@media (max-width:600px){.cs-workspace{padding:var(--wpds-dimension-padding-xl,20px) var(--wpds-dimension-padding-md,12px)}}"));
  document.head.appendChild(style);
}

// routes/staged-content-edit/style.scss
if (typeof document !== "undefined" && (typeof process === "undefined" || true) && !document.head.querySelector("style[data-wp-hash='43add2e1fc']")) {
  const style = document.createElement("style");
  style.setAttribute("data-wp-hash", "43add2e1fc");
  style.appendChild(document.createTextNode(".cs-staged-editor__fields{display:grid;gap:var(--wpds-dimension-gap-lg,16px);margin-bottom:var(--wpds-dimension-gap-xl,24px);max-width:720px}.cs-staged-editor__surface{display:grid;gap:var(--wpds-dimension-gap-lg,16px);grid-template-columns:minmax(0,1fr) 280px}.cs-staged-editor__canvas{background:var(--wpds-color-background-surface-neutral-strong,#fff);border:1px solid var(--wpds-color-stroke-surface-neutral,#dbdbdb);min-height:600px;min-width:0}.cs-staged-editor__inspector{min-width:0}.cs-staged-editor__footer{align-items:center;display:flex;gap:var(--wpds-dimension-gap-lg,16px);margin-top:var(--wpds-dimension-gap-xl,24px)}@media (max-width:900px){.cs-staged-editor__surface{grid-template-columns:1fr}}"));
  document.head.appendChild(style);
}

// routes/staged-content-edit/stage.jsx
if (!(0, import_blocks.getBlockType)("core/paragraph")) {
  (0, import_block_library.registerCoreBlocks)();
}
var StagedEditor = ({ initialItem, changesetId }) => {
  const [item, setItem] = (0, import_element20.useState)(initialItem);
  const [title, setTitle] = (0, import_element20.useState)(initialItem.title);
  const [excerpt, setExcerpt] = (0, import_element20.useState)(initialItem.excerpt);
  const [blocks, setBlocks] = (0, import_element20.useState)(() => (0, import_blocks.parse)(initialItem.content || ""));
  const [blocksDirty, setBlocksDirty] = (0, import_element20.useState)(false);
  const [busy, setBusy] = (0, import_element20.useState)(false);
  const [error2, setError] = (0, import_element20.useState)("");
  const [message, setMessage] = (0, import_element20.useState)("");
  const dirty = blocksDirty || title !== item.title || excerpt !== item.excerpt;
  const updateBlocks = (nextBlocks) => {
    setBlocks(nextBlocks);
    setBlocksDirty(true);
  };
  const save = async () => {
    if (!dirty || busy) {
      return;
    }
    setBusy(true);
    setError("");
    setMessage("");
    const data = { revision: item.revision };
    if (title !== item.title) {
      data.title = title;
    }
    if (excerpt !== item.excerpt) {
      data.excerpt = excerpt;
    }
    if (blocksDirty) {
      data.content = (0, import_blocks.serialize)(blocks);
    }
    try {
      const saved = await (0, import_api_fetch.default)({
        path: `/changesets/v1/workspace/${changesetId}/content/${item.id}`,
        method: "POST",
        data
      });
      setItem(saved);
      setTitle(saved.title);
      setExcerpt(saved.excerpt);
      setBlocksDirty(false);
      setMessage((0, import_i18n2.__)("Saved to this changeset.", "changesets"));
    } catch (response) {
      setError(response.message || (0, import_i18n2.__)("Could not save staged content.", "changesets"));
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ React.createElement("main", { className: "cs-workspace" }, /* @__PURE__ */ React.createElement(Link, { className: "cs-workspace__back", to: `/review/${changesetId}` }, (0, import_i18n2.__)("\u2190 Back to changeset", "changesets")), /* @__PURE__ */ React.createElement("header", { className: "cs-workspace__header" }, /* @__PURE__ */ React.createElement("h1", null, (0, import_i18n2.__)("Edit staged content", "changesets")), /* @__PURE__ */ React.createElement("p", null, (0, import_i18n2.__)("Your changes stay in this changeset until it is approved and published.", "changesets"))), error2 && /* @__PURE__ */ React.createElement(import_components.Notice, { status: "error", isDismissible: false }, error2), message && /* @__PURE__ */ React.createElement(import_components.Notice, { status: "success", isDismissible: false }, message), !item.editable ? /* @__PURE__ */ React.createElement(import_components.Notice, { status: "info", isDismissible: false }, (0, import_i18n2.__)("This changeset is no longer open for editing.", "changesets")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(card_exports.Root, { className: "cs-workspace__panel", render: /* @__PURE__ */ React.createElement("section", { "aria-label": (0, import_i18n2.__)("Staged document", "changesets") }) }, /* @__PURE__ */ React.createElement(card_exports.Header, null, /* @__PURE__ */ React.createElement(card_exports.Title, null, item.post_type)), /* @__PURE__ */ React.createElement(card_exports.Content, null, /* @__PURE__ */ React.createElement("div", { className: "cs-staged-editor__fields" }, /* @__PURE__ */ React.createElement(InputControl, { label: (0, import_i18n2.__)("Title", "changesets"), value: title, onValueChange: setTitle }), ["post", "page"].includes(item.post_type) && /* @__PURE__ */ React.createElement(import_components.TextareaControl, { label: (0, import_i18n2.__)("Excerpt", "changesets"), value: excerpt, onChange: setExcerpt })), /* @__PURE__ */ React.createElement("div", { className: "cs-staged-editor__surface" }, /* @__PURE__ */ React.createElement(import_block_editor.BlockEditorProvider, { value: blocks, onInput: updateBlocks, onChange: updateBlocks, settings: {} }, /* @__PURE__ */ React.createElement("div", { className: "cs-staged-editor__canvas" }, /* @__PURE__ */ React.createElement(import_block_editor.BlockCanvas, { height: "600px" })), /* @__PURE__ */ React.createElement("aside", { className: "cs-staged-editor__inspector", "aria-label": (0, import_i18n2.__)("Block settings", "changesets") }, /* @__PURE__ */ React.createElement(import_block_editor.BlockInspector, null)))))), /* @__PURE__ */ React.createElement("div", { className: "cs-staged-editor__footer" }, /* @__PURE__ */ React.createElement(import_components.Button, { variant: "primary", isBusy: busy, disabled: !dirty || busy, onClick: save }, (0, import_i18n2.__)("Save to changeset", "changesets")), /* @__PURE__ */ React.createElement(Link, { to: `/review/${changesetId}` }, (0, import_i18n2.__)("Review changeset", "changesets")))));
};
var stage = () => {
  const { id, stagedId } = useParams({ from: "/review/$id/edit/$stagedId" });
  const [item, setItem] = (0, import_element20.useState)(null);
  const [error2, setError] = (0, import_element20.useState)("");
  (0, import_element20.useEffect)(() => {
    setItem(null);
    setError("");
    (0, import_api_fetch.default)({ path: `/changesets/v1/workspace/${id}/content/${stagedId}` }).then(setItem).catch((response) => setError(response.message || (0, import_i18n2.__)("Could not load staged content.", "changesets")));
  }, [id, stagedId]);
  if (error2) {
    return /* @__PURE__ */ React.createElement("main", { className: "cs-workspace" }, /* @__PURE__ */ React.createElement(Link, { className: "cs-workspace__back", to: `/review/${id}` }, (0, import_i18n2.__)("\u2190 Back to changeset", "changesets")), /* @__PURE__ */ React.createElement(import_components.Notice, { status: "error", isDismissible: false }, error2));
  }
  if (!item) {
    return /* @__PURE__ */ React.createElement("main", { className: "cs-workspace" }, /* @__PURE__ */ React.createElement(import_components.Spinner, null));
  }
  return /* @__PURE__ */ React.createElement(StagedEditor, { key: item.id, initialItem: item, changesetId: id });
};
export {
  stage
};
