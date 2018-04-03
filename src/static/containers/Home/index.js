import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './style.scss';
import reactLogo from './images/react-logo.png';
import reduxLogo from './images/redux-logo.png';
import Tubular from 'react-tubular';
import { Grid, Row, Col } from 'react-bootstrap';


class HomeView extends React.Component {
    static propTypes = {
        statusText: PropTypes.string,
        userName: PropTypes.string,
        dispatch: PropTypes.func.isRequired,
        videoURL: PropTypes.string
    };

    static defaultProps = {
        statusText: '',
        userName: '',
        videoURL: '6PXY5yviYjM'
    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

    render() {

        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 1
            }
        };

        return (
            <div className="container">
                <div className="margin-top-medium text-center">
                    <img className="page-logo margin-bottom-medium"
                        src={reactLogo}
                        alt="ReactJs"
                    />
                    <img className="page-logo margin-bottom-medium"
                        src={reduxLogo}
                        alt="Redux"
                    />
                </div>
                <div className="text-center">
                    <h4>Hello, {this.props.userName || 'guest'}.</h4>

                    <Grid>
                        <Row className="show-grid">
                            <Col xs={6} md={6}>
                                <button 
                                    className="btn btn-primary btn-block">
                                    <h1>WhitePaper</h1>
                                </button>
                            </Col>
                            <Col xs={6} md={6}>
                                <button className="btn btn-warning btn-block">
                                    <h1>Get Coin</h1>
                                </button>
                            </Col>
                        </Row>
                    </Grid>

                    <Tubular

                    ratio = {16/9} // usually either 4/3 or 16/9 -- tweak as needed
                    videoId = {this.props.videoURL} // toy robot in space is a good default, no?
                    mute = {true}
                    repeat = {true}
                    width = {window.innerWidth}
                    wrapperZIndex = { -1 }
                    increaseVolumeBy = { 10 }
                    start = { 0 }
                    ref={(ref)=>{this.tubular = ref}}/>


                </div>
                <div className="margin-top-medium text-center">
                    <p>Attempt to access some <a onClick={this.goToProtected}><b>protected content</b></a>.</p>
                </div>
                <div className="margin-top-medium">
                    {this.props.statusText ?
                        <div className="alert alert-info">
                            {this.props.statusText}
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText
    };
};

export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
