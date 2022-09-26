declare interface Post {
    id: number;
    title: string;
    context: string;
    img?: string;
    userId: number;
    commentCount: number;
    createdAt: Date;
    userName: string
}
