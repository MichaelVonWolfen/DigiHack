import { Button, Modal } from "@mantine/core";
import { useContext, useState } from "react";

import { AuthForm } from "./auth-form";
import { ProfileDropdown } from "./profile-dropdown";

export function Auth() {
  const auth = localStorage.getItem("auth");
  const [opened, setOpened] = useState(false);

  return (
    <>
      {auth !== undefined ? (
        <ProfileDropdown/>
      ) : (
        <>
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
          >
            <AuthForm/>
          </Modal>
          <Button onClick={() => setOpened(true)}>Authenticate</Button>
        </>
      )}
    </>
  );
}
