import { Router } from 'express';

import { createTopicReactionValidation } from '../constants/createTopicReactionValidation';
import { getTopicReactionsValidation } from '../constants/getTopicReactionsValidation';
import { ReactionController } from '../controllers/reactions';

const reactionRouter = Router({ mergeParams: true });

reactionRouter.get('/', getTopicReactionsValidation, ReactionController.getTopicReactions);
reactionRouter.post('/', createTopicReactionValidation, ReactionController.upsert);

export default reactionRouter;
