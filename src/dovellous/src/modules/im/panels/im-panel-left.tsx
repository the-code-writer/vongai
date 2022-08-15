import {
    f7,
    Panel, View, Page, Navbar, Block
} from "framework7-react";

import React, { useCallback, useState, useRef, useEffect } from "react";

export default () => {

    

    useEffect(() => {


    }, [])


    return (

        <Panel left cover>
        <View>
          <Page>
            <Navbar title="Left Panel" />
            <Block>Left panel content goes here</Block>
          </Page>
        </View>
      </Panel>

    );

};
