import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { authLogoutAndRedirect } from './actions/auth';
import './styles/main.scss';



    
class App extends React.Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        children: PropTypes.shape().isRequired,
        dispatch: PropTypes.func.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string
        }),
        
    };

    static defaultProps = {
        location: undefined
    };

    logout = () => {
        this.props.dispatch(authLogoutAndRedirect());
    };

    goToIndex = () => {
        this.props.dispatch(push('/'));
    };

    goToLogin = () => {
        this.props.dispatch(push('/login'));
    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

    goToFaq = () => {
        this.props.dispatch(push('/faq'));
    };

    render() {
        const homeClass = classNames({
            active: this.props.location && this.props.location.pathname === '/'
        });
        const protectedClass = classNames({
            active: this.props.location && this.props.location.pathname === '/protected'
        });
        const loginClass = classNames({
            active: this.props.location && this.props.location.pathname === '/login'
        });
        const FaqClass = classNames({
            active: this.props.location && this.props.location.pathname === '/faq'
        });

        return (
            <div className="app">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button"
                                className="navbar-toggle collapsed"
                                data-toggle="collapse"
                                data-target="#top-navbar"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                            </button>
                            <a className="navbar-brand" onClick={this.goToIndex}>
                                ICO project
                            </a>
                        </div>
                        <div className="collapse navbar-collapse" id="top-navbar">



                            <ul className="nav navbar-nav navbar-left">
                                <li className={homeClass}>
                                    <a className="js-go-to-ecosystem-button" onClick={this.goToIndex}>
                                        <i className="fa fa-home" /> Ecosystem
                                    </a>
                                </li>
                                <li className={protectedClass}>
                                    <a className="js-go-to-adoption-button" onClick={this.goToProtected}>
                                        <i className="fa fa-lock" /> Adoption
                                    </a>
                                </li>
                                <li>
                                    <a className="js-go-to-token-button" onClick={this.logout}>
                                        Token
                                    </a>
                                </li>
                                <li>
                                    <a className="js-go-to-SaleRoadmap-button" onClick={this.logout}>
                                    SaleRoadmap
                                    </a>
                                </li>
                                <li>
                                    <a className="js-go-to-team-button" onClick={this.logout}>
                                        Team
                                    </a>
                                </li>
                                <li className={FaqClass}>
                                    <a className="js-go-to-faq-button" onClick={this.goToFaq}>
                                    FAQ
                                    </a>
                                </li>
                            </ul>




                            {this.props.isAuthenticated ?
                                <ul className="nav navbar-nav navbar-right">

                                    <li className={protectedClass}>
                                        <a className="js-go-to-protected-button" onClick={this.goToProtected}>
                                            <i className="fa fa-lock" /> Protected
                                        </a>
                                    </li>
                                    <li>
                                        <a className="js-logout-button" onClick={this.logout}>
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                                :
                                <ul className="nav navbar-nav navbar-right">
                                    <li className={loginClass}>
                                        <a className="js-login-button" onClick={this.goToLogin}>
                                            <i className="fa fa-home" /> Login
                                        </a>
                                    </li>
                                </ul>
                            }
                        </div>
                    </div>
                </nav>

                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        location: state.routing.location
    };
};

export default connect(mapStateToProps)(App);
export { App as AppNotConnected };
