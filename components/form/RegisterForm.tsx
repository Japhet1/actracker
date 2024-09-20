"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import CustomFormField from "./CustomFormFields"
import { FormFieldType } from "./CustomFormFields"
import SubmitButton from "./SubmitButton"
import { useCallback, useRef, useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { createUser, loginUser } from "@/lib/actions/user.action"
import { useRouter } from "next/navigation"

const RegisterForm = () => {

    const router = useRouter()

    const [ isLoading, setIsLoading ] = useState(false)
    const [ login, setLogin ] = useState(true)

    // const login = useRef(false)


    const loginAuth = () => {
        setLogin(!login)
        // login.current = false
    }

     // 1. Define your form.
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    })
 
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof UserFormValidation>) {
        setIsLoading(true)
        console.log(values)
        try {
            if (values.username == "") {
                const login = await loginUser(values.email, values.password)
                if (login) {
                    sessionStorage.setItem('sessionId', login.$id);
                    router.push(`/users/${login.userId}/register`);
                }
            } else {
                const user = {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                };
                const newUser = await createUser(user);
                if (newUser) {
                  router.push(`/users/${newUser.$id}/register`);
                }
            }
            
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false); // Ensure loading state is turned off
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                {login && (
                    <CustomFormField 
                        control={form.control} 
                        fieldType={FormFieldType.INPUT}
                        name="username"
                        label="Full name"
                        placeholder="John Doe"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                    />
                )}
                <CustomFormField 
                    control={form.control} 
                    fieldType={FormFieldType.INPUT}
                    name="email"
                    label="Email"
                    placeholder="johndoe@email.com"
                    iconSrc="/assets/icons/mail.svg"
                    iconAlt="email"
                />
                <CustomFormField 
                    control={form.control} 
                    fieldType={FormFieldType.PASSWORD}
                    name="password"
                    label="Password"
                    placeholder="********"
                />
                <SubmitButton isLoading={isLoading}>{login ? "Register" : "Login"}</SubmitButton>
            </form>
            <section className='flex-1 flex-row items-center py-5'>
                <h1 >Already have an account? <button className="font-bold" onClick={loginAuth}>{login ? "Login" : "Register"}</button></h1>
            </section>
        </Form>
    )
}

export default RegisterForm