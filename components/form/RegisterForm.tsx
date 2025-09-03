/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import CustomFormField from "./CustomFormFields"
import { FormFieldType } from "./CustomFormFields"
import SubmitButton from "./SubmitButton"
import { useCallback, useEffect, useRef, useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { createUser, createUserAccount, loginUser, getUserDetail } from "@/lib/actions/user.action"
import { useRouter } from "next/navigation"

const RegisterForm = () => {

    const router = useRouter()

    const [ isLoading, setIsLoading ] = useState(false)
    const [ login, setLogin ] = useState(false)
    const [ auth, setAuth ] = useState(true)

    // const login = useRef(false)


    const loginAuth = () => {
        setAuth(!auth)
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
                const result = await loginUser(values.email, values.password)
                // const data = await getUserDetail()
                console.log(result)
                // console.log("data", data)
                if (result) {
                    setLogin(true)
                    sessionStorage.setItem('sessionId', result.$id);
                    sessionStorage.setItem('sessionEmail', result.providerUid);
                    
                    router.push(`/users/${result.userId}/register`);
                }
            } else if (values.username == "Admin") {
                const user = {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                };
                const newUser = await createUser(user);
                console.log(newUser)
                if (newUser) {
                    sessionStorage.setItem('sessionId', newUser.$id);
                    sessionStorage.setItem('sessionEmail', newUser.name);
                    // router.push(`/users/${newUser.$id}/register`);
                    router.push(`/`);
                }
            } else {
                const user = {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                };
                const userAccount = await createUserAccount(user)
                // const data = await getUserDetail()
                console.log(userAccount)
                // console.log(data)
                if (userAccount) {
                    // sessionStorage.setItem('sessionId', login.$id);
                    // sessionStorage.setItem('sessionEmail', login.providerUid);
                    
                    router.push(`/`);
                }
            }
            
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false); // Ensure loading state is turned off
        }
    }

    // useEffect(() => {
    //     const fetchUserDetail = async() => {
    //         try {

    //                 const response = await getUserDetail()
    //                 console.log("users", response)

                
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchUserDetail()
    // })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                {auth && (
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
                <SubmitButton isLoading={isLoading}>{auth ? "Register" : "Login"}</SubmitButton>
            </form>
            <section className='flex-1 flex-row items-center py-5'>
                <h1 >Already have an account? <button className="font-bold" onClick={loginAuth}>{auth ? "Login" : "Register"}</button></h1>
            </section>
        </Form>
    )
}

export default RegisterForm