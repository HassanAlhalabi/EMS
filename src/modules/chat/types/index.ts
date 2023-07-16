

export interface Message {
    messageId: string,
    senderId: string,
    senderFullName: string,
    content: string,
    sentAt: string,
    sending?: boolean,
}

export interface Group {
    groupId: string;
    groupName: string;
    description?: string;
    newMessagesCount?: number;
    thumbnail?: string;
    groupNum: number,
    groupMembersCount: number,
    handleClick?: (groupId: string ) => void 
}