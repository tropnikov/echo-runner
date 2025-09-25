import { useParams } from 'react-router';

import { Button, Flex } from 'antd';

import { useTopicReactions } from '@/hooks/useTopicReactions';

function TopicReactions() {
  const { topicId } = useParams();
  const { myEmoji, setReaction, reactionMap, emojis } = useTopicReactions(Number(topicId));

  return (
    <Flex vertical gap={12}>
      <Flex gap={8} wrap>
        {emojis.map((emoji) => (
          <Button key={emoji} type={myEmoji === emoji ? 'primary' : 'default'} onClick={() => setReaction(emoji)}>
            {emoji}
            <span style={{ marginLeft: 6 }}>{reactionMap[emoji] ?? 0}</span>
          </Button>
        ))}
      </Flex>
    </Flex>
  );
}

export default TopicReactions;
