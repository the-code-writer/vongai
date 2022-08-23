import { Block, Button, Col, Link, Navbar, NavLeft, NavRight, NavTitle, PageContent, Row, Sheet, Toolbar } from "framework7-react";
import React from "react";

export default ({ id, userData }) => {

    return (
        <Sheet
            id={id}
            key={id}
            className={`im-sheet-modal ${id}`}
            style={{ height: '60vh' }}
            swipeToClose
            backdrop
            bottom={true}
        >
            <Navbar sliding={true}>
                <NavTitle sliding title={`${userData.displayName}`} subtitle={userData.senderNumber} />
                <NavRight>
                    <Link iconIos="f7:ellipsis_vertical" iconAurora="f7:ellipsis_vertical" iconMd="material:more_vert"
                        popoverOpen=".popover-menu" />
                </NavRight>
            </Navbar>
            <PageContent>
                <img src={userData.avatar} style={{ width: '100%' }} />
                <Row>
                    <Col>
                        <Button iconIos="chat" iconMd="chat" iconAurora="chat" iconSize={32}
                            text="Chat"
                        />
                    </Col>
                    <Col>
                        <Button iconIos="call" iconMd="call" iconAurora="call" iconSize={32}
                            text="Voice"
                        />
                    </Col>
                    <Col>
                        <Button iconIos="video_cam_fill" iconMd="video" iconAurora="video_cam_fill" iconSize={32}
                            text="Video"
                        />
                    </Col>
                    <Col>
                        <Button iconIos="info" iconMd="info" iconAurora="info" iconSize={32}
                            text="Info"
                        />
                    </Col>
                </Row>
                {/* {JSON.stringify(userData)} */}
            </PageContent>
        </Sheet>
    );

};
