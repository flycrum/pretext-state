import { createPretext } from 'pretext-state';
import React from 'react';

interface CreatePretextStoryPropsI {
  example: 'default';
}

export const CreatePretextStory = ({ example }: CreatePretextStoryPropsI) => {
  const pretext = createPretext('KC91I');

  return <div>{pretext._configName}</div>;
};
