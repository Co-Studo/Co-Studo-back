import { sendMethodResult } from '@common/utils';
import { CreateAnnouncementInput } from '@dtos/create-announcement.dto';
import * as announcementService from '@services/study/announcementService';

export const getAnnouncementsByStudyId = sendMethodResult(async (req) => {
  const { isFixed } = req.query;
  const { studyId } = req.params;
  return announcementService.getAnnouncementsByStudyId(
    studyId,
    Boolean(isFixed)
  );
});

export const postAnnouncement = sendMethodResult(async (req) => {
  const { studyId } = req.params;
  const { body: announcementInput }: { body: CreateAnnouncementInput } = req;
  return announcementService.createAnnouncement(studyId, announcementInput);
});
