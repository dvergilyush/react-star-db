import React, { Component } from "react";

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

const withData = (View) => {
  return class extends Component {
    state = {
      data: null,
      loading: true,
      error: false
    };

    componentDidMount() {
      this.loadData();
    }

    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        this.loadData();
      }
    }

    onDataLoaded = data => {
      this.setState({
        data,
        loading: false
      });
    }

    onError = err => {
      this.setState({
        loading: false,
        error: true
      });
    }

    loadData = () => {
      this.setState({
        loading: true
      });

      this.props
        .getData()
        .then(this.onDataLoaded)
        .catch(this.onError);
    };

    render() {
      const { data, loading, error } = this.state;

      if (loading) {
        return <Spinner />;
      }

      if (error) {
        return <ErrorIndicator />;
      }

      return <View {...this.props} data={data} />;
    }
  };
};

export default withData;
