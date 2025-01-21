import {
  User,
  Card,
  CardBody,
  CardHeader,
  Input,
  Link,
  Avatar,
  AvatarGroup,
  AvatarInitials,
  AvatarInitialsGroup,
  Button,
} from "@nextui-org/react"

export default function CommentCard({ user, comment, onReply }) {
  return (
    <Card
      size="small"
      shadow="none"
      className="text-xs border-b-1 rounded-none shadow-0 mr-4 p-0">
      <CardBody className="grid grid-cols-4 align-left text-left">
        <User
          avatarProps={{ className: "h-4 hidden h-4 bg-none" }}
          classNames={{
            base: "p-0 align-left ",
            name: "text-xs text-left  align-left text-primary-light",
            wrapper: "font-[10px] align-left  p-0",
          }}
          name={user.name}
        />
        <p className="col-span-3">{comment}</p>
      </CardBody>
    </Card>
  )
}
