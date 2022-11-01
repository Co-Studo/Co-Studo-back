import { sendMethodResult } from '@common/utils';
import { CreateTagInput } from '@dtos/create-tag.dto';
import * as tagService from '@services/study/tagService';

export const postTag = sendMethodResult(async (req) => {
  const { body: tagInput }: { body: CreateTagInput } = req;
  return tagService.createTag(tagInput);
});
