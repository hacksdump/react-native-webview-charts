import React, {useState, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import generateHtmlString from './html.js';

export const LineChart = (props) => {
    const [ref, setRef] = useState(null);
    const displayAxes = (props.displayAxes && !props.displayAxes)? false: true;
    const htmlString = generateHtmlString(displayAxes);

    function syncChartWithProps() {
        if (!!ref){
            ref.postMessage(JSON.stringify(props.data))
        }
    }
    syncChartWithProps();

    return (
        <WebView
          ref={c => {
            setRef(c);
          }}
          javaScriptEnabled={true}
          source={{html: htmlString}}
          allowingReadAccessToURL={true}
          domStorageEnabled={true}
          originWhitelist={['*']}
          scalesPageToFit={true}
          scrollEnable={false}
          onLoad={syncChartWithProps}
        />
    )
}
