import Form from "../components/Form.tsx";
import FormDiv from "../components/FormDiv.tsx";
import FormInput from "../components/FormInput.tsx";
import {Button} from "../components/Button.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import InputError from "../components/InputError.tsx";
import {useState} from "react";
import {signupSchema, type signupType} from "../types/types.ts";

const Signup = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<signupType>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            email: "",
            fullName: "",
            password: ""
        }
    });

    const [submitting, setSubmitting] = useState<boolean>(false);

    const onSubmit = (data: signupType) => {
        setSubmitting(true);
        console.log("Signup data:", data);
        // TODO: integrate API call here
        reset();
        setSubmitting(false);
    };

    return (
        <div className="h-full w-full relative text-gray-300 py-2 sm:px-12">
            <h1 className="primary-txt text-center relative ">Sign up</h1>
            <div className="relative h-[calc(100%-28px)] flex-center">
                <Form className="bg-gray-900 rounded-lg p-4 flex-column gap-4 lg:w-1/2 lg:px-6 lg:py-8" onSubmit={handleSubmit(onSubmit)}>
                    <FormDiv className="flex-center">
                        <img
                            src="https://i.pinimg.com/originals/74/c7/81/74c781554de4f8827301fff8c72682c0.gif"
                            className="h-10 w-24 relative rounded-full overflow-hidden"
                        />
                    </FormDiv>

                    <FormDiv>
                        <FormInput {...register("username")} size="sm" placeholder="Enter username" />
                        {errors.username && <InputError message={errors.username.message} />}
                    </FormDiv>

                    <FormDiv>
                        <FormInput {...register("email")} size="sm" placeholder="Enter email" />
                        {errors.email && <InputError message={errors.email.message} />}
                    </FormDiv>

                    <FormDiv>
                        <FormInput {...register("fullName")} size="sm" placeholder="Enter full name" />
                        {errors.fullName && <InputError message={errors.fullName.message} />}
                    </FormDiv>

                    <FormDiv>
                        <FormInput {...register("password")} size="sm" placeholder="Enter password" />
                        {errors.password && <InputError message={errors.password.message} />}
                    </FormDiv>

                    <div className="relative w-full flex-between">
                        <p className="text-sm">Already have an account? <a>Login</a></p>
                    </div>

                    <Button variant="secondary" type="submit" loading={submitting}>Create account</Button>
                </Form>
            </div>
        </div>
    );
};

export default Signup;