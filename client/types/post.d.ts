declare interface Post {
    id: number;
    context: string;
    img?: string;
    commentCount: number;
    createdAt: Date;
    userId: number;
    userName: string
}
