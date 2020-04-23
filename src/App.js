import React from 'react';
import off from './OFF_bulb.png';
import on from './ON_bulb.png';
import control from './control.png'

import { SplitFactory, SplitTreatments } from '@splitsoftware/splitio-react';

const MyComponentV0 = () => ( <img src={control} alt="CONTROL"/> );
const MyComponentV1 = () => ( <img src={off} alt="OFF"/> );
const MyComponentV2 = () => ( <img src={on} alt="ON"/> );

class MyComponent extends React.Component {
  renderContent(treatmentWithConfig, props) {
    const { treatment, config } = treatmentWithConfig;
    if (treatment === 'on') {
    	return (<MyComponentV2 config={config} {...props} />);
    } else if (treatment === 'off') {
    	return (<MyComponentV1 config={config} {...props} />);
    } else {
      return (<MyComponentV0 config={config} {...props} />);
    }
  }
  render(props) {
    return (
      <SplitTreatments names={['new_onboarding']} >
        {({ treatments, isReady }) => { // Injects a TreatmentsWithConfig object and a boolean isReady flag.
          return isReady ?
            this.renderContent(treatments['new_onboarding'], props) : // Use the treatments and configs.
            <p>not ready</p>; // who has a Spinner?!!
        }}
      </SplitTreatments>
    );
  }
}
const sdkConfig = {
    core: {
        authorizationKey: "3m17636s132i2krt28o982cbe0o0qpi0honr",
        key: "dmartin"
    },
    scheduler: {
        featuresRefreshRate: 1
    }
};
class App extends React.Component {
	render() {
		return (
			<SplitFactory config={sdkConfig} updateOnSdkUpdate={true}>
	      <MyComponent />
	    </SplitFactory>
		);
	}
}
export default App;