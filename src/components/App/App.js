/*global chrome*/

import React, { Component } from 'react';
import Header from '../Header/Header';
import NewSeries from '../NewSeries/NewSeries';
import loadData from  '../../utils/loadData';

//api
const linkApi = 'api/v1/episodes?key=test_key&limit=20';
const activeHost = 'https://gist.githubusercontent.com/fansserials/897e77f4f293d138ed0b8ac85dc92e59/raw';

class App extends Component {

  constructor() {
    super();
    this.state = {
      data: [],
      redirectHost: ''
    };
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  async componentDidMount() {

    const hostData = await loadData(activeHost);

    const host = await hostData.sites[0].redirectTo;

    const response = await loadData(host + linkApi);

    const json = await response.data;

    await this.setStateAsync({
      data: json,
      loading: false
    });

    this.storageData();
  }

  storageData = () => {
    chrome.storage.local.get(["redirectTo"], value => {
      if (!value.redirectTo) return;
      this.setState({ redirectHost: value.redirectTo });
    });
  };

  render() {
    const { data } = this.state;
    const fanserialsLink = this.state.redirectHost;

    return (
      <div className="App">
        <Header data={fanserialsLink}/>
        <div className="block-navigation">
          <div className="list">
            <div className="btn is-active"><div className="help">Новые серии</div></div>
            <a target="_blank" href={fanserialsLink+'#alfavitForm'} className="btn"><div className="help">Список сериалов</div></a>
            <a target="_blank" href={fanserialsLink+'profile/'} className="btn"><div className="help">Личный кабинет</div></a>
          </div>
        </div>
        <NewSeries data={data} />
      </div>
    );
  }
}

export default App;
