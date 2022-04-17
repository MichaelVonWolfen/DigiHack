import {
  ArrowsLeftRight,
  MessageCircle,
  Photo,
  Search,
  Settings,
  Trash,
} from "tabler-icons-react";
import { Divider, Menu } from "@mantine/core";

export function ProfileDropdown() {
  return (
    <>
      <Menu control={<button type="button">Button control</button>}>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
        <Menu.Item icon={<MessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item icon={<Photo size={14} />}>Gallery</Menu.Item>
        <Menu.Item icon={<Search size={14} />}>Search</Menu.Item>
        <Divider />
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<ArrowsLeftRight size={14} />}>
          Transfer my data
        </Menu.Item>
        ,
        <Menu.Item color="red" icon={<Trash size={14} />}>
          Delete my account
        </Menu.Item>
      </Menu>
    </>
  );
}
