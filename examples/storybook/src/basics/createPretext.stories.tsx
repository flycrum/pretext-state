import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CreatePretextStory } from './CreatePretextStory';

export default {
  title: 'Basics/createPretext',
  component: CreatePretextStory,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CreatePretextStory>;

const Template: ComponentStory<typeof CreatePretextStory> = (args) => <CreatePretextStory {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {};
