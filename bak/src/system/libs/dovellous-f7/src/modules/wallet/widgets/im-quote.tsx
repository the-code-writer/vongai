import React from 'react';
import { Row, Col} from 'framework7-react';

// @ts-ignore
export default ({quote}) => {

    return <React.Fragment>
        <div className="im-quote-wrapper" style={{borderColor: quote.color}}>
            <Row className="im-quote-row">
                <Col className="im-quote-text" width={quote.thumbnail?70:100}>
                    <div className="im-quote-sender" style={{color: quote.color}}>{quote.sender}</div>
                    <div className="im-quote-message">{quote.message}</div>
                </Col>
                {quote.thumbnail && (
                <Col className="im-quote-thumbnail"  width={30}>
                    <img src={quote.thumbnail} width={"100%"} alt={"quote-thumbnail"}/>
                </Col>
                )}
            </Row>            
        </div>
    </React.Fragment>

}