import React, {useState, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import html from './html.js';

export const LineChart = (props) => {
    const [ref, setRef] = useState(null);

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
          source={{html: html}}
          allowingReadAccessToURL={true}
          domStorageEnabled={true}
          originWhitelist={['*']}
          scalesPageToFit={true}
          scrollEnable={false}
          onLoad={syncChartWithProps}
        />
    )
}
