import { Button, Col, PageContent, Row, Sheet, Toolbar } from "framework7-react";
import React from "react";

export default ({id, userData}) => {

    return (
        <Sheet
            id={id}
            key={id}
            className={`im-sheet-modal ${id}`}
            style={{ height: '60vh' }}
            swipeToClose
            backdrop
        >
            <Toolbar>
                User Display Name
            </Toolbar>
            <PageContent>
                <Row>
                    <Col>
                        <Button 
                            text="Chat"
                        />
                    </Col>
                    <Col>
                        <Button 
                            text="Voice Call"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button 
                            text="Video Call"
                        />
                    </Col>
                    <Col>
                        <Button 
                            text="User Info"
                        />
                    </Col>
                </Row>
            </PageContent>
        </Sheet>
    );

};
