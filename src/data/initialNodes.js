export const initialNodes = [
  {
    id: 1,
    parentId: -1,
    type: 'trigger',
    data: {
      type: 'conversationOpened',
      oncePerContact: false,
    },
  },
  {
    name: 'Away Message',
    id: 'b6a0c1',
    type: 'sendMessage',
    data: {
      payload: [
        {
          type: 'text',
          text: 'Sorry, we are currently away. We will respond as soon as possible.',
        },
      ],
    },
    parentId: '28c4b9',
  },
  {
    name: 'Business Hours',
    id: 'd09c08',
    type: 'dateTime',
    data: {
      times: [
        {
          startTime: '09:00',
          endTime: '17:00',
          day: 'mon',
        },
        {
          startTime: '09:00',
          endTime: '17:00',
          day: 'tue',
        },
        {
          startTime: '09:00',
          endTime: '17:00',
          day: 'wed',
        },
        {
          startTime: '09:00',
          endTime: '17:00',
          day: 'thu',
        },
        {
          startTime: '09:00',
          endTime: '17:00',
          day: 'fri',
        },
        {
          startTime: '09:00',
          endTime: '17:00',
          day: 'sat',
        },
        {
          startTime: '09:00',
          endTime: '17:00',
          day: 'sun',
        },
      ],
      connectors: ['161f52', '28c4b9'],
      timezone: 'UTC',
      action: 'businessHours',
    },
    parentId: 1,
  },
  {
    name: 'Success',
    id: '161f52',
    type: 'dateTimeConnector',
    data: {
      connectorType: 'success',
    },
    parentId: 'd09c08',
  },
  {
    name: 'Failure',
    id: '28c4b9',
    type: 'dateTimeConnector',
    data: {
      connectorType: 'failure',
    },
    parentId: 'd09c08',
  },
  {
    name: 'Welcome Message',
    id: 'b0653a',
    type: 'sendMessage',
    data: {
      payload: [
        {
          type: 'text',
          text: 'Hello there welcome to the chat!',
        },
        {
          type: 'attachment',
          attachment:
            'https://fastly.picsum.photos/id/396/536/354.jpg?hmac=GmUosOuXb6nGkFhmTE-83i0ciQcaleMyvIyqzeFbW58',
        },
      ],
    },
    parentId: '161f52',
  },
  {
    id: 'e879e4',
    type: 'addComment',
    parentId: 'b6a0c1',
    name: 'Add Comment #1',
    data: {
      comment: 'User message during off hours',
    },
  },
]
