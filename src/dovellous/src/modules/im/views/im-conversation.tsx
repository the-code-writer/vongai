import React, { useState, useEffect, useRef } from 'react';
import {
    Page,
    Navbar,
    NavRight,
    NavTitle,
    NavLeft,
    Messagebar,
    Block,
    Link,
    List,
    ListItem,
    Sheet,
    MessagebarAttachments,
    MessagebarAttachment,
    MessagebarSheet,
    MessagebarSheetImage,
    Messages,
    MessagesTitle,
    Message,
    Actions,
    ActionsGroup,
    ActionsLabel,
    ActionsButton,
    f7,
    f7ready,
    Searchbar,
    theme,
    PageContent,
    Preloader,
    BlockTitle,
    PhotoBrowser,
    Icon,
    Row,
    Col,
    Fab,
    Chip,
    Toolbar,
    Popover,
    useStore, SkeletonBlock
} from 'framework7-react';

const IMConversation = (props) => {

  const { f7route, f7router } = props;

  console.log("::: IM COVERSATIONS :::", props);

  return (

    <Page className="im-conversation">
        <Navbar sliding={true}>
            <NavLeft>
                <Link 
                  back 
                  iconIos="f7:arrow_left" 
                  iconAurora="f7:arrow_left" 
                  iconMd="material:arrow_back">
                    <img
                        slot="media"
                        src={`https://ui-avatars.com/api/?format=svg&rounded=true&bold=true&size=128&font-size=0.45&background=cc0000&color=fff&name=${customerName.replace(" ","+")}`}
                        width="44"
                        className="rounded"
                        alt={""}
                    />
                    <div className={"im-user-online-status"}/>
                </Link>
            </NavLeft>
            <NavTitle sliding title={`${displayName}`} subtitle={displayStatusText} className="no-padding-left" />
            <NavRight>
                <Link 
                  iconIos="f7:doc_text" 
                  iconAurora="f7:doc_text" 
                  iconMd="material:description"
                      sheetOpen=".sheet-modal-job-summary"/>
                <Link iconIos="f7:ellipsis_vertical" iconAurora="f7:ellipsis_vertical" iconMd="material:more_vert"
                      popoverOpen=".popover-menu"/>
            </NavRight>
        </Navbar>

        <PhotoBrowser
            photos={photos}
            ref={standalone}
            theme={"dark"}
            toolbar={false}
            swipeToClose={true}
            swiper={
                    {
                        initialSlide: 0,
                        spaceBetween: 20,
                        speed: 300,
                        loop: false,
                        preloadImages: true,
                        keyboard: {
                            enabled: true,
                        },
                        navigation: {
                            nextEl: '.photo-browser-next',
                            prevEl: '.photo-browser-prev',
                        },
                        zoom: {
                            enabled: true,
                            maxRatio: 10,
                            minRatio: 1,
                        },
                        lazy: {
                            enabled: true,
                        }
                    }
                }
        />

        <Messages>

            {Object.keys(currentChat).length>0?(

                    <React.Fragment key={`message-wrapper-${jobRefId}`} >

                        {Object.keys(currentChat).map((day: string, index:number) =>

                            <React.Fragment key={`day-wrapper-${index}`} >

                                <div key={`day-title-${index}`} className="messages-title message-appeared">{currentChat[day].title}</div>

                                {Object.keys(currentChat[day].chats).map((messageId: string, messageIndex:number)=>(

                                    <React.Fragment key={`message-container-${messageIndex}`} >

                                        <Message
                                            key={index}
                                            type={currentChat[day].chats[messageId].type}
                                            image={currentChat[day].chats[messageId].image}
                                            avatar={currentChat[day].chats[messageId].text.includes("<!--SYSTEM_MESSAGE-->")?imageBot:currentChat[day].chats[messageId].avatar}
                                            className={currentChat[day].chats[messageId].text.includes("<!--SYSTEM_MESSAGE-->")?"system-message":""}
                                            first={isFirstMessage(currentChat[day].chats, currentChat[day].chats[messageId], messageIndex)}
                                            last={isLastMessage(currentChat[day].chats, currentChat[day].chats[messageId], messageIndex)}
                                            tail={isTailMessage(currentChat[day].chats, currentChat[day].chats[messageId], messageIndex)}
                                            sameName={isSameName(currentChat[day].chats, currentChat[day].chats[messageId], messageIndex)}
                                            sameAvatar={isSameAvatar(currentChat[day].chats, currentChat[day].chats[messageId], messageIndex)}
                                            sameHeader={isSameHeader(messageIndex)}
                                            sameFooter={isSameFooter(messageIndex)}
                                            onClick={() => openPhoto(currentChat[day].chats[messageId].image, currentChat[day].chats[messageId].text)}
                                        >



                                            {('forwarded' in currentChat[day].chats[messageId] && currentChat[day].chats[messageId].forwarded) && (
                                                <div key={`bubble-start-forwarded-slot-${index}`} slot="bubble-start" className={"forwarded-message"}>
                                                    <em><i className="f7-icons">arrowshape_turn_up_right_fill</i> Forwarded</em>
                                                </div>
                                            )}

                                            {currentChat[day].chats[messageId].name.length>0 && currentChat[day].chats[messageId].type==='received' && isTailMessage(currentChat[day].chats, currentChat[day].chats[messageId], messageIndex) && (
                                                <Row slot="bubble-start" >
                                                    <Col>
                                                        <span style={{color: `#${stringToColour(currentChat[day].chats[messageId].name)}`}} className={`im-group-display-name`}>{currentChat[day].chats[messageId].name}</span>
                                                    </Col>
                                                </Row>
                                            )}

                                            {('quote' in currentChat[day].chats[messageId] && typeof currentChat[day].chats[messageId].quote === "object" && currentChat[day].chats[messageId].quote.message.length > 0) && (
                                                <div key={`bubble-start-quote-slot-${index}`} slot="bubble-start" className={"quote-message"}>
                                                    <IMQuote quote={currentChat[day].chats[messageId].quote} />
                                                </div>
                                            )}

                                            {('attachment' in currentChat[day].chats[messageId] && currentChat[day].chats[messageId].attachment.length>0&&currentChat[day].chats[messageId].image.length===0) && (
                                                <div key={`bubble-end-attachments-slot-${index}`} slot="bubble-start">
                                                    {currentChat[day].chats[messageId].attachment.map((attachment: object, attachmentIndex:number) => (
                                                        <IMAttachmentDescription key={`attachment-item-${attachmentIndex}`} attachment={attachment} />
                                                    ))}
                                                </div>
                                            )}

                                            {currentChat[day].chats[messageId].text && (
                                                <div key={`text-slot-${index}`} slot="text" >
                                                    <ReactMarkdown
                                                        children={currentChat[day].chats[messageId].text}
                                                        rehypePlugins={[rehypeRaw]}
                                                        remarkPlugins={[[remarkGfm, {singleTilde: false}]]}
                                                    />
                                                </div>
                                            )}


                                            <div key={`bubble-end-time-ago-slot-${index}`} slot="bubble-end" className={"message-time-ago"}>

                                                { currentChat[day].chats[messageId].hasOwnProperty('time') ? (

                                                    <>{moment(currentChat[day].chats[messageId].time).format('HH:mm')}</>

                                                ) : (

                                                    <>{moment(currentChat[day].chats[messageId].date, "YYYY-MM-DD HH:mm").format('HH:mm')}

                                                        <br/>

                                                        {`>>>${JSON.stringify(currentChat[day].chats[messageId])}<<<`}

                                                    </>

                                                )

                                                }

                                                {!(currentChat[day].chats[messageId].type && currentChat[day].chats[messageId].type==="received") && (

                                                    currentChat[day].chats[messageId].hasOwnProperty("tick") ? (
                                                        <i className={`material-icons im-delivery-status-icon ${messageId}`}>{currentChat[day].chats[messageId].tick}</i>
                                                    ):(
                                                        <i className="material-icons im-delivery-status-icon ${messageId}">done_all</i>
                                                    )

                                                )}

                                            </div>


                                        </Message>

                                    </React.Fragment>

                                ))}

                            </React.Fragment>

                        )}

                        {typingMessage && (
                            <Message
                                type="received"
                                typing={true}
                                first={true}
                                last={true}
                                tail={true}
                                header={`${typingMessage.name} is typing`}
                                avatar={typingMessage.avatar}
                            />
                        )}

                    </React.Fragment>

            ):(

                <React.Fragment>

                    <Preloader size={42} color="white" />


                </React.Fragment>

            )}

        </Messages>

        <Messagebar
            className={attachmentPreviews.length>0?"preview":""}
            placeholder={placeholder()}
            attachmentsVisible={attachmentsVisible()}
            sheetVisible={sheetVisible}
            value={messageText}
            onInput={(e) => setMessageText(e.target.value)}
        >
            <IMAttachmentPreview
                slot="before-inner"
                titleLength={10}
                maxAttachments={3}
                removeAttachmentItem={removeAttachmentItemHandler}
                attachments={attachmentPreviews}
            />
            <Link
                iconIos="f7:at_circle"
                iconAurora="f7:at_circle"
                iconMd="material:alternate_email"
                slot="inner-start"
                popoverOpen=".popover-mentions"
                className={"p-r-0"}
            />
            <Link
                iconIos="f7:number_circle"
                iconAurora="f7:number_circle"
                iconMd="material:tag"
                slot="inner-start"
                popoverOpen=".popover-hashtag"
                className={"p-r-0"}
            />

            <div slot="before-area" >
                <RichHtmlTextInput
                    ref={messageBarTextInput}
                    onRichHtmlTextChanged={richHtmlTextChangedHandler}
                    richHTMLEvents={richHTMLEvents}
                    placeholder={placeholder()}
                />
            </div>
            <Link
                iconIos="f7:paperclip"
                iconAurora="f7:paperclip"
                iconMd="material:attach_file"
                slot="inner-end"
                onClick={() => setActionGridOpened(true)}
                className={"p-l-0"}
            />

        </Messagebar>

        <div style={{opacity: 1, height: "1px", visibility: "hidden"}} >

            <form id="frm-collaboration-message" encType="multipart/form-data" method="post">

                <input type="file" multiple onChange={(e)=>previewFile(e,'docFile')} name="attachment1[]" id="docFile" accept="application/*" />
                <input type="file" multiple onChange={(e)=>previewFile(e,'audioFile')} name="attachment2[]" id="audioFile" accept="audio/*" />
                <input type="file" multiple onChange={(e)=>previewFile(e,'videoFile')} name="attachment3[]" id="videoFile" accept="video/*" />
                <input type="file" multiple onChange={(e)=>previewFile(e,'imageFile')} name="attachment4[]" id="imageFile" accept="image/*" />
                <input type="file" multiple onChange={(e)=>previewFile(e,'collaboration-attachment')} name="attachment[]" id="collaboration-attachment" accept="*/*" />

            </form>

        </div>

        {/* Grid */}
        <Actions
            grid={true}
            opened={actionGridOpened}
            onActionsClosed={() => setActionGridOpened(false)}
        >
            <ActionsGroup>
                <ActionsButton onClick={() => Dom7("#docFile").click() }>
                    <img
                        slot="media"
                        src={imageMessageSheetModalDocument}
                        width="48"
                    />
                    <span>Document</span>
                </ActionsButton>
                <ActionsButton onClick={takePicture}>
                    <img
                        slot="media"
                        src={imageMessageSheetModalCamera}
                        width="48"
                    />
                    <span>Camera</span>
                </ActionsButton>
                <ActionsButton onClick={pickPicture}>
                    <img
                        slot="media"
                        src={imageMessageSheetModalGallery}
                        width="48"
                    />
                    <span>Gallery</span>
                </ActionsButton>
            </ActionsGroup>
            <ActionsGroup>
                <ActionsButton onClick={() => Dom7("#audioFile").click() }>
                    <img
                        slot="media"
                        src={imageMessageSheetModalAudio}
                        width="48"
                    />
                    <span>Audio</span>
                </ActionsButton>
                <ActionsButton onClick={sendMessageLocation}>
                    <img
                        slot="media"
                        src={imageMessageSheetModalLocation}
                        width="48"
                    />
                    <span>Location</span>
                </ActionsButton>
            </ActionsGroup>
        </Actions>

        <Popover className="popover-mentions">
            <List>
                {JSON.parse(tenantUsersList).map((mention, mentionItemIndex)=>(
                    <ListItem href={"#"} popoverClose noChevron key={`mention-item-${mentionItemIndex}`} title={mention.value}  onClick={()=>insertMention(mention)} >
                        <img width="24" slot="media" src={mention.image}  alt={mention.value}/>
                    </ListItem>
                ))}
            </List>
        </Popover>

        <Popover className="popover-hashtag">
            <List>
                {currentJob.tasks.map((hashItem, hashItemIndex)=>(
                    <ListItem href={"#"} popoverClose noChevron key={`hash-item-${hashItemIndex}`} title={hashItem.task} onClick={()=>insertHash(hashItem)} />
                ))}
            </List>
        </Popover>

        <Fab position="right-bottom"
             className={"m-b-0"}
             slot="fixed"
             color="blue"
             onClick={sendMessageNow}>
            <Icon
                ios="f7:arrow_up_circle_fill"
                aurora="f7:arrow_up_circle_fill"
                md="material:send"/>
        </Fab>

    </Page>

)};

export default IMConversation;