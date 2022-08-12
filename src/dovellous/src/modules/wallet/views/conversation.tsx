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
    f7ready, Searchbar, theme,PageContent,BlockTitle, Icon, Row, Fab
} from 'framework7-react';

import IMAttachmentDescription from "../components/custom/im-attachment-description";

import imageMessageSheetModalDocument from "../assets/img/im-document.png";
import imageMessageSheetModalCamera from "../assets/img/im-camera.png";
import imageMessageSheetModalGallery from "../assets/img/im-gallery.png";
import imageMessageSheetModalAudio from "../assets/img/im-audio.png";
import imageMessageSheetModalLocation from "../assets/img/im-location.png";

export default () => {
    const images = [
        'https://cdn.framework7.io/placeholder/cats-300x300-1.jpg',
        'https://cdn.framework7.io/placeholder/cats-200x300-2.jpg',
        'https://cdn.framework7.io/placeholder/cats-400x300-3.jpg',
        'https://cdn.framework7.io/placeholder/cats-300x150-4.jpg',
        'https://cdn.framework7.io/placeholder/cats-150x300-5.jpg',
        'https://cdn.framework7.io/placeholder/cats-300x300-6.jpg',
        'https://cdn.framework7.io/placeholder/cats-300x300-7.jpg',
        'https://cdn.framework7.io/placeholder/cats-200x300-8.jpg',
        'https://cdn.framework7.io/placeholder/cats-400x300-9.jpg',
        'https://cdn.framework7.io/placeholder/cats-300x150-10.jpg',
    ];
    const people = [
        {
            name: 'Saadat  Khan',
            avatar: 'https://ui-avatars.com/api/?background=000066&color=fff&name=Saadat+Khan',
        },
        {
            name: 'Lorraine Dube',
            avatar: 'https://ui-avatars.com/api/?background=33CC66&color=fff&name=Lorraine+Dube',
        },
        {
            name: 'Heath Darare',
            avatar: 'https://ui-avatars.com/api/?background=CC0033&color=fff&name=Heath+Darare',
        },
        {
            name: 'Tatenda Sibanda',
            avatar: 'https://ui-avatars.com/api/?background=990033&color=fff&name=Tatenda+Sibanda',
        },
        {
            name: 'Eron Muss',
            avatar: 'https://ui-avatars.com/api/?background=006633&color=fff&name=Eron+Muss',
        },
        {
            name: 'Douglas Maposa',
            avatar: 'https://ui-avatars.com/api/?background=006633&color=fff&name=Douglas+Maposa',
        },
        {
            name: 'Gracious Mashasha',
            avatar: 'https://ui-avatars.com/api/?background=006633&color=fff&name=Gracious+Mashasha',
        },
    ];
    const answers = [
        'Yes!',
        'No',
        'Hm...',
        'I am not sure',
        'And what about you?',
        'May be ;)',
        'Lorem ipsum dolor sit amet, consectetur',
        'What?',
        'Are you sure?',
        'Of course',
        'Need to think about it',
        'Amazing!!!',
    ];
    const [actionGridOpened, setActionGridOpened] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [sheetVisible, setSheetVisible] = useState(false);
    const [typingMessage, setTypingMessage] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [messagesData, setMessagesData] = useState([
        {
            type: 'sent',
            text: 'Hi, Kate',
        },
        {
            type: 'sent',
            text: 'How are you?',
        },
        {
            name: 'Eron Muss',
            type: 'received',
            text: 'Hi, I have attached 4 documents below. Please let me know what you think.\n\nAlso check this link <a href="#">https://google.com</a>',
            avatar: 'https://ui-avatars.com/api/?background=006633&color=fff&name=Eron+Muss',
            image: 'https://civilworx.co.za/wp-content/uploads/2019/06/Trenching-Machine-10-1030x773.jpg',
            attachments: [{
                name: "Customer Requirements.xlsx",
                type: "xls",
                size: 452455,
                pages: 5,
                preview: 'https://t4.ftcdn.net/jpg/02/14/01/23/360_F_214012343_zhml7HjJjJLNlt1sNDiGdLd7ETujiFnY.jpg'
            },{
                name: "Desk Study.docx",
                type: "doc",
                size: 452455,
                pages: 5,
                preview: 'https://t4.ftcdn.net/jpg/02/14/01/23/360_F_214012343_zhml7HjJjJLNlt1sNDiGdLd7ETujiFnY.jpg'
            },{
                name: "Proforma Invoice.docx",
                type: "pdf",
                size: 452455,
                pages: 5,
                preview: 'https://t4.ftcdn.net/jpg/02/14/01/23/360_F_214012343_zhml7HjJjJLNlt1sNDiGdLd7ETujiFnY.jpg'
            },{
                name: "Site Plan.jpg",
                type: "jpg",
                size: 452455,
                pages: 5,
                preview: 'https://t4.ftcdn.net/jpg/02/14/01/23/360_F_214012343_zhml7HjJjJLNlt1sNDiGdLd7ETujiFnY.jpg'
            },
            ]
        },
        {
            name: 'Gracious Mashasha',
            type: 'received',
            text: 'Please find the attached file',
            avatar: 'https://ui-avatars.com/api/?background=006633&color=fff&name=Gracious+Mashasha',
        },
        {
            name: 'Gracious Mashasha',
            type: 'received',
            text: 'Pardon?',
            avatar: 'https://ui-avatars.com/api/?background=006633&color=fff&name=Gracious+Mashasha',
        },
        {
            name: 'Gracious Mashasha',
            type: 'received',
            text: 'Hi there, I am also fine, thanks! And how are you?',
            avatar: 'https://ui-avatars.com/api/?background=006633&color=fff&name=Gracious+Mashasha',
        },
        {
            type: 'sent',
            text: 'Hey, Blue Ninja! Glad to see you ;)',
        },
        {
            type: 'sent',
            text: 'Hey, look, cutest kitten ever!',
        },
        {
            type: 'sent',
            text: 'Please find the attached report',
            image: 'https://t4.ftcdn.net/jpg/02/14/01/23/360_F_214012343_zhml7HjJjJLNlt1sNDiGdLd7ETujiFnY.jpg',
            attachments: [{
                name: "January - February 2022 (Batoka Report).pdf",
                type: "pdf",
                size: 52653242,
                pages: 0,
                preview: 'https://t4.ftcdn.net/jpg/02/14/01/23/360_F_214012343_zhml7HjJjJLNlt1sNDiGdLd7ETujiFnY.jpg'
            }]
        },
        {
            name: 'Tatenda Sibanda',
            type: 'received',
            text: 'Nice!',
            avatar: 'https://ui-avatars.com/api/?background=990033&color=fff&name=Tatenda+Sibanda',
        },
        {
            name: 'Heath Darare',
            type: 'received',
            text: 'Like it very much!',
            avatar: 'https://ui-avatars.com/api/?background=CC0033&color=fff&name=Heath+Darare',
        },
        {
            name: 'Lorraine Dube',
            type: 'received',
            text: 'Awesome!',
            avatar: 'https://ui-avatars.com/api/?background=33CC66&color=fff&name=Lorraine+Dube',
        },
    ]);

    const responseInProgress = useRef(false);
    const messagebar = useRef(null);

    const attachmentsVisible = () => {
        return attachments.length > 0;
    };
    const placeholder = () => {
        return attachments.length > 0 ? 'Add comment or Send' : 'Message';
    };
    useEffect(() => {
        f7ready(() => {
            messagebar.current = f7.messagebar.get('.messagebar');
        });
    });
    const isFirstMessage = (message, index) => {
        const previousMessage = messagesData[index - 1];
        if (message.isTitle) return false;
        if (
            !previousMessage ||
            previousMessage.type !== message.type ||
            previousMessage.name !== message.name
        )
            return true;
        return false;
    };
    const isLastMessage = (message, index) => {
        const nextMessage = messagesData[index + 1];
        if (message.isTitle) return false;
        if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name)
            return true;
        return false;
    };
    const isTailMessage = (message, index) => {
        const nextMessage = messagesData[index + 1];
        if (message.isTitle) return false;
        if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name)
            return true;
        return false;
    };
    const deleteAttachment = (image) => {
        const index = attachments.indexOf(image);
        attachments.splice(index, 1);
        setAttachments([...attachments]);
    };
    const handleAttachment = (e) => {
        const index = f7.$(e.target).parents('label.checkbox').index();
        const image = images[index];
        if (e.target.checked) {
            // Add to attachments
            attachments.unshift(image);
        } else {
            // Remove from attachments
            attachments.splice(attachments.indexOf(image), 1);
        }
        setAttachments([...attachments]);
    };
    const sendMessage = () => {
        const text = messageText.replace(/\n/g, '<br>').trim();
        const messagesToSend = [];
        attachments.forEach((attachment) => {
            messagesToSend.push({
                image: attachment,
            });
        });
        if (text.length) {
            messagesToSend.push({
                text,
            });
        }
        if (messagesToSend.length === 0) {
            return;
        }
        setAttachments([]);
        setSheetVisible(false);
        setMessagesData([...messagesData, ...messagesToSend]);
        setMessageText('');

        // Focus area
        if (text.length) messagebar.current.focus();

        // Mock response
        if (responseInProgress.current) return;

        responseInProgress.current = true;

        setTimeout(() => {
            const answer = answers[Math.floor(Math.random() * answers.length)];
            const person = people[Math.floor(Math.random() * people.length)];
            setTypingMessage({
                name: person.name,
                avatar: person.avatar,
            });
            setTimeout(() => {
                setTypingMessage(null);
                setMessagesData([
                    ...messagesData,
                    {
                        text: answer,
                        type: 'received',
                        name: person.name,
                        avatar: person.avatar,
                    },
                ]);
                responseInProgress.current = false;
            }, 4000);
        }, 1000);
    };

    return (


        <Page className="job-details">
            <Navbar sliding={false}>
                <NavLeft>
                    <Link back iconIos="f7:arrow_left" iconAurora="f7:arrow_left" iconMd="material:arrow_back">
                        <img
                            slot="media"
                            src="https://hyperefficient2.net/communicator-mobile/cdn/images/enbee.png"
                            width="44"
                            className="rounded"
                        />
                        <div className={"andon-status-navbar"}/>
                    </Link>
                </NavLeft>
                <NavTitle sliding title={"Job #98498943"} subtitle={"Enbee Stores"} className="no-padding-left" />
                <NavRight>
                    <Link iconIos="f7:doc_text" iconAurora="f7:doc_text" iconMd="material:description"
                          sheetOpen=".sheet-modal-job-summary"/>
                    <Link iconIos="f7:ellipsis_vertical" iconAurora="f7:ellipsis_vertical" iconMd="material:more_vert"
                          popoverOpen=".popover-menu"/>
                </NavRight>
            </Navbar>

            <Messagebar
                placeholder={placeholder()}
                attachmentsVisible={attachmentsVisible()}
                sheetVisible={sheetVisible}
                value={messageText}
                onInput={(e) => setMessageText(e.target.value)}
            >
                <Link
                    iconIos="f7:at_circle"
                    iconAurora="f7:at_circle"
                    iconMd="material:alternate_email"
                    slot="inner-start"
                    onClick={() => {
                        setSheetVisible(!sheetVisible);
                    }}
                />
                <Link
                iconIos="f7:number_circle"
                iconAurora="f7:number_circle"
                iconMd="material:tag"
                slot="inner-start"
                onClick={() => {
                    setSheetVisible(!sheetVisible);
                }}
            />
                <Link
                    iconIos="f7:paperclip"
                    iconAurora="f7:paperclip"
                    iconMd="material:attach_file"
                    slot="inner-end"
                    onClick={() => setActionGridOpened(true)}
                />
                {/*
                <Link
                    iconIos="f7:arrow_up_circle_fill"
                    iconAurora="f7:arrow_up_circle_fill"
                    iconMd="material:send"
                    slot="inner-end"
                    onClick={sendMessage}
                />
                */}
                <MessagebarAttachments>
                    {attachments.map((image, index) => (
                        <MessagebarAttachment
                            key={index}
                            image={image}
                            onAttachmentDelete={() => deleteAttachment(image)}
                        />
                    ))}
                </MessagebarAttachments>
                <MessagebarSheet>
                    {images.map((image, index) => (
                        <MessagebarSheetImage
                            key={index}
                            image={image}
                            checked={attachments.indexOf(image) >= 0}
                            onChange={handleAttachment}
                        />
                    ))}
                </MessagebarSheet>
            </Messagebar>

            <Messages>
                <MessagesTitle>
                    <div>
                        <b>Sunday, Feb 9,</b> 12:58
                    </div>
                </MessagesTitle>

                {messagesData.map((message: object, index:number) => (

                    <React.Fragment key={index}>

                        {index === 4 && (

                        <MessagesTitle>
                            <div>
                                <b>Yesterday</b>
                            </div>
                        </MessagesTitle>

                        )}

                        <Message
                            key={index}
                            type={message.type}
                            image={message.image}
                            name={message.name}
                            avatar={message.avatar}
                            first={isFirstMessage(message, index)}
                            last={isLastMessage(message, index)}
                            tail={isTailMessage(message, index)}
                        >

                            {('attachments' in message && message.attachments.length>0) && (
                                <div key={`bubble-end-attachments-slot-${index}`} slot="bubble-end">
                                    {message.attachments.map((attachment: object, attachmentIndex:number) => (
                                        <IMAttachmentDescription key={`attachment-item-${attachmentIndex}`} attachmentDetails={attachment} />
                                    ))}
                                </div>
                            )}

                            {message.text && (
                                <span key={`text-slot-${index}`} slot="text" dangerouslySetInnerHTML={{ __html: message.text }} />
                            )}

                            {!(message.type && message.type==="received") && (
                            <div key={`bubble-end-time-ago-slot-${index}`} slot="bubble-end" className={"message-time-ago"}>
                                03:34
                                <i className="material-icons">done_all</i>
                            </div>
                            )}

                        </Message>

                    </React.Fragment>

                ))}
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
            </Messages>


            <Sheet
                className="sheet-modal-job-summary"
                style={{ height: 'auto'}}
                swipeToClose
                backdrop
            >
                <PageContent>
                    <BlockTitle large>Job Summary</BlockTitle>
                    <Block>
                        <List>
                            <ListItem key={"job-summary-list-item-1"} header="Customer Name" title="Enbee Stores" />
                            <ListItem key={"job-summary-list-item-2"} header="Job Number" title="#5425" />
                            <ListItem key={"job-summary-list-item-3"} header="Estimate Number" title="#5622" />
                            <ListItem key={"job-summary-list-item-4"} header="Job Category" title="Engin e Service" />
                            <ListItem key={"job-summary-list-item-5"} header="Date Accepted" title="3-Mar-2022, 3:32pm" />
                            <ListItem key={"job-summary-list-item-6"} header="Date Updated" title="7-Mar-2022, 7:48am" />
                            <ListItem key={"job-summary-list-item-7"} header="Technicians" title="Tawanda, Evans, John" />
                            <ListItem key={"job-summary-list-item-8"} header="Next SLA Breach" title="4 Hours" />
                            <ListItem key={"job-summary-list-item-9"} header="Description" title="Change engine oil, brake pads. Replace left front tyre. Check headlamps" />
                        </List>
                    </Block>
                </PageContent>
            </Sheet>

            {/* Grid */}
            <Actions
                grid={true}
                opened={actionGridOpened}
                onActionsClosed={() => setActionGridOpened(false)}
            >
                <ActionsGroup>
                    <ActionsButton>
                        <img
                            slot="media"
                            src={imageMessageSheetModalDocument}
                            width="48"
                        />
                        <span>Document</span>
                    </ActionsButton>
                    <ActionsButton>
                        <img
                            slot="media"
                            src={imageMessageSheetModalCamera}
                            width="48"
                        />
                        <span>Camera</span>
                    </ActionsButton>
                    <ActionsButton>
                        <img
                            slot="media"
                            src={imageMessageSheetModalGallery}
                            width="48"
                        />
                        <span>Gallery</span>
                    </ActionsButton>
                </ActionsGroup>
                <ActionsGroup>
                    <ActionsButton>
                        <img
                            slot="media"
                            src={imageMessageSheetModalAudio}
                            width="48"
                        />
                        <span>Audio</span>
                    </ActionsButton>
                    <ActionsButton>
                        <img
                            slot="media"
                            src={imageMessageSheetModalLocation}
                            width="48"
                        />
                        <span>Location</span>
                    </ActionsButton>
                </ActionsGroup>
            </Actions>

            <Fab position="right-bottom"
                 className={"m-b-0"}
                 slot="fixed"
                 color="blue"
                 onClick={sendMessage}>
                <Icon
                    ios="f7:arrow_up_circle_fill"
                    aurora="f7:arrow_up_circle_fill"
                    md="material:send"/>
            </Fab>
        </Page>


    );
};