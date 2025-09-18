import { Flex } from 'antd';

interface TopicReactionsSummaryProps {
  reactions: Array<{ emoji: string; count: number }>;
}

function TopicReactionsSummary({ reactions }: TopicReactionsSummaryProps) {
  if (!reactions || reactions.length === 0) {
    return null;
  }

  return (
    <Flex gap={4} wrap>
      {reactions
        .filter((reaction) => reaction.count > 0)
        .map((reaction) => (
          <div
            key={reaction.emoji}
            style={{
              padding: '2px',
              height: 'auto',
              fontSize: '16px',
              color: '#666',
            }}>
            {reaction.emoji} {reaction.count}
          </div>
        ))}
    </Flex>
  );
}

export default TopicReactionsSummary;
