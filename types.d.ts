type Post = {
  title: string,
  imageUrl: string,
  imageFilePath?: File | Blob,
  userId: string,
  postId?: string,
  location: string,
  tags: string,
  likes: string[],
  saves: string[],
  comments: IComment[]
}

type IComment = {
  userId: string,
  text: string
}

