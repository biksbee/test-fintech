import { FC } from "react";
import cn from 'classnames'

import type { ButtonType } from './type';
import { ButtonState } from "./type";


interface ButtonI {
    disabled: boolean;
    type: ButtonType;
    handler?: () => void;

}

export const Button:FC<ButtonI> = ({disabled, type, handler}) => {

    return(
        <div
            className={cn(
                "md:w-[249px] w-full h-[56px] flex justify-center items-center rounded-[8px]",
                ButtonState[type]
            )}
            onClick={!disabled ? handler : () => {}}
        >
            <div className={cn(
                "text-[16px] leading-[22.4px] font-exo"
            )}>
                Продолжить
            </div>
        </div>
    )
}