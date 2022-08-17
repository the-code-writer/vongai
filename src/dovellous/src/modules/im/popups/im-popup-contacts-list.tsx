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
    NavTitle, SwipeoutActions, SwipeoutButton, Preloader
} from "framework7-react";

import React, { useCallback, useState, useRef, useMemo, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { StorageContacts } from "../store/contacts-store";

export default ({
    currentTabIndex,
    popupOpened,
    onPopupClosed,
    onContactSelected,
    itemsPerPage,
}) => {

    let contacts = StorageContacts.state.imContacts;

    StorageContacts.getters.imContacts.onUpdated((_newData: any) => {
        //console.log("::StorageContacts::onUpdated::", _newData);
        contacts = _newData;
    })

    const imContactsListIndex = useRef(null);

    if (!itemsPerPage) {
        itemsPerPage = 20;
    }

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

    const onDeleted = () => {
        f7.dialog.alert('Thanks, item removed!');
      };

    const more = () => {
        actions.current.open();
      };

    const ContactListViewItem = ({ contact, contactIndex, isGroupTitle }) => {

        return (

            !isGroupTitle ? (

                <React.Fragment>

                    {currentTabIndex === 3 ? (

                        <li key={`im-list-item-${contactIndex}`} className="swipeout">

                            <SwipeoutActions right>
                                <SwipeoutButton color="blue" onClick={more}>
                                    More
                                </SwipeoutButton>
                                <SwipeoutButton color='red' delete confirmText="Are you sure you want to delete this item?">
                                    Delete
                                </SwipeoutButton>
                            </SwipeoutActions>

                            <div className="swipeout-content">

                                <div className="item-content">

                                    <div className="item-media">

                                        <div slot="media" className={"andon-status"} />

                                        <Link
                                            onClick={() => onContactSelected(contact, "preview", currentTabIndex)}
                                            href="#"
                                            className="f7-demo-icon">
                                            {contact.hasOwnProperty('displayPhoto') && contact.displayPhoto.length > 10 ? (
                                                <img className="avatar-icon-img" src={contact.displayPhoto} alt={contact.name} />
                                            ) : (
                                                <i className="f7-icons avatar-icon">person_alt_circle_fill</i>
                                            )}
                                        </Link>

                                    </div>

                                    <div className="item-inner">

                                        <div className="item-title-row">

                                            <div className="item-title">{contact.name}</div>

                                            <div className="item-after">
                                                <Link
                                                    onClick={() => onContactSelected(contact, "video", currentTabIndex)}
                                                    href="#"
                                                    className="f7-demo-icon"
                                                >
                                                    <i className="icon f7-icons color-custom">videocam_fill</i>
                                                </Link>

                                                <Link
                                                    onClick={() => onContactSelected(contact, "call", currentTabIndex)}
                                                    href="#"
                                                    className="f7-demo-icon"
                                                    style={{ marginLeft: "5px", marginRight: "5px" }}
                                                >
                                                    <i className="icon f7-icons color-custom">phone_fill</i>
                                                </Link>

                                            </div>

                                        </div>

                                        <div className="item-subtitle">{contact.mobile}</div>

                                        {contact.hasOwnProperty('text') && contact.text.length > 10 && (
                                            <div className="item-text">{contact.text}</div>
                                        )}

                                    </div>

                                </div>

                            </div>

                        </li>

                    ) : (

                        <li key={`im-list-item-${contactIndex}`}>

                            <Link
                                className="item-content"
                                onClick={() => onContactSelected(contact, "default", currentTabIndex)}
                                href="#"
                            >
                                <div className="item-media">

                                    <div slot="media" className={"andon-status"} />

                                    <div
                                        className="f7-demo-icon">
                                        {contact.hasOwnProperty('displayPhoto') && contact.displayPhoto.length > 10 ? (
                                            <img className="avatar-icon-img" src={contact.displayPhoto} alt={contact.name} />
                                        ) : (
                                            <i className="f7-icons avatar-icon">person_alt_circle_fill</i>
                                        )}
                                    </div>

                                </div>

                                <div className="item-inner">

                                    <div className="item-title-row">
                                        <div className="item-title">{contact.name}</div>
                                    </div>

                                    <div className="item-subtitle">{contact.displayStatus}</div>

                                    {contact.hasOwnProperty('text') && contact.text.length > 10 && (
                                        <div className="item-text">{contact.text}</div>
                                    )}

                                </div>

                            </Link>

                        </li>

                    )}

                </React.Fragment>

            ) : (

                <ListItem
                    key={`im-popup-list-item-${contactIndex}`}
                    title={`${contact}`}
                    divider={true}
                    groupTitle={true}
                    className={`list-group-title`} />

            )

        );

    };

    const renderContactsListView = (contacts: { contactsArray?: any; }): typeof ContactListViewItem => {

        if (Object.keys(contacts).length > 0) {

            var contactsListItems = [];

            contacts.contactsArray.map((contact: any, contactIndex: number) => {

                if (contactIndex < records) {

                    contactsListItems.push(
                        <ContactListViewItem
                            key={`im-contact-list-view-item-container-${contactIndex}`}
                            isGroupTitle={contact.isGroupTitle}
                            contact={contact.data}
                            contactIndex={contactIndex} />
                    );

                }

            });

            if (!imContactsListIndex || imContactsListIndex.current === null || typeof imContactsListIndex.current !== "undefined") {

                createIMContactsListIndex();

            } else {

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
                el: '.im-contacts-list-index',
                listEl: '.im-contacts-list',
                indexes: 'auto',
                scrollList: true,
                label: true,
                on: {
                    select: function (e) {
                        console.log('Index selected', e);
                    },
                },
            });

            imContactsListIndex.current.update();

        }

    };

    useEffect(() => {

        createIMContactsListIndex();

        console.log(
            "::POPUP IM::",
            currentTabIndex,
            popupOpened,
            onPopupClosed,
            onContactSelected,
            itemsPerPage);

    }, []);


    return (

        <Popup
            className="im-popup-contacts-list"
            opened={popupOpened}
            onPopupClosed={() => onPopupClosed(false)}
            push
        >
            <Page>

                <Navbar >

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
                        subtitle={`Showing ${records}/${contacts.count} contacts`} />
                    <NavRight>

                        <Link
                            searchbarEnable=".searchbar-im-contacts"
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
                        className="searchbar-im-contacts"
                        expandable
                        searchContainer=".im-contacts-list"
                        searchIn=".item-title, item-subtitle"
                        disableButton={!theme.aurora}
                    />

                </Navbar>

                <List className="searchbar-not-found">
                    <ListItem title="Nothing found"></ListItem>
                </List>

                <ListIndex className="im-contacts-list-index"
                    init={false}
                    listEl=".im-contacts-list"
                    label={true}
                    indexes="auto"
                    scrollList={true}
                    onListIndexSelect={onIndexSelect}
                ></ListIndex>

                <InfiniteScroll
                    className={`im-contacts-list contacts-list searchbar-found list ${true?'links-list':''} media-list  no-chevron no-hairlines no-hairlines-between`}
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={hasMore}
                    loader={<Preloader color="white" />}
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
