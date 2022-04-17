import {
  ArrowsLeftRight,
  MessageCircle,
  Photo,
  Search,
  Settings,
  Trash,
} from "tabler-icons-react";
import { Divider, Menu, Button } from "@mantine/core";

export function ProfileDropdown() {
  return (
    <>
      <Menu control={<Button variant="subtle" color="dark"  type="button">Account</Button>}>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
        <Menu.Item icon={<MessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item icon={<Photo size={14} />}>Gallery</Menu.Item>
        <Menu.Item icon={<Search size={14} /> }onClick={()=>{window.location.href ="/search"}}>Search</Menu.Item>
        <Divider />
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<ArrowsLeftRight size={14} />}>
          Transfer my data
        </Menu.Item>
        ,
        <Menu.Item color="red" icon={<Trash size={14}/>} onClick={()=>{localStorage.clear(); window.location.href ="/"}}>
          Log Out!
        </Menu.Item>
      </Menu>
    </>
  );
}
