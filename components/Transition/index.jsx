import React, {Component} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const defaultTimeout = 500;
const mapNameToTimeout = {
    fade: 500,
    slideDown: 1500,
    slideLeft: 300,
    slideRight: 300,
};

class Transition extends Component {
    get items() {
        const {children, name} = this.props;

        if (!children) {
            return null;
        }

        if (Array.isArray(children)) {
            return children.filter(child => !!child).map((child, index) => (
                <CSSTransition key={index} classNames={name} timeout={this.timeout}>
                    {child}
                </CSSTransition>
            ));
        }

        return (
            <CSSTransition classNames={name} timeout={this.timeout}>
                {children}
            </CSSTransition>
        );
    }

    get timeout() {
        const {name, timeout} = this.props;

        return timeout || mapNameToTimeout[name] || defaultTimeout;
    }

    render() {
        return (
            <TransitionGroup component={null}>
                {this.items}
            </TransitionGroup>
        );
    }
}

export default Transition;