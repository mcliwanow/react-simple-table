import React, {PropTypes, isValidElement} from "react";

import Sorter from "./Sorter";

import addClassName from "../enhancements/addClassName";
import provideCorrectDOMNode from "../enhancements/provideCorrectDOMNode";

export function Column({column, className, Element}) {
    const props = {
        key: column.title,
        className
    };
    const isSortable = column.isSortable === undefined ? true : column.isSortable;

    if (isSortable && column.onSort) {
        props.onClick = () => {
            column.onSort(column);
        };
    }

    return (
        <Element {...props}>
            {renderTitle(column.title)}
            {renderSorter(column, isSortable)}
        </Element>
    );
}

function renderTitle(title) {
    return typeof title === "function" && isValidElement(title()) ?
        renderTitleAsComponent(title) :
        renderTitleAsString(title);
}

function renderTitleAsString(title) {
    return title ? title : null;
}

function renderTitleAsComponent(Title) {
    return <Title />;
}

function renderSorter(column, isSortable) {
    return isSortable ? (
        <Sorter
            sorted={column.sorted}
            sorterComponent={column.sorterComponent}
        />
    ) : null;
}

Column.propTypes = {
    column: PropTypes.object,
    className: PropTypes.string,
    Element: PropTypes.string
};

export default provideCorrectDOMNode("th")(
    addClassName("_th")(Column)
);