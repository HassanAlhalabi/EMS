

export interface Message {
    messageId?: string;
    thumbnail?: string;
    userId: string;
    fullName: string;
    date: string;
    message: string;
}

export interface Group {
    groupId?: string;
    groupName: string;
    description?: string;
    newMessagesCount?: number;
    thumbnail?: string;
    groupNum: number,
    groupMembersCount: number,
}