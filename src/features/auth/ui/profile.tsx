import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

export const Profile = ({ avatar }: { avatar?: string | null }) => {
  return (
    <>
      {avatar && (
        <Avatar className="size-6 mr-2 self-center">
          <AvatarImage src={avatar} alt="user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </>
  );
};
