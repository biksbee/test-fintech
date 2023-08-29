import { FC, useState, useEffect } from 'react';
import cn from 'classnames';
import type { InputType } from './type';
import {InputState, InputError, InputRangeMax, InputRangeMin, InputWarning} from "./type";

import {useDebounce} from "../../hooks/useDebounce";
import warning from "../../assets/icon/warning.svg";
import mediumWarning from "../../assets/icon/mediumWarning.svg"
import info from "../../assets/icon/Info.svg"
import triangle from "../../assets/icon/triangle.svg"
import { CustomRangeInput } from "../custom/CustomInputRange";

interface InputI {
    id?: string;
    onChange: (value:number) => void;
    value: number;
    placeholder: string;
    type: InputType;
    icon?: string;
    related?: number;
    setDisabled: (disabled: boolean) => void
}

export const Input:FC<InputI> = ({
                                     id,
                                     type,
                                     value,
                                     onChange,
                                     placeholder,
                                     related = 1,
                                     icon,
                                     setDisabled
}) => {

    const [show, setShow] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [warningMes, setWarningMes] = useState<boolean>(false)
    const [debounceValue, setDebounceValue] = useState<number>(value)
    const debounceItem = useDebounce(debounceValue, 300)

    const exp: RegExp = InputState[type];

    useEffect(() => {
        if(exp.test(debounceValue.toString())){
            if(type === "price" && debounceValue <= InputRangeMax[type]){
                onChange(debounceValue)
                setError(false)
                setDisabled(false)
            } else if(type === "contribution" && related*InputRangeMin[type] <= debounceValue && debounceValue <= related) {
                onChange(debounceValue)
                setError(false)
                setDisabled(false)
            } else if(type === "time" && debounceValue >= InputRangeMin[type] && debounceValue <= InputRangeMax[type]){
                onChange(debounceValue)
                setError(false)
                setDisabled(false)
            } else if(type === 'payment' && debounceValue >= InputRangeMin[type] && debounceValue <= InputRangeMax[type]){
                onChange(debounceValue)
                setError(false)
                setDisabled(false)
            } else {
                setError(true)
                setWarningMes(true)
                setDisabled(true)
            }
        } else {
            setDisabled(true)
            setError(true)
            setWarningMes(true)
        }
        if(
            (type === "payment" && debounceValue === InputRangeMin[type]) ||
            (type === "contribution" && debounceValue === InputRangeMin[type]*related)
        ){
            setWarningMes(true)
        } else setWarningMes(false)
    }, [debounceItem])

    useEffect(() => {
        if(type === "contribution" && related === 1000000) {
            setDebounceValue(related * 0.5)
        } else if(type === "contribution") {
            setDebounceValue(related * 0.25)
        }
    }, [related]);

    const handlerValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue:number = parseInt(e.target.value);
        if(e.target.value === "")
           newValue = 0
        return setDebounceValue(newValue)
    }

    return(
        <div className="flex flex-col md:w-[325px] w-full">
            <label
                htmlFor={id}
                className={cn(
                    "flex gap-x-[6px] text-[16px] leading-[22.4px] text-c_grey-white pb-[12px] font-inter font-medium"
                )}
            >
                {placeholder}
                {type === "contribution" ?
                    <div
                        className={cn(
                            "cursor-pointer relative"
                        )}
                        onMouseLeave={() => {setShow(false)}}
                        onMouseEnter={() => {setShow(true)}}
                    >
                        <img
                            src={`${info}`}
                            alt="info"
                        />
                        {show ?
                            <div className="absolute z-[1000] top-[103%] left-[5px]">
                                <img src={`${triangle}`} alt="triangle"/>
                            </div>
                            : null
                        }
                        {show ? <div
                            className={cn(
                                "absolute z-[1000] top-[130%] xx:left-[-8px] left-[-188px] w-[266px]",
                                "bg-c_grey-base900 rounded-[4px] py-[4px] px-[8px]"
                            )}
                        >
                            <div className="flex flex-col gap-y-[28px]">
                                <div>
                                    Основная квартира: у заемщика нет квартиры ставка финансирования
                                    Максимум до 75%
                                </div>
                                <div>
                                    Альтернативная квартира: Для заемщика квартира, которую он обязуется продать в течение двух лет ставка финансирования
                                    Максимум до 70%
                                </div>
                                <div>
                                    Вторая квартира или выше: у заемщика уже есть ставка финансирования квартиры Максимум до 50%
                                </div>
                            </div>
                        </div> : null}
                    </div>
                    : null
                }
            </label>
            <div className={"relative flex flex-col"}>
                <input
                    id={id}
                    value={debounceValue}
                    onChange={handlerValueInput}
                    className={cn(
                        "w-full h-[52px] px-[24px] py-[12px] mb-[12px]",
                        "bg-c_grey-base rounded-[6px] border-[1px] border-c_grey-border text-c_grey-white",
                        error && "border-c_orange-error border-[2px] font-inter font-normal",
                    )}
                    required
                />
                {icon !== undefined ? <div
                    className="absolute top-[14px] right-[24px] z-1"
                >
                    <img
                        src={`${icon}`}
                        alt="inputIcon"
                    />
                </div> : null}
                {type !== "price" ?
                        <CustomRangeInput
                            type={type}
                            debounceValue={debounceValue}
                            setDebounceValue={setDebounceValue}
                            related={related}
                        />
                    : null}
            </div>
            {
                type === "time" || type === "payment" ?
                    <div
                        className={cn(
                            "flex w-full h-[32px] justify-between items-center",
                            "text-c_grey-white font-inter font-normal text-[14px] leading-[19,6px]"
                        )}
                    >
                        <div>
                            {InputRangeMin[type]}
                            {type === "payment" ? " ₪" : " года"}
                        </div>
                        <div>
                            {InputRangeMax[type]}
                            {type === "payment" ? " ₪" : " лет"}
                        </div>
                    </div> : null
            }
            {warningMes && (type === "payment" || type === "contribution") ? type === "payment" ?
                <div
                    className={cn(
                        warningMes ? "flex bg-c_grey-base w-full h-max py-[6px] pl-[12px] pr-[21px] rounded-[4px] mb-[12px]" : "hidden"
                    )}
                >
                    <div className={cn("flex gap-x-[4px]")}>
                        <div className={`flex items-start justify-center min-w-[16px] h-full`}>
                            <img
                                src={mediumWarning}
                                alt="vector"
                            />
                        </div>
                        <div className="text-[12px] leading-[16.8px] text-c_grey-white">
                            {InputWarning[type]}
                        </div>
                    </div>
                </div> :
                <WarningItem
                    warningMes={warningMes}
                    related={related}
                    debounceValue={debounceValue}
                /> : null
            }
            <div
                className={cn(
                    error ? "flex bg-c_orange-error w-full h-max py-[6px] pl-[12px] pr-[21px] rounded-[4px] mb-[12px]" : "hidden"
                )}
            >
                <div className={cn("flex gap-x-[4px]")}>
                    <div className={`flex items-start justify-center min-w-[16px] h-full`}>
                        <img
                            src={warning}
                            alt="vector"
                        />
                    </div>
                    <div className="font-inter font-normal text-[12px] leading-[16.8px] text-c_grey-white">
                        {InputError[type]}
                    </div>
                </div>
            </div>
        </div>
    )
}

interface WarningI {
    warningMes: boolean;
    related?: number;
    debounceValue: number;
}

const WarningItem:FC<WarningI> = ({warningMes, related = 1, debounceValue }) => {

    return (
        <div
            className={cn(
                warningMes ? "flex bg-c_grey-base w-full h-max py-[6px] pl-[12px] pr-[21px] rounded-[4px] mb-[12px]" : "hidden"
            )}
        >
            <div className={cn("flex gap-x-[4px]")}>
                <div className={`flex items-start justify-center min-w-[16px] h-full`}>
                    <img
                        src={mediumWarning}
                        alt="vector"
                    />
                </div>
                <div className="text-[12px] leading-[16.8px] text-c_grey-white">
                    Cумма финансирования:{debounceValue} ₪ Процент финансирования: {debounceValue*100/related}%
                </div>
            </div>
        </div>
    )
}