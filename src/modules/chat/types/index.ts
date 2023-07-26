

export interface Message {
    messageId: string,
    senderId: string,
    senderFullName: string,
    content: string,
    sentAt: string,
    sending?: boolean,
    failed?: boolean,
    handleEditMessage?: (messageId: string) => void,
    handleDeleteMessage?: (messageId: string) => void,
    handleSelect?: (messageId: string, action: 'SELECT' | 'DISELECT') => void,
    selected?: boolean
}

export interface Group {
    groupId: string;
    groupName: string;
    description?: string;
    newMessagesCount?: number;
    thumbnail?: string;
    groupNum: number,
    groupMembersCount: number,
    handleClick?: (group: Group ) => void 
}