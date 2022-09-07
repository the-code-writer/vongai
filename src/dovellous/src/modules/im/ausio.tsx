import React from "react";

import { WaveformVisualizer, WaveformVisualizerTheme, SpectrumVisualizer, SpectrumVisualizerTheme } from 'react-audio-visualizers';

export default ({url}) => {

  return (
      <WaveformVisualizer
        audio={url}
        theme={WaveformVisualizerTheme.squaredBars}
        colors={['#009688', '#26a69a']}
        iconsColor="#26a69a"
        backgroundColor="white"
        showMainActionIcon
        showLoaderIcon
        highFrequency={8000}
    />
    );
}
