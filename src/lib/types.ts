import { Prisma } from "@prisma/client"

export interface FollowerInfo {
  followers: number
  isFollowedByUser: boolean
}

export interface LikeInfo {
  likes: number
  isLikedByUser: boolean
}

export interface RepostInfo {
  reposts: number
  isRepostedByUser: boolean
}

export interface ViewInfo {
  views: number
}

export interface CommentInfo {
  comments: number
}

export interface MutualFriendInfo {
  mutualFriends: number
}

export interface BookmarkInfo {
  isBookmarkedByUser: boolean
}

export interface NotificationCountInfo {
  unreadCount: number
}

export interface MessageCountInfo {
  unreadCount: number
}

export interface Comment {
  id: string
  text: string
  commenter: string
  createdAt: string
  postId: string
}

export interface Repost {
  id: string
  repostedBy: string
  createdAt: string
  postId: string
}

export interface Like {
  id: string
  likedBy: string
  createdAt: string
  postId: string
}

export interface Post {
  id: string
  title: string
  description: string
  creatorName: string
  location: string
  forSelf: boolean
  imageUrl: string
  gofundmeUrl: string
  amountRaised: number
  additionalLinks: string[]
  venmo: string
  zelle: string
  createdAt: string
  repostNumber: number
  likesNumber: number
  views: number
  comments: Comment[]
  reposts: Repost[]
  likes: Like[]
}
