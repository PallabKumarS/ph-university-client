import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [login] = useLoginMutation();

  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm();

  // login function
  const onSubmit = async (data: any) => {
    const res = await login(data).unwrap();

    const user = verifyToken(res.data.accessToken);

    dispatch(setUser({ user, token: res.data.accessToken }));

    navigate(location.state || "/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID</label>
        <input type="text" id="id" {...register("id")} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
