"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import React, {useState} from "react";
import { Control } from "react-hook-form"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { EyeOff, Eye } from "lucide-react"

export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton",
    PASSWORD = "password",
    CATEGORYINPUT = "input"
}

interface CustomFormFieldProp {
    control: Control<any>
    fieldType: FormFieldType
    name: string
    label?: string
    placeholder?: string
    iconSrc?: string
    iconAlt?: string
    disabled?: boolean
    dateFormat?: string
    showTimeSelect?: boolean
    children?: React.ReactNode
    renderSkeleton?: (field: any) => React.ReactNode
}



const RenderField = ({ field, props }: { field: any, props: CustomFormFieldProp}) => {
    const { fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton } = props
    
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };
    
    switch(fieldType) {
        case FormFieldType.INPUT: 
            return(
                <div className="flex rounded-md border border-dark-500">
                    {iconSrc && (
                        <Image className="mx-3" style={{color: "black"}} src={iconSrc} height={24} width={24} alt={iconAlt || "ICON"} />
                    )}
                    <FormControl>
                        <Input className="shad-input border-0" placeholder={placeholder} {...field} />
                    </FormControl>
                </div>
            )
        case FormFieldType.CATEGORYINPUT: 
            return(
                <div className="flex rounded-md border border-dark-500">
                    <FormControl>
                        <Input className="shad-input border-0" placeholder={placeholder} {...field} />
                    </FormControl>
                </div>
            )
        case FormFieldType.PASSWORD:
            return (
                <div className="flex rounded-md border border-dark-500">
                    <FormControl>
                        <Input
                            type={showPassword ? "text" : "password"}
                            className="shad-input border-0"
                            placeholder={placeholder}
                            {...field}  
                        />
                    </FormControl>
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="px-3"
                    >
                        {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                </div>
            )
        case FormFieldType.TEXTAREA:
            return (
                <FormControl> 
                    <Textarea 
                        placeholder={placeholder}
                        {...field}
                        className="shad-textArea"
                        disabled={props.disabled}
                    />
                </FormControl>
            )
        case FormFieldType.PHONE_INPUT:
            return(
                <FormControl>
                    <PhoneInput 
                        className="input-phone" 
                        defaultCountry="GH" 
                        placeholder={placeholder} 
                        value={field.value as E164Number | undefined} 
                        onChange={field.onChange}
                        international
                        withCountryCallingCode
                    />
                </FormControl>
            )
        case FormFieldType.DATE_PICKER:
            return(
                <div className="flex rounded-md bg-light-200 border border-dark-500">
                    {iconSrc && (
                        <Image className="mx-3" src={iconSrc} height={24} width={24} alt={iconAlt || "ICON"} />
                    )}
                    <FormControl>
                        <DatePicker 
                        selected={field.value} 
                        onChange={(date) => field.onChange(date)} 
                        dateFormat={dateFormat ?? 'MM/dd/yyyy'}
                        showTimeSelect={showTimeSelect ?? false}
                        timeInputLabel="Time:"
                        wrapperClassName="date-picker"
                        placeholderText="select date"
                        
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="shad-select-trigger">
                                <SelectValue placeholder={placeholder}/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shad-select-content">
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            )
        case FormFieldType.SKELETON:
            return renderSkeleton ? renderSkeleton(field) : null
        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex items-center gap-4">
                        <Checkbox 
                            id={props.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <label htmlFor={props.name} className="checkbox-label">
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            )
        default:
            break
    }
}


const CustomFormField = (props: CustomFormFieldProp) => {

    const { control, fieldType, name, label } = props

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}
                    <RenderField field={field} props={props} />
                    <FormMessage className="shad-error"/>
                </FormItem>
            )}
        />
    )
}

export default CustomFormField