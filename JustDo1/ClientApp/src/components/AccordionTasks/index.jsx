import React, {Component} from 'react';

import moment from 'moment';
import './accordion-tasks.css';

class AccordionTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen : false
        }
        this.changeVisible = this.changeVisible.bind(this);
    }

    changeVisible = () => {
		this.setState(prevState=>({isOpen:!prevState.isOpen}));
    }
    
    render() {
        return (
            <React.Fragment>
                <li className='container-li' key={this.props.date}>
                    <p
                        onClick={this.changeVisible}
                        tabIndex='-1'
                    >
                        {moment(this.props.date).format("dddd, MMMM Do YYYY")}
                        <img
                            src={this.state.isOpen ?'./img/ic_arrow_up_grey.png':'./img/ic_arrow_down.png'}
                            alt='1'
                        />
                    </p>
                    {this.state.isOpen ? this.props.children : null}
                </li>
            </React.Fragment>
        );
    }
}

export default AccordionTasks;