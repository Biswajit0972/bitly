import Form from "../components/Form.tsx";
import FormDiv from "../components/FormDiv.tsx";
import FormInput from "../components/FormInput.tsx";
import {Button} from "../components/Button.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema, type loginType} from "../types/types.ts";
import InputError from "../components/InputError.tsx";
import {useLoginHook} from "../query/hooks/queryHooks.ts";

const Login = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<loginType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: ""
        }
    });

    const {mutateAsync, isPending} = useLoginHook();

    const formSubmit = async (data: loginType) => {

        const res = await mutateAsync(data);
        console.log(res);
        reset();
    }

    return (
        <div className="h-full w-full relative text-gray-300 py-2 sm:px-12">
            <h1 className="primary-txt text-center relative ">Log in</h1>
            <div className="relative h-[calc(100%-28px)]  flex-center ">

                <Form className="bg-gray-900 rounded-lg p-4 flex-column gap-4  lg:w-1/2 lg:px-6 lg:py-8"
                      onSubmit={handleSubmit(formSubmit)}>
                    <FormDiv className="flex-center">
                        <img src="https://i.pinimg.com/originals/74/c7/81/74c781554de4f8827301fff8c72682c0.gif"
                             className="h-10 w-24 relative  rounded-full  overflow-hidden bg-red"/>
                    </FormDiv>
                    <FormDiv>
                        <FormInput {...register("identifier")} size="sm" placeholder="Enter email or username"/>
                        {
                            errors.identifier && <InputError message={errors.identifier.message}/>
                        }
                    </FormDiv>
                    <FormDiv>
                        <FormInput {...register("password")} size="sm" placeholder="Enter password"/>
                        {
                            errors.password && <InputError message={errors.password.message}/>
                        }
                    </FormDiv>
                    <div className="relative w-full flex-between">
                        <p className="text-sm">Don't have account? <a>Signup</a></p>
                        <p className="text-sm">Forgot password? <a>Signup</a></p>
                    </div>

                    <Button variant="secondary" type="submit" loading={isPending}>Submit</Button>
                </Form>
            </div>
        </div>
    )
}
export default Login
