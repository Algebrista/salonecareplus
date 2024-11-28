'use Client'

import React from 'react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { Control } from 'react-hook-form';
import { FormFieldType } from './forms/PatientForm';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import { E164Number } from 'libphonenumber-js/core';

  interface CustomProps {
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode;
    fieldType: FormFieldType;
  }

  
const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
    const {fieldType, iconSrc, iconAlt, placeholder, } = props;
    switch (fieldType) {
        case FormFieldType.INPUT:
          return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">
              {iconSrc && (
                <Image
                  src={iconSrc}
                  height={24}
                  width={24}
                  alt={iconAlt || "icon"}
                  className="ml-2"
                />
              )}
              <FormControl>
                <Input
                  placeholder={placeholder}
                  {...field}
                  className="shad-input border-0"
                />
              </FormControl>
            </div>
          );
        // case FormFieldType.TEXTAREA:
        //   return (
        //     <FormControl>
        //       <Textarea
        //         placeholder={props.placeholder}
        //         {...field}
        //         className="shad-textArea"
        //         disabled={props.disabled}
        //       />
        //     </FormControl>
        //   );
        case FormFieldType.PHONE_INPUT:
          return (
            <FormControl>
              <PhoneInput
                defaultCountry="US"
                placeholder={props.placeholder}
                international
                withCountryCallingCode
                value={field.value as E164Number | undefined}
                onChange={field.onChange}
                className="input-phone custom-phone-input"
              />
            </FormControl>
          );
        // case FormFieldType.CHECKBOX:
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
          );
        // case FormFieldType.DATE_PICKER:
        //   return (
        //     <div className="flex rounded-md border border-dark-500 bg-dark-400">
        //       <Image
        //         src="/assets/icons/calendar.svg"
        //         height={24}
        //         width={24}
        //         alt="user"
        //         className="ml-2"
        //       />
        //       <FormControl>
        //         <ReactDatePicker
        //           showTimeSelect={props.showTimeSelect ?? false}
        //           selected={field.value}
        //           onChange={(date: Date) => field.onChange(date)}
        //           timeInputLabel="Time:"
        //           dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
        //           wrapperClassName="date-picker"
        //         />
        //       </FormControl>
        //     </div>
        //   );
        // case FormFieldType.SELECT:
        //   return (
        //     <FormControl>
        //       <Select onValueChange={field.onChange} defaultValue={field.value}>
        //         <FormControl>
        //           <SelectTrigger className="shad-select-trigger">
        //             <SelectValue placeholder={props.placeholder} />
        //           </SelectTrigger>
        //         </FormControl>
        //         <SelectContent className="shad-select-content">
        //           {props.children}
        //         </SelectContent>
        //       </Select>
        //     </FormControl>
        //   );
        // case FormFieldType.SKELETON:
        //   return props.renderSkeleton ? props.renderSkeleton(field) : null;
        default:
          return null;
      }
  };

export const CustomFormField = (props : CustomProps) => {
    const {control, fieldType, name, label} = props
  return (

        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className='flex-1'>
               {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
          )}
        />
  )
}

export default CustomFormField