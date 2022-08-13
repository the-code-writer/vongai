import {
    f7,
    Page,
    Popup,
    Navbar,
    NavRight,
    NavLeft,
    Link,
    List,
    ListIndex,
    ListItem,
    Searchbar,
    theme,
    NavTitle
} from "framework7-react";

import React, { useCallback, useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { StorageContacts } from "../store/contacts-store";

export default ({
    popupOpened,
    onPopupClosed,
    onContactSelected,
}) => {

    let contacts = StorageContacts.state.imContacts;

    StorageContacts.getters.imContacts.onUpdated((_newData: any) => {
        //console.log("::StorageContacts::onUpdated::", _newData);
        contacts = _newData;
    })

    const imContactsListIndex = useRef(null);

    const itemsPerPage = 20;
    const [hasMore, setHasMore] = useState(true);
    const [records, setrecords] = useState(itemsPerPage);

    const loadMore = () => {
        if (records === contacts.contactsArray.length) {
            setHasMore(false);
        } else {
            setrecords(records + itemsPerPage);
        }
    };

    const onIndexSelect = (itemContent: any) => {
        console.log("::imContactsListIndex::", imContactsListIndex);
        if (imContactsListIndex && imContactsListIndex.current !== null && typeof imContactsListIndex.current !== "undefined") {
            imContactsListIndex.current.scrollListToIndex(itemContent)
        }
    };

    const ContactListViewItem = useCallback(({ contact, contactIndex, isGroupTitle, displayPhoneNumber }) => {

        return (

            !isGroupTitle ? (

                <React.Fragment>

                    <li key={`im-calls-list-item-${contactIndex}`}>
                        <div className="item-content">
                            <div className="item-media">
                                <div slot="media" className={"andon-status"}/>
                                <Link
                                    onClick={() => onContactSelected(contact, "preview")}
                                    href="#"  
                                    className="f7-demo-icon">
                                    {contact.hasOwnProperty('displayPhoto') && contact.displayPhoto.length > 10 ? (
                                        <img className="avatar-icon-img" src={contact.displayPhoto} alt={contact.name} />
                                    ):(
                                        <i className="f7-icons avatar-icon">person_alt_circle_fill</i>
                                    )}
                                </Link>
                            </div>
                            <div className="item-inner">
                            <div className="item-title-row">
                                <div className="item-title">{contact.name}</div>
                                <div className="item-after">
                                    <Link
                                        onClick={() => onContactSelected(contact, "video")}
                                        href="#"
                                        className="f7-demo-icon"
                                    >
                                        <i className="icon f7-icons color-custom">videocam_fill</i>
                                    </Link>

                                    <Link
                                        onClick={() => onContactSelected(contact, "call")}
                                        href="#"
                                        className="f7-demo-icon"
                                        style={{ marginLeft: "32px", marginRight: "24px" }}
                                    >
                                        <i className="icon f7-icons color-custom">phone_fill</i>
                                    </Link>
                                </div>
                            </div>
                            <div className="item-subtitle">{displayPhoneNumber ? contact.mobile : contact.displayStatus}</div>
                            {/*<div className="item-text">Additional description text</div>*/}
                            </div>
                        </div>
                    </li>

                </React.Fragment>

            ) : (

                <ListItem
                    key={`im-calls-popup-list-item-${contactIndex}`}
                    title={`${contact}`}
                    divider={true}
                    groupTitle={true}
                    className={`list-group-title`} />

            )

        );
    }, []);

    const renderContactsListView = (contacts: { contactsArray?: any; }): typeof ContactListViewItem => {

        if (Object.keys(contacts).length > 0) {

            var contactsListItems = [];

            contacts.contactsArray.map((contact: any, contactIndex: number) => {

                if (contactIndex < records) {

                    contactsListItems.push(
                        <ContactListViewItem
                            key={`im-contact-list-view-item-container-${contactIndex}`}
                            displayPhoneNumber={true}
                            isGroupTitle={contact.isGroupTitle}
                            contact={contact.data}
                            contactIndex={contactIndex} />
                    );

                }
            });

            if (!imContactsListIndex || imContactsListIndex.current === null || typeof imContactsListIndex.current !== "undefined") {

                createIMContactsListIndex();

            } else {
                console.log("::renderContactsListView::", imContactsListIndex);
                imContactsListIndex.current.update();

            }

            return contactsListItems;

        } else {

            return <h2>Nothing Found</h2>

        }


    };

    const createIMContactsListIndex = () => {
        if (!imContactsListIndex || imContactsListIndex.current === null || typeof imContactsListIndex.current !== "undefined") {

            imContactsListIndex.current = f7.listIndex.create({
                // ".list-index" element
                el: '.im-calls-contacts-list-index',
                // List el where to look indexes and scroll for
                listEl: '.im-calls-contacts-list',
                // Generate indexes automatically based on ".list-group-title" and ".item-divider"
                indexes: 'auto',
                // Scroll list on indexes click and touchmove
                scrollList: true,
                // Enable bubble label when swiping over indexes
                label: true,
                on: {
                    select: function (e) {
                        console.log('Index selected', e);
                    },
                },
            });
            imContactsListIndex.current.update();
        }
    }

    useEffect(() => {
        createIMContactsListIndex();
    }, [])


    return (
        <Popup
            className="sheet-modal-open-calls"
            opened={popupOpened}
            onPopupClosed={() => onPopupClosed(false)}
            push
        >
            <Page>
                <Navbar>
                    <NavLeft>
                        <Link
                            popupClose
                            iconIos="f7:arrow_left"
                            iconAurora="f7:arrow_left"
                            iconMd="material:arrow_back"
                        />
                    </NavLeft>
                    <NavTitle
                    title="Select Contact"
                    subtitle={`Showing ${records} of ${contacts.count} contacts`} />
                    <NavRight>
                        <Link
                            searchbarEnable=".searchbar-im-popup-calls"
                            iconIos="f7:search"
                            iconAurora="f7:search"
                            iconMd="material:search"
                        ></Link>
                        <Link
                            iconIos="f7:ellipsis_vertical"
                            iconAurora="f7:ellipsis_vertical"
                            iconMd="material:more_vert"
                            popoverOpen=".popover-menu"
                        />
                    </NavRight>
                    <Searchbar
                        className="searchbar-im-calls"
                        expandable
                        searchContainer=".im-calls-contacts-list"
                        searchIn=".item-title"
                        disableButton={!theme.aurora}
                    ></Searchbar>
                </Navbar>
                <List className="searchbar-not-found">
                    <ListItem title="Nothing found"></ListItem>
                </List>

                <ListIndex className="im-calls-contacts-list-index"
                    init={false}
                    listEl=".im-calls-contacts-list"
                    label={true}
                    indexes="auto"
                    scrollList={true}
                    onListIndexSelect={onIndexSelect}
                ></ListIndex>

                <InfiniteScroll
                    className="im-calls-contacts-list contacts-list searchbar-found list media-list no-chevron no-hairlines no-hairlines-between"
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={hasMore}
                    loader={<div>Loading...</div>}
                    useWindow={false}
                >
                    <ul>
                        {renderContactsListView(contacts)}
                    </ul>
                </InfiniteScroll>
            </Page>
        </Popup>
    );
};
