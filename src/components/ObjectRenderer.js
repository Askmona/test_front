import * as R from "ramda";
import React from "react";
import PropTypes from "prop-types";

const isNonNil = R.compose(R.not, R.isNil);

const ObjectRendererContext = React.createContext(null);

const ObjectRenderer = function({ value, children }) {
    return (
        <ObjectRendererContext.Provider value={value}>
            { children }
        </ObjectRendererContext.Provider>
    );
};
ObjectRenderer.propTypes = {
    value: PropTypes.any,
};

const joinNonNil = sep => values => values.filter(isNonNil).join(sep);

export const Render = function({ paths, render, cond }) {
    const value = React.useContext(ObjectRendererContext);

    if (typeof paths === "string")
        paths = [paths];
    paths = paths.map(path => path.split("."));

    const valuesArray = R.map(R.path(R.__, value), paths);

    if (cond) {
        if (cond(valuesArray, value, paths))
            return render(valuesArray, value);
        else
            return null;
    }
    return render(valuesArray, value);
};
Render.text = joinNonNil(" ");
Render.join = joinNonNil;
Render.cond = {
    allNonNil: R.all(isNonNil),
    anyNonNil: R.any(isNonNil),
};
Render.propTypes = {
    paths: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
    ]),
    render: PropTypes.func.isRequired,
    cond: PropTypes.func,
};
Render.defaultProps = {
    render: Render.text,
};
ObjectRenderer.Render = Render;

export default ObjectRenderer;