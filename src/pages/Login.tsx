import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import {
  setLoginToastId,
  setUser,
  TUser,
} from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomForm from "../components/form/CustomForm";
import CustomInput from "../components/form/CustomInput";

const Login = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const defaultValues = {
    userId: "A-0001",
    password: "adminPass123",
  };

  // login function
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");
    dispatch(setLoginToastId(toastId));

    // login user
    try {
      const res = await login(data).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));

      navigate(`/${user.role}/dashboard`);
      toast.success("Login successful", { id: toastId });
    } catch (err) {
      // toast.error("Login failed",);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <CustomForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <CustomInput type="text" name="userId" label="User ID" />

        <CustomInput type="text" name="password" label="Password" />

        <Button htmlType="submit">Login</Button>
      </CustomForm>
    </Row>
  );
};

export default Login;
