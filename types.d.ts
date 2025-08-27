type Post = {
  ownerId: string,
  title: string,
  imageUrl: string,
  imageId: string,
  location: string,
  tags: string[],
  likes: string[],
  comments: Comment[]
  saves: string[],
}

type Comment = {
  userId: string,
  text: string,
  createdAt: number
}

