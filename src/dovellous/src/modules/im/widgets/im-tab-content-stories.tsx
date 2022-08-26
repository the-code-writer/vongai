import React, { useEffect, useState } from "react";

import {
  Page,
  List,
  ListItem,
  SkeletonBlock,
  f7ready,
  Icon,
  BlockTitle,
  AccordionContent,
} from "framework7-react";

import Dom7 from "dom7";

import moment from 'moment';

import { K, Snippets } from "../../../libraries/app/helpers";

import { ListViewMessage } from '../../../libraries/intefaces/im';

import { useStorageIM } from "../store/im-store";

import IMListViewStoriesAvatar from "../../user/components/im-list-view-stories-avatar";

export default ({ id, slug, className, skeletonList, onOpenStatus }): JSX.Element => {

  const [imStoriesLoading, setIMStoriesLoading] = useStorageIM(K.ModuleComponentsLibs.im.dataStores.imStoriesLoading, false);

  const [imStoriesViewed, setIMStoriesViewed] = useStorageIM(K.ModuleComponentsLibs.im.dataStores.imStoriesViewed, []);
  const [imStoriesNotViewed, setIMStoriesNotViewed] = useStorageIM(K.ModuleComponentsLibs.im.dataStores.imStoriesNotViewed, []);
  const [imStoriesMuted, setIMStoriesMuted] = useStorageIM(K.ModuleComponentsLibs.im.dataStores.imStoriesMuted, []);
  const [imMyStories, setIMMyStories] = useStorageIM(K.ModuleComponentsLibs.im.dataStores.imMyStories, []);

  const StoryListViewItem = ({ id, storyKey, story, storyIndex }): JSX.Element => {

    return (
      <ListItem
        key={`im-story-list-item-key-${storyKey}`}
        id={`im-story-list-item-key-${storyIndex}-${id}`}
        link="#"
        onClick={() => onOpenStatus(story)}
        title={story.displayName}
        subtitle={moment(story.time).format('DD MMM YYYY, HH:mm')}
        className={`${story.badge > 5 ? 'has-badge' : ''} ${story.isMute ? 'is-mute' : ''}`}
      >

        <div className="im-list-view-avatar-wrapper" slot="media">

          <IMListViewStoriesAvatar
            avatarSrc={story.avatar}
            elementId={storyIndex}
            canvasWidth={48}
            unseenSegments={story.unseen}
            totalSegments={10}
            segmentColorSeen={Dom7('html').hasClass('dark') ? `rgb(127,127,127)` : `rgb(200,200,200)`}
            segmentColorUnSeen={Dom7('html').hasClass('dark') ? `rgb(76,255,80)` : `rgb(76,175,80)`}
            backgroundColor={Dom7('html').hasClass('dark') ? `rgb(28,28,29)` : `rgb(255,255,255)`}
          />

        </div>

      </ListItem>

    )

  };

  useEffect(() => {

    console.log(":: USE EFFECT ::imListStories::", imStoriesViewed, imStoriesNotViewed, imStoriesMuted, imMyStories);

  }, [imStoriesViewed, imStoriesNotViewed, imStoriesMuted, imMyStories]);

  return (

    <Page id={`${id}`} name={`${slug}`} className={`page ${className}`}>

      <List className="searchbar-not-found im-tab-content-stories-searchbar-not-found">
        <div style={{ textAlign: "center", marginTop: "64px" }}>
          No stories found
        </div>
      </List>


      {imStoriesLoading ? (

        <List
          mediaList
          noChevron
          className="search-list searchbar-found im-tab-content-stories-searchbar-found no-hairlines no-hairlines-between"
        >

          {[...Array(skeletonList.count).keys()].map((n) => (

            <ListItem
              key={n}
              className={`skeleton-text skeleton-effect-${skeletonList.effect}`}
              title={`${skeletonList.title}`}
              subtitle={`${skeletonList.subtitle}`}
              after={`00:00`}
            >

              <SkeletonBlock
                slot="media"
                tag={"div"}
                width={"44px"}
                height={"44px"}
                borderRadius={"50%"}
                effect={`wave`}
              />

            </ListItem>

          ))}

        </List>

      ) : (

        <React.Fragment>

          {Object.keys(imStoriesNotViewed).length > 0 && (

            <>

              <BlockTitle>Recent Updates</BlockTitle>

              <List
                mediaList
                noChevron
                className="search-list searchbar-found im-tab-content-stories-searchbar-found no-hairlines no-hairlines-between"
              >

                {Object.keys(imStoriesNotViewed).reverse().map((storyKey: any, storyIndex: number) => (

                  <StoryListViewItem id={storyKey} key={storyKey} storyKey={storyKey} story={imStoriesNotViewed[storyKey]} storyIndex={storyIndex} />

                ))}

              </List>

            </>

          )}

          {Object.keys(imStoriesViewed).length > 0 && (

            <>

              <BlockTitle>Viewed</BlockTitle>

              <List
                mediaList
                noChevron
                className="search-list searchbar-found im-tab-content-stories-searchbar-found no-hairlines no-hairlines-between"
              >

                {Object.keys(imStoriesViewed).reverse().map((storyKey: any, storyIndex: number) => (

                <StoryListViewItem id={storyKey} key={storyKey} storyKey={storyKey} story={imStoriesViewed[storyKey]} storyIndex={storyIndex} />

                ))}

              </List>

            </>

          )}

          {Object.keys(imStoriesMuted).length > 0 && (

            <>

              <BlockTitle>Muted</BlockTitle>

              <List
                accordionList 
                style={{ opacity: 0.75 }}
              >

                <ListItem accordionItem title="Toggle to show/hide">

                  <AccordionContent>

                    <List
                      accordionList
                      mediaList
                      noChevron
                      className="search-list searchbar-found im-tab-content-stories-searchbar-found no-hairlines no-hairlines-between"
                      style={{ opacity: 0.75 }}
                    >

                      {Object.keys(imStoriesMuted).reverse().map((storyKey: any, storyIndex: number) => (

                      <StoryListViewItem id={storyKey} key={storyKey} storyKey={storyKey} story={imStoriesMuted[storyKey]} storyIndex={storyIndex} />

                      ))}

                    </List>

                  </AccordionContent>

                </ListItem>

              </List>

            </>

          )}

        </React.Fragment>

      )}

    </Page>

  );

};
