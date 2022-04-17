import {
  PasswordInput,
  Tabs,
  TextInput,
  Checkbox,
  Space,
  Button,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import { Phone } from 'tabler-icons-react';

export function AuthForm() {
  const loginForm = useForm({
    initialValues: {
      phoneNumber: "",
      password: "",
    },

    validate: {
      password: (value) =>
        value.length >= 8 ? null : "Password must be at least 8 characters",
    },
  });

  const registerForm = useForm({
    initialValues: {
      phoneNumber: "",
      password: "",
      tos: false,
    },

    validate: {
      password: (value) =>
        value.length >= 8 ? null : "Password must be at least 8 characters",
      tos: (value) => (value ? null : "You must sell your soul"),
    },
  });


  const login = async (username: string, password: string) => {
    // const success = await services.auth.logIn(username, password);
  }

  const register = async (username: string, password: string) => {
    // const success = await services.auth.register(username, password);
  }

  return (
    <Tabs>
      <Tabs.Tab label="Log In">
        <form onSubmit={loginForm.onSubmit((values) => login(values.phoneNumber, values.password))}>
          <TextInput
            label="Phone number"
            type="tel"
            icon={<Phone size={14} />}
            {...loginForm.getInputProps("phoneNumber")}
          />
          <Space h="md" />
          <PasswordInput
            label="Password"
            {...loginForm.getInputProps("password")}
          />
          <Space h="md" />
          <Group align="right">
            <Button type="submit">Log In</Button>
          </Group>
          <Space h="md" />
        </form>
      </Tabs.Tab>
      <Tabs.Tab label="Register">
        <form onSubmit={registerForm.onSubmit((values) => register(values.phoneNumber, values.password))}>
          <TextInput
            label="Phone number"
            type="tel"
            icon={<Phone size={14} />}
            {...registerForm.getInputProps("phoneNumber")}
          />
          <Space h="md" />
          <PasswordInput
            placeholder="Don't use your pet name if you lost it"
            label="Password"
            {...registerForm.getInputProps("password")}
          />
          <Space h="md" />
          <Checkbox
            label="I agree to sell my privacy in exchange of finding my pet"
            {...registerForm.getInputProps("tos")}
          />
          <Space h="md" />
          <Group align="right">
            <Button type="submit">Register</Button>
          </Group>
          <Space h="md" />
        </form>
      </Tabs.Tab>
    </Tabs>
  );
}
