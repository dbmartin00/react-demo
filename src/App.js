import React from 'react';
import ReactGA from 'react-ga';
import { SplitFactory, SplitTreatments } from '@splitsoftware/splitio-react';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const uuid = uuidv4();

class ImageComponent extends React.Component {
  tap() {
    console.log("dbm clicked!");
    ReactGA.event({
      category: "Lightbulb",
      action: "User clicked on lightbulb"
    });
  }

  render() {
    console.log(this.props.config);
    var configs = JSON.parse(this.props.config); 
    ReactGA.event({
      category: "Lightbulb",
      action: "User saw the lightbulb " + configs.alt
    });
    return <img width={configs.width} height={configs.height} src={configs.src} alt={configs.alt} onClick={this.tap}/>;
  }
}

class MyComponent extends React.Component {
  renderContent(treatmentWithConfig, props) {
    const { treatment, config } = treatmentWithConfig;
    return (<ImageComponent config={config} {...props} />);
  }
  render(props) {
    return (
      <SplitTreatments names={['new_onboarding_react']} >
        {({ treatments, isReady }) => { // Injects a TreatmentsWithConfig object and a boolean isReady flag.
          return isReady ?
            this.renderContent(treatments['new_onboarding_react'], props) : // Use the treatments and configs.
            <p>not ready</p>; // who has a Spinner?!!
        }}
      </SplitTreatments>
    );
  }
}

const sdkConfig = {
    core: {
        authorizationKey: "3m17636s132i2krt28o982cbe0o0qpi0honr",
        key: uuid,
        labelsEnabled: true,
        trafficType: 'user'
    },
    scheduler: {
        featuresRefreshRate: 1,
        eventsPushRate: 5
    },
    integrations: [{
      type: 'GOOGLE_ANALYTICS_TO_SPLIT'
    }],
    debug: true,
    streamingEnabled: false
};

class App extends React.Component {
	render() {
    const trackingId = "UA-128478641-2";
    ReactGA.initialize(trackingId, {
      gaOptions: {
        userId: uuid,
        siteSpeedSampleRate: 100
      }
    });
    ReactGA.plugin.require('splitTracker'); // uncomment and GA no longer sends events, no results in Split
    ReactGA.set({ page: "dbm_demo_page" });
    ReactGA.pageview("dbm_demo_page");

		return (
			<SplitFactory config={sdkConfig} updateOnSdkUpdate={true}>
	      <MyComponent />
	    </SplitFactory>
		);
	}
}
export default App;