import { FC, useState, useEffect } from 'react';
import cn from 'classnames';
import type { InputType } from './type';
import {InputState, InputError, InputRange, InputWarning} from "./type";

import {useDebounce} from "../../hooks/useDebounce";
import warning from "../../assets/icon/warning.svg";
import mediumWarning from "../../assets/icon/mediumWarning.svg"
import info from "../../assets/icon/Info.svg"
import triangle from "../../assets/icon/triangle.svg"

interface InputI {
    id?: string;
    onChange: (value:string) => void;
    value: string;
    placeholder: string;
    type: InputType;
    icon?: string;
    related?: string;
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
    const [wLine, setWLine] = useState<number>(100)
    const [debounceValue, setDebounceValue] = useState<string>(value)
    const debounceItem = useDebounce(debounceValue, 300)

    const exp: RegExp = InputState[type];

    useEffect(() => {
        if(exp.test(debounceValue)){
            if(type === "price" && +debounceValue <= +InputRange[type]){
                setWLine(320*+debounceValue/10000000)
                console.log("line: " + 320*+debounceValue/10000000)
                console.log(debounceValue)
                onChange(debounceValue)
                setError(false)
                setDisabled(false)
            } else if(type === "contribution" && +related*+InputRange[type]/100 <= (+debounceValue)) {
                onChange(debounceValue)
                setError(false)
                setDisabled(false)
            } else if(type === "time" && +debounceValue <= +InputRange[type]){
                onChange(debounceValue)
                setError(false)
                setDisabled(false)
            } else if(type === 'payment' && +debounceValue >= +InputRange[type]){
                if(+debounceValue === +InputRange[type]) setWarningMes(true)
                else setWarningMes(false)
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
    }, [debounceItem])

    const handlerValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        return setDebounceValue(e.target.value)
    }

    return(
        <div className="flex flex-col md:w-[325px] w-full">
            <label
                htmlFor={id}
                className={cn(
                    "flex gap-x-[6px] text-[16px] leading-[22.4px] text-c_grey-white pb-[12px] font-mont"
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
            <div className={"relative flex"}>
                <input
                    id={id}
                    value={debounceValue}
                    onChange={handlerValueInput}
                    className={cn(
                        "w-full h-[52px] px-[24px] py-[12px] mb-[12px]",
                        "bg-c_grey-base rounded-[6px] border-[1px] border-c_grey-border text-c_grey-white",
                        error && "border-c_orange-error border-[2px]",
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
                <div className={`absolute z-[100] bottom-[12px] left-[2px] bg-c_yellow h-[2px] w-[${wLine}px]`} />
                <div className={`absolute z-[100] bottom-[7px] h-[12px] w-[12px] bg-c_yellow rounded-full left-[${wLine}px]`} />
            </div>
            {warningMes ? type === "payment" ?
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
                    <div className="text-[12px] leading-[16.8px] text-c_grey-white">
                        {InputError[type]}
                    </div>
                </div>
            </div>
        </div>
    )
}

interface WarningI {
    warningMes: boolean;
    related?: string | number;
    debounceValue: string;
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
                    Cумма финансирования:{debounceValue} ₪ Процент финансирования: {+debounceValue*100/+related}%
                </div>
            </div>
        </div>
    )
}