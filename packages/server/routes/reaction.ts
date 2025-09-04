import { Router } from 'express';

import { createTopicReactionValidation } from '../constants/createTopicReactionValidation';
import { getTopicReactionsValidation } from '../constants/getTopicReactionsValidation';
import { ReactionController } from '../controllers/reactions';
import { withAuth } from '../utils/withAuth';

const reactionRouter = Router({ mergeParams: true });

reactionRouter.get('/', getTopicReactionsValidation, withAuth(ReactionController.getTopicReactions));
reactionRouter.post('/', createTopicReactionValidation, withAuth(ReactionController.upsert));

export default reactionRouter;
