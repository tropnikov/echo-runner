import { useParams } from 'react-router';

import { Button, Flex, Typography } from 'antd';

import { useTopicReactions } from '@/hooks/useTopicReactions';

import { withMeta } from '@/hocs/withMeta';

const { Text } = Typography;

function TopicReactions() {
  const { topicId } = useParams();
  const { myEmoji, setReaction, reactionMap, emojis } = useTopicReactions(Number(topicId));

  return (
    <Flex vertical gap={12}>
      <Flex gap={8} wrap>
        {emojis.map((emoji) => (
          <Button key={emoji} type={myEmoji === emoji ? 'primary' : 'default'} onClick={() => setReaction(emoji)}>
            {emoji}{' '}
            <Text style={{ marginLeft: 6, color: myEmoji === emoji ? 'white' : 'black' }}>
              {reactionMap[emoji] ?? 0}
            </Text>
          </Button>
        ))}
      </Flex>
    </Flex>
  );
}

export default withMeta(TopicReactions, {
  title: 'Правила игры | Форум',
  description: 'Обсуждение правил игры Echo Runner. Читайте комментарии, задавайте вопросы и участвуйте в дискуссии.',
  keywords: 'правила игры, echo runner, форум, комментарии, дискуссия',
  noIndex: true,
});
