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
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { Phone } from 'tabler-icons-react';
import { GO_BACKEND } from "../../common/urls";
import { WalletCreateReturn } from "../../common/wallet-models";

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


  const login = async (phoneNumber: string, password: string) => {
    try {
      const result: any = await axios.post(`${GO_BACKEND}/viewWallet`, {
        phone: phoneNumber,
        pass: password
      });
      if (result.error === undefined) {
        localStorage.setItem('auth', JSON.stringify(result));
        if(!result.data.error){
          showNotification({
            title:"Succes!",
            message:"You are logged IN."
          })
          setTimeout(()=>{
            window.location.href = "/"
          }, 1000)
        }else{
          showNotification({
            title:"Ooops!",
            message:result.data.message
          })
        }
      }
    } catch (err) {
      showNotification({
        title: 'Failed to create wallet',
        message: JSON.stringify(err).substring(0, 160),
      })
    }
  }

  const register = async (phoneNumber: string, password: string) => {
    try {
      const result: any = await axios.post(`${GO_BACKEND}/createWallet`, {
        phone: phoneNumber,
        pass: password
      });
      localStorage.setItem('auth', JSON.stringify(result.data));
      if(!result.data.error){
        showNotification({
          title:"Succes!",
          message:"Account Created!"
        })
      }else{
        showNotification({
          title:"Ooops!",
          message:result.data.message
        })
      }
    } catch (err) {
      showNotification({
        title: 'Failed to create wallet',
        message: JSON.stringify(err).substring(0, 160),
      })
    }
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
