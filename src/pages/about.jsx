import React from 'react';
import { Page, Navbar, ListIndex, List, ListGroup, ListItem } from 'framework7-react';

export default () => {
  const onIndexSelect = (itemContent) => {
    console.log(itemContent);
  };
  return (
    
      
    <Page>
      <Navbar title="List Index" />
      <ListIndex
        indexes="auto"
        listEl=".list.contacts-list"
        scrollList={true}
        label={true}
        onListIndexSelect={onIndexSelect}
      />
      <List contactsList>

          <ListItem title="A" groupTitle classname='item-divider' />
          <ListItem title="Aaron" />
          <ListItem title="Adam" />
          <ListItem title="Aiden" />
          <ListItem title="Albert" />
          <ListItem title="Alex" />
          <ListItem title="Alexander" />
          <ListItem title="Alfie" />
          <ListItem title="Archie" />
          <ListItem title="Arthur" />
          <ListItem title="Austin" />


          <ListItem title="B" groupTitle classname='item-divider' />
          <ListItem title="Benjamin" />
          <ListItem title="Blake" />
          <ListItem title="Bobby" />


          <ListItem title="C" groupTitle classname='item-divider' />
          <ListItem title="Caleb" />
          <ListItem title="Callum" />
          <ListItem title="Cameron" />
          <ListItem title="Charles" />
          <ListItem title="Charlie" />
          <ListItem title="Connor" />


          <ListItem title="D" groupTitle classname='item-divider' />
          <ListItem title="Daniel" />
          <ListItem title="David" />
          <ListItem title="Dexter" />
          <ListItem title="Dylan" />


          <ListItem title="E" groupTitle classname='item-divider' />
          <ListItem title="Edward" />
          <ListItem title="Elijah" />
          <ListItem title="Elliot" />
          <ListItem title="Elliott" />
          <ListItem title="Ethan" />
          <ListItem title="Evan" />


          <ListItem title="F" groupTitle classname='item-divider' />
          <ListItem title="Felix" />
          <ListItem title="Finlay" />
          <ListItem title="Finley" />
          <ListItem title="Frankie" />
          <ListItem title="Freddie" />
          <ListItem title="Frederick" />


          <ListItem title="G" groupTitle classname='item-divider' />
          <ListItem title="Gabriel" />
          <ListItem title="George" />


          <ListItem title="H" groupTitle classname='item-divider' />
          <ListItem title="Harley" />
          <ListItem title="Harrison" />
          <ListItem title="Harry" />
          <ListItem title="Harvey" />
          <ListItem title="Henry" />
          <ListItem title="Hugo" />


          <ListItem title="I" groupTitle classname='item-divider' />
          <ListItem title="Ibrahim" />
          <ListItem title="Isaac" />


          <ListItem title="J" groupTitle classname='item-divider' />
          <ListItem title="Jack" />
          <ListItem title="Jacob" />
          <ListItem title="Jake" />
          <ListItem title="James" />
          <ListItem title="Jamie" />
          <ListItem title="Jayden" />
          <ListItem title="Jenson" />
          <ListItem title="Joseph" />
          <ListItem title="Joshua" />
          <ListItem title="Jude" />


          <ListItem title="K" groupTitle classname='item-divider' />
          <ListItem title="Kai" />
          <ListItem title="Kian" />


          <ListItem title="L" groupTitle classname='item-divider' />
          <ListItem title="Leo" />
          <ListItem title="Leon" />
          <ListItem title="Lewis" />
          <ListItem title="Liam" />
          <ListItem title="Logan" />
          <ListItem title="Louie" />
          <ListItem title="Louis" />
          <ListItem title="Luca" />
          <ListItem title="Lucas" />
          <ListItem title="Luke" />


          <ListItem title="M" groupTitle classname='item-divider' />
          <ListItem title="Mason" />
          <ListItem title="Matthew" />
          <ListItem title="Max" />
          <ListItem title="Michael" />
          <ListItem title="Mohammad" />
          <ListItem title="Mohammed" />
          <ListItem title="Muhammad" />


          <ListItem title="N" groupTitle classname='item-divider' />
          <ListItem title="Nathan" />
          <ListItem title="Noah" />


          <ListItem title="O" groupTitle classname='item-divider' />
          <ListItem title="Oliver" />
          <ListItem title="Ollie" />
          <ListItem title="Oscar" />
          <ListItem title="Owen" />


          <ListItem title="R" groupTitle classname='item-divider' />
          <ListItem title="Reuben" />
          <ListItem title="Riley" />
          <ListItem title="Robert" />
          <ListItem title="Ronnie" />
          <ListItem title="Rory" />
          <ListItem title="Ryan" />


          <ListItem title="S" groupTitle classname='item-divider' />
          <ListItem title="Samuel" />
          <ListItem title="Sebastian" />
          <ListItem title="Seth" />
          <ListItem title="Sonny" />
          <ListItem title="Stanley" />


          <ListItem title="T" groupTitle classname='item-divider' />
          <ListItem title="Teddy" />
          <ListItem title="Theo" />
          <ListItem title="Theodore" />
          <ListItem title="Thomas" />
          <ListItem title="Toby" />
          <ListItem title="Tommy" />
          <ListItem title="Tyler" />


          <ListItem title="W" groupTitle classname='item-divider' />
          <ListItem title="William" />


          <ListItem title="Z" groupTitle classname='item-divider' />
          <ListItem title="Zachary" />

      </List>
    </Page>
      
    
  );
};