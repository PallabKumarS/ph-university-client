import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setToken } from "../redux/features/auth/authSlice";

const Login = () => {
  const [login] = useLoginMutation();

  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const res = await login(data).unwrap();
    dispatch(setToken(res.data.accessToken));
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
