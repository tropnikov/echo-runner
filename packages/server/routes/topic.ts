import { Router } from 'express';

import { createTopicValidation } from '../constants/createTopicValidation';
import { getTopicByIdValidation } from '../constants/getTopicByIdValidation';
import { getTopicsValidation } from '../constants/getTopicsValidation';
import { TopicController } from '../controllers/topics';
import { withAuth } from '../utils/withAuth';

const topicRouter = Router();

topicRouter.get('/', getTopicsValidation, TopicController.getAll);
topicRouter.post('/', createTopicValidation, withAuth(TopicController.create));
topicRouter.get('/:topicId', getTopicByIdValidation, TopicController.getById);

export default topicRouter;
