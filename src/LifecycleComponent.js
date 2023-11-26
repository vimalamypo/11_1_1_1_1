import React, { Component } from 'react';

class LifecycleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            updatedCount: 0,
        };
    }

    componentDidMount() {
        // Simulate an API call
        setTimeout(() => {
            this.setState({ data: 'Fetched data' });
        }, 1000);
    }

    componentDidUpdate(prevProps) {
        // Check for specific prop changes and update state
        if (this.props.updateTrigger !== prevProps.updateTrigger) {
            this.setState(prevState => ({ updatedCount: prevState.updatedCount + 1 }));
        }
    }

    componentWillUnmount() {
        // Cleanup if needed
        console.log('Component is being unmounted');
    }

    render() {
        const { data, updatedCount } = this.state;

        return (
            <div>
                <p>{data ? data : 'Loading data...'}</p>
                <p>Update Count: {updatedCount}</p>
            </div>
        );
    }
}

export default LifecycleComponent;
