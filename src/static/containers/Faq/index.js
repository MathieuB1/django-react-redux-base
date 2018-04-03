import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel } from 'react-bootstrap';

import PropTypes from 'prop-types';


import * as actionCreators from '../../actions/faq';

class FaqView extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        faqdata: PropTypes.object,
        actions: PropTypes.shape({
            dataFetchFaqData: PropTypes.func.isRequired
        }).isRequired
    };

    static defaultProps = {
        data: []
    };

    // Note: have to use componentWillMount, if I add this in constructor will get error:
    // Warning: setState(...): Cannot update during an existing state transition (such as within `render`).
    // Render methods should be a pure function of props and state.
    componentWillMount() {
        this.props.actions.dataFetchFaqData();
    }

    handleClick = () => {
        console.log('this is:', this);
      }

    render() {

        

        function getGroups(transformer) {
            return transformer.group;
        }
        var groups = this.props.data.map(getGroups);
        var panels = Array.from(new Set(groups));


        return (
            <div className="faq">
                <div className="container">
                    <h1 className="text-center margin-bottom-medium">Faq</h1>
                    {this.props.isFetching === true ?
                        <p className="text-center">Loading data...</p>
                        :
                        <div>
                            <div className="margin-top-small">
                                    <div className="container">

                                        {panels.map( (element,index) => {return (
                                            <Panel key={index}>
                                                <Panel.Heading>
                                                <Panel.Title componentClass="h3">{element.toString()}</Panel.Title>
                                                </Panel.Heading>
                                                    <Panel.Body>
                                                    {this.props.data.filter(el => (el.group == element)).map((element1, index1) => {
                                                        return <div key={index1} onClick={this.handleClick}>{element1.title.toString()}
                                                                                 <p>{element1.text.toString()}</p>
                                                                </div>;
                                                    })}
                                                    </Panel.Body>
                                            </Panel>
                                            )}
                                    
                                        )}


                                    </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data.data,
        isFetching: state.data.isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FaqView);
export { FaqView as FaqViewNotConnected };
